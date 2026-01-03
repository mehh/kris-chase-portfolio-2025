"use client";

/**
 * Hook for tracking scroll depth and time on page
 * Provides engagement metrics for analytics
 */

import { useEffect, useRef, useState } from "react";
import { useTracking } from "./useTracking";

interface ScrollTrackingOptions {
  /** Track scroll depth milestones (25%, 50%, 75%, 100%) */
  trackScrollDepth?: boolean;
  /** Track time on page at intervals (in seconds) */
  trackTimeOnPage?: boolean;
  /** Time intervals to track (in seconds) */
  timeIntervals?: number[];
  /** Minimum scroll depth to consider engagement (0-1) */
  minScrollDepth?: number;
}

const DEFAULT_TIME_INTERVALS = [10, 30, 60, 120, 300]; // 10s, 30s, 1m, 2m, 5m

export function useScrollTracking(options: ScrollTrackingOptions = {}) {
  const {
    trackScrollDepth = true,
    trackTimeOnPage = true,
    timeIntervals = DEFAULT_TIME_INTERVALS,
    minScrollDepth = 0.25,
  } = options;

  const { track } = useTracking();
  const [scrollDepth, setScrollDepth] = useState(0);
  const [timeOnPage, setTimeOnPage] = useState(0);
  
  const trackedDepths = useRef<Set<number>>(new Set());
  const trackedTimes = useRef<Set<number>>(new Set());
  const startTime = useRef<number>(Date.now());
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);
  const timeTimer = useRef<NodeJS.Timeout | null>(null);

  // Track scroll depth
  useEffect(() => {
    if (!trackScrollDepth || typeof window === "undefined") return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      const currentDepth = scrollTop / (documentHeight - windowHeight);
      const percentage = Math.round(currentDepth * 100);
      
      setScrollDepth(percentage);

      // Track milestones: 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (percentage >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone);
          track("scroll_depth_reached", {
            depth: milestone,
            depth_percentage: percentage,
            page_height: documentHeight,
            scroll_position: scrollTop,
          });
        }
      });
    };

    // Throttle scroll events
    const throttledScroll = () => {
      if (scrollTimer.current) return;
      scrollTimer.current = setTimeout(() => {
        handleScroll();
        scrollTimer.current = null;
      }, 100);
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, [trackScrollDepth, track]);

  // Track time on page
  useEffect(() => {
    if (!trackTimeOnPage || typeof window === "undefined") return;

    const checkTimeIntervals = () => {
      const elapsed = Math.floor((Date.now() - startTime.current) / 1000);
      setTimeOnPage(elapsed);

      // Track time milestones
      timeIntervals.forEach((interval) => {
        if (elapsed >= interval && !trackedTimes.current.has(interval)) {
          trackedTimes.current.add(interval);
          track("time_on_page", {
            seconds: elapsed,
            interval: interval,
          });
        }
      });
    };

    // Check every second
    timeTimer.current = setInterval(checkTimeIntervals, 1000);

    return () => {
      if (timeTimer.current) {
        clearInterval(timeTimer.current);
      }
    };
  }, [trackTimeOnPage, timeIntervals, track]);

  // Track final engagement when component unmounts
  useEffect(() => {
    return () => {
      const finalTime = Math.floor((Date.now() - startTime.current) / 1000);
      const finalDepth = scrollDepth;

      if (finalTime > 0 || finalDepth > 0) {
        track("page_engagement", {
          total_time_seconds: finalTime,
          final_scroll_depth: finalDepth,
          reached_min_depth: finalDepth >= minScrollDepth * 100,
        });
      }
    };
  }, [scrollDepth, minScrollDepth, track]);

  return {
    scrollDepth,
    timeOnPage,
  };
}
