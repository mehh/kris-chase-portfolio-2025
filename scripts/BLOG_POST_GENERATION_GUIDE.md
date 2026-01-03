# Blog Post Generation Guide

This guide explains how to generate new blog posts programmatically using the schema and templates provided.

## Schema Files

1. **`blog-post-schema-template.json`** - JSON Schema definition for validating blog post data
2. **`generate-20-articles-template.json`** - Example template with 2 sample articles showing the structure

## Required Metadata Fields

When generating blog posts, you must provide the following fields:

### Required Fields

- **`slug`** (string): URL-friendly identifier (lowercase, hyphens, no spaces)
  - Pattern: `^[a-z0-9]+(?:-[a-z0-9]+)*$`
  - Example: `"advanced-wordpress-optimization-techniques"`

- **`title`** (string): Post title (without " - Kris Chase" suffix)
  - Min: 10 characters, Max: 200 characters
  - Example: `"Advanced WordPress Optimization Techniques"`

- **`description`** (string): Post excerpt/description for SEO and previews
  - Min: 50 characters, Max: 300 characters
  - Optimal: 120-160 characters for SEO
  - Example: `"Learn how to optimize WordPress performance with advanced caching, database optimization, and CDN integration techniques."`

- **`content`** (string): Full markdown content of the post
  - Should be substantial (minimum 200 words recommended)
  - Can include code blocks, images, lists, etc.
  - Example: `"# Title\n\nYour content here in markdown format..."`

- **`category`** (string): Category name
  - Must be one of: `"Development"`, `"WordPress"`, `"PHP"`, `"Linux"`, `"Magento"`, `"Security"`, `"Uncategorized"`, `"Bootstrap"`, `"Gravity Forms"`

- **`publishedDate`** (string): Publication date in ISO format
  - Format: `YYYY-MM-DD`
  - Example: `"2024-12-09"`

### Optional but Recommended Fields

- **`url`** (string): Full URL of the post
  - Format: `https://krischase.com/blog/{slug}` or original WordPress URL
  - Example: `"https://krischase.com/blog/advanced-wordpress-optimization-techniques"`

- **`originalDate`** (string): Original date string if different format
  - Example: `"2024.12.09"` or `"December 9, 2024"`

- **`tags`** (array): Array of relevant tags (2-8 tags recommended)
  - Common tags: `"WordPress"`, `"PHP"`, `"Security"`, `"Bash"`, `"SQL"`, `"API"`, `"JavaScript"`, `"Linux"`, etc.
  - Example: `["WordPress", "Performance", "Optimization", "Caching"]`

- **`featuredImage`** (string): Featured image URL
  - Should be a full URL to an image
  - Recommended size: 1200x630px for social sharing
  - Example: `"https://krischase.com/images/wordpress-optimization.jpg"`

- **`firstImage`** (string): First image from content (fallback if no featured image)
  - Extracted from content or provided separately
  - Example: `"https://krischase.com/images/article-image.jpg"`

### SEO Metadata Object

- **`seo`** (object): SEO metadata for search engines and social sharing
  - **`metaTitle`** (string): Meta title (usually title + " - Kris Chase")
    - Max: 70 characters
    - Example: `"Advanced WordPress Optimization Techniques - Kris Chase"`
  
  - **`metaDescription`** (string): Meta description (usually same as description)
    - Max: 160 characters
    - Example: `"Learn how to optimize WordPress performance with advanced caching..."`
  
  - **`ogTitle`** (string): Open Graph title for social sharing
    - Usually same as metaTitle
    - Max: 70 characters
  
  - **`ogDescription`** (string): Open Graph description for social sharing
    - Usually same as metaDescription
    - Max: 200 characters
  
  - **`ogImage`** (string): Open Graph image URL for social sharing
    - Recommended: 1200x630px
    - Example: `"https://krischase.com/images/wordpress-optimization.jpg"`
  
  - **`twitterCard`** (string): Twitter card type
    - Options: `"summary"` or `"summary_large_image"`
    - Default: `"summary"`

### Auto-Calculated Fields

These fields are automatically calculated if not provided:

- **`readingTime`** (number): Estimated reading time in minutes
  - Formula: `wordCount / 225` (average reading speed)
  - Minimum: 1 minute

- **`wordCount`** (number): Word count of the content
  - Calculated from cleaned markdown (removes syntax, HTML tags)
  - Minimum: 100 words

### Author Information

- **`author`** (object): Author information
  - **`name`** (string): Author name (default: `"Kris Chase"`)
  - **`twitter`** (string, optional): Twitter handle (default: `"@krisrchase"`)
  - **`email`** (string, optional): Email address (default: `"hey@mehh.org"`)

### Additional Metadata

- **`metadata`** (object): Additional metadata
  - **`updatedDate`** (string, optional): Last updated date in ISO format if post was updated
  - **`isUpdated`** (boolean): Whether post has been updated after publication (default: `false`)

## Example Blog Post Structure

```json
{
  "slug": "advanced-wordpress-optimization-techniques",
  "url": "https://krischase.com/blog/advanced-wordpress-optimization-techniques",
  "title": "Advanced WordPress Optimization Techniques",
  "description": "Learn how to optimize WordPress performance with advanced caching, database optimization, and CDN integration techniques.",
  "content": "# Advanced WordPress Optimization Techniques\n\nWordPress performance optimization is crucial for user experience and SEO...\n\n## Caching Strategies\n\nImplementing proper caching can dramatically improve site speed...\n\n```php\n// Example caching code\nwp_cache_set('key', 'value', 'group', 3600);\n```\n\n## Database Optimization\n\nRegular database maintenance keeps your site running smoothly...",
  "category": "WordPress",
  "tags": ["WordPress", "Performance", "Optimization", "Caching"],
  "publishedDate": "2024-12-09",
  "originalDate": "2024.12.09",
  "featuredImage": "https://krischase.com/images/wordpress-optimization.jpg",
  "seo": {
    "metaTitle": "Advanced WordPress Optimization Techniques - Kris Chase",
    "metaDescription": "Learn how to optimize WordPress performance with advanced caching, database optimization, and CDN integration techniques.",
    "ogTitle": "Advanced WordPress Optimization Techniques - Kris Chase",
    "ogDescription": "Learn how to optimize WordPress performance with advanced caching, database optimization, and CDN integration techniques.",
    "ogImage": "https://krischase.com/images/wordpress-optimization.jpg",
    "twitterCard": "summary_large_image"
  },
  "readingTime": 5,
  "wordCount": 1125,
  "author": {
    "name": "Kris Chase",
    "twitter": "@krisrchase",
    "email": "hey@mehh.org"
  },
  "metadata": {
    "isUpdated": false
  }
}
```

## How to Use

1. **Create your blog post data** following the schema above
2. **Validate against the JSON Schema** using `blog-post-schema-template.json`
3. **Convert to TypeScript format** and add to `src/data/blog-posts.ts` in the `blogPosts` array
4. **Ensure proper formatting**:
   - Use template literals (backticks) for multi-line content
   - Escape single quotes in strings
   - Sort posts by publication date (newest first)

## Integration with TypeScript

When adding posts to `src/data/blog-posts.ts`, ensure:

- Content uses template literals: `` content: `Your markdown here` ``
- Dates are in ISO format: `'2024-12-09'`
- Arrays use proper TypeScript syntax: `['Tag1', 'Tag2']`
- Optional fields use `undefined` if not provided: `firstImage: undefined`

## Notes

- Posts are sorted by publication date (newest first) in the array
- All dates should be normalized to ISO format (YYYY-MM-DD)
- Content should be cleaned to remove navigation and footer elements
- Tags should be relevant and extracted based on content keywords
- Reading time is calculated at 225 words per minute (average reading speed)
- Word count is calculated from cleaned markdown (removes syntax, HTML tags)

## Validation

Use the JSON Schema file to validate your blog post data before adding it to the TypeScript file. This ensures:

- All required fields are present
- Field types are correct
- String lengths are within limits
- Dates are in the correct format
- URLs are valid
- Tags are unique

