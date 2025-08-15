"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

// Temporary replacement for our custom SplashScreen.
// Renders a full-screen UnicornStudio animation on initial load,
// then auto-hides after a short delay.
export default function UnicornLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2000); // adjust duration as needed
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      {/* Embed container */}
      <div
        data-us-project="KwHveJ238NDmy0VpzlLm"
        style={{ width: "100vw", height: "100vh" }}
      />
      {/* Loader script */}
      <Script
        id="unicornstudio-loader"
        src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js"
        strategy="afterInteractive"
        onLoad={() => {
          try {
            // @ts-expect-error - UnicornStudio is a global from the script
            if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
              // @ts-expect-error - global init
              window.UnicornStudio.init();
              // @ts-expect-error - mark initialized to avoid double init
              window.UnicornStudio.isInitialized = true;
            }
          } catch {}
        }}
      />
    </div>
  );
}
