#!/usr/bin/env node

/**
 * Generate featured images for blog posts missing them
 * Uses Gemini to generate image prompts, then DALL-E to create the images
 */

import OpenAI from 'openai';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY is not set in .env.local');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Read blog posts file and extract posts
const blogPostsPath = join(__dirname, '..', 'src', 'data', 'blog-posts.ts');
const blogPostsContent = readFileSync(blogPostsPath, 'utf-8');

// Extract posts missing featured images by parsing the TypeScript file
const postsWithoutImages = [];

// Split by post boundaries (look for slug: '...')
const postSections = blogPostsContent.split(/(?=slug:\s*')/g);

for (const section of postSections) {
  if (!section.includes("slug:")) continue;
  
  // Extract slug
  const slugMatch = section.match(/slug:\s*'([^']+)'/);
  if (!slugMatch) continue;
  const slug = slugMatch[1];
  
  // Extract title
  const titleMatch = section.match(/title:\s*'([^']+)'/);
  if (!titleMatch) continue;
  const title = titleMatch[1].replace(/\\'/g, "'");
  
  // Extract description
  const descMatch = section.match(/description:\s*'([^']+)'/);
  const description = descMatch ? descMatch[1].replace(/\\'/g, "'") : '';
  
  // Extract content (between backticks)
  const contentMatch = section.match(/content:\s*`([^`]+)`/s);
  const content = contentMatch ? contentMatch[1].substring(0, 500) : '';
  
  // Extract category
  const categoryMatch = section.match(/category:\s*'([^']+)'/);
  const category = categoryMatch ? categoryMatch[1] : '';
  
  // Extract tags
  const tagsMatch = section.match(/tags:\s*\[([^\]]+)\]/);
  const tags = tagsMatch 
    ? tagsMatch[1]
        .split(',')
        .map(t => t.trim().replace(/['"]/g, ''))
        .filter(t => t)
    : [];
  
  // Extract featured image
  const imageMatch = section.match(/featuredImage:\s*(?:'([^']+)'|undefined)/);
  const featuredImage = imageMatch && imageMatch[1] ? imageMatch[1] : null;
  
  // Check if featured image is missing, is the default, or is a placeholder URL that doesn't exist yet
  const isPlaceholder = featuredImage && (
    featuredImage === 'https://krischase.com/images/KrisChase-OG.png' ||
    featuredImage.startsWith('https://krischase.com/images/') && !featuredImage.includes('KrisChase-OG.png')
  );
  
  if (!featuredImage || isPlaceholder) {
    postsWithoutImages.push({
      slug,
      title,
      description,
      content,
      category,
      tags,
      currentImage: featuredImage, // Keep track of current image for replacement
    });
  }
}

console.log(`📝 Found ${postsWithoutImages.length} posts without featured images`);
if (postsWithoutImages.length > 0) {
  console.log('Posts to process:');
  postsWithoutImages.slice(0, 5).forEach((post, i) => {
    console.log(`  ${i + 1}. ${post.title} (${post.slug})`);
  });
  if (postsWithoutImages.length > 5) {
    console.log(`  ... and ${postsWithoutImages.length - 5} more`);
  }
}
console.log('');

/**
 * Generate image prompt using OpenAI GPT-4o
 */
async function generateImagePrompt(post) {
  // Use the latest Gemini model - gemini-2.0-flash-exp is the newest experimental model
  // Try models in order of preference
  const modelsToTry = [
    'gemini-2.0-flash-exp',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
  ];
  
  let model;
  let modelName;
  let lastError;
  
  for (const name of modelsToTry) {
    try {
      model = genAI.getGenerativeModel({ model: name });
      modelName = name;
      // Test with a simple call to see if it works
      const testResult = await model.generateContent('test');
      await testResult.response;
      if (name === 'gemini-2.0-flash-exp') {
        console.log('  ✓ Using latest model: gemini-2.0-flash-exp');
      }
      break;
    } catch (error) {
      lastError = error;
      // If quota exceeded, that means the model exists but we can't use it
      if (error.message && error.message.includes('429')) {
        console.log(`  ⚠️  ${name} quota exceeded, trying next model...`);
        continue;
      }
      // If 404, model doesn't exist, try next
      if (error.message && error.message.includes('404')) {
        continue;
      }
      // Other errors, try next model
      continue;
    }
  }
  
  if (!model) {
    console.error(`❌ All Gemini models failed. Last error:`, lastError?.message);
    return null;
  }
  
  const prompt = `You are a creative director for a tech blog. Generate a detailed, visual image prompt for a blog post featured image.

Blog Post Details:
- Title: ${post.title}
- Description: ${post.description}
- Category: ${post.category}
- Tags: ${post.tags.join(', ')}
- Content Preview: ${post.content}

Create a single, compelling image prompt (2-3 sentences) that would work well as a featured image for this blog post. The image should be:
- Professional and modern
- Tech/engineering focused
- Abstract or conceptual (not literal)
- Suitable for a blog header (16:9 aspect ratio)
- Dark mode friendly with good contrast

Return ONLY the image prompt, nothing else.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error(`❌ Error generating prompt for ${post.slug}:`, error.message);
    return null;
  }
}

/**
 * Generate image using DALL-E
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
  // Find the post in the file and update it
  // Look for the featuredImage line after the slug
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
  
  for (let i = 0; i < postsWithoutImages.length; i++) {
    const post = postsWithoutImages[i];
    console.log(`\n[${i + 1}/${postsWithoutImages.length}] Processing: ${post.title}`);
    
    // Generate prompt with OpenAI
    const imagePrompt = await generateImagePrompt(post);
    
    if (!imagePrompt) {
      console.log('  ⚠️  Skipping due to prompt generation error');
      continue;
    }
    
    console.log(`  📝 Prompt: ${imagePrompt.substring(0, 100)}...`);
    
    // Generate image with DALL-E
    console.log('  🎨 Generating image with DALL-E...');
    const imageUrl = await generateImage(imagePrompt);
    
    if (!imageUrl) {
      console.log('  ⚠️  Skipping due to image generation error');
      continue;
    }
    
    // Update blog post
    updateBlogPost(post.slug, imageUrl);
    
    // Rate limiting - wait 1 second between requests
    if (i < postsWithoutImages.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log('\n✨ Image generation complete!');
}

main().catch(console.error);

