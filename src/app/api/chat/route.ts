import { NextResponse } from "next/server";
import { retrieve } from "@/lib/ragStore";

export const runtime = "nodejs";

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

    // Retrieve top docs
    const docs = await retrieve(userMessage, 4);
    const context = docs
      .map((d, i) => `Source ${i + 1}: ${d.title} (${d.url})\n${d.content}`)
      .join("\n\n");

    const system = `You are an assistant for Kris Chase's personal site. Answer using only the provided sources. If you don't know, say you don't know. Be concise.`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: system },
          { role: "user", content: `Context:\n\n${context}\n\nUser question: ${userMessage}` },
        ],
        temperature: 0.2,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: `OpenAI error: ${res.status} ${err}` }, { status: 500 });
    }

    const json = await res.json();
    const answer = json?.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({
      answer,
      sources: docs.map((d) => ({ title: d.title, url: d.url })),
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
