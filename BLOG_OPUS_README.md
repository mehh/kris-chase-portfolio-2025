# Blog Opus - Technical Overview

## Overview

A high-quality blog experience built for the Kris Chase portfolio site, featuring a modern listing page and polished single post pages with enhanced reading features.

## Architecture

### Pages

- **`/blog-opus`** - Blog listing page with featured post and grid layout
- **`/blog-opus/[slug]`** - Individual blog post pages with full reading experience

### Components

Located in `src/components/blog/`:

- **`BlogCard.tsx`** - Reusable card component for displaying posts in listings
  - Supports featured and regular variants
  - Includes hover animations and micro-interactions
  - Shows category, tags, reading time, and publish date

- **`BlogPostContent.tsx`** - Markdown renderer with custom styling
  - Uses `react-markdown` with `remark-gfm` and `rehype-highlight`
  - Custom components for headings, code blocks, images, blockquotes
  - Automatically adds IDs to headings for table of contents

- **`ScrollProgress.tsx`** - Reading progress indicator
  - Fixed top bar showing scroll progress
  - Smooth gradient animation

- **`TableOfContents.tsx`** - Sidebar navigation for longer posts
  - Extracts headings from markdown content
  - Highlights active section based on scroll position
  - Smooth scroll to sections on click
  - Hidden on smaller screens (xl breakpoint)

- **`BlogStructuredData.tsx`** - JSON-LD structured data for SEO
  - Schema.org BlogPosting format
  - Includes author, publisher, dates, keywords

### Utilities

**`src/lib/blog-utils.ts`**:
- `formatBlogDate()` - Human-readable date formatting
- `formatRelativeDate()` - Relative time (e.g., "2 days ago")
- `extractHeadings()` - Extract headings from markdown for TOC
- `slugify()` - Generate URL-friendly slugs

## Design Decisions

### Visual Style

- Matches existing site design system (Chakra Petch for headings, Questrial for body)
- Uses existing color tokens and spacing system
- Enhanced with subtle animations and hover states
- Responsive grid layout (1 column mobile, 2 tablet, 3 desktop)

### Performance

- Static generation for all posts via `generateStaticParams`
- Next.js Image optimization for local images
- Unoptimized external images (from wp.krischase.com) to avoid CORS issues
- Lazy loading for non-critical images

### SEO

- Comprehensive metadata (title, description, keywords)
- Open Graph and Twitter Card support
- JSON-LD structured data
- Semantic HTML structure
- Canonical URLs
- Proper heading hierarchy

### Accessibility

- Semantic HTML (`<article>`, `<nav>`, `<time>`)
- ARIA labels where appropriate
- Keyboard navigation support
- Focus states on interactive elements
- Respects `prefers-reduced-motion`

### Reading Experience

- Comfortable typography with proper line-height and spacing
- Reading time and word count displayed
- Scroll progress indicator
- Table of contents for longer posts
- Social sharing buttons (Twitter, LinkedIn)
- Previous/Next post navigation

## Data Source

Posts are sourced from `src/data/blog-posts.ts`, which contains:
- Full markdown content
- Metadata (title, description, dates, author)
- SEO fields
- Categories and tags
- Featured images
- Reading time (pre-calculated)

## Extensibility

The structure is designed to be easily extended:

1. **Filtering**: Category and tag filtering can be added to the listing page
2. **Pagination**: Can be added when post count grows
3. **Related Posts**: Can be added to single post pages
4. **Search**: Can be integrated using the existing data structure
5. **Comments**: Can be added via API routes

## Future Enhancements

Potential additions:
- Category/tag filtering on listing page
- Search functionality
- Related posts section
- Newsletter signup
- Reading list/bookmarks
- Estimated reading time calculation (currently uses pre-calculated values)

## Notes

- All existing `/blog*` routes remain untouched as requested
- Blog posts use the existing markdown content from `blog-posts.ts`
- Images from external domains (wp.krischase.com) are set to `unoptimized` to avoid CORS issues
- The table of contents only appears on xl screens and larger to avoid clutter on mobile

