import { Metadata } from 'next';
import { getBlogPosts } from '@/data/blog-posts';
import { BlogListing } from '@/components/blog/BlogListing';
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

      {/* Blog Listing with Filters */}
      <BlogListing allPosts={allPosts} />
    </div>
  );
}

