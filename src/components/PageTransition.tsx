"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import TextReveal from "./TextReveal";

/**
 * PageTransition
 * Shows the KC -> KRIS CHASE overlay on route changes.
 * Uses the same styles as SplashScreen (globals.css) so visuals stay consistent.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Skip the first run if it's the initial load and SplashScreen will handle it.
    if (lastPath.current === null) {
      // First mount
      lastPath.current = pathname;
      // If no splash has been shown this session, don't show transition now.
      return;
    }

    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      // Show transition between routes
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 900); // keep a bit shorter than first splash
      return () => clearTimeout(t);
    }
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="kc-splash fixed inset-0 z-[9998] flex items-center justify-center bg-black text-white select-none">
      {/* Stage 1: KC reveal (quicker) */}
      <div className="kc-stage-initials kc-stage-initials--fast absolute flex items-center gap-[0.2em]" aria-hidden>
        <TextReveal text="K" className="kc-tr kc-tr-k" />
        <TextReveal text="C" className="kc-tr kc-tr-c" flipHorizontal spin />
      </div>

      {/* Stage 2: Full name reveal (quicker) */}
      <div className="kc-stage-name kc-stage-name--fast relative flex items-center gap-[0.25em]">
        <div className="kc-left relative flex items-center">
          <span className="kc-k2 block">K</span>
          <span className="kc-ris block">ris&nbsp;</span>
        </div>
        <div className="kc-right relative inline-flex items-center">
          <span className="kc-c2 block">C</span>
          <span className="kc-hase block">hase</span>
        </div>
      </div>
    </div>
  );
}
