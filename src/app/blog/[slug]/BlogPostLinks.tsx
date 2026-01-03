"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { capture } from "@/lib/posthog/client";
import type { BlogPost } from "@/data/blog-posts";

interface BlogPostLinksProps {
  post: BlogPost;
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}

export default function BlogPostLinks({ post, prevPost, nextPost }: BlogPostLinksProps) {
  return (
    <nav className="mt-16 pt-12 border-t-2 border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prevPost && (
          <Link
            href={`/blog/${prevPost.slug}`}
            onClick={() => {
              try {
                capture("blog_related_clicked", {
                  direction: "previous",
                  from_post_slug: post.slug,
                  to_post_slug: prevPost.slug,
                  to_post_title: prevPost.title,
                });
              } catch {}
            }}
            className="group p-6 rounded-xl border-2 border-border/50 hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Previous Post
            </div>
            <div className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {prevPost.title}
            </div>
          </Link>
        )}
        {nextPost && (
          <Link
            href={`/blog/${nextPost.slug}`}
            onClick={() => {
              try {
                capture("blog_related_clicked", {
                  direction: "next",
                  from_post_slug: post.slug,
                  to_post_slug: nextPost.slug,
                  to_post_title: nextPost.title,
                });
              } catch {}
            }}
            className="group p-6 rounded-xl border-2 border-border/50 hover:border-primary/50 hover:bg-muted/30 transition-all md:text-right"
          >
            <div className="flex items-center justify-end gap-2 text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              Next Post
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {nextPost.title}
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}
