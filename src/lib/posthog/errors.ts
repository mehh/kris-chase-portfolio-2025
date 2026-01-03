/**
 * Error tracking utilities for JavaScript errors, API errors, and 404s
 */

import { capture } from "./client";

/**
 * Initialize error tracking
 */
export function initErrorTracking() {
  if (typeof window === "undefined") return;

  // Track JavaScript errors
  window.addEventListener("error", (event) => {
    capture("javascript_error", {
      error_message: event.message,
      error_source: event.filename,
      error_line: event.lineno,
      error_column: event.colno,
      error_stack: event.error?.stack,
      error_type: event.error?.name || "Error",
    });
  });

  // Track unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    capture("unhandled_promise_rejection", {
      error_message: reason?.message || String(reason),
      error_stack: reason?.stack,
      error_type: reason?.name || "UnhandledRejection",
    });
  });
}

/**
 * Track API error manually
 */
export function trackApiError(
  endpoint: string,
  method: string,
  status: number,
  message: string,
  additionalProperties?: Record<string, unknown>
): void {
  capture("api_error", {
    endpoint,
    method,
    status_code: status,
    error_message: message,
    error_category: status >= 500 ? "server_error" : status >= 400 ? "client_error" : "unknown",
    ...additionalProperties,
  });
}

/**
 * Track 404 page not found
 */
export function track404(path: string, referrer?: string): void {
  capture("page_not_found", {
    path,
    referrer: referrer || document.referrer || "direct",
  });
}
