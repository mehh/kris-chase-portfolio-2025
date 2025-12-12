'use client';

import { useEffect, useState } from 'react';

/**
 * Scroll progress indicator that shows reading progress at the top of the page
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;
      const progressPercent = scrollableHeight > 0 
        ? (scrollTop / scrollableHeight) * 100 
        : 0;
      
      setProgress(Math.min(100, Math.max(0, progressPercent)));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1.5 bg-background/30 backdrop-blur-sm z-50">
      <div
        className="h-full bg-gradient-to-r from-primary via-primary/90 to-primary shadow-lg shadow-primary/50 transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
      {/* Glow effect */}
      <div
        className="absolute top-0 h-full bg-primary/40 blur-xl transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
