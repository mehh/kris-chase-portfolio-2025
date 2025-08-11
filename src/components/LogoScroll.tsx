"use client";

import React, { useEffect, useRef } from "react";

export default function LogoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a simple static placeholder
    // The original used a JSON animation file that we'd need to recreate
    if (containerRef.current) {
      containerRef.current.innerHTML = `
        <div class="logo-scroll-placeholder">
          <div class="w-32 h-32 bg-primary/10 rounded-lg flex items-center justify-center">
            <span class="text-primary font-heading text-sm">LOGOS</span>
          </div>
        </div>
      `;
    }
  }, []);

  return (
    <div ref={containerRef}>
      {/* Lottie animation will be inserted here */}
    </div>
  );
}
