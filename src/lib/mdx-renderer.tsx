'use client';

import { useMemo } from 'react';

/**
 * Detects if content is MDX (contains JSX/component syntax)
 */
export function isMDXContent(content: string): boolean {
  // Check for JSX syntax patterns
  return /<[A-Z][a-zA-Z]*/.test(content) || /import\s+.*from/.test(content);
}

/**
 * Hook to check if content is MDX
 */
export function useMDXContent(content: string) {
  return useMemo(() => {
    const isMDX = isMDXContent(content);
    return { isMDX, content };
  }, [content]);
}

