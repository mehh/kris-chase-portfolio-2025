"use client";

import { useEffect } from "react";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";
import posthog from "posthog-js";
import PageViewEvent from "@/components/PageViewEvent";
import { useScrollTracking } from "@/hooks/useScrollTracking";

export default function ConnectPage() {
  useMachineSlice({
    type: "page",
    title: "Connect",
    path: "/connect",
    order: 65,
    content: [
      "### Summary",
      "Book a 30-minute call directly on my calendar.",
      "",
      "### Link",
      "[Book 30 min via Cal.com](https://cal.com/krischase/30min)",
    ].join("\n"),
  });

  // Track scroll depth and time on page
  useScrollTracking({ trackScrollDepth: true, trackTimeOnPage: true });

  useEffect(() => {
    try { posthog.capture("connect_viewed"); } catch {}
  }, []);

  return (
    <>
      <PageViewEvent pageName="connect" />
      <main className="relative mx-auto w-full max-w-6xl px-6 sm:px-8 md:px-10 lg:px-12 pt-32 sm:pt-40 md:pt-44 pb-16 sm:pb-20">
      <section className="mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">Book a Time</h1>
        <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          Use the scheduler below to grab a 30-minute slot. If the embed doesn&apos;t load, use the
          {" "}
          <a href="https://cal.com/krischase/30min" target="_blank" rel="noopener noreferrer" className="underline">direct link</a>.
        </p>
      </section>

      <section>
        <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-black/60 backdrop-blur-sm shadow-sm">
          <div className="w-full min-h-[900px]">
            <iframe
              src="https://cal.com/krischase/30min?embed=inline&theme=dark"
              title="Cal.com Scheduler"
              className="w-full h-[900px]"
              loading="lazy"
              data-cursor="native"
              allow="clipboard-write; fullscreen"
            />
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          Having trouble? Open in a new tab:
          {" "}
          <a href="https://cal.com/krischase/30min" target="_blank" rel="noopener noreferrer" className="underline">cal.com/krischase/30min</a>
        </div>
      </section>
    </main>
    </>
  );
}
