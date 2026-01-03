/**
 * Performance tracking utilities for Core Web Vitals and custom metrics
 */

import { capture } from "./client";

/**
 * Track Core Web Vitals
 */
export function trackWebVitals() {
  if (typeof window === "undefined") return;

  // Track Largest Contentful Paint (LCP)
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
        renderTime?: number;
        loadTime?: number;
        startTime?: number;
      };
      
      const lcp = lastEntry.renderTime || lastEntry.loadTime || lastEntry.startTime || 0;
      
      capture("web_vital_measured", {
        metric: "LCP",
        value: lcp,
        unit: "ms",
        rating: lcp < 2500 ? "good" : lcp < 4000 ? "needs-improvement" : "poor",
      });
    });

    lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("LCP tracking failed:", error);
    }
  }

  // Track First Input Delay (FID) or Interaction to Next Paint (INP)
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const fidEntry = entry as PerformanceEntry & { processingStart?: number; startTime?: number };
        if (fidEntry.processingStart !== undefined && fidEntry.startTime !== undefined) {
            const delay = fidEntry.processingStart - fidEntry.startTime;
          
          capture("web_vital_measured", {
            metric: "FID",
            value: delay,
            unit: "ms",
            rating: delay < 100 ? "good" : delay < 300 ? "needs-improvement" : "poor",
          });
        }
      });
    });

    // Try FID first, fall back to INP if available
    try {
      fidObserver.observe({ entryTypes: ["first-input"] });
    } catch {
      try {
        fidObserver.observe({ entryTypes: ["event"] });
      } catch {
        // INP not supported
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("FID/INP tracking failed:", error);
    }
  }

  // Track Cumulative Layout Shift (CLS)
  try {
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];

    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries() as PerformanceEntry[];
      entries.forEach((entry) => {
        const layoutShift = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!layoutShift.hadRecentInput && layoutShift.value !== undefined) {
          clsValue += layoutShift.value;
          clsEntries.push(entry);
        }
      });

      capture("web_vital_measured", {
        metric: "CLS",
        value: clsValue,
        unit: "score",
        rating: clsValue < 0.1 ? "good" : clsValue < 0.25 ? "needs-improvement" : "poor",
        shift_count: clsEntries.length,
      });
    });

    clsObserver.observe({ entryTypes: ["layout-shift"] });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("CLS tracking failed:", error);
    }
  }

  // Track Time to First Byte (TTFB)
  try {
    const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      
      capture("web_vital_measured", {
        metric: "TTFB",
        value: ttfb,
        unit: "ms",
        rating: ttfb < 800 ? "good" : ttfb < 1800 ? "needs-improvement" : "poor",
      });
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("TTFB tracking failed:", error);
    }
  }

  // Track page load time
  try {
    window.addEventListener("load", () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      
      capture("page_load_time", {
        load_time_ms: loadTime,
        dom_content_loaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
        first_paint: performance.getEntriesByType("paint").find((entry) => entry.name === "first-paint")?.startTime || 0,
        first_contentful_paint: performance.getEntriesByType("paint").find((entry) => entry.name === "first-contentful-paint")?.startTime || 0,
      });
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Page load time tracking failed:", error);
    }
  }
}

/**
 * Track custom performance metric
 */
export function trackCustomMetric(
  name: string,
  value: number,
  unit: string = "ms",
  additionalProperties?: Record<string, unknown>
): void {
  capture("custom_performance_metric", {
    metric_name: name,
    value,
    unit,
    ...additionalProperties,
  });
}

/**
 * Track API response time
 */
export function trackApiResponseTime(
  endpoint: string,
  method: string,
  duration: number,
  status: number,
  additionalProperties?: Record<string, unknown>
): void {
  capture("api_response_time", {
    endpoint,
    method,
    duration_ms: duration,
    status_code: status,
    rating: duration < 200 ? "fast" : duration < 500 ? "moderate" : "slow",
    ...additionalProperties,
  });
}
