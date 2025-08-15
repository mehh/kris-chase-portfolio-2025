"use client";

import { useEffect, useState } from "react";
import KCOverlay from "@/components/KCOverlay";

export default function InitialKCSplash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Mark splash done early so app is visible under the overlay
    try { document.documentElement.classList.add("splash-done"); } catch {}

    const visibleMs = 1100;
    const fadeMs = 300;

    const t = setTimeout(() => setShow(false), visibleMs + fadeMs + 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <KCOverlay
      show={show}
      visibleMs={1100}
      fadeMs={300}
      backdrop="#000"
    />
  );
}
