"use client";

import { useEffect, useState } from "react";
import TextReveal from "./TextReveal";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // If already shown this session, do not render
    if (typeof window !== "undefined" && sessionStorage.getItem("splashShown")) {
      document.documentElement.classList.add("splash-done");
      setVisible(false);
      return;
    }

    setVisible(true);

    // Safety timeout to mark as done
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem("splashShown", "1");
        document.documentElement.classList.add("splash-done");
      } catch {}
      setVisible(false);
    }, 1800);

    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="kc-splash fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white select-none">
      {/* Stage 1: KC reveal */}
      <div className="kc-stage-initials absolute flex items-center gap-[0.2em]" aria-hidden>
        <TextReveal text="K" className="kc-tr kc-tr-k" />
        <TextReveal text="C" className="kc-tr kc-tr-c" flipHorizontal spin />
      </div>

      {/* Stage 2: Full name reveal */}
      <div className="kc-stage-name relative flex items-center gap-[0.25em]">
        {/* Left side: K slides left, 'ris ' fades in */}
        <div className="kc-left relative flex items-center">
          <span className="kc-k2 block">K</span>
          <span className="kc-ris block">ris&nbsp;</span>
        </div>
        {/* Right side: flipped C with 'hase' sliding out from behind */}
        <div className="kc-right relative inline-flex items-center">
          <span className="kc-c2 block">C</span>
          <span className="kc-hase block">hase</span>
        </div>
      </div>
    </div>
  );
}
