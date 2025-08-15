"use client";

import { PostHogProvider } from "@posthog/react";
import posthog from "posthog-js";
import { useEffect } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import { SmoothScrollProvider } from "../components/SmoothScrollProvider";
import { MachineViewProvider } from "../components/machine/MachineViewProvider";

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

  // Persist UTM params and initial referrer as super properties
  useEffect(() => {
    if (!POSTHOG_KEY) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => {
        const v = params.get(k);
        if (v) utm[k] = v;
      });
      const initialRef = document.referrer || "direct";
      const firstTouchSet = window.localStorage.getItem("ph_utm_set");
      if (!firstTouchSet) {
        posthog.register({ ...utm, initial_referrer: initialRef });
        window.localStorage.setItem("ph_utm_set", "1");
      } else if (Object.keys(utm).length > 0) {
        posthog.register(utm);
      }
    } catch {
      // ignore
    }
  }, []);

  if (!POSTHOG_KEY) {
    return (
      <MachineViewProvider>
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </MachineViewProvider>
    );
  }

  return (
    <PostHogProvider client={posthog}>
      <MachineViewProvider>
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </MachineViewProvider>
    </PostHogProvider>
  );
}

