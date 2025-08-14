'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedHexBackground from './AnimatedHexBackground';
import VerticalCutReveal from '../fancy/components/text/vertical-cut-reveal';

const PERSONAS = [
  {
    id: 'founders',
    label: 'For CEOs & founders',
    h1: 'I take startups from prototype to dependable product—and the team that ships it.',
    sub: 'Zero-to-one to scale without burning down the roadmap.',
    primary: { label: 'Book a 20-min intro', href: '#contact' },
  },
  {
    id: 'cto',
    label: 'For CTOs & VPs of Eng',
    h1: 'I unblock delivery and modernize platforms so your dates stop slipping.',
    sub: 'Org design, CI/CD, observability, and architecture that cut cycle time.',
    primary: { label: 'Start a technical audit', href: '#contact' },
  },
  {
    id: 'product',
    label: 'For product leaders',
    h1: 'I align product, platform, and people so the roadmap ships.',
    sub: 'Roadmaps tied to KPIs; AI-enabled workflows to move faster with less.',
    primary: { label: 'See case studies', href: '#work' },
  },
  {
    id: 'investor',
    label: 'For investors & portcos',
    h1: 'I run technical diligence and 90-day turnarounds that stick.',
    sub: 'Clear readouts, stabilization plans, and hands-on leadership parachute.',
    primary: { label: 'Request availability', href: '#contact' },
  },
];

const PROOF = ['60+ engineers led','100+ launches','30% delivery cost ↓','65% dev efficiency ↑'];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const HOVER_DELAY = 120;

  // auto-cycle until user interacts
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % PERSONAS.length), 7000);
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

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated hex pattern background */}
      {/* <AnimatedHexBackground /> */}

      <div className="relative z-20 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-center text-foreground w-full">

          {/* persona pills */}
          <div className="mb-4 sm:mb-5 flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {PERSONAS.map((x, i) => (
              <button
                key={x.id}
                onMouseEnter={() => schedule(i)}
                onMouseLeave={cancel}
                onFocus={() => schedule(i)}     // keyboard
                onBlur={cancel}
                onClick={() => { setIdx(i); setPaused(true); }}
                data-selected={i === idx}
                className={`rounded-full border px-2.5 sm:px-3 py-1 text-xs sm:text-sm backdrop-blur-sm min-h-[44px] flex items-center justify-center
                  ${i === idx ? 'border-[#96442e]/80 text-[#96442e]' : 'border-foreground/20 text-foreground/80 hover:text-[#b8553a]'}`}
              >
                <span className="text-center leading-tight">{x.label}</span>
              </button>
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-3 sm:mb-4 text-2xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold leading-[1.1] sm:leading-[1.06] tracking-tight text-balance px-2 sm:px-0"
            >
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.08}
                staggerFrom="first"
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                  delay: 0.1
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
              className="mb-6 sm:mb-7 text-base sm:text-lg md:text-xl text-foreground/85 px-2 sm:px-0 max-w-3xl mx-auto"
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

          {/* proof strip */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-foreground/70 px-2 sm:px-0">
            {PROOF.map((m) => <span key={m} className="whitespace-nowrap">{m}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}