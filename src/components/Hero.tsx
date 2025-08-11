'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// … import your TattooPatterns / VerticalCutReveal

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
      {/* background … */}

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl text-center text-white">

          {/* persona pills */}
          <div className="mb-5 flex flex-wrap justify-center gap-2">
            {PERSONAS.map((x, i) => (
              <button
                key={x.id}
                onMouseEnter={() => schedule(i)}
                onMouseLeave={cancel}
                onFocus={() => schedule(i)}     // keyboard
                onBlur={cancel}
                onClick={() => { setIdx(i); setPaused(true); }}
                aria-selected={i === idx}
                className={`rounded-full border px-3 py-1 text-xs backdrop-blur-sm
                  ${i === idx ? 'border-amber-400/80 text-amber-300' : 'border-white/20 text-white/80 hover:text-amber-200'}`}
              >
                {x.label}
              </button>
            ))}
          </div>

          {/* availability pill */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm">
              ✨ Available for new opportunities
            </span>
          </div>

          {/* H1 switches with persona */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={p.id + '-h1'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="mb-4 text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-bold leading-[1.06] tracking-tight text-balance"
            >
              {p.h1}
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
              className="mb-7 text-lg sm:text-xl text-white/85"
            >
              {p.sub}
            </motion.p>
          </AnimatePresence>

          {/* CTAs */}
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={p.primary.href}
               className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-black bg-gradient-to-r from-amber-400 to-yellow-500 shadow-[0_0_20px_rgba(212,175,55,.25)]">
              {p.primary.label}
            </a>
            <a href="#work" className="inline-flex items-center px-6 py-3 rounded-lg border border-amber-400/50 text-amber-200 hover:bg-amber-400/10">
              See case studies
            </a>
          </div>

          {/* proof strip */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
            {PROOF.map((m) => <span key={m} className="whitespace-nowrap">{m}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}