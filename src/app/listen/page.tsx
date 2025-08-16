"use client";

import React from "react";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";

export default function Page() {
  // Register Listen page for Machine View
  useMachineSlice({
    type: "page",
    title: "Listen",
    path: "/listen",
    order: 60,
    content: [
      "### Summary",
      "Podcast-style audio resume with ElevenLabs voice clone and an LLM-generated narrative from the PDF resume.",
      "",
      "### Player",
      "Embed: https://kris.jellypod.ai/embed?episode=8fecc861-5ddf-4fb7-948b-49702d6405f4",
      "",
      "### Tips",
      "- Wear headphones for the best experience",
      "- Refresh if the player doesn’t load",
    ].join("\n"),
  }, []);
  return (
    <main className="relative mx-auto w-full max-w-5xl px-6 sm:px-8 md:px-10 lg:px-12 pt-32 sm:pt-40 md:pt-44 pb-16 sm:pb-20">
      {/* Hero */}
      <section className="mb-10 sm:mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Listen to My Resume
        </h1>
        <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          I turned my resume into a short, podcast-style audio to showcase how I use AI to
          communicate more effectively and make information more engaging. The process used a
          voice clone generated with ElevenLabs, then converted my PDF resume into a structured
          script, and finally fed that script into an LLM to produce a concise podcast narrative.
        </p>
      </section>

      {/* Player Card */}
      <section className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm shadow-sm p-3 sm:p-4 md:p-6">
        <div
          className="w-full h-[196px] sm:h-[200px] md:h-[210px] lg:h-[220px] overflow-hidden rounded-lg"
        >
          <iframe
            title="Kris Chase – Podcast Resume"
            className="w-full h-full"
            frameBorder="0"
            scrolling="no"
            seamless
            data-cursor="native"
            src="https://kris.jellypod.ai/embed?episode=8fecc861-5ddf-4fb7-948b-49702d6405f4"
          />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Tip: Wear headphones for the best experience. If the player doesn’t load, try refreshing this page.
        </p>
      </section>
    </main>
  );
}
