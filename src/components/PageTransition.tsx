"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * PageTransition
 * Shows the KC -> KRIS CHASE overlay on route changes.
 * Uses the same styles as SplashScreen (globals.css) so visuals stay consistent.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
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
      // Mark route transitioning on <html> for potential global styling
      try { document.documentElement.classList.add("route-transitioning"); } catch {}
      // Match Splash small timing + 250ms post-anim delay
      const t = setTimeout(() => {
        setVisible(false);
        try { document.documentElement.classList.remove("route-transitioning"); } catch {}
      }, 1150);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="kc-splash fixed inset-0 z-[9998] flex items-center justify-center bg-black text-white select-none">
      {/* Single sequence (small): KC morphs into KRIS CHASE */}
      <div className="kc-line kc-fast" aria-label="Kris Chase">
        <div className="kc-left relative">
          <span className="kc-k2 block">K</span>
          <span className="kc-ris block">ris&nbsp;</span>
        </div>
        <div className="kc-right relative">
          <span className="kc-c2 block">C</span>
          <span className="kc-hase block">hase</span>
        </div>
      </div>
    </div>
  );
}
