"use client";

import React, { useEffect, useRef } from 'react';
import Cubes from '../animations/Cubes/Cubes';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

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
      className="relative w-full min-h-screen footer-container overflow-hidden"
    >
      {/* Cubes Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <Cubes
          gridSize={12}
          cubeSize={undefined}
          maxAngle={25}
          borderStyle="1px solid rgba(150, 68, 46, 0.3)"
          faceColor="#0a0a0a"
          autoAnimate={true}
          rippleOnClick={true}
          rippleColor="#96442e"
          cellGap={2}
        />
      </div>

      {/* Footer Content */}
      <div className="relative z-10 flex items-end justify-center min-h-screen">
        <div className="w-full bg-black/80 backdrop-blur-sm border-t border-[#96442e]/30">
          <div className="container mx-auto px-4 py-12">
            {/* Main Footer Content */}
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Let&apos;s Build Something
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Ready to bring your vision to life?
              </p>
              <a 
                href="mailto:kris@krischase.com"
                className="inline-block bg-[#96442e] hover:bg-[#b8553a] text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
              >
                Get In Touch
              </a>
            </div>

            {/* Footer Links & Copyright */}
            <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Kris Chase. All rights reserved.
              </p>
              <nav className="flex gap-6">
                <a 
                  href="https://github.com/krischase" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-gray-400 hover:text-[#96442e] transition-colors duration-300"
                >
                  GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/krischase/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-gray-400 hover:text-[#96442e] transition-colors duration-300"
                >
                  LinkedIn
                </a>
                <a 
                  href="mailto:kris@krischase.com" 
                  className="text-gray-400 hover:text-[#96442e] transition-colors duration-300"
                >
                  Email
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
