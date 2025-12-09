# Blog Post Scraping Instructions

This directory contains scripts to scrape and process blog posts from `https://wp.krischase.com/journal/`.

## Current Status

- ✅ Data structure created: `src/data/blog-posts.ts`
- ✅ 11 posts scraped and added to the data file
- ⏳ 24 posts remaining to be scraped

## Remaining Posts to Scrape

The following posts still need to be scraped and added to `blog-posts.ts`:

1. `https://wp.krischase.com/robotsdeploy/` - Development, 2016.04.19
2. `https://wp.krischase.com/force-non-legacy-backup-start-whmcpanel/` - Uncategorized, 2016.02.02
3. `https://wp.krischase.com/black-friday-deals-for-web-developers/` - Bootstrap, 2015.11.26
4. `https://wp.krischase.com/use-php-to-pull-users-instagram-feed/` - Development, 2015.09.16
5. `https://wp.krischase.com/prevent-gmail-from-breaking-width-of-email-template/` - Development, 2015.08.14
6. `https://wp.krischase.com/find-all-files-touched-within-the-last-2-weeks/` - PHP, 2015.07.10
7. `https://wp.krischase.com/get-a-list-of-all-installed-magento-patches/` - Magento, 2015.07.09
8. `https://wp.krischase.com/find-text-between-tags-sublime-text/` - Development, 2015.04.29
9. `https://wp.krischase.com/automatically-check-wpml-custom-field-checkboxes/` - Development, 2015.02.20
10. `https://wp.krischase.com/how-to-skip-fsck-after-reboot/` - Development, 2015.01.30
11. `https://wp.krischase.com/pull-youtube-description-into-wordpress-content/` - Development, 2014.12.11
12. `https://wp.krischase.com/how-to-find-and-clean-up-infected-wordpress-files-over-ssh/` - PHP, 2014.11.28
13. `https://wp.krischase.com/disable-all-mail-for-wordpress/` - PHP, 2014.11.18
14. `https://wp.krischase.com/get-the-latest-post-id-in-wordpress/` - PHP, 2014.10.29
15. `https://wp.krischase.com/dynamically-add-parameters-to-the-end-of-all-wp_nav_menu/` - PHP, 2014.10.28
16. `https://wp.krischase.com/force-wordpress-user-to-logout-after-inactivity/` - PHP, 2014.10.27
17. `https://wp.krischase.com/set-wordpress-image-quality-to-high/` - PHP, 2014.10.24
18. `https://wp.krischase.com/how-to-create-custom-auto-generated-image-sizes-in-wordpress/` - PHP, 2014.10.24
19. `https://wp.krischase.com/remove-the-ability-to-edit-theme-in-wordpress-admin/` - PHP, 2014.10.24
20. `https://wp.krischase.com/social-media-sharing-links-without-using-a-plugin/` - Uncategorized, 2014.10.23
21. `https://wp.krischase.com/require-login-to-view-wordpress-site/` - PHP, 2014.10.23
22. `https://wp.krischase.com/how-to-grab-first-image-from-wordpress-post-content/` - PHP, 2014.10.23

## How to Complete the Scraping

### Option 1: Use Firecrawl MCP (Recommended)

If you have Firecrawl MCP access, you can use the following process:

1. For each remaining URL, use the Firecrawl scrape tool with:
   - `url`: The blog post URL
   - `formats`: `['markdown']`
   - `onlyMainContent`: `true`

2. Process the scraped data using the helper functions in `scripts/generate-blog-posts-data.mjs`

3. Add the processed post to the `blogPosts` array in `src/data/blog-posts.ts`

### Option 2: Manual Processing

For each post:

1. Scrape the post content (markdown format)
2. Extract metadata:
   - Title (remove " - Kris Chase" suffix)
   - Description (from og:description or meta description)
   - Featured image (og:image)
   - Published date (from publishedTime or original date string)
   - Updated date (if different from published)
   - Category (from the listing page)
   - Tags (auto-extracted based on content keywords)
3. Calculate:
   - Word count (from cleaned markdown)
   - Reading time (word count / 225 words per minute)
4. Clean content (remove navigation, social links, etc.)
5. Add to `blogPosts` array in `src/data/blog-posts.ts`

## Data Structure

Each blog post follows this structure:

```typescript
{
  slug: string;                    // URL slug
  url: string;                     // Full URL
  title: string;                   // Post title
  description: string;              // Excerpt/description
  content: string;                 // Full markdown content
  category: string;                // Category name
  tags: string[];                  // Array of tags
  publishedDate: string;           // ISO date (YYYY-MM-DD)
  originalDate: string;            // Original date string
  featuredImage?: string;          // Featured image URL
  firstImage?: string;             // First image from content
  seo: {                           // SEO metadata
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterCard?: string;
  };
  readingTime: number;            // Minutes to read
  wordCount: number;               // Word count
  author: {                        // Author info
    name: string;
    twitter?: string;
    email?: string;
  };
  metadata: {                      // Additional metadata
    updatedDate?: string;
    isUpdated?: boolean;
  };
}
```

## Helper Functions

The `blog-posts.ts` file includes helper functions:

- `getBlogPosts(filters?)` - Get posts with optional filters (category, tag, limit)
- `getBlogPost(slug)` - Get a single post by slug
- `getCategories()` - Get all unique categories
- `getTags()` - Get all unique tags
- `calculateReadingTime(wordCount)` - Calculate reading time
- `calculateWordCount(content)` - Calculate word count from markdown

## Notes

- Posts are sorted by publication date (newest first) in the array
- All dates are normalized to ISO format (YYYY-MM-DD)
- Content is cleaned to remove navigation and footer elements
- Tags are auto-extracted based on content keywords and category
- Reading time is calculated at 225 words per minute (average reading speed)

