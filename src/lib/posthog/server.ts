export const POSTHOG_HOST =
  process.env.POSTHOG_HOST || process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

const POSTHOG_KEY = process.env.POSTHOG_KEY || process.env.NEXT_PUBLIC_POSTHOG_KEY;

/**
 * Get server-side context from request headers
 */
function getServerContext(headers?: Headers): Record<string, unknown> {
  const context: Record<string, unknown> = {
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  };

  if (headers) {
    // Add user agent
    const userAgent = headers.get("user-agent");
    if (userAgent) {
      context.user_agent = userAgent;
      context.device_type = /Mobile|Android|iPhone|iPad/.test(userAgent) ? "mobile" : "desktop";
    }

    // Add referrer
    const referer = headers.get("referer");
    if (referer) {
      context.referrer = referer;
    }

    // Add IP (if available via headers from proxy)
    const forwardedFor = headers.get("x-forwarded-for");
    const realIp = headers.get("x-real-ip");
    if (forwardedFor) {
      context.ip = forwardedFor.split(",")[0].trim();
    } else if (realIp) {
      context.ip = realIp;
    }

    // Add request ID if available
    const requestId = headers.get("x-request-id") || headers.get("x-vercel-id");
    if (requestId) {
      context.request_id = requestId;
    }
  }

  // Add deployment version if available
  const version = process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_APP_VERSION;
  if (version) {
    context.deployment_version = version;
  }

  return context;
}

/**
 * Enhanced server-side event capture with automatic context
 */
export async function captureServer(
  event: string,
  properties: Record<string, unknown> = {},
  distinctId?: string,
  headers?: Headers
): Promise<void> {
  if (!POSTHOG_KEY) return;
  
  try {
    const context = getServerContext(headers);
    const mergedProperties = { ...context, ...properties };

    const payload = {
      api_key: POSTHOG_KEY,
      event,
      distinct_id: distinctId,
      properties: mergedProperties,
    } as {
      api_key: string;
      event: string;
      distinct_id?: string;
      properties: Record<string, unknown>;
    };

    // Fire and forget - don't block the request
    fetch(`${POSTHOG_HOST}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((error) => {
      // Only log in development
      if (process.env.NODE_ENV === "development") {
        console.warn("PostHog server capture failed:", error);
      }
    });
  } catch (error) {
    // Silently fail - don't break the app if tracking fails
    if (process.env.NODE_ENV === "development") {
      console.warn("PostHog server capture error:", error);
    }
  }
}
