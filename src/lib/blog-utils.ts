/**
 * Blog utility functions for formatting dates, calculating reading time, etc.
 */

/**
 * Format a date string (YYYY-MM-DD) to a human-readable format
 */
export function formatBlogDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Format a date string to a relative time (e.g., "2 days ago", "3 months ago")
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }
  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }
  const years = Math.floor(diffInDays / 365);
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
}

/**
 * Extract headings from markdown content for table of contents
 */
export function extractHeadings(content: string): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{ id: string; text: string; level: number }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    headings.push({ id, text, level });
  }

  return headings;
}

/**
 * Generate a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Get category display name (capitalize, handle special cases)
 */
export function getCategoryDisplayName(category: string): string {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Format a date string to a human-readable format
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @param format - 'long' (January 1, 2020) or 'short' (Jan 1, 2020)
 */
export function formatDate(dateString: string, format: 'long' | 'short' = 'long'): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString; // Return original if invalid
  }

  const options: Intl.DateTimeFormatOptions = 
    format === 'long'
      ? { year: 'numeric', month: 'long', day: 'numeric' }
      : { year: 'numeric', month: 'short', day: 'numeric' };

  return date.toLocaleDateString('en-US', options);
}

const DEFAULT_BLOG_IMAGE = 'https://krischase.com/images/KrisChase-OG.png';

/**
 * Get the featured image or first image from a blog post, with fallback to default
 */
export function getPostImage(post: { featuredImage?: string; firstImage?: string }): string {
  return post.featuredImage || post.firstImage || DEFAULT_BLOG_IMAGE;
}

/**
 * Generate canonical URL for a blog post
 */
export function getPostUrl(slug: string): string {
  return `https://krischase.com/blog/${slug}`;
}

/**
 * Find related posts based on shared tags and category
 * Returns posts sorted by relevance (most shared tags/category first)
 */
export function findRelatedPosts<T extends { slug: string; tags: string[]; category: string }>(
  currentPost: { slug: string; tags: string[]; category: string },
  allPosts: T[],
  limit: number = 3
): T[] {
  const related = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      // Calculate relevance score
      let score = 0;
      
      // Same category = 3 points
      if (post.category === currentPost.category) {
        score += 3;
      }
      
      // Each shared tag = 2 points
      const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
      score += sharedTags.length * 2;
      
      return { post, score };
    })
    .filter(({ score }) => score > 0) // Only include posts with some relevance
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .slice(0, limit)
    .map(({ post }) => post);

  return related;
}
