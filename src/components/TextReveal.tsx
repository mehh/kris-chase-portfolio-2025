"use client";

import React from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delayMs?: number;
  flipHorizontal?: boolean;
  spin?: boolean;
}

/**
 * Minimal per-character reveal used by Splash/Page transitions.
 */
export default function TextReveal({ text, className = "", delayMs = 0, flipHorizontal, spin }: TextRevealProps) {
  return (
    <span className={["tr", className].filter(Boolean).join(" ")}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className={[
            "tr-char",
            flipHorizontal ? "tr-flip" : "",
            spin ? "tr-spin" : "",
          ].filter(Boolean).join(" ")}
          style={{ animationDelay: `${delayMs + i * 40}ms` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
