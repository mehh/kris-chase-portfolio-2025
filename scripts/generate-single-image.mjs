#!/usr/bin/env node

import OpenAI from 'openai';
import { readFileSync, writeFileSync, existsSync, mkdirSync, createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY is not set');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const blogPostsPath = join(__dirname, '..', 'src', 'data', 'blog-posts.ts');
const blogPostsContent = readFileSync(blogPostsPath, 'utf-8');

const slug = 'build-vs-buy-solver-executive-decision-framework';

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
    const tags = tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, '')).filter(t => t) : [];
    return { slug, title, description, content, category, tags };
  }
  return null;
}

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

async function generateImage(prompt) {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      size: '1792x1024',
      quality: 'standard',
      n: 1,
    });
    return response.data[0].url;
  } catch (error) {
    console.error(`❌ Error generating image:`, error.message);
    return null;
  }
}

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

function updateBlogPost(slug, imagePath) {
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  let updated = blogPostsContent;
  let pattern = new RegExp(`(slug:\\s*'${escapedSlug}',[\\s\\S]*?)(featuredImage:\\s*'[^']+')`, 'g');
  updated = updated.replace(pattern, `$1featuredImage: '${imagePath}'`);
  if (updated !== blogPostsContent) {
    writeFileSync(blogPostsPath, updated, 'utf-8');
    console.log(`✅ Updated ${slug} with image: ${imagePath}`);
    return true;
  }
  return false;
}

async function main() {
  console.log(`🎨 Generating image for: ${slug}\n`);
  const post = extractPost(slug);
  if (!post) {
    console.log('❌ Post not found');
    return;
  }
  console.log(`📝 Title: ${post.title}`);
  const blogImagesDir = join(__dirname, '..', 'public', 'images', 'blog');
  if (!existsSync(blogImagesDir)) {
    mkdirSync(blogImagesDir, { recursive: true });
  }
  const localImagePath = join(blogImagesDir, `${slug}.png`);
  if (existsSync(localImagePath)) {
    console.log('✅ Image already exists');
    return;
  }
  console.log('🤖 Generating image prompt...');
  const imagePrompt = await generateImagePrompt(post);
  if (!imagePrompt) {
    console.log('❌ Failed to generate prompt');
    return;
  }
  console.log(`📝 Prompt: ${imagePrompt.substring(0, 100)}...`);
  console.log('🎨 Generating image...');
  const imageUrl = await generateImage(imagePrompt);
  if (!imageUrl) {
    console.log('❌ Failed to generate image');
    return;
  }
  console.log('💾 Downloading and saving...');
  try {
    await downloadImage(imageUrl, localImagePath);
    console.log(`✅ Image saved to ${localImagePath}`);
  } catch (error) {
    console.log(`❌ Error saving: ${error.message}`);
    return;
  }
  const imagePath = `/images/blog/${slug}.png`;
  updateBlogPost(slug, imagePath);
  console.log('\n✨ Complete!');
}

main().catch(console.error);
