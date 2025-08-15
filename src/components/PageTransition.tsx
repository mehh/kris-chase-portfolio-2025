"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import KCOverlay from "@/components/KCOverlay";

/** Lightweight route-change overlay using branded <KRIS CHASE /> text */
export default function PageTransition() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    if (lastPath.current === null) {
      lastPath.current = pathname;
      return;
    }
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      setShow(true);
      try { document.documentElement.classList.add("route-transitioning"); } catch {}
      const t = setTimeout(() => {
        setShow(false);
        try { document.documentElement.classList.remove("route-transitioning"); } catch {}
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  return (
    <KCOverlay show={show} visibleMs={1100} fadeMs={300} backdrop="#000" />
  );
}
