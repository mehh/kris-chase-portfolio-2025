"use client";

import { capture } from "@/lib/posthog/client";

export default function BlogToolsLink() {
  return (
    <a
      href="https://exec-tech.tools"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        try {
          capture("blog_tools_link_clicked", {
            context: "blog_listing",
            url: "https://exec-tech.tools",
          });
          capture("external_link_clicked", {
            url: "https://exec-tech.tools",
            context: "blog_listing",
            label: "Executive Tools & Resources",
          });
        } catch {}
      }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-muted/60 hover:bg-muted border border-border/50 hover:border-primary/50 transition-all text-foreground hover:text-primary group"
    >
      <span>Executive Tools & Resources</span>
      <svg
        className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
      <span className="text-xs text-muted-foreground">exec-tech.tools</span>
    </a>
  );
}
