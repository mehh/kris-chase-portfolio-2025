# Blog Image Generation Script

This script generates featured images for blog posts that are missing them using:
1. **OpenAI GPT-4** to generate detailed image prompts based on blog post content
2. **DALL-E 3** (OpenAI) to generate the actual images

## Setup

1. Add your OpenAI API key to `.env.local`:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

2. Your OpenAI API key should already be set if you're using the chat feature

## Usage

Run the script to generate images for all posts missing featured images:

```bash
npm run generate:blog-images
```

Or directly:

```bash
node scripts/generate-blog-images.mjs
```

## How It Works

1. **Scans** `src/data/blog-posts.ts` for posts without featured images
2. **Generates prompts** using OpenAI GPT-4o based on:
   - Post title
   - Description
   - Category
   - Tags
   - Content preview
3. **Creates images** using DALL-E 3 (1792x1024, 16:9 aspect ratio)
4. **Updates** the blog posts file with the new image URLs

## Notes

- Images are generated at 1792x1024 resolution (16:9 aspect ratio)
- Rate limiting: 1 second delay between requests
- Images are hosted by OpenAI (temporary URLs - consider downloading and hosting them)
- The script will skip posts that already have featured images (unless they're the default placeholder)

## Troubleshooting

- **"OPENAI_API_KEY is not set"**: Add your OpenAI API key to `.env.local`
- **Rate limit errors**: The script includes delays, but you may need to increase them for large batches

