import { NextResponse } from "next/server";
import { retrieve, addFAQDocs, addFAQMarkdownDoc, indexSite } from "@/lib/ragStore";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { message } = (await req.json()) as { message?: string };
    const userMessage = (message || "").trim();
    if (!userMessage) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    // Warm-up (idempotent)
    await addFAQDocs();
    await addFAQMarkdownDoc();
    const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
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

    const docs = await retrieve(userMessage, 4);
    return NextResponse.json({ sources: docs.map((d) => ({ title: d.title, url: d.url })) });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
