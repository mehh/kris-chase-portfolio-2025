"use client";

import React, { useEffect } from "react";

export default function SimpleHoverEffect() {
  useEffect(() => {
    // Simple CSS-based hover effects that mimic the original WebGL look
    const hoverPlanes = document.querySelectorAll('.hover-plane');
    
    hoverPlanes.forEach((plane) => {
      const element = plane as HTMLElement;
      
      element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.05)';
        element.style.filter = 'brightness(1.1) contrast(1.1)';
        element.style.transition = 'all 0.3s ease';
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
        element.style.filter = 'brightness(1) contrast(1)';
        element.style.transition = 'all 0.3s ease';
      });
      
      // Add a subtle ripple effect on mouse move
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        element.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`;
        element.style.backgroundBlendMode = 'overlay';
      });
    });
    
    return () => {
      // Cleanup event listeners
      hoverPlanes.forEach((plane) => {
        const element = plane as HTMLElement;
        element.removeEventListener('mouseenter', () => {});
        element.removeEventListener('mouseleave', () => {});
        element.removeEventListener('mousemove', () => {});
      });
    };
  }, []);

  return null; // This component only adds event listeners
}
