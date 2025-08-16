'use client';
import VerticalCutReveal from "@/fancy/components/text/vertical-cut-reveal";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";

export default function Intro() {
  const copy =
    "With more than 20+ years programming, and a decade+ of experience, I have become a leader in building teams and award winning digital experiences, through web development, IoT and apps. That's not a brag, it's a promise: to deliver tomorrow's technology solutions — today.";
  
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
