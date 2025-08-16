import { NextResponse } from "next/server";
import { retrieve, addFAQDocs, indexSite, addFAQMarkdownDoc } from "@/lib/ragStore";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { captureServer } from "@/lib/posthog/server";

export const runtime = "nodejs";

let warmed = false;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const userMessage: string = body?.message ?? "";
    if (!userMessage || typeof userMessage !== "string") {
      return NextResponse.json({ error: "Missing 'message'" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OPENAI_API_KEY is not set" }, { status: 500 });
    }

    // Capture server-side chat request
    const distinctId = req.headers.get("x-posthog-distinct-id") || undefined;
    captureServer("chat_api_request", { length: userMessage.length, path: "/api/chat" }, distinctId);

    // Warm RAG once per runtime: add FAQs and crawl key routes
    if (!warmed) {
      addFAQDocs();
      await addFAQMarkdownDoc();
      // Infer origin from request headers; fallback to env or localhost dev
      const origin = req.headers.get("origin")
        ?? process.env.NEXT_PUBLIC_SITE_URL
        ?? "http://localhost:3007";
      await indexSite(origin, [
        "/",
        "/how-i-operate",
        "/testimonials",
        "/resume",
        "/contact",
        "/listen",
        "/partners",
        "/faq",
        "/services",
      ]);
      warmed = true;
    }

    // Retrieve top docs
    const docs = await retrieve(userMessage, 4);
    const context = docs
      .map((d, i) => `Source ${i + 1}: ${d.title} (${d.url})\n${d.content}`)
      .join("\n\n");

    const system = `You are an assistant for Kris Chase's personal site. Answer using only the provided sources. If you don't know, say you don't know. Be concise.`;

    const openai = createOpenAI({ apiKey });

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system,
      prompt: `Context:\n\n${context}\n\nUser question: ${userMessage}`,
      temperature: 0.2,
      maxOutputTokens: 400,
    });

    // Stream only text; client fetches sources separately after finish for simplicity
    return result.toTextStreamResponse();
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    const distinctId = req.headers.get("x-posthog-distinct-id") || undefined;
    captureServer("chat_api_error", { message }, distinctId);
    console.error("/api/chat error", e);
    // Return a sanitized error so the client never exposes raw provider errors
    return NextResponse.json({ error: "Failed to generate a response." }, { status: 500 });
  }
}
