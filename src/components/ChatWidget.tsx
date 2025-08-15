"use client";

import React, { useState } from "react";

type ChatSource = { title: string; url: string };
type ChatMessage = { role: "user" | "assistant"; content: string; sources?: ChatSource[] };

export default function ChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ask = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setError(null);
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Request failed");
      const answer = json?.answer || "";
      const sources: ChatSource[] = Array.isArray(json?.sources) ? json.sources : [];
      setMessages((m) => [...m, { role: "assistant", content: answer, sources }]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="h-64 sm:h-72 md:h-80 overflow-y-auto rounded-lg border border-gray-200/70 dark:border-gray-800 bg-background p-3 text-sm">
        {messages.length === 0 ? (
          <p className="text-muted-foreground">Ask anything about my site content, resume PDF, or process.</p>
        ) : (
          <ul className="space-y-3">
            {messages.map((m, i) => (
              <li key={i} className="text-foreground">
                <div>
                  <span className="font-medium mr-2">{m.role === "user" ? "You" : "AI"}:</span>
                  <span className="whitespace-pre-wrap text-foreground/90">{m.content}</span>
                </div>
                {m.role === "assistant" && m.sources && m.sources.length > 0 && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    <span className="mr-2">Sources:</span>
                    {m.sources.map((s, si) => (
                      <a
                        key={si}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-2 hover:text-foreground mr-2"
                      >
                        {s.title}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={ask} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 rounded-md border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md border border-gray-200/70 dark:border-gray-800 bg-foreground text-background px-3 py-2 text-sm font-medium disabled:opacity-60"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
