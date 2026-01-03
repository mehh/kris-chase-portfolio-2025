/**
 * Enhanced PostHog client-side tracking utilities
 * Provides standardized event tracking with automatic context
 */

import posthog from "posthog-js";

/**
 * Get automatic context properties for all events
 */
function getContext(): Record<string, unknown> {
  if (typeof window === "undefined") return {};

  try {
    const context: Record<string, unknown> = {
      page_path: window.location.pathname,
      page_title: document.title,
      page_url: window.location.href,
      referrer: document.referrer || "direct",
    };

    // Add UTM parameters if present
    const params = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => {
      const value = params.get(key);
      if (value) utmParams[key] = value;
    });
    if (Object.keys(utmParams).length > 0) {
      Object.assign(context, utmParams);
    }

    // Add device/browser info
    const userAgent = navigator.userAgent;
    context.user_agent = userAgent;
    context.device_type = /Mobile|Android|iPhone|iPad/.test(userAgent) ? "mobile" : "desktop";
    
    // Detect browser
    if (userAgent.includes("Chrome")) context.browser = "chrome";
    else if (userAgent.includes("Firefox")) context.browser = "firefox";
    else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) context.browser = "safari";
    else if (userAgent.includes("Edge")) context.browser = "edge";
    else context.browser = "other";

    // Add session ID if available
    const sessionId = posthog.get_session_id?.();
    if (sessionId) {
      context.session_id = sessionId;
    }

    // Add distinct ID if available
    const distinctId = posthog.get_distinct_id?.();
    if (distinctId) {
      context.user_id = distinctId;
    }

    return context;
  } catch (error) {
    console.warn("Failed to get tracking context:", error);
    return {};
  }
}

/**
 * Safely capture an event with automatic context
 */
export function capture(
  event: string,
  properties: Record<string, unknown> = {}
): void {
  try {
    if (typeof window === "undefined" || !posthog.__loaded) return;

    const context = getContext();
    const mergedProperties = { ...context, ...properties };

    posthog.capture(event, mergedProperties);
  } catch (error) {
    // Silently fail - don't break the app if tracking fails
    if (process.env.NODE_ENV === "development") {
      console.warn("PostHog capture failed:", error);
    }
  }
}

/**
 * Capture a pageview with custom properties
 */
export function capturePageView(
  pageName?: string,
  additionalProperties: Record<string, unknown> = {}
): void {
  try {
    if (typeof window === "undefined" || !posthog.__loaded) return;

    const context = getContext();
    const properties = {
      ...context,
      ...additionalProperties,
    };

    if (pageName) {
      properties.page_name = pageName;
    }

    posthog.capture("$pageview", properties);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("PostHog pageview capture failed:", error);
    }
  }
}

/**
 * Identify a user with properties
 */
export function identify(
  distinctId: string,
  properties?: Record<string, unknown>
): void {
  try {
    if (typeof window === "undefined" || !posthog.__loaded) return;

    posthog.identify(distinctId, properties);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("PostHog identify failed:", error);
    }
  }
}

/**
 * Set user properties (super properties)
 */
export function setUserProperties(properties: Record<string, unknown>): void {
  try {
    if (typeof window === "undefined" || !posthog.__loaded) return;

    posthog.register(properties);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("PostHog register failed:", error);
    }
  }
}

/**
 * Reset user identity (for logout)
 */
export function reset(): void {
  try {
    if (typeof window === "undefined" || !posthog.__loaded) return;

    posthog.reset();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("PostHog reset failed:", error);
    }
  }
}

/**
 * Get the current distinct ID
 */
export function getDistinctId(): string | undefined {
  try {
    if (typeof window === "undefined" || !posthog.__loaded) return undefined;

    return posthog.get_distinct_id?.();
  } catch {
    return undefined;
  }
}

/**
 * Check if PostHog is loaded and ready
 */
export function isLoaded(): boolean {
  try {
    return typeof window !== "undefined" && posthog.__loaded === true;
  } catch {
    return false;
  }
}
