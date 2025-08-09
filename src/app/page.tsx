import Hero from "../components/Hero";
import Intro from "../components/Intro";
import Ticker from "../components/Ticker";
import Experience from "../components/Experience";
import ThreeUp from "../components/ThreeUp";
import Brands from "../components/Brands";
import LogoScroll from "../components/LogoScroll";
import Cursor from "../components/Cursor";
import SimpleHoverEffect from "../components/SimpleHoverEffect";
import Saver from "../components/Saver";

export default function Home() {
  return (
    <>
      {/* Global Components */}
      <Cursor />
      <SimpleHoverEffect />
      <Saver />
      
      {/* Page Content */}
      <div className="min-h-screen">
        <Hero />
        <Intro />
        <Ticker />
        <ThreeUp />
        <Experience />
        <Brands />
        <LogoScroll />
      </div>
    </>
  );
}
