"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import { BlogPost } from "@/data/blog-posts";

// Import highlight.js styles - using a dark theme that works in both light and dark modes
import "highlight.js/styles/github-dark.css";

interface PostContentProps {
  content: string;
  post: BlogPost;
}

export function PostContent({ content, post }: PostContentProps) {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          // Custom image component with Next.js Image optimization
          img: ({ node, src, alt, ...props }) => {
            if (!src || typeof src !== 'string') return null;
            const srcString = src as string;
            
            return (
              <div className="my-8 -mx-4 sm:mx-0">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={srcString}
                    alt={alt || post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    unoptimized={srcString.startsWith('http://') || srcString.startsWith('https://')}
                  />
                </div>
              </div>
            );
          },
          // Enhanced code blocks
          code: ({ className, children, ...props }: React.ComponentPropsWithoutRef<'code'>) => {
            const match = /language-(\w+)/.exec(className || '');
            const inline = !match || !className?.includes('language-');
            return !inline && match ? (
              <div className="relative my-6">
                <div className="absolute top-2 right-2 text-xs text-muted-foreground font-mono">
                  {match[1]}
                </div>
                <pre className="rounded-lg bg-gray-900 p-4 overflow-x-auto">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            ) : (
              <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono" {...props}>
                {children}
              </code>
            );
          },
          // Enhanced blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#96442e] pl-6 py-2 my-6 italic text-muted-foreground bg-muted/30 rounded-r-lg">
              {children}
            </blockquote>
          ),
          // Enhanced headings with anchor links
          h2: ({ children }) => (
            <h2 className="font-heading text-3xl font-bold mt-12 mb-4 text-foreground scroll-mt-20" id={String(children).toLowerCase().replace(/\s+/g, '-')}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-heading text-2xl font-semibold mt-8 mb-3 text-foreground scroll-mt-20" id={String(children).toLowerCase().replace(/\s+/g, '-')}>
              {children}
            </h3>
          ),
          // Enhanced lists
          ul: ({ children }) => (
            <ul className="my-4 space-y-2 list-disc list-inside marker:text-[#96442e]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 space-y-2 list-decimal list-inside marker:text-[#96442e]">
              {children}
            </ol>
          ),
          // Enhanced links
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-[#96442e] hover:text-[#b46633] underline underline-offset-2 transition-colors"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

