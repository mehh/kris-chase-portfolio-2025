#!/usr/bin/env node

/**
 * Script to scrape all blog posts using Firecrawl MCP
 * This script should be run with access to Firecrawl MCP tools
 * 
 * Usage: This is a template - you'll need to integrate with Firecrawl MCP
 * or use the Firecrawl API directly
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Blog post URLs and metadata
const blogPosts = [
  { url: 'https://wp.krischase.com/updated-how-to-find-and-clean-up-infected-wordpress-files-over-ssh/', category: 'Linux', date: '2020.05.02' },
  { url: 'https://wp.krischase.com/find-user-used-coupon-code-magento/', category: 'Development', date: '2016.06.02' },
  { url: 'https://wp.krischase.com/use-wpcli-and-cron-to-unpublish-wordpress-page/', category: 'Development', date: '2016.05.14' },
  { url: 'https://wp.krischase.com/easily-monitor-uptime-on-whm-cpanel-server-with-uptimerobot/', category: 'Development', date: '2016.05.06' },
  { url: 'https://wp.krischase.com/remove-visual-composer-excerpt/', category: 'Development', date: '2016.05.04' },
  { url: 'https://wp.krischase.com/robotsdeploy/', category: 'Development', date: '2016.04.19' },
  { url: 'https://wp.krischase.com/force-non-legacy-backup-start-whmcpanel/', category: 'Uncategorized', date: '2016.02.02' },
  { url: 'https://wp.krischase.com/wordpress-bash-scripts/', category: 'Development', date: '2016.01.22' },
  { url: 'https://wp.krischase.com/black-friday-deals-for-web-developers/', category: 'Bootstrap', date: '2015.11.26' },
  { url: 'https://wp.krischase.com/optimize-all-images-within-current-directory/', category: 'Development', date: '2015.10.12' },
  { url: 'https://wp.krischase.com/how-to-migrate-magento-customers-and-orders/', category: 'Magento', date: '2015.09.16' },
  { url: 'https://wp.krischase.com/use-php-to-pull-users-instagram-feed/', category: 'Development', date: '2015.09.16' },
  { url: 'https://wp.krischase.com/tuning-and-benchmarking-apache-and-mysql/', category: 'Linux', date: '2015.09.10' },
  { url: 'https://wp.krischase.com/prevent-gmail-from-breaking-width-of-email-template/', category: 'Development', date: '2015.08.14' },
  { url: 'https://wp.krischase.com/find-all-files-touched-within-the-last-2-weeks/', category: 'PHP', date: '2015.07.10' },
  { url: 'https://wp.krischase.com/get-a-list-of-all-installed-magento-patches/', category: 'Magento', date: '2015.07.09' },
  { url: 'https://wp.krischase.com/find-text-between-tags-sublime-text/', category: 'Development', date: '2015.04.29' },
  { url: 'https://wp.krischase.com/laravel-force-https/', category: 'Uncategorized', date: '2015.03.31' },
  { url: 'https://wp.krischase.com/automatically-check-wpml-custom-field-checkboxes/', category: 'Development', date: '2015.02.20' },
  { url: 'https://wp.krischase.com/how-to-skip-fsck-after-reboot/', category: 'Development', date: '2015.01.30' },
  { url: 'https://wp.krischase.com/detect-and-prevent-malware-in-gravity-forms-file-upload-with-php-clamav/', category: 'Gravity Forms', date: '2015.01.07' },
  { url: 'https://wp.krischase.com/pull-youtube-description-into-wordpress-content/', category: 'Development', date: '2014.12.11' },
  { url: 'https://wp.krischase.com/how-to-find-and-clean-up-infected-wordpress-files-over-ssh/', category: 'PHP', date: '2014.11.28' },
  { url: 'https://wp.krischase.com/disable-all-mail-for-wordpress/', category: 'PHP', date: '2014.11.18' },
  { url: 'https://wp.krischase.com/create-options-pages-in-wordpress-with-advanced-custom-fields-acf/', category: 'PHP', date: '2014.10.29' },
  { url: 'https://wp.krischase.com/get-the-latest-post-id-in-wordpress/', category: 'PHP', date: '2014.10.29' },
  { url: 'https://wp.krischase.com/dynamically-add-parameters-to-the-end-of-all-wp_nav_menu/', category: 'PHP', date: '2014.10.28' },
  { url: 'https://wp.krischase.com/force-wordpress-user-to-logout-after-inactivity/', category: 'PHP', date: '2014.10.27' },
  { url: 'https://wp.krischase.com/set-wordpress-image-quality-to-high/', category: 'PHP', date: '2014.10.24' },
  { url: 'https://wp.krischase.com/how-to-create-custom-auto-generated-image-sizes-in-wordpress/', category: 'PHP', date: '2014.10.24' },
  { url: 'https://wp.krischase.com/remove-the-ability-to-edit-theme-in-wordpress-admin/', category: 'PHP', date: '2014.10.24' },
  { url: 'https://wp.krischase.com/social-media-sharing-links-without-using-a-plugin/', category: 'Uncategorized', date: '2014.10.23' },
  { url: 'https://wp.krischase.com/require-login-to-view-wordpress-site/', category: 'PHP', date: '2014.10.23' },
  { url: 'https://wp.krischase.com/how-to-grab-first-image-from-wordpress-post-content/', category: 'PHP', date: '2014.10.23' },
  { url: 'https://wp.krischase.com/how-to-load-jquery-in-wordpress-theme/', category: 'jQuery', date: '2014.10.21' },
];

/**
 * Extract slug from URL
 */
function getSlugFromUrl(url) {
  const match = url.match(/https?:\/\/wp\.krischase\.com\/([^\/]+)\/?$/);
  return match ? match[1] : url.split('/').filter(Boolean).pop();
}

/**
 * Parse date from various formats
 */
function parseDate(dateStr) {
  // Handle formats like "2020.05.02" or ISO strings
  if (dateStr.includes('T')) {
    return dateStr.split('T')[0];
  }
  if (dateStr.includes('.')) {
    const [year, month, day] = dateStr.split('.');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return dateStr;
}

/**
 * Extract first image from markdown content
 */
function extractFirstImage(content) {
  const match = content.match(/!\[.*?\]\((https?:\/\/[^\)]+)\)/);
  return match ? match[1] : undefined;
}

/**
 * Calculate word count from markdown
 */
function calculateWordCount(content) {
  const text = content
    .replace(/[#*`\[\]()]/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/!\[.*?\]\([^\)]+\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}

/**
 * Calculate reading time
 */
function calculateReadingTime(wordCount) {
  const wordsPerMinute = 225;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Extract tags from category and content
 */
function extractTags(category, title, content) {
  const tags = [category];
  const lowerContent = content.toLowerCase();
  const lowerTitle = title.toLowerCase();
  
  // Add technology tags based on content
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

/**
 * Clean markdown content - remove navigation and footer
 */
function cleanContent(content) {
  // Remove navigation sections
  let cleaned = content.replace(/### Navigation[\s\S]*?(?=\n\n|$)/g, '');
  // Remove social links at the end
  cleaned = cleaned.replace(/\[@[\w]+\]\([^\)]+\)/g, '');
  // Remove email/phone links
  cleaned = cleaned.replace(/\[[\w\.@]+\]\((?:mailto|tel):[^\)]+\)/g, '');
  // Clean up multiple newlines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  return cleaned.trim();
}

console.log(`Starting to scrape ${blogPosts.length} blog posts...`);
console.log('Note: This script requires Firecrawl API access or MCP integration.\n');

// This would be populated by actual scraping
// For now, export the structure
export { blogPosts, getSlugFromUrl, parseDate, extractFirstImage, calculateWordCount, calculateReadingTime, extractTags, cleanContent };

