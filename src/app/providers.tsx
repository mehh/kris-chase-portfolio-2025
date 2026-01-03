"use client";

import { PostHogProvider } from "@posthog/react";
import posthog from "posthog-js";
import { useEffect } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import { SmoothScrollProvider } from "../components/SmoothScrollProvider";
import { MachineViewProvider } from "../components/machine/MachineViewProvider";
import { trackWebVitals } from "@/lib/posthog/performance";
import { initErrorTracking } from "@/lib/posthog/errors";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!POSTHOG_KEY) return;
    
    // Initialize PostHog on the client with enhanced configuration
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: false, // We'll handle pageviews manually with more context
      persistence: "localStorage+cookie",
      loaded: (posthog) => {
        // Set up session recording (optional - can be enabled per user consent)
        // posthog.sessionRecording.startRecording();
        
        // Feature flags are automatically loaded by PostHog
        
        // Set default properties for all events
        posthog.register({
          app_version: process.env.NEXT_PUBLIC_APP_VERSION || "unknown",
          environment: process.env.NODE_ENV || "development",
        });
      },
      // Enable autocapture for specific elements only (to reduce noise)
      autocapture: false, // We'll track manually for better control
      // Capture performance metrics
      capture_performance: true,
    });

    // Initialize performance tracking
    trackWebVitals();
    
    // Initialize error tracking
    initErrorTracking();
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
      // Capture custom referral params as well (for non-standard links)
      const custom: Record<string, string> = {};
      ["source", "action", "channel", "campaign"].forEach((k) => {
        const v = params.get(k);
        if (v) custom[k] = v;
      });
      const initialRef = document.referrer || "direct";
      const firstTouchSet = window.localStorage.getItem("ph_utm_set");
      const props = { ...utm, ...custom, initial_referrer: initialRef };
      if (!firstTouchSet) {
        posthog.register(props);
        window.localStorage.setItem("ph_utm_set", "1");
      } else if (Object.keys(utm).length > 0 || Object.keys(custom).length > 0) {
        posthog.register(props);
      }

      // Fire a dedicated event when a resume referral lands on /resume
      const isResumePath = window.location.pathname === "/resume";
      const isResumeSource = params.get("source") === "resume" || params.get("utm_source") === "resume";
      const hasAction = !!(params.get("action") || params.get("utm_content"));
      if (isResumePath && (isResumeSource || hasAction)) {
        posthog.capture("resume_referral_landing", {
          path: window.location.pathname,
          query: window.location.search,
          ...utm,
          ...custom,
        });
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

