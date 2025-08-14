"use client";

import React from "react";
import { useMachineView } from "./MachineViewProvider";

export default function MachineToggle() {
  const { mode, setMode } = useMachineView();
  const isHuman = mode === "human";
  const isMachine = mode === "machine";

  // Hide when overlay is open
  if (isMachine) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[999] -translate-x-1/2">
      <div className="inline-flex items-center overflow-hidden rounded-full border border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <button
          type="button"
          onClick={() => setMode("human")}
          aria-pressed={isHuman}
          className={`px-3 py-1.5 text-xs font-medium transition ${
            isHuman ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Human
        </button>
        <div className="h-5 w-px bg-border/70" />
        <button
          type="button"
          onClick={() => setMode("machine")}
          aria-pressed={isMachine}
          className={`px-3 py-1.5 text-xs font-medium transition ${
            isMachine ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Machine
        </button>
      </div>
    </div>
  );
}
