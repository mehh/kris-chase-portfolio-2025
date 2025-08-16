'use client';
import VerticalCutReveal from "@/fancy/components/text/vertical-cut-reveal";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";

export default function Intro() {
  const copy =
    "With 20+ years programming, and 10+ years leading teams, I build products that last—from smart, app‑enabled BBQs and connected beauty devices to ecommerce engines doing 100+ million per year, SaaS platforms serving thousands of concurrent users, and conversion funnels that perform. I’ve scaled teams from 0→30, led 65+ engineers, and architected systems that stay fast and resilient at scale. That's not a brag, it's a promise: to deliver tomorrow's technology solutions — today.";
  
  // Register Intro copy for Machine View
  useMachineSlice({
    type: "section",
    title: "Intro",
    path: "/",
    order: 25,
    content: copy,
  }, []);
  return (
    <section className="intro py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:pl-8 md:pl-12">
        <div className="max-w-4xl mx-auto">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.04}
            className="text-base sm:text-lg md:text-xl lg:text-4xl leading-relaxed text-foreground/90"
            inViewOnScroll
            viewportOnce={false}
            viewportAmount={0}
            viewportMargin="0px 0px 0px 0px"
          >
            {copy}
          </VerticalCutReveal>
        </div>
      </div>
    </section>
  );
}
