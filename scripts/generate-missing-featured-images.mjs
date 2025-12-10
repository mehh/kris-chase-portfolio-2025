#!/usr/bin/env node

/**
 * Script to help generate featured images for blog posts using Nano-banana MCP
 * 
 * This script:
 * 1. Identifies posts missing featured images
 * 2. Generates prompts for each post
 * 3. Provides instructions for using Nano-banana MCP to generate images
 * 4. Can update the blog-posts.ts file once images are generated
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read blog posts file
const blogPostsPath = join(__dirname, '..', 'src', 'data', 'blog-posts.ts');
const blogPostsContent = readFileSync(blogPostsPath, 'utf-8');

// Extract posts missing featured images
const postsWithoutImages = [];
const sections = blogPostsContent.split(/(?=slug:\s*')/g);

for (const section of sections) {
  if (!section.includes('slug:')) continue;
  
  const slugMatch = section.match(/slug:\s*'([^']+)'/);
  if (!slugMatch) continue;
  const slug = slugMatch[1];
  
  const titleMatch = section.match(/title:\s*'([^']+)'/);
  if (!titleMatch) continue;
  const title = titleMatch[1].replace(/\\'/g, "'");
  
  const descMatch = section.match(/description:\s*'([^']+)'/);
  const description = descMatch ? descMatch[1].replace(/\\'/g, "'") : '';
  
  const contentMatch = section.match(/content:\s*`([^`]+)`/s);
  const content = contentMatch ? contentMatch[1].substring(0, 500) : '';
  
  const categoryMatch = section.match(/category:\s*'([^']+)'/);
  const category = categoryMatch ? categoryMatch[1] : '';
  
  const tagsMatch = section.match(/tags:\s*\[([^\]]+)\]/);
  const tags = tagsMatch 
    ? tagsMatch[1]
        .split(',')
        .map(t => t.trim().replace(/['"]/g, ''))
        .filter(t => t)
    : [];
  
  const imageMatch = section.match(/featuredImage:\s*(?:'([^']+)'|undefined)/);
  const featuredImage = imageMatch && imageMatch[1] ? imageMatch[1] : null;
  
  // Check if missing or is placeholder
  const isPlaceholder = featuredImage && (
    featuredImage === 'https://krischase.com/images/KrisChase-OG.png' ||
    (featuredImage.startsWith('https://krischase.com/images/') && featuredImage.endsWith('.jpg'))
  );
  
  if (!featuredImage || isPlaceholder) {
    postsWithoutImages.push({
      slug,
      title,
      description,
      content,
      category,
      tags,
    });
  }
}

/**
 * Generate image prompt for a blog post
 */
function generateImagePrompt(post) {
  return `A modern, professional tech blog featured image for "${post.title}". 

Theme: ${post.description}

Category: ${post.category}
Tags: ${post.tags.join(', ')}

Style requirements:
- Abstract, conceptual design
- Professional and modern aesthetic
- Tech/engineering focused
- Dark mode friendly with excellent contrast
- 16:9 aspect ratio suitable for blog headers
- Subtle gradients and geometric elements
- Visually striking and memorable
- No text overlays, pure visual design`;
}

/**
 * Update blog post with new featured image
 */
let currentBlogPostsContent = blogPostsContent;

function updateBlogPost(slug, imageUrl) {
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Pattern 1: featuredImage exists - replace it
  let pattern = new RegExp(
    `(slug:\\s*'${escapedSlug}',[\\s\\S]*?)(featuredImage:\\s*'[^']+')`,
    'g'
  );
  
  let updated = currentBlogPostsContent.replace(pattern, `$1featuredImage: '${imageUrl}'`);
  
  // Pattern 2: featuredImage doesn't exist, add it after originalDate
  if (updated === currentBlogPostsContent) {
    pattern = new RegExp(
      `(slug:\\s*'${escapedSlug}',[\\s\\S]*?originalDate:\\s*'[^']+',)([\\s\\S]*?)(seo:)`,
      'g'
    );
    updated = updated.replace(pattern, `$1\n    featuredImage: '${imageUrl}',\n$2$3`);
  }
  
  if (updated !== currentBlogPostsContent) {
    currentBlogPostsContent = updated;
    writeFileSync(blogPostsPath, updated, 'utf-8');
    console.log(`✅ Updated ${slug} with image: ${imageUrl}`);
    return true;
  } else {
    console.log(`⚠️  Could not update ${slug} - pattern not found`);
    return false;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log(`📝 Found ${postsWithoutImages.length} posts without featured images\n`);
  
  if (postsWithoutImages.length === 0) {
    console.log('✨ All posts have featured images!');
    return;
  }
  
  console.log('📋 Posts needing featured images:\n');
  
  for (let i = 0; i < postsWithoutImages.length; i++) {
    const post = postsWithoutImages[i];
    const prompt = generateImagePrompt(post);
    
    console.log(`\n[${i + 1}/${postsWithoutImages.length}] ${post.title}`);
    console.log(`Slug: ${post.slug}`);
    console.log(`\nPrompt for Nano-banana:`);
    console.log(prompt);
    console.log('\n---');
  }
  
  console.log('\n\n📝 Instructions:');
  console.log('1. Use the Nano-banana MCP generate_image tool with each prompt above');
  console.log('2. Save the generated image URLs');
  console.log('3. Run this script with --update flag and provide image URLs');
  console.log('\n💡 Example: node scripts/generate-missing-featured-images.mjs --update');
  console.log('   Then follow the prompts to enter image URLs for each post.\n');
}

// Check for --update flag
if (process.argv.includes('--update')) {
  console.log('🔄 Update mode - Enter image URLs for each post:\n');
  
  for (const post of postsWithoutImages) {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    await new Promise((resolve) => {
      readline.question(`Enter image URL for "${post.title}" (or press Enter to skip): `, (url) => {
        if (url.trim()) {
          updateBlogPost(post.slug, url.trim());
        }
        readline.close();
        resolve();
      });
    });
  }
  
  console.log('\n✅ Update complete!');
} else {
  main().catch(console.error);
}

