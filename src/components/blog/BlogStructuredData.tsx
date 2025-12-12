import type { BlogPost } from '@/data/blog-posts';

interface BlogStructuredDataProps {
  post: BlogPost;
}

/**
 * JSON-LD structured data for blog posts (SEO)
 */
export function BlogStructuredData({ post }: BlogStructuredDataProps) {
  const imageUrl = post.featuredImage || post.firstImage || 'https://krischase.com/images/KrisChase-OG.png';

  const postUrl = `https://krischase.com/blog/${post.slug}`;
  
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
      ...(post.author.email && {
        email: post.author.email,
      }),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kris Chase',
      logo: {
        '@type': 'ImageObject',
        url: 'https://krischase.com/images/KrisChase-OG.png',
        width: 1200,
        height: 630,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
      url: postUrl,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    wordCount: post.wordCount,
    timeRequired: `PT${post.readingTime}M`,
    inLanguage: 'en-US',
    // Breadcrumb structured data
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://krischase.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://krischase.com/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: postUrl,
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

