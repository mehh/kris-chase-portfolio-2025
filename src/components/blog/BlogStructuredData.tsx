import type { BlogPost } from '@/data/blog-posts';

interface BlogStructuredDataProps {
  post: BlogPost;
}

/**
 * JSON-LD structured data for blog posts (SEO)
 */
export function BlogStructuredData({ post }: BlogStructuredDataProps) {
  const imageUrl = post.featuredImage || post.firstImage || 'https://krischase.com/images/KrisChase-OG.png';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: imageUrl,
    datePublished: post.publishedDate,
    dateModified: post.metadata.updatedDate || post.publishedDate,
    author: {
      '@type': 'Person',
      name: post.author.name,
      ...(post.author.twitter && {
        sameAs: `https://twitter.com/${post.author.twitter.replace('@', '')}`,
      }),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kris Chase',
      logo: {
        '@type': 'ImageObject',
        url: 'https://krischase.com/images/KrisChase-OG.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://krischase.com/blog-opus/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    wordCount: post.wordCount,
    timeRequired: `PT${post.readingTime}M`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

