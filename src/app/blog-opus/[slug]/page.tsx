import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/data/blog-posts';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { ScrollProgress } from '@/components/blog/ScrollProgress';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { formatBlogDate } from '@/lib/blog-utils';
import { Calendar, Clock, Tag, Share2, ArrowLeft, ArrowRight, User } from 'lucide-react';
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
      <article className="min-h-screen relative z-10 w-full">
        {/* Full-width header section with gradient background */}
        <header className="w-full bg-gradient-to-b from-background via-background to-muted/20 border-b border-border/50">
          <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-16 lg:py-20">
            {/* Back to blog */}
            <Link
              href="/blog-opus"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blog</span>
            </Link>

            {/* Category & Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {post.category && (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/15 text-primary border border-primary/30 backdrop-blur-sm">
                  {post.category}
                </span>
              )}
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground bg-muted/60 border border-border/50 hover:bg-muted/80 transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-foreground leading-[1.1] tracking-tight">
              {post.title}
            </h1>

            {/* Description */}
            {post.description && (
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-10 leading-relaxed max-w-4xl font-light">
                {post.description}
              </p>
            )}

            {/* Enhanced Metadata */}
            <div className="flex flex-wrap items-center gap-6 md:gap-8 text-sm md:text-base text-muted-foreground pb-8 border-b border-border/50">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-muted/40 border border-border/30">
                <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                <time dateTime={post.publishedDate} className="font-medium">
                  {formatBlogDate(post.publishedDate)}
                </time>
                {post.metadata.updatedDate && post.metadata.updatedDate !== post.publishedDate && (
                  <span className="text-xs opacity-75 ml-2">
                    (Updated {formatBlogDate(post.metadata.updatedDate)})
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-muted/40 border border-border/30">
                <Clock className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium">{post.readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-muted/40 border border-border/30">
                <span className="font-medium">{post.wordCount.toLocaleString()} words</span>
              </div>
            </div>
          </div>
        </header>

        {/* Full-width Featured Image */}
        {imageUrl && (
          <div className="w-full mb-12 md:mb-16 lg:mb-20">
            <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
              <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden bg-muted shadow-2xl border border-border/50">
                <Image
                  src={imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                  unoptimized={imageUrl.startsWith('http://') || imageUrl.startsWith('https://')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        )}

        {/* Full-width Content with TOC */}
        <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="flex gap-8 lg:gap-16 xl:gap-20">
            {/* Main Content - Full width with optimal reading width */}
            <div className="flex-1 min-w-0">
              <div className="max-w-4xl mx-auto">
                <BlogPostContent content={post.content} />

                {/* Enhanced Author & Share Section */}
                <div className="mt-16 pt-12 border-t-2 border-border/50">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-foreground mb-1">
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
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-muted-foreground">Share:</span>
                      <div className="flex items-center gap-3">
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://krischase.com/blog-opus/${slug}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-muted/60 hover:bg-muted border border-border/50 hover:border-primary/50 transition-all text-foreground hover:text-primary"
                          aria-label="Share on Twitter"
                        >
                          <Share2 className="w-4 h-4" />
                          Twitter
                        </a>
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://krischase.com/blog-opus/${slug}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-muted/60 hover:bg-muted border border-border/50 hover:border-primary/50 transition-all text-foreground hover:text-primary"
                          aria-label="Share on LinkedIn"
                        >
                          <Share2 className="w-4 h-4" />
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Navigation */}
                <nav className="mt-16 pt-12 border-t-2 border-border/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {prevPost && (
                      <Link
                        href={`/blog-opus/${prevPost.slug}`}
                        className="group p-6 rounded-xl border-2 border-border/50 hover:border-primary/50 hover:bg-muted/30 transition-all"
                      >
                        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                          Previous Post
                        </div>
                        <div className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {prevPost.title}
                        </div>
                      </Link>
                    )}
                    {nextPost && (
                      <Link
                        href={`/blog-opus/${nextPost.slug}`}
                        className="group p-6 rounded-xl border-2 border-border/50 hover:border-primary/50 hover:bg-muted/30 transition-all md:text-right"
                      >
                        <div className="flex items-center justify-end gap-2 text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                          Next Post
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <div className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
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

