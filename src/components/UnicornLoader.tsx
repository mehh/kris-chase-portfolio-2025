"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

// Temporary replacement for our custom SplashScreen.
// Renders a full-screen UnicornStudio animation on initial load,
// then fades out and unmounts.
export default function UnicornLoader() {
  const [mounted, setMounted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Start a timed fade-out. If you know the exact animation length,
    // set this to match. Otherwise this provides a graceful exit.
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      try {
        // Signal CSS to reveal the app (see globals.css selectors)
        document.documentElement.classList.add("splash-done");
      } catch {}
    }, 2200);
    const unmountTimer = setTimeout(() => setMounted(false), 2600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={
        "fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-300 " +
        (fadeOut ? "opacity-0" : "opacity-100")
      }
      aria-hidden
    >
      {/* Zoom/crop to push any bottom watermark off-screen */}
      <div className="w-screen h-screen overflow-hidden">
        <div
          data-us-project="KwHveJ238NDmy0VpzlLm"
          style={{
            width: "120vw",
            height: "120vh",
            transform: "scale(1.2) translateY(-6vh)",
            transformOrigin: "center",
          }}
        />
      </div>
      <Script
        id="unicornstudio-init"
        src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js"
        strategy="afterInteractive"
        onLoad={() => {
          try {
            // @ts-expect-error global from script
            if (window.UnicornStudio) {
              // Always init on load to render into data-us-project container
              // @ts-expect-error init global
              window.UnicornStudio.init();
            }
          } catch {}
        }}
      />
      {/* Safety: if script already present, request a frame and init */}
      <Script id="unicornstudio-reinit" strategy="afterInteractive">
        {`
          try {
            if (window.UnicornStudio && typeof window.UnicornStudio.init === 'function') {
              requestAnimationFrame(() => window.UnicornStudio.init());
            }
          } catch {}
        `}
      </Script>
    </div>
  );
}
