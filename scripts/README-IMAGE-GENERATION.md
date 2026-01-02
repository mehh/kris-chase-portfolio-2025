# Blog Image Generation Documentation

This document describes all scripts and processes for generating featured images for blog posts.

## Overview

The site uses OpenAI's DALL-E 3 to generate professional, custom cover images for blog posts. Images are generated using AI-powered prompts based on blog post content, then downloaded and saved locally.

## Available Scripts

### 1. `generate-new-blog-images.mjs`
**Purpose:** Generate featured images for a specific set of new blog posts.

**Usage:**
```bash
node scripts/generate-new-blog-images.mjs
```

**What it does:**
- Processes a predefined list of 14 blog post slugs
- Generates images using OpenAI DALL-E 3
- Downloads and saves images to `public/images/blog/`
- Updates blog posts with local image paths
- Includes rate limiting (3 seconds between requests)

**Configuration:**
- Image size: 1792x1024 (16:9 aspect ratio)
- Quality: Standard
- Model: DALL-E 3

### 2. `generate-single-image.mjs`
**Purpose:** Generate a featured image for a single blog post.

**Usage:**
```bash
node scripts/generate-single-image.mjs
```

**What it does:**
- Generates an image for a single blog post (configured in the script)
- Downloads and saves to `public/images/blog/`
- Updates the blog post with the local image path

**Use case:** When you need to generate an image for one specific post that was missed.

### 3. `generate-featured-images-openai.mjs`
**Purpose:** Generate featured images for all blog posts missing them.

**Usage:**
```bash
npm run generate:featured-images
# or
node scripts/generate-featured-images-openai.mjs
```

**What it does:**
- Scans `src/data/blog-posts.ts` for posts without featured images
- Generates images using OpenAI DALL-E 3
- Updates blog posts with OpenAI-hosted image URLs (temporary)
- Includes rate limiting (2 seconds between requests)

**Note:** This script saves images to OpenAI's CDN (temporary URLs). Consider using `generate-new-blog-images.mjs` for permanent local storage.

### 4. `generate-blog-images.mjs`
**Purpose:** Legacy script for generating blog images.

**Usage:**
```bash
npm run generate:blog-images
# or
node scripts/generate-blog-images.mjs
```

**Status:** May be deprecated in favor of newer scripts.

### 5. `generate-featured-images-nanobanana.mjs`
**Purpose:** Alternative image generation using Nanobanana service.

**Status:** Alternative implementation, not currently in use.

### 6. `generate-missing-featured-images.mjs`
**Purpose:** Generate images for posts that are missing featured images.

**Status:** Similar to `generate-featured-images-openai.mjs`.

### 7. `download-featured-images.mjs`
**Purpose:** Download featured images from URLs and save them locally.

**Use case:** If you have blog posts with external image URLs and want to download them locally.

## Setup

### Prerequisites

1. **OpenAI API Key**: Required for all image generation scripts
   - Add to `.env.local`:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

2. **Node.js**: Version 20.x or higher

3. **Dependencies**: Already installed in `package.json`
   - `openai`: For DALL-E 3 image generation
   - `dotenv`: For environment variable management

## How Image Generation Works

### Process Flow

1. **Post Analysis**: Script reads blog post data from `src/data/blog-posts.ts`
   - Extracts: title, description, category, tags, content preview

2. **Prompt Generation**: Uses OpenAI GPT-4o to create detailed image prompts
   - Analyzes post content and context
   - Generates 2-3 sentence prompts optimized for DALL-E 3
   - Ensures prompts are:
     - Professional and modern
     - Tech/engineering/executive focused
     - Abstract or conceptual (not literal)
     - Suitable for blog headers (16:9 aspect ratio)
     - Dark mode friendly with good contrast
     - Visually striking and memorable

3. **Image Generation**: Uses DALL-E 3 to create images
   - Size: 1792x1024 pixels
   - Quality: Standard
   - Format: PNG

4. **Image Download**: Downloads generated images from OpenAI CDN
   - Saves to `public/images/blog/{slug}.png`
   - Creates directory if it doesn't exist

5. **Blog Post Update**: Updates `src/data/blog-posts.ts` with local image path
   - Path format: `/images/blog/{slug}.png`

### Image Specifications

- **Resolution**: 1792x1024 pixels
- **Aspect Ratio**: 16:9 (optimal for blog headers)
- **Format**: PNG
- **Quality**: Standard (DALL-E 3)
- **Storage**: Local files in `public/images/blog/`

## Best Practices

### When to Generate Images

- **New Blog Posts**: Generate images when creating new posts
- **Missing Images**: Use `generate-featured-images-openai.mjs` to fill gaps
- **Batch Generation**: Use `generate-new-blog-images.mjs` for multiple new posts

### Rate Limiting

- DALL-E 3 has rate limits
- Scripts include delays between requests (2-3 seconds)
- For large batches, you may need to run scripts multiple times

### Image Optimization

- Images are generated at optimal size (1792x1024)
- No additional optimization needed
- Consider compressing if file sizes are too large

### Cost Considerations

- DALL-E 3 costs approximately $0.04 per image
- GPT-4o prompt generation costs approximately $0.01 per prompt
- Total cost per image: ~$0.05

## Troubleshooting

### Common Issues

**"OPENAI_API_KEY is not set"**
- Solution: Add your OpenAI API key to `.env.local`

**Rate limit errors**
- Solution: Increase delay between requests in the script
- Or: Run the script in smaller batches

**Image generation fails**
- Solution: Check OpenAI API key validity
- Check: API quota and billing status
- Verify: Internet connection

**Images not updating in blog posts**
- Solution: Check that the slug matches exactly
- Verify: File was saved to `public/images/blog/`
- Check: Build cache (try `npm run build`)

**Duplicate featuredImage properties**
- Solution: Manually remove duplicate entries in `blog-posts.ts`
- This can happen if the script runs multiple times

## File Locations

- **Scripts**: `scripts/generate-*.mjs`
- **Blog Posts**: `src/data/blog-posts.ts`
- **Generated Images**: `public/images/blog/*.png`
- **Environment Config**: `.env.local`

## Related Scripts

- `process-new-blog-posts.mjs`: Processes and enhances blog post JSON files
- `generate-typescript-posts.mjs`: Converts JSON blog posts to TypeScript format
- `enhance-posts-with-context.mjs`: Adds exec-tech.tools context to posts

## Future Improvements

- [ ] Add image optimization/compression
- [ ] Support for different image sizes/aspect ratios
- [ ] Batch processing with progress tracking
- [ ] Image regeneration for existing posts
- [ ] Support for alternative image generation services
