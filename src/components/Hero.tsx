'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import VerticalCutReveal from '../fancy/components/text/vertical-cut-reveal';
import { useMachineSlice } from "@/components/machine/MachineViewProvider";
import CountUp from "./CountUp";
import GradientText from "./GradientText";

const PERSONAS = [
  {
    id: 'founders',
    label: 'For CEOs & founders',
    h1: 'I take startups from prototype to dependable product—and the team that ships it.',
    sub: 'Zero-to-one to scale without burning down the roadmap.',
    primary: { label: 'Book a 20-min intro', href: '/contact' },
  },
  {
    id: 'cto',
    label: 'For CTOs & VPs of Eng',
    h1: 'I unblock delivery and modernize platforms so your dates stop slipping.',
    sub: 'Org design, CI/CD, observability, and architecture that cut cycle time.',
    primary: { label: 'Start a technical audit', href: '/contact' },
  },
  {
    id: 'product',
    label: 'For product leaders',
    h1: 'I align product, platform, and people so the roadmap ships.',
    sub: 'Roadmaps tied to KPIs; AI-enabled workflows to move faster with less.',
    primary: { label: 'Reach Out', href: '/contact' },
  },
  {
    id: 'investor',
    label: 'For investors & Boards',
    h1: 'I run technical diligence and 90-day turnarounds that stick.',
    sub: 'Clear readouts, stabilization plans, and hands-on leadership parachute.',
    primary: { label: 'Request availability', href: '/contact' },
  },
];

// Map persona id -> label for documentation/registry
const PERSONA_LABEL: Record<string, string> = Object.fromEntries(PERSONAS.map((x) => [x.id, x.label]));

type Proof = {
  id: string;
  label: string;
  to: number;
  suffix?: string;
  prefix?: string;
  separator?: string;
  duration?: number;
  note?: string;
};

// Type to pass CSS custom properties without 'any'
type CSSVars = React.CSSProperties & { ['--cycle']?: string };

// Fallback proof used if persona id missing
const DEFAULT_PROOF: Proof[] = [
  { id: 'eng', label: 'engineers led', to: 150, suffix: '+', prefix: '', separator: ',', duration: 1.2 },
  { id: 'launches', label: 'launches', to: 100, suffix: '+', prefix: '', separator: ',', duration: 1.2 },
  { id: 'cost', label: 'delivery cost', to: 30, suffix: '%', prefix: '', separator: ',', duration: 1.2, note: '↓' },
  { id: 'efficiency', label: 'dev efficiency', to: 65, suffix: '%', prefix: '', separator: ',', duration: 1.2, note: '↑' },
];

// Persona-specific proof points
const PROOF_BY_PERSONA: Record<string, Proof[]> = {
  founders: [
    { id: 'launches', label: 'product launches', to: 100, suffix: '+', separator: ',', duration: 1.2 },
    { id: 'ttm', label: 'time to market', to: 45, suffix: '%', duration: 1.2, note: '↓' },
    { id: 'concurrency', label: 'concurrent users', to: 75, suffix: 'k+', separator: ',', duration: 1.2 },
    { id: 'uptime', label: 'uptime', to: 99.9, suffix: '%', duration: 1.2 },
  ],
  cto: [
    { id: 'cycle', label: 'cycle time', to: 40, suffix: '%', duration: 1.2, note: '↓' },
    { id: 'deploys', label: 'deploys/week', to: 50, suffix: '+', duration: 1.2 },
    { id: 'mttr', label: 'MTTR', to: 60, suffix: '%', duration: 1.2, note: '↓' },
    { id: 'defects', label: 'defect escape', to: 35, suffix: '%', duration: 1.2, note: '↓' },
  ],
  product: [
    { id: 'hitrate', label: 'roadmap hit rate', to: 90, suffix: '%', duration: 1.2 },
    { id: 'ttv', label: 'time to value', to: 45, suffix: '%', duration: 1.2, note: '↓' },
    { id: 'expwins', label: 'experiment win rate', to: 28, suffix: '%', duration: 1.2 },
    { id: 'nps', label: 'NPS lift', to: 18, suffix: '+', duration: 1.2 },
  ],
  investor: [
    { id: 'turnarounds', label: '90-day turnarounds', to: 6, suffix: '+', duration: 1.2 },
    { id: 'diligence', label: 'diligence audits', to: 20, suffix: '+', duration: 1.2 },
    { id: 'arr', label: 'ARR growth', to: 28, suffix: '%', duration: 1.2 },
    { id: 'burn', label: 'burn reduction', to: 20, suffix: '%', duration: 1.2, note: '↓' },
  ],
};

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const HOVER_DELAY = 120;
  const CYCLE_MS = 7000; // keep in sync with pill loader animation

  // auto-cycle until user interacts
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % PERSONAS.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const schedule = (i: number) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setIdx(i);
      setPaused(true);          // stop auto-cycle once user interacts
    }, HOVER_DELAY);
  };
  const cancel = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  const p = PERSONAS[idx];
  const proofs = PROOF_BY_PERSONA[p.id] ?? DEFAULT_PROOF;

  // Measure tallest H1 across personas to prevent layout jump
  const [maxH1Height, setMaxH1Height] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      if (!measureRef.current) return;
      const nodes = Array.from(measureRef.current.querySelectorAll('[data-measure-h1]')) as HTMLElement[];
      const max = nodes.reduce((acc, el) => Math.max(acc, Math.ceil(el.getBoundingClientRect().height)), 0);
      if (max && (!maxH1Height || max !== maxH1Height)) setMaxH1Height(max);
    };

    // Initial measure after mount and whenever fonts/layout settle
    const id = window.requestAnimationFrame(measure);

    // Recalculate on container resize
    let ro: ResizeObserver | null = null;
    if (containerRef.current && 'ResizeObserver' in window) {
      ro = new ResizeObserver(() => measure());
      ro.observe(containerRef.current);
    } else {
      // Fallback to window resize
      window.addEventListener('resize', measure);
    }

    window.addEventListener('load', measure);

    return () => {
      window.cancelAnimationFrame(id);
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, [maxH1Height]);

  // Register Hero content for Machine View
  const proofContent = Object.entries(PROOF_BY_PERSONA)
    .flatMap(([id, arr]) => [
      `- ${PERSONA_LABEL[id] ?? id}:`,
      ...arr.map((m) => `  - ${m.to}${m.suffix ?? ''} ${m.label}${m.note ? ' ' + m.note : ''}`),
    ])
    .join("\n");

  useMachineSlice({
    type: "hero",
    title: "Homepage Hero",
    path: "/",
    order: 20,
    content: [
      "### Personas",
      ...PERSONAS.map((x) => `- ${x.label}`),
      "",
      "### Headlines",
      ...PERSONAS.map((x) => `- ${x.label}: ${x.h1}`),
      "",
      "### Subheads",
      ...PERSONAS.map((x) => `- ${x.label}: ${x.sub}`),
      "",
      "### Primary CTAs",
      ...PERSONAS.map((x) => `- ${x.label}: [${x.primary.label}](${x.primary.href})`),
      "",
      "### Proof Points by Persona",
      proofContent,
    ].join("\n"),
  }, []);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* Animated hex pattern background */}
      {/* <AnimatedHexBackground /> */}

      <div className="relative z-20 min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div ref={containerRef} className="max-w-4xl text-center text-foreground w-full relative">

          {/* hidden measurement block for H1 heights (absolute so it doesn't affect layout) */}
          <div ref={measureRef} aria-hidden="true" className="absolute left-0 right-0 opacity-0 pointer-events-none -z-10">
            {PERSONAS.map((x) => (
              <h1
                key={x.id}
                data-measure-h1
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold leading-[1.1] sm:leading-[1.06] tracking-tight px-2 sm:px-0"
              >
                {x.h1}
              </h1>
            ))}
          </div>
          {/* Scoped styles for persona-pill progress (blend overlay, no reflow) */}
          <style jsx global>{`
            .persona-pill { position: relative; overflow: hidden; isolation: isolate; }
            /* Single white overlay that blends and inverts text color; does not affect layout */
            .persona-pill::after {
              content: '';
              position: absolute;
              inset: 0;
              background: #fff;
              border-radius: inherit;
              transform: scaleX(0);
              transform-origin: left center;
              transition: transform var(--cycle, 7s) linear;
              will-change: transform;
              mix-blend-mode: difference;
              z-index: 20; /* above text for blending */
              pointer-events: none;
              backface-visibility: hidden;
            }
            @keyframes pill-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
            /* When selected, animate fill to full */
            .persona-pill[data-selected="true"]::after {
              transform: scaleX(1);
              animation: pill-progress var(--cycle, 7s) linear both;
            }
            /* Non-selected pills collapse quickly */
            .persona-pill:not([data-selected="true"])::after {
              transition-duration: 0.2s;
              transition-timing-function: ease-out;
            }
            /* Respect reduced motion */
            @media (prefers-reduced-motion: reduce) {
              .persona-pill::after {
                transition: none;
                transform: none;
              }
            }
          `}</style>

          {/* persona pills */}
          <div className="mb-4 sm:mb-5 flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {PERSONAS.map((x, i) => (
              <motion.button
                key={x.id}
                onMouseEnter={() => schedule(i)}
                onMouseLeave={cancel}
                onFocus={() => schedule(i)}     // keyboard
                onBlur={cancel}
                onClick={() => { setIdx(i); setPaused(true); }}
                data-selected={i === idx ? 'true' : undefined}
                data-label={x.label}
                style={{ '--cycle': `${CYCLE_MS}ms` } as CSSVars}
                className={`persona-pill relative overflow-hidden rounded-full border px-2.5 sm:px-3 py-1 text-xs sm:text-sm min-h-[44px] flex items-center justify-center bg-black text-white border-white/20`}
              >
                {/* Base label (white). Progress overlay inverts colors via blend mode. */}
                <span className="relative z-10 text-center leading-tight whitespace-nowrap">{x.label}</span>
              </motion.button>
            ))}
          </div>

          {/* availability pill */}
          <div className="mb-6 sm:mb-8">
            <span className="inline-flex items-center px-3 sm:px-4 py-1.5 rounded-full bg-foreground/10 border border-foreground/20 text-xs sm:text-sm text-foreground">
              ✨ Available for new opportunities
            </span>
          </div>

          {/* H1 switches with persona */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={p.id + '-h1'}
              className="mb-3 sm:mb-4 text-2xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold leading-[1.1] sm:leading-[1.06] tracking-tight text-balance px-2 sm:px-0"
              style={{ minHeight: maxH1Height ?? undefined }}
            >
              <VerticalCutReveal
                key={p.id}
                splitBy="words"
                staggerDuration={0.06}
                staggerFrom="first"
                inViewOnScroll={false}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                  delay: 0
                }}
              >
                {p.h1}
              </VerticalCutReveal>
            </motion.h1>
          </AnimatePresence>

          {/* subhead */}
          <AnimatePresence mode="wait">
            <motion.p
              key={p.id + '-sub'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="mb-6 sm:mb-7 text-base sm:text-lg md:text-xl text-foreground/85 px-2 sm:px-0 max-w-3xl mx-auto min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[3.5rem]"
            >
              {p.sub}
            </motion.p>
          </AnimatePresence>

          {/* CTAs */}
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-center gap-3 px-4 sm:px-0">
            <a href={p.primary.href}
               className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#96442e] to-[#b8553a] shadow-[0_0_20px_rgba(150,68,46,.25)] min-h-[48px] text-sm sm:text-base">
              {p.primary.label}
            </a>
            {/* <a href="#work" className="inline-flex items-center px-6 py-3 rounded-lg border border-amber-400/50 text-amber-200 hover:bg-amber-400/10">
              See case studies
            </a> */}
          </div>

          {/* proof strip: 2x2 grid on mobile, flex row on larger screens */
          }
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-10 px-2 sm:px-0 max-w-3xl mx-auto">
            {proofs.map((m) => (
              <div key={m.id} className="flex flex-col items-center text-center">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={3}
                  showBorder={false}
                  className="custom-class"
                >
                  <span className="block leading-none text-2xl sm:text-5xl lg:text-6xl font-extrabold">
                    <CountUp from={0} to={m.to} duration={m.duration} separator={m.separator} className="align-baseline" />
                    {m.suffix}
                  </span>
                </GradientText>
                <span className="mt-1 sm:mt-2 text-xs sm:text-base md:text-lg text-foreground/80">
                  {m.label} {m.note ? <span className="opacity-70">{m.note}</span> : null}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}