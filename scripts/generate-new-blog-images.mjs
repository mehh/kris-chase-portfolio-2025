#!/usr/bin/env node

/**
 * Generate featured images for the 14 new blog posts using OpenAI DALL-E 3
 * Downloads and saves images locally to public/images/blog/
 */

import OpenAI from 'openai';
import { readFileSync, writeFileSync, existsSync, mkdirSync, createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import https from 'https';

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

// The 14 new blog post slugs
const newPostSlugs = [
  'leadership-os-understand-your-leadership-style',
  'security-compliance-readiness-soc2-gdpr-hipaa',
  'team-scaling-decision-hire-contractors-outsource',
  'vendor-selection-framework-choose-right-vendor',
  'technical-debt-assessment-prioritize-pay-down-plan',
  'ai-adoption-decision-framework-build-buy-wait-hybrid',
  'eos-goal-cascade-analyzer-align-company-goals',
  'stakeholder-alignment-checker-avoid-execution-failures',
  'interview-signal-analyzer-hire-real-talent-not-ai',
  'cms-decision-maker-content-as-code-vs-traditional-cms',
  'do-we-need-a-full-time-cto-executive-decision-tool',
  'overbuild-to-mvp-reducer-rescue-your-launch',
  'mvp-vs-overbuild-checker-avoid-feature-creep',
  'build-vs-buy-solver-executive-decision-framework',
];

// Read blog posts file
const blogPostsPath = join(__dirname, '..', 'src', 'data', 'blog-posts.ts');
const blogPostsContent = readFileSync(blogPostsPath, 'utf-8');

// Extract posts by slug
function extractPost(slug) {
  const sections = blogPostsContent.split(/(?=slug:\s*')/g);
  
  for (const section of sections) {
    if (!section.includes(`slug: '${slug}'`)) continue;
    
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
    
    return { slug, title, description, content, category, tags };
  }
  
  return null;
}

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
- Tech/engineering/executive focused
- Abstract or conceptual (not literal)
- Suitable for a blog header (16:9 aspect ratio)
- Dark mode friendly with good contrast
- Visually striking and memorable
- Business/executive/leadership aesthetic

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

/**
 * Download image from URL and save to file
 */
function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      const fileStream = createWriteStream(filePath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Update blog post with local image path
 */
function updateBlogPost(slug, imagePath) {
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  let updated = blogPostsContent;
  
  // Pattern 1: featuredImage exists - replace it
  let pattern = new RegExp(
    `(slug:\\s*'${escapedSlug}',[\\s\\S]*?)(featuredImage:\\s*'[^']+')`,
    'g'
  );
  
  updated = updated.replace(pattern, `$1featuredImage: '${imagePath}'`);
  
  // Pattern 2: featuredImage doesn't exist, add it after originalDate
  if (updated === blogPostsContent) {
    pattern = new RegExp(
      `(slug:\\s*'${escapedSlug}',[\\s\\S]*?originalDate:\\s*'[^']+',)([\\s\\S]*?)(seo:)`,
      'g'
    );
    updated = updated.replace(pattern, `$1\n    featuredImage: '${imagePath}',\n$2$3`);
  }
  
  if (updated !== blogPostsContent) {
    writeFileSync(blogPostsPath, updated, 'utf-8');
    console.log(`✅ Updated ${slug} with image: ${imagePath}`);
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
  console.log('🎨 Starting image generation for 14 new blog posts...\n');
  
  // Ensure blog images directory exists
  const blogImagesDir = join(__dirname, '..', 'public', 'images', 'blog');
  if (!existsSync(blogImagesDir)) {
    mkdirSync(blogImagesDir, { recursive: true });
  }
  
  for (let i = 0; i < newPostSlugs.length; i++) {
    const slug = newPostSlugs[i];
    console.log(`\n[${i + 1}/${newPostSlugs.length}] Processing: ${slug}`);
    
    const post = extractPost(slug);
    if (!post) {
      console.log(`  ⚠️  Post not found, skipping`);
      continue;
    }
    
    console.log(`  📝 Title: ${post.title}`);
    
    // Check if image already exists
    const imagePath = `/images/blog/${slug}.png`;
    const localImagePath = join(blogImagesDir, `${slug}.png`);
    if (existsSync(localImagePath)) {
      console.log(`  ✅ Image already exists, skipping generation`);
      continue;
    }
    
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
    
    // Download and save image
    console.log('  💾 Downloading and saving image...');
    try {
      await downloadImage(imageUrl, localImagePath);
      console.log(`  ✅ Image saved to ${localImagePath}`);
    } catch (error) {
      console.log(`  ❌ Error saving image: ${error.message}`);
      continue;
    }
    
    // Update blog post with local path
    updateBlogPost(slug, imagePath);
    
    // Rate limiting - wait 3 seconds between requests (DALL-E 3 has rate limits)
    if (i < newPostSlugs.length - 1) {
      console.log('  ⏳ Waiting 3 seconds before next request...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  console.log('\n✨ Image generation complete!');
  console.log('📁 All images saved to public/images/blog/');
}

main().catch(console.error);
