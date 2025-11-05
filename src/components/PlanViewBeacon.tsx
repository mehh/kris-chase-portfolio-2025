"use client";

import { useEffect, useRef } from "react";

function parseUtm(search: string): Record<string, string> | null {
  try {
    const params = new URLSearchParams(search);
    const keys = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content"];
    const out: Record<string, string> = {};
    let has = false;
    for (const k of keys) {
      const v = params.get(k);
      if (v) {
        out[k] = v;
        has = true;
      }
    }
    return has ? out : null;
  } catch {
    return null;
  }
}

export default function PlanViewBeacon() {
  const sentRef = useRef(false);

  useEffect(() => {
    if (sentRef.current) return;
    sentRef.current = true;

    const path = typeof window !== "undefined" ? window.location.pathname : "";
    const title = typeof document !== "undefined" ? document.title : "";
    const ref = typeof document !== "undefined" ? document.referrer || null : null;
    const utm = typeof window !== "undefined" ? parseUtm(window.location.search) : null;

    // fire-and-forget; no blocking UI
    fetch("/api/plan-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, title, ref, utm }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  return null;
}
