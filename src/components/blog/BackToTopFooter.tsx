'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function BackToTopFooter() {
  return (
    <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
      <Link
        href="/blog-codex"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Blog</span>
      </Link>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll to top"
      >
        Back to top ↑
      </button>
    </div>
  );
}

