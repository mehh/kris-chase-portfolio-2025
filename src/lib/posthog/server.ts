export const POSTHOG_HOST =
  process.env.POSTHOG_HOST || process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

const POSTHOG_KEY = process.env.POSTHOG_KEY || process.env.NEXT_PUBLIC_POSTHOG_KEY;

export async function captureServer(
  event: string,
  properties: Record<string, unknown> = {},
  distinctId?: string
): Promise<void> {
  if (!POSTHOG_KEY) return;
  try {
    const payload = {
      api_key: POSTHOG_KEY,
      event,
      distinct_id: distinctId,
      properties,
    } as {
      api_key: string;
      event: string;
      distinct_id?: string;
      properties: Record<string, unknown>;
    };

    await fetch(`${POSTHOG_HOST}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // Do not await response JSON; fire-and-forget semantics
    });
  } catch {
    // ignore
  }
}
