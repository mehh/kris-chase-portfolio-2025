"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useId, useRef, useState } from "react";

/**
 * Global background that animates two vector grid planes from the sides
 * as the user scrolls ("closing in" effect). Implemented with SVG so we
 * can add subtle cell pulses and theme-aware colors without raster assets.
 */
// Lightweight SVG grid panel with subtle animated cell pulses
function SVGGridPanel({ side }: { side: "left" | "right" }) {
  // Static plane size; the container scales this to viewport height
  const W = 800;
  const H = 1600;
  const gap = 80; // grid spacing in px within the SVG viewBox
  const svgRef = useRef<SVGSVGElement | null>(null);

  // (Grid lines are generated via <pattern>, so we don't need explicit x/y arrays.)
  const reactId = useId();
  const fadeId = `fade-${side}-${reactId}`;
  const maskId = `mask-${side}-${reactId}`;
  const gridId = `grid-${side}-${reactId}`;
  const vignetteId = `vignette-${side}-${reactId}`;

  // Pick a few random cells to softly pulse
  const [animatedCells, setAnimatedCells] = useState<{ x: number; y: number; dur: number; delay: number }[]>([]);
  // Hover trail cells that fade out
  const [hoverTrail, setHoverTrail] = useState<{ id: number; x: number; y: number }[]>([]);
  const pmRAFRef = useRef<number | null>(null);
  useEffect(() => {
    const cols = Math.floor(W / gap);
    const rows = Math.floor(H / gap);
    const picks = 22; // keep subtle and performant
    const taken = new Set<string>();
    const cells: { x: number; y: number; dur: number; delay: number }[] = [];
    for (let i = 0; i < picks; i++) {
      const cx = Math.floor(Math.random() * cols);
      const cy = Math.floor(Math.random() * rows);
      const key = `${cx}-${cy}`;
      if (taken.has(key)) {
        i--; // try again
        continue;
      }
      taken.add(key);
      // Randomize duration and delay for natural feel
      const dur = 5 + Math.random() * 6; // 5s..11s
      const delay = Math.random() * 8; // 0..8s
      cells.push({ x: cx * gap, y: cy * gap, dur, delay });
    }
    setAnimatedCells(cells);
  }, [W, H, gap]);

  // Left side fades towards center from right->left; right does the opposite
  const fadeX1 = side === "left" ? "100%" : "0%";
  const fadeX2 = side === "left" ? "0%" : "100%";

  // Global pointer tracking so we don't need pointer-events on the background
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only enable hover trail on devices that actually have a fine pointer and support hover (desktop)
    const allowHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!allowHover) return;
    const onMove: EventListener = (e) => {
      if (pmRAFRef.current != null) return;
      pmRAFRef.current = window.requestAnimationFrame(() => {
        pmRAFRef.current = null;
        const el = svgRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const pe = e as PointerEvent;
        const cx = pe.clientX;
        const cy = pe.clientY;
        if (cx < rect.left || cx > rect.right || cy < rect.top || cy > rect.bottom) return;
        const localX = cx - rect.left;
        const localY = cy - rect.top;
        const x = Math.floor(localX / gap) * gap;
        const y = Math.floor(localY / gap) * gap;
        const id = Date.now() + Math.random();
        setHoverTrail((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.x === x && last.y === y) return prev;
          const next = [...prev, { id, x, y }];
          return next.length > 120 ? next.slice(next.length - 120) : next;
        });
        window.setTimeout(() => {
          setHoverTrail((prev) => prev.filter((c) => c.id !== id));
        }, 1200);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (pmRAFRef.current != null) cancelAnimationFrame(pmRAFRef.current);
    };
  }, [W, H, gap]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      ref={svgRef}
      className="h-screen w-auto select-none"
      aria-hidden
      shapeRendering="crispEdges"
    >
      <defs>
        {/* Grid line colors adapt to theme via currentColor; container sets color */}
        <linearGradient id={fadeId} x1={fadeX1} y1="0%" x2={fadeX2} y2="0%">
          {/* Masks use luminance; white = visible, black = hidden */}
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="40%" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id={maskId}>
          <rect width="100%" height="100%" fill={`url(#${fadeId})`} />
        </mask>

        <pattern id={gridId} width={gap} height={gap} patternUnits="userSpaceOnUse">
          <path d={`M ${gap} 0 L 0 0 0 ${gap}`} fill="none" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </pattern>
        {/* Soft vignette to keep edges subtle */}
        <radialGradient id={vignetteId} cx="50%" cy="50%" r="75%">
          <stop offset="60%" stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.35" />
        </radialGradient>
      </defs>

      {/* Base grid */}
      <g mask={`url(#${maskId})`}>
        <rect width="100%" height="100%" fill={`url(#${gridId})`} />
        {/* Vignette overlay */}
        <rect width="100%" height="100%" fill={`url(#${vignetteId})`} />
      </g>

      {/* Subtle animated cells */}
      <g>
        {animatedCells.map((c, idx) => (
          <rect
            key={idx}
            x={c.x + 1}
            y={c.y + 1}
            width={gap - 2}
            height={gap - 2}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            fillOpacity={0}
            className="grid-cell"
            style={{
              animation: `gridCellPulse ${c.dur}s ease-in-out ${c.delay}s infinite alternate`,
            } as React.CSSProperties}
          />)
        )}
      </g>

      {/* Hover trail overlays */}
      <g>
        {hoverTrail.map((c) => (
          <rect
            key={c.id}
            x={c.x}
            y={c.y}
            width={gap - 2}
            height={gap - 2}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            className="grid-cell-hover"
            style={{
              animation: `gridCellHover 1.2s ease-out 0s 1 forwards`,
            } as React.CSSProperties}
          />
        ))}
      </g>

      <style jsx global>{`
        .grid-cell { stroke-opacity: 0; }
        @keyframes gridCellPulse {
          0% { fill-opacity: 0; stroke-opacity: 0; }
          50% { fill-opacity: 0.14; stroke-opacity: 0.08; }
          100% { fill-opacity: 0; stroke-opacity: 0; }
        }
        @keyframes gridCellHover {
          0% { fill-opacity: 0; stroke-opacity: 0; }
          35% { fill-opacity: 0.35; stroke-opacity: 0.08; }
          100% { fill-opacity: 0; stroke-opacity: 0; }
        }
        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .grid-cell { animation: none !important; }
          .grid-cell-hover { animation: none !important; }
        }
        /* Disable hover trail on touch/coarse pointer devices */
        @media (hover: none), (pointer: coarse) {
          .grid-cell-hover { display: none !important; animation: none !important; }
        }
      `}</style>
    </svg>
  );
}

export default function GridScrollBackground() {
  // Global scroll progress [0..1]
  const { scrollYProgress } = useScroll();

  // Animate opacity early for immediate visibility
  // Pointer coarse/mobile detection to slow and cap grid closing on touch
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const onChange = () => setIsCoarsePointer(mq.matches);
    // initialize
    setIsCoarsePointer(mq.matches);
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    } else {
      mq.addListener(onChange);
      return () => {
        mq.removeListener(onChange);
      };
    }
  }, []);

  // Opacity ramps quickly then holds
  const opacity = useTransform(scrollYProgress, [0, 0.1, 1], [0.35, 1, 1]);

  // Linear translate across the whole page for consistent speed
  const leftX = useTransform(scrollYProgress, [0, 1], isCoarsePointer ? ["-85%", "-30%"] : ["-65%", "5%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], isCoarsePointer ? ["85%", "30%"] : ["65%", "-5%"]);
  // Grid square scale grows with scroll (reduced on mobile to avoid intersection)
  const scale = useTransform(scrollYProgress, [0, 1], isCoarsePointer ? [0.95, 1.2] : [0.95, 1.5]);

  // Combine perspective + rotate + translate
  const leftRotate = isCoarsePointer ? 30 : 35;
  const rightRotate = isCoarsePointer ? -30 : -35;
  const leftTransform = useMotionTemplate`perspective(1200px) rotateY(${leftRotate}deg) translateX(${leftX}) scale(${scale})`;
  const rightTransform = useMotionTemplate`perspective(1200px) rotateY(${rightRotate}deg) translateX(${rightX}) scale(${scale})`;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-x-clip text-black/60 dark:text-white/95"
      aria-hidden
    >
      {/* Left grid plane */}
      <motion.div
        className="absolute top-0 left-0 h-screen"
        style={{ transform: leftTransform, opacity, transformOrigin: "left center" }}
      >
        <SVGGridPanel side="left" />
      </motion.div>

      {/* Right grid plane */}
      <motion.div
        className="absolute top-0 right-0 h-screen"
        style={{ transform: rightTransform, opacity, transformOrigin: "right center" }}
      >
        <SVGGridPanel side="right" />
      </motion.div>
    </div>
  );
}
