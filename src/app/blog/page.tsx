import { Metadata } from 'next';
import { getBlogPosts } from '@/data/blog-posts';
import { BlogCard } from '@/components/blog/BlogCard';
import { SectionTransition } from '@/components/SmoothScrollProvider';

export const metadata: Metadata = {
  title: 'Blog | Engineering Leadership, Platform Modernization & Technical Strategy',
  description: 'Insights on engineering leadership, platform modernization, CI/CD, team scaling, technical architecture, and building products that last. Written by Kris Chase, fractional CTO and engineering leader.',
  keywords: [
    'Engineering Leadership',
    'CTO Blog',
    'Platform Modernization',
    'CI/CD',
    'Technical Strategy',
    'Team Scaling',
    'Software Architecture',
    'DevOps',
    'Engineering Management',
    'Technical Leadership',
  ],
  authors: [{ name: 'Kris Chase' }],
  creator: 'Kris Chase',
  publisher: 'Kris Chase',
  metadataBase: new URL('https://krischase.com'),
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | Engineering Leadership & Technical Strategy',
    description: 'Insights on engineering leadership, platform modernization, CI/CD, team scaling, and building products that last.',
    url: 'https://krischase.com/blog',
    siteName: 'Kris Chase Portfolio',
    images: ['/images/KrisChase-OG.png'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Engineering Leadership & Technical Strategy',
    description: 'Insights on engineering leadership, platform modernization, CI/CD, team scaling, and building products that last.',
    images: ['/images/KrisChase-OG.png'],
    creator: '@krischase',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BlogIndexPage() {
  const allPosts = getBlogPosts();
  const featuredPosts = allPosts.slice(0, 1); // First post is featured
  const regularPosts = allPosts.slice(1);

  // Get unique categories and tags for future filtering
  const categories = Array.from(new Set(allPosts.map((post) => post.category))).filter(Boolean);
  const allTags = allPosts.flatMap((post) => post.tags);
  const uniqueTags = Array.from(new Set(allTags));

  return (
    <div className="min-h-screen relative z-10 pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-16">
      {/* Hero Section */}
      <SectionTransition id="blog-hero">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground">
              Engineering Leadership & Technical Strategy
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
              Insights on platform modernization, CI/CD, team scaling, technical architecture, and building products that last.
            </p>
          </div>
        </section>
      </SectionTransition>

      {/* Featured Post */}
      {featuredPosts.length > 0 && (
        <SectionTransition id="featured">
          <section className="mb-12 md:mb-16">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h2 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-2">
                  Featured
                </h2>
                <p className="text-sm text-muted-foreground">
                  Latest insights and updates
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BlogCard post={featuredPosts[0]} featured={true} index={0} />
              </div>
            </div>
          </section>
        </SectionTransition>
      )}

      {/* All Posts Grid */}
      <SectionTransition id="all-posts">
        <section className="pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-2">
                  All Articles
                </h2>
                <p className="text-sm text-muted-foreground">
                  {allPosts.length} {allPosts.length === 1 ? 'article' : 'articles'} on engineering leadership and technical strategy
                </p>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index + 1} />
              ))}
            </div>

            {/* Categories & Tags (for future filtering) */}
            {categories.length > 0 && (
              <div className="mt-16 pt-12 border-t border-border/50">
                <div className="mb-6">
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
                    Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <span
                        key={category}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-muted/50 text-muted-foreground border border-border/50"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </SectionTransition>
    </div>
  );
}

