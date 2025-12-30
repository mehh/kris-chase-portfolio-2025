# Blog Implementation Guide

## Overview

This document explains the blog implementation at `/blog-gemini3` and `/blog-gemini3/[slug]`. The blog is designed to be production-ready, SEO-optimized, and visually cohesive with the existing site while elevating the design with thoughtful micro-interactions and polish features.

## Architecture

### File Structure

```
src/
├── app/
│   └── blog-gemini3/
│       ├── layout.tsx              # Blog section layout
│       ├── page.tsx                 # Blog listing page
│       └── [slug]/
│           ├── page.tsx             # Single post page
│           └── not-found.tsx       # 404 page for posts
├── components/
│   └── blog/
│       ├── BlogCard.tsx             # Post card component
│       ├── PostContent.tsx          # Markdown renderer
│       ├── ScrollProgress.tsx       # Reading progress indicator
│       ├── TableOfContents.tsx      # TOC sidebar
│       └── SocialShare.tsx          # Social sharing buttons
└── lib/
    └── blog-utils.ts                # Utility functions
```

## Key Components

### BlogCard
- Displays post preview with image, title, excerpt, metadata
- Supports featured variant for larger display
- Hover animations and transitions
- Responsive grid layout

### PostContent
- Renders markdown with `react-markdown`
- Supports GitHub Flavored Markdown (GFM)
- Syntax highlighting with `rehype-highlight`
- Custom components for images, code blocks, blockquotes, links
- Handles both local and external images

### ScrollProgress
- Fixed top progress bar showing reading progress
- Smooth transitions
- Accessible (aria-hidden)

### TableOfContents
- Auto-generates from h2/h3 headings
- Sticky sidebar on desktop
- Active section highlighting
- Smooth scroll navigation

### SocialShare
- Twitter and LinkedIn sharing
- Copy link functionality
- Animated feedback

## Design Decisions

### Visual Style
- **Consistent with site**: Uses existing color tokens (`#96442e`, `#b46633`), typography (Chakra Petch for headings, Questrial for body), and spacing
- **Elevated polish**: Subtle hover effects, smooth transitions, glowing borders on featured cards
- **Dark mode**: Full support with appropriate contrast ratios

### Typography
- Custom prose styles in `globals.css` for optimal readability
- Proper heading hierarchy (h1-h6)
- Comfortable line height (1.75) for long-form content
- Code blocks use monospace fonts with syntax highlighting

### Layout
- **Listing page**: Featured post at top, grid of all posts below
- **Post page**: Two-column layout (content + TOC sidebar) on desktop, single column on mobile
- Max width constraints for optimal reading experience

### Performance
- Static generation for all posts (`generateStaticParams`)
- Next.js Image optimization for all images
- Lazy loading for images
- Minimal client-side JavaScript

## SEO Implementation

### Metadata
- Dynamic metadata generation per post
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs
- Structured data ready (can add JSON-LD if needed)

### URL Structure
- Clean URLs: `/blog-gemini3/[slug]`
- Static generation for fast loading
- Proper 404 handling

### Content Optimization
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Internal linking (related posts)

## Accessibility

- Semantic HTML (`<article>`, `<nav>`, `<time>`, etc.)
- ARIA labels where needed
- Keyboard navigation support
- Focus states on interactive elements
- Color contrast meets WCAG AA standards
- Screen reader friendly

## Polish Features

1. **Reading Time**: Displayed on cards and post header
2. **Scroll Progress**: Visual indicator at top of post page
3. **Table of Contents**: Auto-generated, sticky sidebar
4. **Social Sharing**: One-click sharing to Twitter/LinkedIn
5. **Hover Effects**: Subtle animations on cards and links
6. **Related Posts**: Shows posts from same category
7. **Category Badges**: Visual category indicators
8. **Date Formatting**: Human-readable dates with relative time

## Data Structure

Blog posts are defined in `src/data/blog-posts.ts` with the following structure:

```typescript
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string; // Markdown
  category: string;
  tags: string[];
  publishedDate: string; // ISO format
  featuredImage?: string;
  firstImage?: string;
  readingTime: number;
  wordCount: number;
  author: { name: string; twitter?: string; email?: string };
  seo: { metaTitle?, metaDescription?, ogTitle?, ogDescription?, ogImage? };
}
```

## Extending the Blog

### Adding New Posts
1. Add post data to `src/data/blog-posts.ts`
2. Posts are automatically included in listing and static generation

### Adding Categories/Tags Filtering
1. Add filter UI to `blog-gemini3/page.tsx`
2. Use URL search params for state
3. Filter `blogPosts` array based on selection

### Adding Pagination
1. Implement pagination logic in `blog-gemini3/page.tsx`
2. Use Next.js `searchParams` for page state
3. Slice `blogPosts` array based on page number

### Adding Search
1. Add search input to listing page
2. Implement client-side filtering or server-side search
3. Consider adding search API route for large datasets

### Adding Comments
1. Integrate with comment service (e.g., Disqus, Giscus)
2. Add comment section to post page
3. Consider server-side rendering for SEO

## Dependencies

- `react-markdown`: Markdown rendering
- `remark-gfm`: GitHub Flavored Markdown support
- `rehype-highlight`: Syntax highlighting
- `rehype-raw`: HTML support in markdown
- `highlight.js`: Syntax highlighting styles
- `motion` (framer-motion): Animations
- `lucide-react`: Icons

## Configuration

### Next.js Image Domains
External image domains are configured in `next.config.ts`:
- `wp.krischase.com` (for WordPress images)

### Highlight.js Theme
Currently using `github-dark.css` which works well in both light and dark modes. Can be changed in `PostContent.tsx`.

## Testing Checklist

- [ ] All posts render correctly
- [ ] Images load and display properly
- [ ] Markdown formatting works (headings, lists, code blocks, links)
- [ ] Syntax highlighting works
- [ ] Table of contents generates correctly
- [ ] Social sharing works
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] SEO metadata is correct
- [ ] 404 page works
- [ ] Related posts display
- [ ] Scroll progress works
- [ ] Accessibility (keyboard nav, screen readers)

## Notes

- The blog is intentionally separate from any existing `/blog*` routes to avoid conflicts
- All components are designed to be easily customizable
- The design balances aesthetics with performance and accessibility
- Code is well-commented and follows existing patterns in the codebase






