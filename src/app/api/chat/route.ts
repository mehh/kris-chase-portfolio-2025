import { NextResponse } from "next/server";
import { retrieve, addFAQDocs, indexSite, addFAQMarkdownDoc } from "@/lib/ragStore";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { captureServer } from "@/lib/posthog/server";
import { getPostHogOpenAIClient } from "@/lib/posthog/openai";

export const runtime = "nodejs";

let warmed = false;

export async function POST(req: Request) {
  const distinctId = req.headers.get("x-posthog-distinct-id") || undefined;
  const traceId = `trace_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  
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

    // PostHog context for embeddings
    const posthogOptions = {
      posthogDistinctId: distinctId,
      posthogTraceId: traceId,
      posthogProperties: {
        source: "chat_api",
        message_length: userMessage.length,
      },
    };

    // Retrieve top docs with PostHog analytics
    const docs = await retrieve(userMessage, 4, posthogOptions);
    const context = docs
      .map((d, i) => `Source ${i + 1}: ${d.title} (${d.url})\n${d.content}`)
      .join("\n\n");

    const system = `You are an assistant for Kris Chase's personal site. Answer using only the provided sources. If you don't know, say you don't know. Be concise.`;

    // Try to use PostHog-wrapped OpenAI client for LLM analytics
    const phOpenAI = getPostHogOpenAIClient(apiKey);
    
    if (phOpenAI) {
      // Use PostHog-wrapped client for generation tracking
      // Note: Vercel AI SDK uses a different abstraction, so we'll manually track
      // For now, we'll use Vercel AI SDK for streaming and manually capture the event
      const openai = createOpenAI({ apiKey });
      const result = await streamText({
        model: openai("gpt-4o-mini"),
        system,
        prompt: `Context:\n\n${context}\n\nUser question: ${userMessage}`,
        temperature: 0.2,
        maxOutputTokens: 400,
      });

      // Manually capture generation event for PostHog LLM analytics
      // Since we're using Vercel AI SDK, we'll capture a simplified event
      // For full LLM analytics, consider using PostHog's OpenAI client directly
      captureServer(
        "$ai_generation",
        {
          model: "gpt-4o-mini",
          input_length: userMessage.length,
          context_length: context.length,
          trace_id: traceId,
          source: "chat_api",
        },
        distinctId,
        req.headers
      );

      return result.toTextStreamResponse();
    } else {
      // Fallback to regular Vercel AI SDK if PostHog is not configured
      const openai = createOpenAI({ apiKey });
      const result = await streamText({
        model: openai("gpt-4o-mini"),
        system,
        prompt: `Context:\n\n${context}\n\nUser question: ${userMessage}`,
        temperature: 0.2,
        maxOutputTokens: 400,
      });

      return result.toTextStreamResponse();
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    captureServer("chat_api_error", { message, trace_id: traceId }, distinctId);
    console.error("/api/chat error", e);
    // Return a sanitized error so the client never exposes raw provider errors
    return NextResponse.json({ error: "Failed to generate a response." }, { status: 500 });
  }
}
