"use client";

import { capture } from "@/lib/posthog/client";
import type { BlogPost } from "@/data/blog-posts";

interface BlogToolsLinkProps {
  post?: BlogPost;
  context: "blog_listing" | "blog_post";
}

export default function BlogToolsLink({ post, context }: BlogToolsLinkProps) {
  return (
    <a
      href="https://exec-tech.tools"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        try {
          capture("blog_tools_link_clicked", {
            context,
            post_slug: post?.slug,
            url: "https://exec-tech.tools",
          });
          capture("external_link_clicked", {
            url: "https://exec-tech.tools",
            context,
            post_slug: post?.slug,
            label: context === "blog_listing" ? "Executive Tools & Resources" : "Executive Tools",
          });
        } catch {}
      }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 transition-all text-primary hover:text-primary/90 group"
    >
      <span>{context === "blog_listing" ? "Executive Tools & Resources" : "Executive Tools"}</span>
      <svg
        className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
      {context === "blog_listing" && (
        <span className="text-xs text-muted-foreground">exec-tech.tools</span>
      )}
    </a>
  );
}
