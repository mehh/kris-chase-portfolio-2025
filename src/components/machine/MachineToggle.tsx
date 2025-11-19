"use client";

import React from "react";
import { useMachineView } from "./MachineViewProvider";
import { User, Bot } from "lucide-react";
import { usePostHog } from "@posthog/react";

export default function MachineToggle() {
  const { mode, setMode } = useMachineView();
  const posthog = usePostHog();
  const isHuman = mode === "human";
  const isMachine = mode === "machine";

  // Hide when overlay is open
  if (isMachine) return null;

  return (
    <div className="fixed top-1/2 right-4 -translate-y-1/2 z-[999] md:top-auto md:right-auto md:bottom-[46px] md:left-1/2 md:-translate-x-1/2 md:translate-y-0">
      <div className="flex flex-col md:flex-row items-center overflow-hidden rounded-full border border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm ring-1 ring-lime-300/30 hover:ring-lime-400/40 transition-transform duration-300 will-change-transform hover:scale-[1.03]">
        <button
          type="button"
          onClick={() => {
            posthog?.capture("machine_toggle_click", {
              from_mode: mode,
              to_mode: "human",
              path: typeof window !== "undefined" ? window.location.pathname : undefined,
              source: "button",
            });
            setMode("human");
          }}
          aria-pressed={isHuman}
          className={`px-2.5 py-1.5 sm:px-3 text-xs font-medium transition inline-flex items-center gap-1 sm:gap-1.5 ${
            isHuman ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline">Human</span>
        </button>
        <div className="h-px w-5 md:h-5 md:w-px bg-border/70" />
        <button
          type="button"
          onClick={() => {
            posthog?.capture("machine_toggle_click", {
              from_mode: mode,
              to_mode: "machine",
              path: typeof window !== "undefined" ? window.location.pathname : undefined,
              source: "button",
            });
            setMode("machine");
          }}
          aria-pressed={isMachine}
          className={`px-2.5 py-1.5 sm:px-3 text-xs font-medium transition inline-flex items-center gap-1 sm:gap-1.5 ${
            isMachine ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Bot className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline">Machine</span>
        </button>
      </div>
    </div>
  );
}
