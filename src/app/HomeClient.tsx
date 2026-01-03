"use client";

import { useScrollTracking } from "@/hooks/useScrollTracking";

export default function HomeClient() {
  // Track scroll depth and time on page
  useScrollTracking({ trackScrollDepth: true, trackTimeOnPage: true });
  return null;
}
