"use client";

import React, { useEffect, useRef } from 'react';
import { useMachineSlice } from "@/components/machine/MachineViewProvider";
import { usePathname } from "next/navigation";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Dynamic CTA per page
  const isTithelyPlan = pathname?.startsWith('/tithely-90-day-plan');
  const ctaTitle = isTithelyPlan ? "Tithely, let's talk next steps" : "Let's Build Something";
  const ctaHref = isTithelyPlan ? "/connect/60" : "/partners";
  const ctaSub = isTithelyPlan
    ? "Schedule some time to chat below:"
    : "Ready to bring your vision to life?";

  // Register footer content for Machine View
  useMachineSlice({
    type: "footer",
    title: "Footer",
    path: "global",
    order: 900,
    content: [
      "### CTA",
      "Let's Build Something",
      "Ready to bring your vision to life?",
      "",
      "### Primary Action",
      "[Get In Touch](/contact)",
      "",
      "### Links",
      "- [GitHub](https://github.com/mehh)",
      "- [LinkedIn](https://www.linkedin.com/in/krisrchase/)",
      "- [Email](mailto:kris@krischase.com)",
      "- [Partners](/partners)",
      "",
      `© ${new Date().getFullYear()} Kris Chase. All rights reserved.`,
    ].join("\n"),
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            footer.classList.add('footer-revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    observer.observe(footer);

    return () => {
      observer.unobserve(footer);
    };
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative w-full h-80 sm:h-96 footer-container overflow-hidden"
    >

      {/* Footer Content - Centered over the grid */}
      <div className="relative inset-0 z-20 flex items-center justify-center pointer-events-none px-4 sm:px-6">
        <div className="text-center pointer-events-auto max-w-lg">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
            {ctaTitle}
          </h2>
          <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 drop-shadow-md">
            {ctaSub}
          </p>
          <a 
            href={ctaHref}
            className="inline-flex items-center justify-center bg-white text-black hover:bg-black hover:text-white border border-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors duration-300 shadow-lg text-sm sm:text-base min-h-[48px]"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Footer Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="w-full bg-black/80 backdrop-blur-sm border-t border-[#96442e]/30">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Kris Chase. All rights reserved.
              </p>
              <nav className="flex gap-6">
              <a 
                  href="/faq" 
                  className="text-gray-400 hover:text-[#96442e] transition-colors duration-300"
                >
                  FAQ
                </a>                
                <a 
                  href="/partners" 
                  className="text-gray-400 hover:text-[#96442e] transition-colors duration-300"
                >
                  Become a Partner
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
