"use client";

import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";
import { Download } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";
import posthog from "posthog-js";

export default function ResumePage() {
  // Register page content for Machine View
  useMachineSlice(
    {
      type: "page",
      title: "Resume",
      path: "/resume",
      order: 9,
      content:
        `### Resume\n\nListen to a podcast-style narration of my resume, chat with an AI about my work and site content (coming soon), or download/view the PDF.\n\n- **Listen** — Embedded audio player powered by Jellypod + ElevenLabs voice clone.\n- **Chat (soon)** — Vercel AI SDK chat component to talk with my site, resume, and LinkedIn data.\n- **Download** — One-click download of the latest PDF.\n- **View PDF** — Responsive embedded viewer.`,
    },
    []
  );

  return (
    <main className="relative mx-auto w-full max-w-6xl px-6 sm:px-8 md:px-10 lg:px-12 pt-32 sm:pt-40 md:pt-44 pb-20">
      {/* Hero */}
      <section className="mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">Resume</h1>
        <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          Listen, chat, or download a copy. Built with an ElevenLabs voice clone, an LLM
          generated script, and a responsive PDF viewer.
        </p>
      </section>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column: Listen + Chat placeholder */}
        <div className="space-y-8">
          {/* Listen Card */}
          <div className="relative rounded-2xl p-2">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <div className="relative rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm p-6">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">Listen to My Resume</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Podcast-style narration using ElevenLabs + Jellypod.
              </p>
              <div className="mt-4 w-full h-[196px] sm:h-[200px] md:h-[210px] lg:h-[220px] overflow-hidden rounded-lg">
                <iframe
                  title="Kris Chase – Podcast Resume"
                  className="w-full h-full"
                  frameBorder={0}
                  scrolling="no"
                  seamless
                  src="https://kris.jellypod.ai/embed?episode=8fecc861-5ddf-4fb7-948b-49702d6405f4&theme=dark"
                />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Tip: Wear headphones for the best experience. If the player doesn’t load, try refreshing this page.
              </p>
            </div>
          </div>

          {/* Chat with my AI (placeholder) */}
          <div className="relative rounded-2xl p-2">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <div className="relative rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm p-6">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">Chat with my AI</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Streaming answers via the Vercel AI SDK with a lightweight server-side RAG layer. We embed and rank chunks from my site, resume PDF, and interview FAQ using cosine similarity, then constrain the prompt to the top matches. Tokens stream in real time with verifiable sources; no user data is persisted. Roadmap: move embeddings from in-memory to pgvector, add evals/observability, and support multi-turn tool use.
              </p>
              <div className="mt-4">
                <ChatWidget />
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Download + PDF embed */}
        <div className="space-y-8">
          {/* Download Card */}
          <div className="relative rounded-2xl p-2">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <div className="relative rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm p-6">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">Download</h2>
              <p className="mt-2 text-sm text-muted-foreground">Grab a PDF copy of my latest resume.</p>
              <div className="mt-4">
                <a
                  href="/files/Kris Chase Resume.pdf"
                  download
                  onClick={() => {
                    try {
                      posthog.capture("resume_download_clicked", { href: "/files/Kris Chase Resume.pdf" });
                    } catch {}
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-black px-4 py-2 text-sm font-medium hover:bg-white/80 dark:hover:bg-black/80 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </div>

          {/* PDF Embed Card */}
          <div className="relative rounded-2xl p-2">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <div className="relative rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm p-4 sm:p-5 md:p-6">
              <h2 className="sr-only">Resume PDF</h2>
              <div className="w-full h-[420px] sm:h-[520px] md:h-[620px] overflow-hidden rounded-lg">
                <object
                  data="/files/Kris Chase Resume.pdf#view=FitH"
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <iframe
                    title="Kris Chase Resume PDF"
                    src="/files/Kris Chase Resume.pdf#toolbar=0&navpanes=0&view=FitH"
                    className="w-full h-full"
                  />
                  <p className="p-4 text-sm text-muted-foreground">
                    PDF preview not supported. <a className="underline" href="/files/Kris Chase Resume.pdf" target="_blank" rel="noopener noreferrer">Open the resume</a>.
                  </p>
                </object>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
