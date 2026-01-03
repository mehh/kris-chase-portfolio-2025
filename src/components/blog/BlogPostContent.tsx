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
import { isMDXContent } from '@/lib/mdx-renderer';
import { MDXContent } from './MDXContent';

interface BlogPostContentProps {
  content: string;
}

/**
 * Renders markdown or MDX blog post content with syntax highlighting and proper formatting
 * Automatically detects MDX content (contains JSX/component syntax) and renders accordingly
 */
export function BlogPostContent({ content }: BlogPostContentProps) {
  const isMDX = isMDXContent(content);
  
  // If content is MDX, use MDX renderer
  if (isMDX) {
    return <MDXContent content={content} />;
  }

  // Otherwise, render as markdown
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
      'prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight',
      'prose-h1:text-5xl prose-h1:md:text-6xl prose-h1:mb-8 prose-h1:mt-16 prose-h1:leading-tight',
      'prose-h2:text-4xl prose-h2:md:text-5xl prose-h2:mb-6 prose-h2:mt-14 prose-h2:leading-tight',
      'prose-h3:text-3xl prose-h3:md:text-4xl prose-h3:mb-5 prose-h3:mt-12 prose-h3:leading-snug',
      'prose-h4:text-2xl prose-h4:md:text-3xl prose-h4:mb-4 prose-h4:mt-10 prose-h4:leading-snug',
      'prose-p:text-lg prose-p:md:text-xl prose-p:text-foreground/95 prose-p:leading-relaxed prose-p:my-6',
      'prose-strong:text-foreground prose-strong:font-bold prose-strong:text-xl',
      'prose-code:text-foreground prose-code:text-base',
      'prose-pre:bg-muted/50 prose-pre:border-2 prose-pre:border-border prose-pre:rounded-xl prose-pre:shadow-lg',
      'prose-blockquote:border-l-4 prose-blockquote:border-primary/60 prose-blockquote:bg-muted/40 prose-blockquote:italic prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:my-8',
      'prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:decoration-2',
      'prose-img:rounded-xl prose-img:shadow-2xl prose-img:border prose-img:border-border/50',
      'prose-ul:list-disc prose-ol:list-decimal prose-ul:my-6 prose-ol:my-6',
      'prose-li:text-foreground/95 prose-li:text-lg prose-li:md:text-xl prose-li:leading-relaxed prose-li:my-3',
      'prose-hr:border-border/50 prose-hr:my-12',
      'prose-table:w-full prose-table:my-8 prose-table:border-collapse',
      'prose-th:bg-muted/50 prose-th:border prose-th:border-border prose-th:p-4 prose-th:font-semibold',
      'prose-td:border prose-td:border-border prose-td:p-4'
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
              <div className="my-12 -mx-4 sm:mx-0">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted shadow-2xl border-2 border-border/50">
                  <Image
                    src={srcString}
                    alt={alt || ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                    unoptimized={isExternal}
                  />
                  {alt && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                      <p className="text-sm text-white/90 font-medium">{alt}</p>
                    </div>
                  )}
                </div>
            </div>
            );
          },
          // Custom heading components with IDs and enhanced styling
          h1: ({ children, ...props }) => {
            const text = String(children);
            const id = headings.find((h) => h.text === text)?.id || 
              text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            return (
              <h1 id={id} className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl mt-16 mb-8 scroll-mt-32 leading-tight tracking-tight text-foreground" {...props}>
                {children}
              </h1>
            );
          },
          h2: ({ children, ...props }) => {
            const text = String(children);
            const id = headings.find((h) => h.text === text)?.id || 
              text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            return (
              <h2 id={id} className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mt-14 mb-6 scroll-mt-32 leading-tight tracking-tight text-foreground border-b border-border/30 pb-4" {...props}>
                {children}
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            const text = String(children);
            const id = headings.find((h) => h.text === text)?.id || 
              text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            return (
              <h3 id={id} className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl mt-12 mb-5 scroll-mt-32 leading-snug tracking-tight text-foreground" {...props}>
                {children}
              </h3>
            );
          },
          h4: ({ children, ...props }) => {
            const text = String(children);
            const id = headings.find((h) => h.text === text)?.id || 
              text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            return (
              <h4 id={id} className="font-heading font-semibold text-2xl md:text-3xl lg:text-4xl mt-10 mb-4 scroll-mt-32 leading-snug tracking-tight text-foreground" {...props}>
                {children}
              </h4>
            );
          },
          // Custom code block styling with enhanced appearance
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              <code
                className="px-2 py-1 rounded-md bg-muted/80 text-base font-mono text-foreground border border-border/50"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children, ...props }) => (
            <div className="my-8 -mx-4 sm:mx-0 overflow-hidden rounded-xl shadow-lg">
              <pre
                className="overflow-x-auto p-6 bg-muted/60 border-2 border-border backdrop-blur-sm text-base leading-relaxed"
                {...props}
              >
                {children}
              </pre>
            </div>
          ),
          // Custom blockquote styling with enhanced design
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-primary/60 pl-8 py-6 my-8 italic text-lg text-foreground/90 bg-muted/40 rounded-r-xl shadow-sm relative"
              {...props}
            >
              <div className="absolute top-4 left-4 text-4xl text-primary/20 font-serif leading-none">&quot;</div>
              <div className="relative z-10">{children}</div>
            </blockquote>
          ),
          // Custom link styling with better visibility
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 decoration-2 transition-all hover:decoration-primary/60"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),
          // Custom list styling with better spacing
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-outside ml-8 my-8 space-y-4 text-lg md:text-xl" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-outside ml-8 my-8 space-y-4 text-lg md:text-xl" {...props}>
              {children}
            </ol>
          ),
          // Enhanced paragraph spacing and typography
          p: ({ children, ...props }) => (
            <p className="my-6 leading-relaxed text-lg md:text-xl text-foreground/95" {...props}>
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

