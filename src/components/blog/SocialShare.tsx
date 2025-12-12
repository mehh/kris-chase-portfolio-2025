'use client';

import { Share2, Linkedin, Link2 } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { BlogPost } from '@/data/blog-posts';
import { useState, useEffect } from 'react';
import { getPostUrl } from '@/lib/blog-utils';

interface SocialShareProps {
  post: BlogPost;
}

export function SocialShare({ post }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  // Start with canonical URL to match server-side render
  const [url, setUrl] = useState<string>(getPostUrl(post.slug));
  
  // After hydration, update to actual current URL (for copy functionality)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, []);
  
  const title = encodeURIComponent(post.title);
  const text = encodeURIComponent(post.description);

  // Use canonical URL for share links to ensure consistency
  const shareUrl = getPostUrl(post.slug);
  const shareLinks = {
    x: `https://x.com/intent/tweet?text=${title}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  const copyToClipboard = async () => {
    try {
      // Use current URL if available (after hydration), otherwise use canonical URL
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex items-center gap-2">
        <Share2 className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm font-semibold text-foreground">Share this article:</span>
      </div>
      <div className="flex items-center gap-3">
        <a
          href={shareLinks.x}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-muted/60 hover:bg-muted border-2 border-border/50 hover:border-primary/50 transition-all text-foreground hover:text-primary"
          aria-label="Share on X (Twitter)"
        >
          <FaXTwitter className="h-4 w-4" />
          <span className="hidden sm:inline">X</span>
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-muted/60 hover:bg-muted border-2 border-border/50 hover:border-[#0077B5]/50 transition-all text-foreground hover:text-[#0077B5]"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
          <span className="hidden sm:inline">LinkedIn</span>
        </a>
        <button
          onClick={copyToClipboard}
          className={`group flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
            copied
              ? 'bg-primary/20 border-primary/50 text-primary'
              : 'bg-muted/60 hover:bg-muted border-border/50 hover:border-primary/50 text-foreground hover:text-primary'
          }`}
          aria-label="Copy link to clipboard"
        >
          <Link2 className={`h-4 w-4 ${copied ? 'text-primary' : ''}`} />
          <span className="hidden sm:inline">
            {copied ? 'Copied!' : 'Copy Link'}
          </span>
        </button>
      </div>
    </div>
  );
}
