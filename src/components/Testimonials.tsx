"use client";

import { motion, useAnimationControls } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { testimonials } from "../data/testimonials";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";

const CARD_CLS = "shrink-0 w-[280px] sm:w-[320px] md:w-[360px] rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/60 backdrop-blur-sm p-4 sm:p-5 hover:border-[#96442e]/30 transition-colors";

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <div className={CARD_CLS}>
      <svg className="w-5 h-5 text-[#96442e] mb-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-6">{t.text}</p>
      <div className="mt-4">
        <p className="text-sm font-semibold text-black dark:text-white">{t.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
      </div>
    </div>
  );
}

const Testimonials = () => {
  // Register homepage testimonials preview for Machine View
  useMachineSlice({
    type: "testimonial",
    title: "Homepage Testimonials",
    path: "/",
    order: 60,
    content: [
      "### Summary",
      "What colleagues say — horizontal marquee preview.",
      "",
      "### People (preview)",
      ...testimonials.map((t) => `- ${t.name} — ${t.role}`),
      "",
      "### Quotes (preview)",
      ...testimonials.map((t) => `- \"${t.text}\" — ${t.name}, ${t.role}`),
      "",
      "### CTA",
      "[View All Testimonials](/testimonials)",
    ].join("\n"),
  }, []);

  // Duplicate items to create seamless loop
  const items = useMemo(() => [...testimonials, ...testimonials], []);
  const controls = useAnimationControls();
  const [paused, setPaused] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (paused) {
      controls.stop();
      return;
    }
    // start once, then restart when unpausing
    controls.start({ x: ["0%", "-50%"] }, { duration: 30, repeat: Infinity, ease: "linear" });
    startedRef.current = true;
  }, [controls, paused]);

  return (
    <section className="my-20 relative">
      <div className="container z-10 mx-auto px-4">
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto">
          <div className="flex justify-center">
            <div className="border border-[#96442e]/30 py-1 px-4 rounded-lg bg-[#96442e]/10">
              <span className="text-[#96442e] text-sm font-medium">Testimonials</span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-black dark:text-white">
            What colleagues say
          </h2>
          <p className="text-center mt-5 opacity-75 text-gray-600 dark:text-gray-300">
            See what my colleagues and team members have to say about working with me.
          </p>
        </div>

        {/* Horizontal marquee */}
        <div
          className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            animate={controls}
            className="flex gap-4 sm:gap-6 md:gap-8 w-[200%]"
            style={{ willChange: "transform" }}
          >
            {items.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <a
            href="/testimonials"
            className="inline-flex items-center justify-center bg-[#96442e] hover:bg-[#b8553a] text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 shadow-lg text-base"
          >
            View All Testimonials
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
