#!/usr/bin/env node

/**
 * Process scraped blog post data and generate blog-posts.ts
 * This script takes scraped data and formats it into the TypeScript data file
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper functions
function getSlugFromUrl(url) {
  const match = url.match(/https?:\/\/wp\.krischase\.com\/([^\/]+)\/?$/);
  return match ? match[1] : url.split('/').filter(Boolean).pop();
}

function parseDate(dateStr) {
  if (dateStr.includes('T')) {
    return dateStr.split('T')[0];
  }
  if (dateStr.includes('.')) {
    const [year, month, day] = dateStr.split('.');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return dateStr;
}

function extractFirstImage(content) {
  const match = content.match(/!\[.*?\]\((https?:\/\/[^\)]+)\)/);
  return match ? match[1] : undefined;
}

function calculateWordCount(content) {
  const text = content
    .replace(/[#*`\[\]()]/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/!\[.*?\]\([^\)]+\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}

function calculateReadingTime(wordCount) {
  const wordsPerMinute = 225;
  return Math.ceil(wordCount / wordsPerMinute);
}

function extractTags(category, title, content) {
  const tags = [category];
  const lowerContent = content.toLowerCase();
  const lowerTitle = title.toLowerCase();
  
  const techKeywords = {
    'WordPress': ['wordpress', 'wp'],
    'PHP': ['php'],
    'Magento': ['magento'],
    'Linux': ['linux', 'ssh', 'bash'],
    'jQuery': ['jquery', 'javascript'],
    'MySQL': ['mysql', 'database'],
    'Apache': ['apache'],
    'Gravity Forms': ['gravity forms'],
    'Laravel': ['laravel'],
  };
  
  for (const [tag, keywords] of Object.entries(techKeywords)) {
    if (keywords.some(kw => lowerContent.includes(kw) || lowerTitle.includes(kw))) {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    }
  }
  
  return tags;
}

function cleanContent(content) {
  let cleaned = content.replace(/### Navigation[\s\S]*?(?=\n\n|$)/g, '');
  cleaned = cleaned.replace(/\[@[\w]+\]\([^\)]+\)/g, '');
  cleaned = cleaned.replace(/\[[\w\.@]+\]\((?:mailto|tel):[^\)]+\)/g, '');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  return cleaned.trim();
}

/**
 * Process a scraped post and return formatted BlogPost object
 */
export function processScrapedPost(scrapedData, metadata) {
  const { markdown, metadata: meta } = scrapedData;
  const slug = getSlugFromUrl(meta.url || metadata.url);
  const content = cleanContent(markdown || '');
  const wordCount = calculateWordCount(content);
  const readingTime = calculateReadingTime(wordCount);
  const firstImage = extractFirstImage(content);
  const featuredImage = meta.ogImage || meta.ogImage || firstImage;
  
  // Extract title (remove " - Kris Chase" suffix if present)
  let title = meta.title || meta.ogTitle || '';
  title = title.replace(/\s*-\s*Kris Chase\s*$/, '').trim();
  
  // Get description
  const description = meta.ogDescription || meta.description || '';
  
  // Parse dates
  const publishedDate = parseDate(meta.publishedTime || metadata.date);
  const updatedDate = meta.modifiedTime ? parseDate(meta.modifiedTime) : undefined;
  const isUpdated = updatedDate && updatedDate !== publishedDate;
  
  // Extract tags
  const tags = extractTags(metadata.category, title, content);
  
  return {
    slug,
    url: meta.url || metadata.url,
    title,
    description: description.replace(/\s*…\s*Continued\s*$/, '').trim(),
    content,
    category: metadata.category,
    tags,
    publishedDate,
    originalDate: metadata.date,
    featuredImage,
    firstImage,
    seo: {
      metaTitle: meta.title,
      metaDescription: meta.description,
      ogTitle: meta.ogTitle,
      ogDescription: meta.ogDescription,
      ogImage: meta.ogImage,
      twitterCard: meta['twitter:card'],
    },
    readingTime,
    wordCount,
    author: {
      name: 'Kris Chase',
      twitter: '@chasebadkids',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate,
      isUpdated,
    },
  };
}

/**
 * Generate TypeScript file content
 */
export function generateTypeScriptFile(posts) {
  // Sort by published date (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.publishedDate) - new Date(a.publishedDate);
  });
  
  const postsJson = JSON.stringify(sortedPosts, null, 2)
    .replace(/"(\w+)":/g, '$1:')
    .replace(/"/g, "'")
    .replace(/'/g, "'");
  
  return `/**
 * Blog posts scraped from wp.krischase.com/journal/
 * This file is auto-generated - do not edit manually
 * Last updated: ${new Date().toISOString()}
 */

import type { BlogPost } from './blog-posts';

export const blogPosts: BlogPost[] = ${postsJson};
`;
}

