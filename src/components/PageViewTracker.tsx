"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { capturePageView } from "@/lib/posthog/client";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to ensure page is fully loaded
    const timer = setTimeout(() => {
      capturePageView(undefined, {
        page_path: pathname,
        page_title: document.title,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
