import Hero from "../components/Hero";
import Intro from "../components/Intro";
import Ticker from "../components/Ticker";
import WorkHistory from "../components/WorkHistory";
import BoardExperience from "../components/BoardExperience";
import ThreeUp from "../components/ThreeUp";
import Brands from "../components/Brands";
import LogoScroll from "../components/LogoScroll";
import Cursor from "../components/Cursor";
import SimpleHoverEffect from "../components/SimpleHoverEffect";
import Saver from "../components/Saver";
import { SectionTransition } from "../components/SmoothScrollProvider";

export default function Home() {
  return (
    <>
      {/* Global Components */}
      <Cursor />
      <SimpleHoverEffect />
      <Saver />
      
      {/* Page Content */}
      <div className="min-h-screen">
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
        
        <SectionTransition id="work">
          <section id="work">
            <WorkHistory />
          </section>
        </SectionTransition>
        
        <SectionTransition id="board">
          <section id="board">
            <BoardExperience />
          </section>
        </SectionTransition>
        
        <SectionTransition id="across-the-web">
          <section id="across-the-web">
            <Brands />
            <LogoScroll />
          </section>
        </SectionTransition>
      </div>
    </>
  );
}
