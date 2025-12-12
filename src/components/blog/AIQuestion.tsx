'use client';

import { useState } from 'react';
import { MessageCircle, Send, Loader2, X } from 'lucide-react';
import { useStreamableText } from '@/lib/use-streamable-text';
import type { BlogPost } from '@/data/blog-posts';
import { cn } from '@/lib/utils';

interface AIQuestionProps {
  post: BlogPost;
}

export function AIQuestion({ post }: AIQuestionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { text, isStreaming } = useStreamableText(answer);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    setAnswer('');

    try {
      const response = await fetch('/api/blog/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post, question: question.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to get answer');
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
            setAnswer(accumulated);
          }
        }
      }
    } catch (error) {
      console.error('Error getting answer:', error);
      setAnswer('Unable to answer your question at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-110"
        aria-label="Ask a question about this article"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-40 w-96 max-w-[calc(100vw-2rem)] rounded-xl border-2 border-border bg-card shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Ask About This Article
          </h3>
        </div>
        <button
          onClick={() => {
            setIsOpen(false);
            setQuestion('');
            setAnswer('');
          }}
          className="p-1 rounded-lg hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
        {/* Answer Display */}
        {answer && (
          <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
            <div className="prose prose-sm max-w-none text-foreground/90">
              {isStreaming ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{text || answer}</div>
              )}
            </div>
          </div>
        )}

        {/* Question Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about this article..."
            className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            rows={3}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!question.trim() || isLoading}
            className={cn(
              'w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
              question.trim() && !isLoading
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Asking...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Ask Question</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
