"use client";

import PageViewEvent from "@/components/PageViewEvent";
import { useScrollTracking } from "@/hooks/useScrollTracking";

interface BlogPageClientProps {
  postCount: number;
  featuredCount: number;
}

export default function BlogPageClient({ postCount, featuredCount }: BlogPageClientProps) {
  // Track scroll depth and time on page
  useScrollTracking({ trackScrollDepth: true, trackTimeOnPage: true });

  return (
    <PageViewEvent 
      pageName="blog_listing" 
      additionalProperties={{ 
        post_count: postCount,
        featured_count: featuredCount,
      }} 
    />
  );
}
