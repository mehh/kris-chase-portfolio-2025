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
      className="relative w-full h-96 footer-container overflow-hidden"
    >
      {/* Cubes Background */}
      <div className="absolute inset-0 z-0">
        <Cubes
          gridSize={12}
          cubeSize={undefined}
          maxAngle={45}
          radius={3}
          borderStyle="1px dotted white"
          faceColor="#0a0a0a"
          autoAnimate={false}
          rippleOnClick={true}
          rippleColor="#96442e"
          cellGap={20}
        />
      </div>

      {/* Footer Content - Centered over the grid */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="text-center pointer-events-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Let&apos;s Build Something
          </h2>
          <p className="text-xl text-gray-300 mb-8 drop-shadow-md">
            Ready to bring your vision to life?
          </p>
          <a 
            href="mailto:kris@krischase.com"
            className="inline-block bg-[#96442e] hover:bg-[#b8553a] text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 shadow-lg"
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
