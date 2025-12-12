/**
 * AI-powered utilities for blog features
 * Includes functions for generating summaries, finding related posts, and answering questions
 */

import type { BlogPost } from '@/data/blog-posts';
import { getBlogPosts } from '@/data/blog-posts';

/**
 * Calculate similarity between two posts based on tags, category, and content keywords
 */
function calculatePostSimilarity(post1: BlogPost, post2: BlogPost): number {
  if (post1.slug === post2.slug) return 0; // Don't include the same post

  let score = 0;

  // Category match (high weight)
  if (post1.category === post2.category) {
    score += 3;
  }

  // Tag matches (medium weight)
  const commonTags = post1.tags.filter((tag) => post2.tags.includes(tag));
  score += commonTags.length * 1.5;

  // Content similarity based on title/description keywords (low weight)
  const title1Words = new Set(
    post1.title.toLowerCase().split(/\s+/).filter((w) => w.length > 3)
  );
  const title2Words = new Set(
    post2.title.toLowerCase().split(/\s+/).filter((w) => w.length > 3)
  );
  const commonTitleWords = [...title1Words].filter((w) => title2Words.has(w));
  score += commonTitleWords.length * 0.5;

  return score;
}

/**
 * Find related posts based on similarity
 */
export function findRelatedPosts(
  currentPost: BlogPost,
  limit: number = 3
): BlogPost[] {
  const allPosts = getBlogPosts();
  const scoredPosts = allPosts
    .map((post) => ({
      post,
      score: calculatePostSimilarity(currentPost, post),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);

  return scoredPosts;
}

/**
 * Extract key terms from post content for AI context
 */
export function extractKeyTerms(post: BlogPost): string[] {
  const content = `${post.title} ${post.description} ${post.content}`.toLowerCase();
  const words = content.split(/\s+/);
  const wordFreq: Record<string, number> = {};

  words.forEach((word) => {
    const cleanWord = word.replace(/[^\w]/g, '');
    if (cleanWord.length > 4) {
      wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
    }
  });

  return Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
}
