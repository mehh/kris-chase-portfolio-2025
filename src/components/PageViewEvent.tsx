"use client";

import { useEffect } from "react";
import { capture } from "@/lib/posthog/client";

interface PageViewEventProps {
  pageName: string;
  additionalProperties?: Record<string, unknown>;
}

/**
 * Component to track page_viewed events with custom metadata
 * Use this in page components to track specific page views
 */
export default function PageViewEvent({ pageName, additionalProperties = {} }: PageViewEventProps) {
  useEffect(() => {
    // Small delay to ensure page is fully loaded
    const timer = setTimeout(() => {
      capture(`${pageName}_viewed`, {
        page_name: pageName,
        ...additionalProperties,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [pageName, additionalProperties]);

  return null;
}
