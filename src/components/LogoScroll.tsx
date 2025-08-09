"use client";

import React, { useEffect, useRef } from "react";

export default function LogoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import Lottie to avoid SSR issues
    const loadLottie = async () => {
      try {
        const Lottie = (await import("lottie-react")).default;
        
        // For now, we'll create a simple animated placeholder
        // The original used a JSON animation file that we'd need to recreate
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div class="logo-scroll-placeholder">
              <div class="animate-spin w-32 h-32 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          `;
        }
      } catch (error) {
        console.warn('Lottie not available, using CSS animation fallback:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div class="logo-scroll-fallback">
              <div class="animate-pulse w-32 h-32 bg-primary/20 rounded-lg flex items-center justify-center">
                <span class="text-primary font-heading">LOGO</span>
              </div>
            </div>
          `;
        }
      }
    };

    loadLottie();
  }, []);

  return (
    <div className="logo-scroll-container flex justify-center items-center py-8">
      <div ref={containerRef} className="w-48 h-48 flex items-center justify-center">
        {/* Lottie animation will be inserted here */}
      </div>
    </div>
  );
}
