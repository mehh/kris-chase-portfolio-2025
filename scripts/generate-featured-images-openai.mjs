#!/usr/bin/env node

/**
 * Generate featured images for blog posts using OpenAI DALL-E 3
 * This script generates images for posts missing featured images
 */

import OpenAI from 'openai';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY is not set in .env.local');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

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
 * Generate image prompt using OpenAI GPT-4
 */
async function generateImagePrompt(post) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are a creative director for a tech blog. Generate detailed, visual image prompts for blog post featured images.',
      },
      {
        role: 'user',
        content: `Generate a detailed image prompt for a blog post featured image.

Blog Post Details:
- Title: ${post.title}
- Description: ${post.description}
- Category: ${post.category}
- Tags: ${post.tags.join(', ')}
- Content Preview: ${post.content.substring(0, 500)}

Create a single, compelling image prompt (2-3 sentences) that would work well as a featured image for this blog post. The image should be:
- Professional and modern
- Tech/engineering focused
- Abstract or conceptual (not literal)
- Suitable for a blog header (16:9 aspect ratio)
- Dark mode friendly with good contrast
- Visually striking and memorable

Return ONLY the image prompt, nothing else. No explanations, no markdown, just the prompt text.`,
      },
    ],
    temperature: 0.8,
    max_tokens: 200,
  });

  return completion.choices[0]?.message?.content?.trim() || null;
}

/**
 * Generate image using DALL-E 3
 */
async function generateImage(prompt) {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      size: '1792x1024', // 16:9 aspect ratio
      quality: 'standard',
      n: 1,
    });

    return response.data[0].url;
  } catch (error) {
    console.error(`❌ Error generating image:`, error.message);
    return null;
  }
}

// Keep track of the current content for updates
let currentBlogPostsContent = blogPostsContent;

/**
 * Update blog post with new featured image
 */
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
  console.log('🎨 Starting image generation process...\n');
  
  if (postsWithoutImages.length === 0) {
    console.log('✨ All posts have featured images!');
    return;
  }
  
  for (let i = 0; i < postsWithoutImages.length; i++) {
    const post = postsWithoutImages[i];
    console.log(`\n[${i + 1}/${postsWithoutImages.length}] Processing: ${post.title}`);
    
    // Generate prompt with GPT-4
    console.log('  🤖 Generating image prompt with GPT-4...');
    const imagePrompt = await generateImagePrompt(post);
    
    if (!imagePrompt) {
      console.log('  ⚠️  Skipping due to prompt generation error');
      continue;
    }
    
    console.log(`  📝 Prompt: ${imagePrompt.substring(0, 100)}...`);
    
    // Generate image with DALL-E 3
    console.log('  🎨 Generating image with DALL-E 3...');
    const imageUrl = await generateImage(imagePrompt);
    
    if (!imageUrl) {
      console.log('  ⚠️  Skipping due to image generation error');
      continue;
    }
    
    // Update blog post
    updateBlogPost(post.slug, imageUrl);
    
    // Rate limiting - wait 2 seconds between requests
    if (i < postsWithoutImages.length - 1) {
      console.log('  ⏳ Waiting 2 seconds before next request...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\n✨ Image generation complete!');
  console.log('\n📝 Note: DALL-E images are hosted by OpenAI (temporary URLs).');
  console.log('   Consider downloading and hosting them on your own CDN for permanent storage.');
}

main().catch(console.error);

