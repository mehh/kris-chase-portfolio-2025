import { NextResponse } from "next/server";
import { retrieve, addFAQDocs, indexSite, addFAQMarkdownDoc } from "@/lib/ragStore";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

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
    const { text: answer } = await generateText({
      model: openai("gpt-4o-mini"),
      system,
      prompt: `Context:\n\n${context}\n\nUser question: ${userMessage}`,
      temperature: 0.2,
      maxOutputTokens: 400,
    });

    return NextResponse.json({ answer, sources: docs.map((d) => ({ title: d.title, url: d.url })) });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
