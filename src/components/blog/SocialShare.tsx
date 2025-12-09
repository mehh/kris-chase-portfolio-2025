'use client';

import { Share2, Twitter, Linkedin, Link2 } from 'lucide-react';
import { BlogPost } from '@/data/blog-posts';
import { useState } from 'react';

interface SocialShareProps {
  post: BlogPost;
}

export function SocialShare({ post }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : `https://krischase.com/blog-codex/${post.slug}`;
  const title = encodeURIComponent(post.title);
  const text = encodeURIComponent(post.description);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${title}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
      <Share2 className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm font-medium text-foreground">Share:</span>
      <div className="flex items-center gap-2">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4 text-muted-foreground hover:text-[#1DA1F2] transition-colors" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4 text-muted-foreground hover:text-[#0077B5] transition-colors" />
        </a>
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Copy link"
        >
          <Link2 className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
        </button>
        {copied && (
          <span className="text-xs text-muted-foreground animate-in fade-in duration-200">
            Copied!
          </span>
        )}
      </div>
    </div>
  );
}
