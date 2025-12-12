'use client';

import { useState } from 'react';
import { Sparkles, Loader2, Copy, Check, Linkedin, X } from 'lucide-react';
import { BlogPost } from '@/data/blog-posts';
import { cn } from '@/lib/utils';
import { FaXTwitter as XIcon } from 'react-icons/fa6';

interface AISocialPostProps {
  post: BlogPost;
}

interface SocialPostData {
  linkedin: string;
  twitter: string;
  twitterThread: string[];
}

export function AISocialPost({ post }: AISocialPostProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [platform, setPlatform] = useState<'linkedin' | 'twitter'>('linkedin');
  const [socialPost, setSocialPost] = useState<SocialPostData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateSocialPost = async () => {
    setIsLoading(true);
    setError(null);
    setSocialPost(null);

    try {
      const response = await fetch('/api/blog/social-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: post.slug,
          title: post.title,
          content: post.content,
          description: post.description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate social post');
      }

      const data = await response.json();
      setSocialPost(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate social post');
      console.error('Error generating social post:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getCurrentPost = () => {
    if (!socialPost) return '';
    if (platform === 'linkedin') return socialPost.linkedin;
    if (platform === 'twitter') {
      return socialPost.twitterThread.length > 0 
        ? socialPost.twitterThread.join('\n\n---\n\n')
        : socialPost.twitter;
    }
    return '';
  };

  const shareOnLinkedIn = () => {
    const text = encodeURIComponent(socialPost?.linkedin || '');
    const url = encodeURIComponent(`https://krischase.com/blog/${post.slug}`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(socialPost?.twitter || '');
    const url = encodeURIComponent(`https://krischase.com/blog/${post.slug}`);
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  return (
    <div className="my-12">
      {/* Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen && !socialPost && !isLoading) {
            generateSocialPost();
          }
        }}
        className={cn(
          'w-full flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-300',
          isOpen
            ? 'border-primary/50 bg-primary/5'
            : 'border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50'
        )}
        aria-label="Generate social media post"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-heading font-bold text-lg text-foreground">
              Generate Social Post
            </h3>
            <p className="text-sm text-muted-foreground">
              Create LinkedIn post or Twitter thread from this article
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Linkedin className="w-5 h-5 text-[#0077B5]" />
          <XIcon className="w-5 h-5" />
        </div>
      </button>

      {/* Expanded Content */}
      {isOpen && (
        <div className="mt-4 p-6 rounded-xl border-2 border-border/50 bg-card/30">
          {isLoading && (
            <div className="flex items-center gap-3 text-muted-foreground py-8">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating social post...</span>
            </div>
          )}

          {error && (
            <div className="p-5 rounded-lg bg-destructive/10 border border-destructive/20 mb-4">
              <p className="text-sm text-destructive">
                {error}. Please try again.
              </p>
              <button
                onClick={generateSocialPost}
                className="mt-3 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                Retry
              </button>
            </div>
          )}

          {socialPost && (
            <div className="space-y-6">
              {/* Platform Selector */}
              <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 border border-border/50">
                <button
                  onClick={() => setPlatform('linkedin')}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all',
                    platform === 'linkedin'
                      ? 'bg-[#0077B5] text-white shadow-lg'
                      : 'bg-transparent text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </button>
                <button
                  onClick={() => setPlatform('twitter')}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all',
                    platform === 'twitter'
                      ? 'bg-foreground text-background shadow-lg'
                      : 'bg-transparent text-muted-foreground hover:text-foreground'
                  )}
                >
                  <XIcon className="w-5 h-5" />
                  <span>Twitter</span>
                </button>
              </div>

              {/* Generated Post */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">
                    {platform === 'linkedin' ? 'LinkedIn Post' : 'Twitter Thread'}
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(getCurrentPost())}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted/60 hover:bg-muted border border-border/50 hover:border-primary/50 transition-all"
                      aria-label="Copy to clipboard"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-primary" />
                          <span className="text-primary">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    {platform === 'linkedin' ? (
                      <button
                        onClick={shareOnLinkedIn}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-[#0077B5] text-white hover:bg-[#005885] transition-all"
                      >
                        <Linkedin className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    ) : (
                      <button
                        onClick={shareOnTwitter}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-all"
                      >
                        <XIcon className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-5 rounded-lg bg-muted/50 border border-border/50">
                  {platform === 'twitter' && socialPost.twitterThread.length > 0 ? (
                    <div className="space-y-4">
                      {socialPost.twitterThread.map((tweet, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">
                              Tweet {index + 1} of {socialPost.twitterThread.length}
                            </span>
                          </div>
                          <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                            {tweet}
                          </p>
                          {index < socialPost.twitterThread.length - 1 && (
                            <div className="h-px bg-border/50 my-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                      {getCurrentPost()}
                    </p>
                  )}
                </div>

                {/* Character count for Twitter */}
                {platform === 'twitter' && (
                  <div className="text-xs text-muted-foreground text-right">
                    {getCurrentPost().length} characters
                    {getCurrentPost().length > 280 && (
                      <span className="text-destructive ml-2">
                        (Exceeds single tweet limit - use thread format)
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Regenerate Button */}
              <button
                onClick={generateSocialPost}
                disabled={isLoading}
                className="w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-muted/60 hover:bg-muted border border-border/50 hover:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Regenerating...
                  </span>
                ) : (
                  'Regenerate'
                )}
              </button>
            </div>
          )}

          {!socialPost && !isLoading && !error && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Click the button above to generate a social media post</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
