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

  // Starter suggestions to help users begin
  const suggestions = [
    "What's your leadership style?",
    "What industries have you worked with?",
    "What are your strengths?",
    "How do you scale teams effectively?",
    "What types of products have you built?",
  ];

  useEffect(() => {
    // Track when chat widget is viewed/opened
    try {
      posthog.capture("chat_opened", { path: typeof window !== "undefined" ? window.location.pathname : undefined });
    } catch {
      // ignore
    }
  }, []);

  const sendMessage = async (q: string) => {
    const question = q.trim();
    if (!question || isLoading) return;
    setError(null);
    lastQuestionRef.current = question;

    // push user message
    const userId = `u_${Date.now()}`;
    setMessages((m) => [...m, { id: userId, role: "user", content: question }]);
    setInput("");

    // Track chat message send
    try {
      posthog.capture("chat_message_sent", { length: question.length });
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
        body: JSON.stringify({ message: question }),
      });
      if (!res.ok || !res.body) {
        let detail: unknown = null;
        const ct = res.headers.get("content-type") || "";
        try {
          if (ct.includes("application/json")) {
            detail = await res.json();
          } else {
            detail = await res.text();
          }
        } catch {}
        console.error("Chat API error", { status: res.status, detail });
        throw new Error("Chat unavailable. Please try again shortly.");
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
        posthog.capture("chat_response_stream_complete", { question_length: question.length });
      } catch {}

      // fetch sources after streaming completes
      try {
        const sres = await fetch("/api/chat/sources", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-PostHog-Distinct-Id": posthog.get_distinct_id?.() || "",
          },
          body: JSON.stringify({ message: question }),
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
      const friendly = "Sorry, I ran into an issue. Please try again or rephrase your question.";
      setError(friendly);
      console.error("Chat client error", e);
      try {
        posthog.capture("chat_error", {
          message: e instanceof Error ? e.message : String(e),
          last_question_length: lastQuestionRef.current?.length || 0,
        });
      } catch {}
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(input);
  };

  const handleSuggestionClick = (q: string) => {
    try {
      posthog.capture("chat_suggestion_clicked", { text: q, length: q.length });
    } catch {}
    void sendMessage(q);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative z-10 h-64 sm:h-72 md:h-80 overflow-y-auto rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-sm text-zinc-100">
        {messages.length === 0 ? (
          <div>
            <p className="text-zinc-400">Ask anything about my site content, resume PDF, or process.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSuggestionClick(s)}
                  disabled={isLoading}
                  className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-100 hover:bg-zinc-800 disabled:opacity-60"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <ul className="space-y-3">
            {messages.map((m: { id: string; role: "user" | "assistant"; content: string }) => (
              <li key={m.id} className="text-zinc-100">
                <div>
                  <span className="font-medium mr-2">{m.role === "user" ? "You" : "AI"}:</span>
                  <span className="whitespace-pre-wrap text-zinc-100/90">{m.content}</span>
                </div>
                {m.role === "assistant" && Array.isArray(sourcesById[m.id]) && sourcesById[m.id]?.length > 0 && (
                  <div className="mt-1 text-xs text-zinc-400">
                    <span className="mr-2">Sources:</span>
                    {sourcesById[m.id]!.map((s, si) => (
                      <a
                        key={si}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-2 hover:text-white mr-2"
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

      <form onSubmit={handleSubmit} className="flex gap-2 rounded-lg border border-zinc-700 bg-zinc-900 p-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 rounded-md border border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-400 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500/30"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md border border-zinc-700 bg-foreground text-background px-3 py-2 text-sm font-medium disabled:opacity-60"
        >
          {isLoading ? "Thinking..." : "Ask"}
        </button>
      </form>

      {error && <p className="text-xs text-red-500">{String(error)}</p>}
    </div>
  );
}
