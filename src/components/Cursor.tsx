"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.screen.width >= 1024) {
        mouseX = e.clientX + 3;
        mouseY = e.clientY + 3;
        
        gsap.to('.theBall', { duration: 0, left: mouseX, top: mouseY });
        gsap.to('.theBall-1', { duration: 0, left: mouseX, top: mouseY, delay: 0.15 });
        gsap.to('.theBall-2', { duration: 0, left: mouseX, top: mouseY, delay: 0.3 });
      }
    };

    const handleLinkHover = () => {
      const theBall = document.querySelector('.theBall');
      if (theBall) {
        theBall.classList.add('zoom_rand2');
      }
    };

    const handleLinkLeave = () => {
      const theBall = document.querySelector('.theBall');
      if (theBall) {
        theBall.classList.remove('zoom_rand2');
      }
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    
    const links = document.querySelectorAll("a, button");
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  return (
    <span className="cursor-container">
      <div className="theBall fixed pointer-events-none z-[9999] w-4 h-4 bg-accent rounded-full mix-blend-difference transition-transform duration-150">
        <span />
      </div>
      <div className="theBall theBall-1 fixed pointer-events-none z-[9998] w-3 h-3 bg-primary rounded-full mix-blend-difference opacity-70" />
      <div className="theBall theBall-2 fixed pointer-events-none z-[9997] w-2 h-2 bg-secondary rounded-full mix-blend-difference opacity-50" />
    </span>
  );
}
