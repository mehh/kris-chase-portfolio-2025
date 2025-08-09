"use client";

import { PostHogProvider } from "@posthog/react";
import posthog from "posthog-js";
import { useEffect } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import { SmoothScrollProvider } from "../components/SmoothScrollProvider";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!POSTHOG_KEY) return;
    // Initialize PostHog on the client
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: true,
      persistence: "localStorage+cookie",
    });
  }, []);

  if (!POSTHOG_KEY) {
    return (
      <ThemeProvider>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </ThemeProvider>
    );
  }

  return (
    <PostHogProvider client={posthog}>
      <ThemeProvider>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </ThemeProvider>
    </PostHogProvider>
  );
}
