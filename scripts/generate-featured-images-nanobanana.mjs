#!/usr/bin/env node

/**
 * Generate featured images for blog posts using Nano-banana MCP
 * This script uses the Nano-banana MCP server to generate images
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

console.log(`📝 Found ${postsWithoutImages.length} posts without featured images\n`);

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
 * Note: This script outputs the prompts and instructions for using Nano-banana MCP
 * The actual image generation should be done via the MCP server
 */
async function main() {
  console.log('🎨 Featured Image Generation Guide\n');
  console.log('This script identifies posts needing images.');
  console.log('Use the Nano-banana MCP to generate images for each post.\n');
  
  console.log('Posts that need featured images:\n');
  
  for (let i = 0; i < postsWithoutImages.length; i++) {
    const post = postsWithoutImages[i];
    const prompt = generateImagePrompt(post);
    
    console.log(`\n[${i + 1}/${postsWithoutImages.length}] ${post.title}`);
    console.log(`Slug: ${post.slug}`);
    console.log(`Prompt: ${prompt}`);
    console.log('---');
  }
  
  console.log('\n📋 Instructions:');
  console.log('1. Use the Nano-banana MCP generate_image tool for each post above');
  console.log('2. Save the generated image URLs');
  console.log('3. Update the blog-posts.ts file with the image URLs');
  console.log('\n💡 Tip: You can use the updateBlogPost function in this script');
  console.log('   after generating images to automatically update the file.\n');
}

main().catch(console.error);

