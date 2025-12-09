'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { extractHeadings } from '@/lib/blog-utils';
import Image from 'next/image';
import { useEffect } from 'react';
import 'highlight.js/styles/github-dark.css';
import { cn } from '@/lib/utils';

interface BlogPostContentProps {
  content: string;
}

/**
 * Renders markdown blog post content with syntax highlighting and proper formatting
 */
export function BlogPostContent({ content }: BlogPostContentProps) {
  const headings = extractHeadings(content);

  // Add IDs to headings in the rendered content
  useEffect(() => {
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (!element) {
        // Find heading by text content and add ID
        const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        allHeadings.forEach((el) => {
          if (el.textContent?.trim() === heading.text && !el.id) {
            el.id = heading.id;
          }
        });
      }
    });
  }, [headings]);

  return (
    <div className={cn(
      'prose prose-lg dark:prose-invert max-w-none',
      'prose-headings:font-heading prose-headings:font-bold',
      'prose-p:text-foreground/90 prose-p:leading-relaxed',
      'prose-strong:text-foreground prose-strong:font-semibold',
      'prose-code:text-foreground',
      'prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border',
      'prose-blockquote:border-primary/50 prose-blockquote:bg-muted/30 prose-blockquote:italic',
      'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
      'prose-img:rounded-lg prose-img:shadow-lg',
      'prose-ul:list-disc prose-ol:list-decimal',
      'prose-li:text-foreground/90'
    )}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Custom image component with Next.js Image optimization
          img: ({ src, alt, ...props }) => {
            if (!src || typeof src !== 'string') return null;
            const srcString = src as string;
            const isExternal = srcString.startsWith('http://') || srcString.startsWith('https://');
            return (
              <div className="my-8 -mx-4 sm:mx-0">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={srcString}
                    alt={alt || ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    unoptimized={isExternal}
                  />
                </div>
            </div>
            );
          },
          // Custom heading components with IDs
          h1: ({ children, ...props }) => {
            const text = String(children);
            const id = headings.find((h) => h.text === text)?.id || 
              text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            return (
              <h1 id={id} className="font-heading font-bold text-4xl md:text-5xl mt-12 mb-6 scroll-mt-24" {...props}>
                {children}
              </h1>
            );
          },
          h2: ({ children, ...props }) => {
            const text = String(children);
            const id = headings.find((h) => h.text === text)?.id || 
              text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            return (
              <h2 id={id} className="font-heading font-bold text-3xl md:text-4xl mt-10 mb-4 scroll-mt-24" {...props}>
                {children}
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            const text = String(children);
            const id = headings.find((h) => h.text === text)?.id || 
              text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            return (
              <h3 id={id} className="font-heading font-semibold text-2xl md:text-3xl mt-8 mb-3 scroll-mt-24" {...props}>
                {children}
              </h3>
            );
          },
          h4: ({ children, ...props }) => {
            const text = String(children);
            const id = headings.find((h) => h.text === text)?.id || 
              text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            return (
              <h4 id={id} className="font-heading font-semibold text-xl md:text-2xl mt-6 mb-2 scroll-mt-24" {...props}>
                {children}
              </h4>
            );
          },
          // Custom code block styling
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              <code
                className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono text-foreground"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children, ...props }) => (
            <div className="my-6 -mx-4 sm:mx-0 overflow-hidden rounded-lg">
              <pre
                className="overflow-x-auto p-4 bg-muted/50 border border-border"
                {...props}
              >
                {children}
              </pre>
            </div>
          ),
          // Custom blockquote styling
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-primary/50 pl-6 py-2 my-6 italic text-muted-foreground bg-muted/30 rounded-r"
              {...props}
            >
              {children}
            </blockquote>
          ),
          // Custom link styling
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),
          // Custom list styling
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-outside ml-6 my-4 space-y-2" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-outside ml-6 my-4 space-y-2" {...props}>
              {children}
            </ol>
          ),
          // Paragraph spacing
          p: ({ children, ...props }) => (
            <p className="my-4 leading-relaxed text-foreground/90" {...props}>
              {children}
            </p>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

