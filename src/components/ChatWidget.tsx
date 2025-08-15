"use client";

import React, { useState } from "react";

export default function ChatWidget() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
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
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
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
              <li key={i} className={m.role === "user" ? "text-foreground" : "text-foreground/90"}>
                <span className="font-medium mr-2">{m.role === "user" ? "You" : "AI"}:</span>
                <span className="whitespace-pre-wrap">{m.content}</span>
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
