"use client";

import { useEffect, useState } from "react";
import PageViewEvent from "@/components/PageViewEvent";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { capture } from "@/lib/posthog/client";
import type { BlogPost } from "@/data/blog-posts";

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [readingStartTime] = useState(Date.now());
  
  // Track scroll depth and time on page
  useScrollTracking({ 
    trackScrollDepth: true, 
    trackTimeOnPage: true,
    minScrollDepth: 0.25, // Consider engagement if user scrolls at least 25%
  });

  // Track reading time when component unmounts
  useEffect(() => {
    return () => {
      const readingTime = Math.floor((Date.now() - readingStartTime) / 1000);
      if (readingTime > 5) { // Only track if user spent more than 5 seconds
        try {
          capture("blog_reading_time", {
            post_slug: post.slug,
            post_title: post.title,
            estimated_reading_time: post.readingTime * 60, // Convert to seconds
            actual_reading_time: readingTime,
            reading_completion: Math.min(100, Math.round((readingTime / (post.readingTime * 60)) * 100)),
          });
        } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageViewEvent 
      pageName="blog_post" 
      additionalProperties={{ 
        post_slug: post.slug,
        post_title: post.title,
        post_category: post.category,
        post_tags: post.tags,
        reading_time: post.readingTime,
        word_count: post.wordCount,
      }} 
    />
  );
}
