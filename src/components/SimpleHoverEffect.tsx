"use client";

import { useEffect } from "react";

export default function SimpleHoverEffect() {
  useEffect(() => {
    // Simple CSS-based hover effects that mimic the original WebGL look
    const hoverPlanes = document.querySelectorAll('.hover-plane');
    
    type Listener = {
      el: HTMLElement;
      onEnter: (ev: Event) => void;
      onLeave: (ev: Event) => void;
      onMove: (ev: MouseEvent) => void;
    };
    const listeners: Listener[] = [];

    hoverPlanes.forEach((plane) => {
      const element = plane as HTMLElement;
      // Minor perf hint when hovered
      element.style.willChange = 'transform, filter, background';

      const onEnter = () => {
        element.style.transform = 'scale(1.05)';
        element.style.filter = 'brightness(1.1) contrast(1.1)';
        element.style.transition = 'all 0.3s ease';
      };

      const onLeave = () => {
        element.style.transform = 'scale(1)';
        element.style.filter = 'brightness(1) contrast(1)';
        element.style.transition = 'all 0.3s ease';
        // Clear background on leave to avoid repainting when not needed
        element.style.background = '';
      };

      const onMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        element.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.10) 0%, transparent 50%)`;
        element.style.backgroundBlendMode = 'overlay';
      };

      element.addEventListener('mouseenter', onEnter);
      element.addEventListener('mouseleave', onLeave);
      element.addEventListener('mousemove', onMove, { passive: true } as AddEventListenerOptions);

      listeners.push({ el: element, onEnter, onLeave, onMove });
    });
    
    return () => {
      // Cleanup event listeners
      listeners.forEach(({ el, onEnter, onLeave, onMove }) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.removeEventListener('mousemove', onMove as EventListener);
      });
    };
  }, []);

  return null; // This component only adds event listeners
}
