import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/data/blog-posts';
import { PostContent } from '@/components/blog/PostContent';
import { ScrollProgress } from '@/components/blog/ScrollProgress';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { formatBlogDate, formatRelativeDate, getCategoryDisplayName } from '@/lib/blog-utils';
import { BlogCard } from '@/components/blog/BlogCard';
import { Clock, Calendar, Tag, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SocialShare } from '@/components/blog/SocialShare';
import { BackToTopFooter } from '@/components/blog/BackToTopFooter';

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
      title: 'Post Not Found | Blog Codex',
    };
  }

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.description;
  const ogImage = post.seo?.ogImage || post.featuredImage || post.firstImage || '/images/KrisChase-OG.png';
  const url = `https://krischase.com/blog-codex/${post.slug}`;

  return {
    title: `${title} | Blog Codex`,
    description,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    creator: post.author.name,
    publisher: 'Kris Chase',
    alternates: {
      canonical: `/blog-codex/${post.slug}`,
    },
    openGraph: {
      title: post.seo?.ogTitle || title,
      description: post.seo?.ogDescription || description,
      url,
      siteName: 'Kris Chase Portfolio',
      images: [ogImage],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.metadata?.updatedDate || post.publishedDate,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: (post.seo?.twitterCard as 'summary' | 'summary_large_image' | 'player' | 'app' | undefined) || 'summary_large_image',
      title: post.seo?.ogTitle || title,
      description: post.seo?.ogDescription || description,
      images: [ogImage],
      creator: post.author.twitter || '@krischase',
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = getBlogPosts({
    category: post.category,
    limit: 3,
  }).filter((p) => p.slug !== post.slug);

  return (
    <>
      <ScrollProgress />
      <div className="min-h-screen relative z-10 pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-16">
        <article className="max-w-7xl mx-auto py-8 md:py-12 lg:py-16">
          {/* Back Button */}
          <Link
            href="/blog-codex"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Blog</span>
          </Link>

          {/* Header */}
          <header className="mb-8 md:mb-12">
            {/* Category & Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#96442e]/10 dark:bg-[#96442e]/20 text-[#96442e] dark:text-[#b46633] text-sm font-medium border border-[#96442e]/20">
                <Tag className="h-3.5 w-3.5" />
                {getCategoryDisplayName(post.category)}
              </span>
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
              {post.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.publishedDate}>
                  {formatBlogDate(post.publishedDate)}
                </time>
                {post.metadata?.updatedDate && post.metadata.updatedDate !== post.publishedDate && (
                  <span className="text-xs">(Updated {formatRelativeDate(post.metadata.updatedDate)})</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
              {post.author.name && (
                <div className="text-sm">
                  By <span className="font-medium text-foreground">{post.author.name}</span>
                </div>
              )}
            </div>

            {/* Social Share */}
            <SocialShare post={post} />
          </header>

          {/* Main Content with TOC */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
            {/* Article Content */}
            <div className="max-w-none">
              <PostContent content={post.content} post={post} />
            </div>

            {/* Table of Contents Sidebar */}
            <aside>
              <TableOfContents />
            </aside>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-12 border-t border-border">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-foreground">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </section>
          )}

          {/* Back to Top / Navigation Footer */}
          <BackToTopFooter />
        </article>
      </div>
    </>
  );
}

