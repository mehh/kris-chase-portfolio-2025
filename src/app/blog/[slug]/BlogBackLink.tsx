"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { capture } from "@/lib/posthog/client";
import type { BlogPost } from "@/data/blog-posts";

interface BlogBackLinkProps {
  post: BlogPost;
}

export default function BlogBackLink({ post }: BlogBackLinkProps) {
  return (
    <Link
      href="/blog"
      onClick={() => {
        try {
          capture("blog_back_clicked", {
            from_post_slug: post.slug,
            from_post_title: post.title,
          });
        } catch {}
      }}
      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all mb-8 group"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      <span>Back to Blog</span>
    </Link>
  );
}
