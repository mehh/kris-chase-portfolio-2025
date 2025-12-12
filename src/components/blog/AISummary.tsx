'use client';

import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useStreamableText } from '@/lib/use-streamable-text';
import type { BlogPost } from '@/data/blog-posts';
import { cn } from '@/lib/utils';

interface AISummaryProps {
  post: BlogPost;
}

export function AISummary({ post }: AISummaryProps) {
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const { text, isStreaming } = useStreamableText(summary);

  const generateSummary = async () => {
    if (hasGenerated || isLoading) return;

    setIsLoading(true);
    setHasGenerated(true);

    try {
      const response = await fetch('/api/blog/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let accumulated = '';
      let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          if (chunk) {
            accumulated += chunk;
            setSummary(accumulated);
          }
        }
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummary('Unable to generate summary at this time.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasGenerated && !isLoading) {
    return (
      <div className="mt-12 p-6 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
              AI-Generated Summary
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get a quick overview and key takeaways from this article
            </p>
            <button
              onClick={generateSummary}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Generate Summary
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 p-6 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
            Key Takeaways
          </h3>
          {isLoading || isStreaming ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Generating summary...</span>
              </div>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <div className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {text || summary}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
