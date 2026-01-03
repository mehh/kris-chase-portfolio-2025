import { NextResponse } from "next/server";
import { retrieve, addFAQDocs, addFAQMarkdownDoc, indexSite } from "@/lib/ragStore";
import { captureServer } from "@/lib/posthog/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const distinctId = req.headers.get("x-posthog-distinct-id") || undefined;
  const traceId = `trace_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  
  try {
    const { message } = (await req.json()) as { message?: string };
    const userMessage = (message || "").trim();
    if (!userMessage) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    captureServer("chat_sources_request", { length: userMessage.length, path: "/api/chat/sources" }, distinctId);

    // Warm-up (idempotent)
    await addFAQDocs();
    await addFAQMarkdownDoc();
    const origin =
      req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    await indexSite(origin, [
      "/",
      "/resume",
      "/how-i-operate",
      "/testimonials",
      "/listen",
      "/partners",
      "/contact",
      "/faq",
      "/services",
    ]);

    // PostHog context for embeddings
    const posthogOptions = {
      posthogDistinctId: distinctId,
      posthogTraceId: traceId,
      posthogProperties: {
        source: "chat_sources_api",
        message_length: userMessage.length,
      },
    };

    const docs = await retrieve(userMessage, 4, posthogOptions);
    captureServer("chat_sources_returned", { count: docs.length, trace_id: traceId }, distinctId);
    return NextResponse.json({ sources: docs.map((d) => ({ title: d.title, url: d.url })) });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    captureServer("chat_sources_error", { message, trace_id: traceId }, distinctId);
    console.error("/api/chat/sources error", e);
    return NextResponse.json({ error: "Failed to fetch sources." }, { status: 500 });
  }
}

