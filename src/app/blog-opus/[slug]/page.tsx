import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/data/blog-posts';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { ScrollProgress } from '@/components/blog/ScrollProgress';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { formatBlogDate } from '@/lib/blog-utils';
import { Calendar, Clock, Tag, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogStructuredData } from '@/components/blog/BlogStructuredData';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const title = post.seo.metaTitle || post.title;
  const description = post.seo.metaDescription || post.description;
  const ogImage = post.seo.ogImage || post.featuredImage || post.firstImage || '/images/KrisChase-OG.png';

  return {
    title,
    description,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    creator: post.author.name,
    publisher: 'Kris Chase',
    metadataBase: new URL('https://krischase.com'),
    alternates: {
      canonical: `/blog-opus/${slug}`,
    },
    openGraph: {
      title: post.seo.ogTitle || post.title,
      description: post.seo.ogDescription || post.description,
      url: `https://krischase.com/blog-opus/${slug}`,
      siteName: 'Kris Chase Portfolio',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.metadata.updatedDate || post.publishedDate,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: post.seo.twitterCard === 'summary' ? 'summary' : 'summary_large_image',
      title: post.seo.ogTitle || post.title,
      description: post.seo.ogDescription || post.description,
      images: [ogImage],
      creator: post.author.twitter ? `@${post.author.twitter.replace('@', '')}` : '@krischase',
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
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = post.featuredImage || post.firstImage;
  const allPosts = getBlogPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <>
      <BlogStructuredData post={post} />
      <ScrollProgress />
      <article className="min-h-screen relative z-10 pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-16">
        {/* Header */}
        <header className="py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back to blog */}
            <Link
              href="/blog-opus"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to Blog</span>
            </Link>

            {/* Category & Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.category && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {post.category}
                </span>
              )}
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs text-muted-foreground bg-muted/50"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6 text-foreground leading-tight">
              {post.title}
            </h1>

            {/* Description */}
            {post.description && (
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.description}
              </p>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-8 border-b border-border/50">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedDate}>
                  {formatBlogDate(post.publishedDate)}
                </time>
                {post.metadata.updatedDate && post.metadata.updatedDate !== post.publishedDate && (
                  <span className="text-xs">
                    (Updated {formatBlogDate(post.metadata.updatedDate)})
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{post.wordCount.toLocaleString()} words</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {imageUrl && (
          <div className="mb-8 md:mb-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="relative w-full aspect-video md:aspect-[21/9] rounded-lg overflow-hidden bg-muted">
                <Image
                  src={imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                  unoptimized={imageUrl.startsWith('http://') || imageUrl.startsWith('https://')}
                />
              </div>
            </div>
          </div>
        )}

        {/* Content with TOC */}
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <BlogPostContent content={post.content} />

                {/* Author & Share Section */}
                <div className="mt-12 pt-8 border-t border-border/50">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        {post.author.name}
                      </p>
                      {post.author.twitter && (
                        <a
                          href={`https://twitter.com/${post.author.twitter.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          @{post.author.twitter.replace('@', '')}
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">Share:</span>
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://krischase.com/blog-opus/${slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-muted/50 hover:bg-muted transition-colors text-foreground"
                        aria-label="Share on Twitter"
                      >
                        <Share2 className="w-4 h-4" />
                        Twitter
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://krischase.com/blog-opus/${slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-muted/50 hover:bg-muted transition-colors text-foreground"
                        aria-label="Share on LinkedIn"
                      >
                        <Share2 className="w-4 h-4" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="mt-12 pt-8 border-t border-border/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {prevPost && (
                      <Link
                        href={`/blog-opus/${prevPost.slug}`}
                        className="group p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-muted/30 transition-all"
                      >
                        <div className="text-xs text-muted-foreground mb-2">Previous</div>
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {prevPost.title}
                        </div>
                      </Link>
                    )}
                    {nextPost && (
                      <Link
                        href={`/blog-opus/${nextPost.slug}`}
                        className="group p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-muted/30 transition-all md:text-right"
                      >
                        <div className="text-xs text-muted-foreground mb-2">Next</div>
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {nextPost.title}
                        </div>
                      </Link>
                    )}
                  </div>
                </nav>
              </div>
            </div>

            {/* Table of Contents Sidebar */}
            <TableOfContents />
          </div>
        </div>
      </article>
    </>
  );
}

