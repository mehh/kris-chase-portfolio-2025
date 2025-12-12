'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { BlogPost } from '@/data/blog-posts';
import { cn } from '@/lib/utils';

interface AISummaryProps {
  post: BlogPost;
}

interface SummaryData {
  keyTakeaways: string[];
  summary: string;
}

export function AISummary({ post }: AISummaryProps) {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const fetchSummary = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/blog/summary', {
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
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      setSummary(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load summary');
      console.error('Error fetching AI summary:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if summary doesn't exist
    if (!summary && !isLoading && !error) {
      fetchSummary();
    }
  }, []);

  if (error && !summary) {
    // Silently fail - don't show error UI, just don't render
    return null;
  }

  return (
    <div className="my-12 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-primary/10 backdrop-blur-sm p-6 md:p-8 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-xl text-foreground">
              AI-Generated Summary
            </h3>
            <p className="text-sm text-muted-foreground">
              Key insights from this article
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {isLoading && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating insights...</span>
            </div>
          )}

          {summary && (
            <>
              {summary.keyTakeaways && summary.keyTakeaways.length > 0 && (
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-foreground">
                    Key Takeaways
                  </h4>
                  <ul className="space-y-2">
                    {summary.keyTakeaways.map((takeaway, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-foreground/90"
                      >
                        <span className="text-primary font-bold mt-1">•</span>
                        <span className="leading-relaxed">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {summary.summary && (
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-foreground">
                    Summary
                  </h4>
                  <p className="text-foreground/90 leading-relaxed">
                    {summary.summary}
                  </p>
                </div>
              )}
            </>
          )}

          {error && summary && (
            <p className="text-sm text-muted-foreground italic">
              Note: Some content may not be available
            </p>
          )}
        </div>
      )}
    </div>
  );
}
