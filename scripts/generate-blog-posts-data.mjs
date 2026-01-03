#!/usr/bin/env node

/**
 * Generate blog-posts.ts from scraped data
 * This processes Firecrawl scraped data and creates the TypeScript data file
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
  if (!dateStr) return '';
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
  const lowerContent = (content || '').toLowerCase();
  const lowerTitle = (title || '').toLowerCase();
  
  const techKeywords = {
    'WordPress': ['wordpress', 'wp', 'wp-cli', 'wpcli'],
    'PHP': ['php'],
    'Magento': ['magento'],
    'Linux': ['linux', 'ssh', 'bash', 'cron', 'whm', 'cpanel'],
    'jQuery': ['jquery', 'javascript'],
    'MySQL': ['mysql', 'database', 'mysqldump'],
    'Apache': ['apache'],
    'Gravity Forms': ['gravity forms', 'clamav'],
    'Laravel': ['laravel'],
    'Bootstrap': ['bootstrap'],
    'Development': ['development', 'code', 'script'],
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
  if (!content) return '';
  let cleaned = content.replace(/### Navigation[\s\S]*?(?=\n\n|$)/g, '');
  cleaned = cleaned.replace(/\[@[\w]+\]\([^\)]+\)/g, '');
  cleaned = cleaned.replace(/\[[\w\.@]+\]\((?:mailto|tel):[^\)]+\)/g, '');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  return cleaned.trim();
}

/**
 * Process scraped post data
 */
function processPost(scrapedData, metadata) {
  const { markdown, metadata: meta } = scrapedData;
  const slug = getSlugFromUrl(meta?.url || metadata.url);
  const content = cleanContent(markdown || '');
  const wordCount = calculateWordCount(content);
  const readingTime = calculateReadingTime(wordCount);
  const firstImage = extractFirstImage(content);
  const featuredImage = meta?.ogImage || meta?.ogImage || firstImage;
  
  // Extract title (remove " - Kris Chase" suffix if present)
  let title = meta?.title || meta?.ogTitle || '';
  title = title.replace(/\s*-\s*Kris Chase\s*$/, '').trim();
  
  // Get description
  const description = (meta?.ogDescription || meta?.description || '').replace(/\s*…\s*Continued\s*$/, '').trim();
  
  // Parse dates
  const publishedDate = parseDate(meta?.publishedTime || metadata.date);
  const updatedDate = meta?.modifiedTime ? parseDate(meta.modifiedTime) : undefined;
  const isUpdated = updatedDate && updatedDate !== publishedDate;
  
  // Extract tags
  const tags = extractTags(metadata.category, title, content);
  
  return {
    slug,
    url: meta?.url || metadata.url,
    title,
    description,
    content,
    category: metadata.category,
    tags,
    publishedDate,
    originalDate: metadata.date,
    featuredImage,
    firstImage,
    seo: {
      metaTitle: meta?.title,
      metaDescription: meta?.description,
      ogTitle: meta?.ogTitle,
      ogDescription: meta?.ogDescription,
      ogImage: meta?.ogImage,
      twitterCard: meta?.['twitter:card'],
    },
    readingTime,
    wordCount,
    author: {
      name: 'Kris Chase',
      twitter: '@krisrchase',
      email: 'hey@mehh.org',
    },
    metadata: {
      updatedDate,
      isUpdated,
    },
  };
}

/**
 * Format TypeScript array
 */
function formatTypeScriptArray(posts) {
  // Sort by published date (newest first)
  const sorted = [...posts].sort((a, b) => {
    return new Date(b.publishedDate) - new Date(a.publishedDate);
  });
  
  const formatted = sorted.map((post, index) => {
    const indent = '  ';
    const comma = index < sorted.length - 1 ? ',' : '';
    
    return `${indent}{\n${indent}  slug: '${post.slug}',\n${indent}  url: '${post.url}',\n${indent}  title: '${post.title.replace(/'/g, "\\'")}',\n${indent}  description: '${post.description.replace(/'/g, "\\'")}',\n${indent}  content: ${JSON.stringify(post.content).replace(/\\n/g, '\\n')},\n${indent}  category: '${post.category}',\n${indent}  tags: [${post.tags.map(t => `'${t}'`).join(', ')}],\n${indent}  publishedDate: '${post.publishedDate}',\n${indent}  originalDate: '${post.originalDate}',\n${indent}  ${post.featuredImage ? `featuredImage: '${post.featuredImage}',` : ''}\n${indent}  ${post.firstImage ? `firstImage: '${post.firstImage}',` : ''}\n${indent}  seo: {\n${indent}    ${post.seo.metaTitle ? `metaTitle: '${post.seo.metaTitle.replace(/'/g, "\\'")}',` : ''}\n${indent}    ${post.seo.metaDescription ? `metaDescription: '${post.seo.metaDescription.replace(/'/g, "\\'")}',` : ''}\n${indent}    ${post.seo.ogTitle ? `ogTitle: '${post.seo.ogTitle.replace(/'/g, "\\'")}',` : ''}\n${indent}    ${post.seo.ogDescription ? `ogDescription: '${post.seo.ogDescription.replace(/'/g, "\\'")}',` : ''}\n${indent}    ${post.seo.ogImage ? `ogImage: '${post.seo.ogImage}',` : ''}\n${indent}    ${post.seo.twitterCard ? `twitterCard: '${post.seo.twitterCard}',` : ''}\n${indent}  },\n${indent}  readingTime: ${post.readingTime},\n${indent}  wordCount: ${post.wordCount},\n${indent}  author: {\n${indent}    name: '${post.author.name}',\n${indent}    twitter: '${post.author.twitter}',\n${indent}    email: '${post.author.email}',\n${indent}  },\n${indent}  metadata: {\n${indent}    ${post.metadata.updatedDate ? `updatedDate: '${post.metadata.updatedDate}',` : ''}\n${indent}    ${post.metadata.isUpdated ? `isUpdated: ${post.metadata.isUpdated},` : ''}\n${indent}  },\n${indent}}${comma}`;
  }).join('\n');
  
  return formatted;
}

export { processPost, formatTypeScriptArray, getSlugFromUrl, parseDate, extractFirstImage, calculateWordCount, calculateReadingTime, extractTags, cleanContent };

