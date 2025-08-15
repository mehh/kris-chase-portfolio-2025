"use client";

import React, { useState } from "react";
import { useMachineView } from "./MachineViewProvider";
import { Check, Clipboard, X } from "lucide-react";

export default function MachineOverlay() {
  const { mode, setMode, toMarkdown } = useMachineView();
  const [copied, setCopied] = useState(false);
  const content = toMarkdown();

  if (mode !== "machine") return null;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 text-foreground">
      {/* Top bar */}
      <div className="sticky top-0 z-[1001] flex items-center justify-between border-b border-border bg-background/80 px-4 py-3">
        <div className="text-sm font-medium opacity-70">Machine View</div>
        <div className="flex items-center gap-2">
          <button
            onClick={onCopy}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-1.5 text-xs hover:bg-muted/80"
            aria-label="Copy machine view"
          >
            {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            onClick={() => setMode("human")}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-1.5 text-xs hover:bg-muted/80"
            aria-label="Close machine view"
          >
            <X className="h-4 w-4" />
            Close
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100dvh-48px)] overflow-auto p-6">
        <div className="mx-auto max-w-[500px]">
          <pre className="whitespace-pre-wrap rounded-lg border border-border bg-muted/40 p-4 text-sm leading-relaxed font-mono">
{content}
          </pre>
        </div>
      </div>
    </div>
  );
}
