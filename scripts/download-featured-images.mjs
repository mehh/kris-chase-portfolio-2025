#!/usr/bin/env node

/**
 * Download all remote featured images and update blog-posts.ts with local paths
 */

import { readFileSync, writeFileSync, mkdirSync, createWriteStream, existsSync, unlinkSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, basename } from 'path';
import https from 'https';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const blogPostsPath = join(__dirname, '..', 'src', 'data', 'blog-posts.ts');
const imagesDir = join(__dirname, '..', 'public', 'images', 'blog');
const blogPostsContent = readFileSync(blogPostsPath, 'utf-8');

// Create images directory if it doesn't exist
mkdirSync(imagesDir, { recursive: true });

/**
 * Download a file from URL
 */
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const file = createWriteStream(destPath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        file.close();
        if (existsSync(destPath)) {
          unlinkSync(destPath);
        }
        return downloadFile(response.headers.location, destPath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        if (existsSync(destPath)) {
          unlinkSync(destPath);
        }
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      if (existsSync(destPath)) {
        unlinkSync(destPath);
      }
      reject(err);
    });
  });
}

/**
 * Extract image URL and slug from blog post
 */
function extractImageUrls(content) {
  const images = [];
  const sections = content.split(/(?=slug:\s*')/g);
  
  for (const section of sections) {
    if (!section.includes('slug:')) continue;
    
    const slugMatch = section.match(/slug:\s*'([^']+)'/);
    if (!slugMatch) continue;
    const slug = slugMatch[1];
    
    const imageMatch = section.match(/featuredImage:\s*'([^']+)'/);
    if (!imageMatch) continue;
    const imageUrl = imageMatch[1];
    
    // Only process remote URLs (http/https)
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      // Skip if it's already a local path or krischase.com (already hosted)
      if (!imageUrl.includes('krischase.com') && !imageUrl.startsWith('/')) {
        images.push({ slug, imageUrl });
      }
    }
  }
  
  return images;
}

/**
 * Generate filename from URL and slug
 */
function generateFilename(slug, url) {
  // Try to get extension from URL
  const urlPath = new URL(url).pathname;
  const extMatch = urlPath.match(/\.(jpg|jpeg|png|webp|gif)$/i);
  const ext = extMatch ? extMatch[1].toLowerCase() : 'png';
  
  return `${slug}.${ext}`;
}

/**
 * Update blog post with local image path
 */
function updateBlogPostImage(content, slug, oldUrl, newPath) {
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedOldUrl = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Replace the featuredImage URL
  const pattern = new RegExp(
    `(slug:\\s*'${escapedSlug}',[\\s\\S]*?)(featuredImage:\\s*'${escapedOldUrl}')`,
    'g'
  );
  
  const updated = content.replace(pattern, `$1featuredImage: '${newPath}'`);
  
  // Also update ogImage if it matches
  const ogImagePattern = new RegExp(
    `(ogImage:\\s*)'${escapedOldUrl}'`,
    'g'
  );
  
  return updated.replace(ogImagePattern, `$1'${newPath}'`);
}

/**
 * Main execution
 */
async function main() {
  console.log('📥 Downloading remote featured images...\n');
  
  const images = extractImageUrls(blogPostsContent);
  
  if (images.length === 0) {
    console.log('✨ No remote images found to download!');
    return;
  }
  
  console.log(`Found ${images.length} remote images to download:\n`);
  
  let updatedContent = blogPostsContent;
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < images.length; i++) {
    const { slug, imageUrl } = images[i];
    const filename = generateFilename(slug, imageUrl);
    const localPath = join(imagesDir, filename);
    const publicPath = `/images/blog/${filename}`;
    
    console.log(`[${i + 1}/${images.length}] ${slug}`);
    console.log(`  📥 Downloading: ${imageUrl.substring(0, 80)}...`);
    
    try {
      await downloadFile(imageUrl, localPath);
      console.log(`  ✅ Saved to: ${publicPath}`);
      
      // Update blog posts file
      updatedContent = updateBlogPostImage(updatedContent, slug, imageUrl, publicPath);
      successCount++;
      
      // Small delay to avoid rate limiting
      if (i < images.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.log(`  ❌ Failed: ${error.message}`);
      failCount++;
    }
    
    console.log('');
  }
  
  // Write updated blog posts file
  if (successCount > 0) {
    writeFileSync(blogPostsPath, updatedContent, 'utf-8');
    console.log(`✅ Updated blog-posts.ts with ${successCount} local image paths`);
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`  ✅ Successfully downloaded: ${successCount}`);
  console.log(`  ❌ Failed: ${failCount}`);
  console.log(`\n💡 Images saved to: public/images/blog/`);
}

main().catch(console.error);

