"use client";

import { useEffect, useState } from "react";
import TextReveal from "@/components/TextReveal";
import Link from "next/link";
import GradientText from "@/components/GradientText";

interface KCOverlayProps {
  show: boolean;
  onDone?: () => void;
  /** ms before starting fade out */
  visibleMs?: number;
  /** ms for fade out animation */
  fadeMs?: number;
  /** Optional: dark backdrop color */
  backdrop?: string; // e.g. "rgba(0,0,0,1)"
}

/**
 * Full-screen overlay that shows the branded <KRIS CHASE /> text
 * wrapped with GlowingEffect and per-character TextReveal,
 * then fades out and calls onDone.
 */
export default function KCOverlay({
  show,
  onDone,
  visibleMs = 1100,
  fadeMs = 300,
  backdrop = "#000",
}: KCOverlayProps) {
  const [mounted, setMounted] = useState(show);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!show) {
      setMounted(false);
      return;
    }
    setMounted(true);
    setFading(false);

    const t1 = setTimeout(() => setFading(true), visibleMs);
    const t2 = setTimeout(() => {
      setMounted(false);
      setFading(false);
      onDone?.();
    }, visibleMs + fadeMs);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [show, visibleMs, fadeMs, onDone]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] pointer-events-none transition-opacity flex items-center justify-center`}
      style={{
        opacity: fading ? 0 : 1,
        background: backdrop,
        transitionDuration: `${fadeMs}ms`,
      }}
      aria-hidden
    >
      {/* Centered wrapper with animated gradient text and per-char reveal */}

        <Link
          href="/"
          className="kc-gradient-text block font-heading font-bold transition-colors"
          style={{
            fontSize: "clamp(48px, 12vw, 175px)",
            lineHeight: 1,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          <TextReveal text="<KRIS CHASE />" />
        </Link>
      <style jsx>{`
        /* Apply gradient to per-character spans produced by TextReveal */
        .kc-gradient-text .tr-char {
          color: transparent;
          background-image: linear-gradient(to right, #40ffaa, #4079ff, #40ffaa, #4079ff, #40ffaa);
          background-clip: text;
          -webkit-background-clip: text;
          background-size: 300% 100%;
          animation: kc-gradient-move 3s linear infinite;
        }
        @keyframes kc-gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
