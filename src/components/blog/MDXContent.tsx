'use client';

import { useMemo, useState, useEffect } from 'react';
import { evaluate } from '@mdx-js/mdx';
import { MDXProvider } from '@mdx-js/react';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useMDXComponents } from '../../../mdx-components';
import { extractHeadings } from '@/lib/blog-utils';
import { cn } from '@/lib/utils';
import 'highlight.js/styles/github-dark.css';

// Import interactive components to make them available in MDX scope
import {
  InteractiveChart,
  InteractiveSlider,
  Calculator,
  ComparisonChart,
  DataTable,
  DebtReductionVisualization,
} from './MDXComponents';

// Import both runtimes - MDX will use the appropriate one based on development flag
import * as productionRuntime from 'react/jsx-runtime';
import * as developmentRuntime from 'react/jsx-dev-runtime';

interface MDXContentProps {
  content: string;
  className?: string;
}

/**
 * Renders MDX content from a string
 * This component compiles and renders MDX content at runtime
 */
export function MDXContent({ content, className }: MDXContentProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const headings = useMemo(() => extractHeadings(content), [content]);
  
  // Get base components and add our interactive components
  const baseComponents = useMDXComponents({});
  const components = {
    ...baseComponents,
    // Make interactive components available in MDX scope
    InteractiveChart,
    InteractiveSlider,
    Calculator,
    ComparisonChart,
    DataTable,
    DebtReductionVisualization,
  };

  useEffect(() => {
    let isMounted = true;

    async function compileMDX() {
      try {
        setIsLoading(true);
        setError(null);

        // Use the appropriate runtime based on environment
        // MDX requires jsxDEV in development mode, jsx in production
        const isDevelopment = process.env.NODE_ENV === 'development';
        
        // Check if development runtime has jsxDEV, otherwise use production
        const hasJsxDEV = 'jsxDEV' in developmentRuntime;
        const runtime = (isDevelopment && hasJsxDEV) 
          ? developmentRuntime 
          : productionRuntime;

        // Transform content to remove imports - components will be available via MDXProvider
        let transformedContent = content;
        
        // Remove import statements - components will be available via MDXProvider
        transformedContent = transformedContent.replace(
          /^import\s+.*?from\s+['"].*?['"];?\s*$/gm,
          ''
        );

        // Get baseUrl for module resolution
        // In browser, use current origin; fallback to file:// for local development
        const baseUrl = typeof window !== 'undefined' 
          ? window.location.origin 
          : typeof process !== 'undefined' && process.cwd
            ? `file://${process.cwd()}`
            : 'file:///';

        const { default: MDXComponent } = await evaluate(transformedContent, {
          ...runtime,
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight],
          development: isDevelopment,
          baseUrl,
        });

        if (isMounted) {
          setComponent(() => MDXComponent);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error compiling MDX:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to compile MDX');
          setIsLoading(false);
        }
      }
    }

    compileMDX();

    return () => {
      isMounted = false;
    };
  }, [content]);

  // Add IDs to headings after render
  useEffect(() => {
    if (!Component) return;

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (!element) {
        const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        allHeadings.forEach((el) => {
          if (el.textContent?.trim() === heading.text && !el.id) {
            el.id = heading.id;
          }
        });
      }
    });
  }, [Component, headings]);

  if (isLoading) {
    return (
      <div className={cn('w-full py-8 text-center text-muted-foreground', className)}>
        Loading content...
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('w-full p-4 rounded-lg bg-destructive/10 border border-destructive text-destructive', className)}>
        <p className="font-semibold">Error rendering MDX content</p>
        <p className="text-sm mt-2">{error}</p>
      </div>
    );
  }

  if (!Component) {
    return null;
  }

  return (
    <div
      className={cn(
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
        'prose-td:border prose-td:border-border prose-td:p-4',
        className
      )}
    >
      <MDXProvider components={components}>
        <Component />
      </MDXProvider>
    </div>
  );
}

