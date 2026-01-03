"use client";

/**
 * React hook for easy client-side PostHog tracking
 * Provides automatic page context and debouncing for rapid events
 */

import { useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { capture, capturePageView, isLoaded } from "@/lib/posthog/client";

/**
 * Debounce function to prevent rapid-fire events
 */
function debounce(
  func: (event: string, properties?: Record<string, unknown>) => void,
  wait: number
): (event: string, properties?: Record<string, unknown>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(event: string, properties?: Record<string, unknown>) {
    const later = () => {
      timeout = null;
      func(event, properties);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Hook for tracking events with automatic page context
 */
export function useTracking() {
  const pathname = usePathname();
  
  // Debounced tracking function to prevent rapid events
  const debouncedCapture = useRef(
    debounce((event: string, properties?: Record<string, unknown>) => {
      if (!isLoaded()) return;
      capture(event, {
        ...properties,
        page_path: pathname,
      });
    }, 100)
  ).current;

  /**
   * Track an event with automatic page context
   */
  const track = useCallback(
    (event: string, properties?: Record<string, unknown>) => {
      if (!isLoaded()) return;
      capture(event, {
        ...properties,
        page_path: pathname,
      });
    },
    [pathname]
  );

  /**
   * Track an event with debouncing (useful for scroll, hover, etc.)
   */
  const trackDebounced = useCallback(
    (event: string, properties?: Record<string, unknown>) => {
      if (!isLoaded()) return;
      debouncedCapture(event, properties);
    },
    [debouncedCapture]
  );

  /**
   * Track a pageview
   */
  const trackPageView = useCallback(
    (pageName?: string, additionalProperties?: Record<string, unknown>) => {
      if (!isLoaded()) return;
      capturePageView(pageName, {
        ...additionalProperties,
        page_path: pathname,
      });
    },
    [pathname]
  );

  return {
    track,
    trackDebounced,
    trackPageView,
    isLoaded: isLoaded(),
  };
}
