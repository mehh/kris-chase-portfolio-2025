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
    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
      <Share2 className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm font-medium text-foreground">Share:</span>
      <div className="flex items-center gap-2">
        <a
          href={shareLinks.x}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Share on X"
        >
          <FaXTwitter className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
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
