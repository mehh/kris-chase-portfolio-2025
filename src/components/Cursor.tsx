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
    <>
      <div className="theBall">
        <span />
      </div>
      <div className="theBall theBall-1" />
      <div className="theBall theBall-2" />
    </>
  );
}
