"use client";

import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";
import { INTERVIEW_FAQ } from "@/data/interview-faq";

export default function FAQPage() {
  // Register page content for Machine View
  const md = INTERVIEW_FAQ.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n");
  useMachineSlice(
    {
      type: "page",
      title: "Interview FAQ",
      path: "/faq",
      order: 11,
      content: md,
    },
    []
  );

  return (
    <main className="relative mx-auto w-full max-w-6xl px-6 sm:px-8 md:px-10 lg:px-12 pt-32 sm:pt-40 md:pt-44 pb-20">
      <section className="mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">Interview FAQ</h1>
        <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          A curated set of interview-style questions and answers about how I operate, what I build, and how we can work together.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INTERVIEW_FAQ.map((item) => (
          <div key={item.id} id={item.id} className="relative rounded-2xl p-2 scroll-mt-28">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <div className="relative rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm p-6">
              <h3 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                {item.question}
                <a href={`#${item.id}`} className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2">
                  #{item.id}
                </a>
              </h3>
              <p className="mt-3 text-sm md:text-base text-muted-foreground whitespace-pre-wrap">{item.answer}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
