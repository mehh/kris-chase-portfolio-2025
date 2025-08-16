import Hero from "../components/Hero";
import Intro from "../components/Intro";
import Ticker from "../components/Ticker";
import WorkHistory from "../components/WorkHistory";
import BoardExperience from "../components/BoardExperience";
import ThreeUp from "../components/ThreeUp";
import Brands from "../components/Brands";
import Testimonials from "../components/Testimonials";
import SimpleHoverEffect from "../components/SimpleHoverEffect";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import { SectionTransition } from "../components/SmoothScrollProvider";

export default function Home() {
  return (
    <>
      {/* Global Components */}
      <SimpleHoverEffect />
      
      {/* Page Content */}
      <div className="min-h-[100dvh] relative z-10 pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-16">
        <SectionTransition id="hero">
          <section id="hero">
            <Hero />
          </section>
        </SectionTransition>
        
        <SectionTransition id="about">
          <section id="about">
            <Intro />
            <Ticker />
            <ThreeUp />
          </section>
        </SectionTransition>
        
        {/* Experience: Work + Board side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Work Experience */}
          <SectionTransition id="work">
            <div className="relative rounded-2xl p-2">
              <GlowingEffect
                spread={40}
                glow
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <div className="relative rounded-2xl">
                <WorkHistory />
              </div>
            </div>
          </SectionTransition>

          {/* Board & Advisory Experience */}
          <SectionTransition id="board">
            <div className="relative rounded-2xl p-2">
              <GlowingEffect
                spread={40}
                glow
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <div className="relative rounded-2xl">
                <BoardExperience />
              </div>
            </div>
          </SectionTransition>
        </div>
        
        <SectionTransition id="across-the-web">
          <section id="across-the-web">
            <Brands />
          </section>
        </SectionTransition>
        
        <SectionTransition id="testimonials">
          <section id="testimonials">
            <Testimonials />
          </section>
        </SectionTransition>
      </div>
    </>
  );
}
