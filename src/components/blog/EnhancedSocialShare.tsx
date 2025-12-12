'use client';

import { useState, useEffect } from 'react';
import { Share2, Link2, Check, Linkedin } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { cn } from '@/lib/utils';

interface EnhancedSocialShareProps {
  title: string;
  url: string;
  description?: string;
}

export function EnhancedSocialShare({
  title,
  url,
  description,
}: EnhancedSocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedDescription = description
    ? encodeURIComponent(description)
    : '';

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      <div className="flex items-center gap-3">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-muted/60 hover:bg-muted border border-border/50 hover:border-primary/50 transition-all text-foreground hover:text-primary"
          aria-label="Share on Twitter"
        >
          <FaXTwitter className="w-4 h-4" />
          Twitter
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-muted/60 hover:bg-muted border border-border/50 hover:border-primary/50 transition-all text-foreground hover:text-primary"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>
        <button
          onClick={copyToClipboard}
          className={cn(
            'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-all',
            copied
              ? 'bg-primary/10 text-primary border-primary/50'
              : 'bg-muted/60 hover:bg-muted border-border/50 hover:border-primary/50 text-foreground hover:text-primary'
          )}
          aria-label="Copy link"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4" />
              Copy Link
            </>
          )}
        </button>
      </div>
    </div>
  );
}
