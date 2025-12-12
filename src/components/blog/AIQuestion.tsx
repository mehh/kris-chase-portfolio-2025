'use client';

import { useState } from 'react';
import { MessageSquare, Send, Loader2, Sparkles, X } from 'lucide-react';
import { BlogPost } from '@/data/blog-posts';
import { cn } from '@/lib/utils';

interface AIQuestionProps {
  post: BlogPost;
}

export function AIQuestion({ post }: AIQuestionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const response = await fetch('/api/blog/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.trim(),
          articleTitle: post.title,
          articleContent: post.content,
          articleDescription: post.description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get answer');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let fullAnswer = '';
      setAnswer(''); // Start with empty to show streaming

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullAnswer += chunk;
        setAnswer(fullAnswer);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get answer');
      console.error('Error asking question:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setQuestion('');
    setAnswer(null);
    setError(null);
  };

  return (
    <div className="my-12">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-300',
          isOpen
            ? 'border-primary/50 bg-primary/5'
            : 'border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50'
        )}
        aria-label="Ask a question about this article"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-heading font-bold text-lg text-foreground">
              Ask a Question
            </h3>
            <p className="text-sm text-muted-foreground">
              Get AI-powered answers about this article
            </p>
          </div>
        </div>
        <MessageSquare
          className={cn(
            'w-5 h-5 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Expanded Content */}
      {isOpen && (
        <div className="mt-4 p-6 rounded-xl border-2 border-border/50 bg-card/30">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="ai-question"
                className="block text-sm font-medium text-foreground mb-2"
              >
                What would you like to know?
              </label>
              <textarea
                id="ai-question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g., Can you explain the main concept in simpler terms?"
                rows={3}
                className="w-full px-4 py-3 rounded-lg border-2 border-border/50 bg-background text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={!question.trim() || isLoading}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all',
                  question.trim() && !isLoading
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Thinking...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Ask</span>
                  </>
                )}
              </button>

              {(answer || error) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-3 rounded-lg border-2 border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all text-sm font-medium"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* Answer Display */}
          {answer && (
            <div className="mt-6 p-5 rounded-lg bg-muted/50 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-foreground">Answer</h4>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {answer}
                </p>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-5 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">
                {error}. Please try again.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
