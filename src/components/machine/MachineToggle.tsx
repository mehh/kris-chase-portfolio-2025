"use client";

import React from "react";
import { useMachineView } from "./MachineViewProvider";
import { User, Bot } from "lucide-react";

export default function MachineToggle() {
  const { mode, setMode } = useMachineView();
  const isHuman = mode === "human";
  const isMachine = mode === "machine";

  // Hide when overlay is open
  if (isMachine) return null;

  return (
    <div className="fixed bottom-[46px] left-1/2 z-[999] -translate-x-1/2">
      <div className="inline-flex items-center overflow-hidden rounded-full border border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm ring-1 ring-lime-300/30 hover:ring-lime-400/40 transition-transform duration-300 will-change-transform hover:scale-[1.03]">
        <button
          type="button"
          onClick={() => setMode("human")}
          aria-pressed={isHuman}
          className={`px-3 py-1.5 text-xs font-medium transition inline-flex items-center gap-1.5 ${
            isHuman ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="h-4 w-4" />
          Human
        </button>
        <div className="h-5 w-px bg-border/70" />
        <button
          type="button"
          onClick={() => setMode("machine")}
          aria-pressed={isMachine}
          className={`px-3 py-1.5 text-xs font-medium transition inline-flex items-center gap-1.5 ${
            isMachine ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Bot className="h-4 w-4" />
          Machine
        </button>
      </div>
    </div>
  );
}
