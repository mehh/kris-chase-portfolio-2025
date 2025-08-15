"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Always show on first paint of a full page load (refresh or direct entry)
    setVisible(true);

    // Safety timeout to mark as done
    const t = setTimeout(() => {
      try {
        document.documentElement.classList.add("splash-done");
      } catch {}
      setVisible(false);
    }, 1150);

    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="kc-splash fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white select-none">
      {/* Single sequence (small): start with spaced KC, morph into KRIS CHASE */}
      <div className="kc-line kc-fast" aria-label="Kris Chase">
        {/* Left group: K then 'ris ' */}
        <div className="kc-left relative">
          <span className="kc-k2 block">K</span>
          <span className="kc-ris block">ris&nbsp;</span>
        </div>
        {/* Right group: flipped C + 'hase' sliding out from behind C */}
        <div className="kc-right relative">
          <span className="kc-c2 block">C</span>
          <span className="kc-hase block">hase</span>
        </div>
      </div>
    </div>
  );
}
