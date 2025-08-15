"use client";

import React, { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";

type ChatSource = { title: string; url: string };
type Msg = { id: string; role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sourcesById, setSourcesById] = useState<Record<string, ChatSource[]>>({});
  const lastQuestionRef = useRef<string>("");

  useEffect(() => {
    // Track when chat widget is viewed/opened
    try {
      posthog.capture("chat_opened", { path: typeof window !== "undefined" ? window.location.pathname : undefined });
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q || isLoading) return;
    setError(null);
    lastQuestionRef.current = q;

    // push user message
    const userId = `u_${Date.now()}`;
    setMessages((m) => [...m, { id: userId, role: "user", content: q }]);
    setInput("");

    // Track chat message send
    try {
      posthog.capture("chat_message_sent", { length: q.length });
    } catch {}

    // create placeholder assistant message for streaming
    const assistantId = `a_${Date.now()}`;
    setMessages((m) => [...m, { id: assistantId, role: "assistant", content: "" }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-PostHog-Distinct-Id": posthog.get_distinct_id?.() || "",
        },
        body: JSON.stringify({ message: q }),
      });
      if (!res.ok || !res.body) {
        const msg = await res.text();
        throw new Error(msg || "Request failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          if (chunk) {
            setMessages((m) =>
              m.map((msg) =>
                msg.id === assistantId ? { ...msg, content: msg.content + chunk } : msg
              )
            );
          }
        }
      }

      try {
        posthog.capture("chat_response_stream_complete", { question_length: q.length });
      } catch {}

      // fetch sources after streaming completes
      try {
        const sres = await fetch("/api/chat/sources", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-PostHog-Distinct-Id": posthog.get_distinct_id?.() || "",
          },
          body: JSON.stringify({ message: q }),
        });
        const json = await sres.json();
        const sources: ChatSource[] = Array.isArray(json?.sources) ? json.sources : [];
        setSourcesById((m) => ({ ...m, [assistantId]: sources }));
        try {
          posthog.capture("chat_sources_fetched", { count: sources.length });
        } catch {}
      } catch {
        // ignore
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
      try {
        posthog.capture("chat_error", { message: String(msg) });
      } catch {}
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="h-64 sm:h-72 md:h-80 overflow-y-auto rounded-lg border border-gray-200/70 dark:border-gray-800 bg-background p-3 text-sm">
        {messages.length === 0 ? (
          <p className="text-muted-foreground">Ask anything about my site content, resume PDF, or process.</p>
        ) : (
          <ul className="space-y-3">
            {messages.map((m: { id: string; role: "user" | "assistant"; content: string }) => (
              <li key={m.id} className="text-foreground">
                <div>
                  <span className="font-medium mr-2">{m.role === "user" ? "You" : "AI"}:</span>
                  <span className="whitespace-pre-wrap text-foreground/90">{m.content}</span>
                </div>
                {m.role === "assistant" && Array.isArray(sourcesById[m.id]) && sourcesById[m.id]?.length > 0 && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    <span className="mr-2">Sources:</span>
                    {sourcesById[m.id]!.map((s, si) => (
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

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 rounded-md border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md border border-gray-200/70 dark:border-gray-800 bg-foreground text-background px-3 py-2 text-sm font-medium disabled:opacity-60"
        >
          {isLoading ? "Thinking..." : "Ask"}
        </button>
      </form>

      {error && <p className="text-xs text-red-500">{String(error)}</p>}
    </div>
  );
}
