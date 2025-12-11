import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import { PostContent } from "@/components/blog/PostContent";
import { ScrollProgress } from "@/components/blog/ScrollProgress";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { SocialShare } from "@/components/blog/SocialShare";
import { BlogCard } from "@/components/blog/BlogCard";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { formatDate, getPostImage, getPostUrl, getCategoryDisplayName } from "@/lib/blog-utils";
import { Clock, Tag, ArrowLeft, Calendar } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const title = post.seo.metaTitle || post.title;
  const description = post.seo.metaDescription || post.description;
  const image = post.seo.ogImage || post.featuredImage || post.firstImage || "/images/KrisChase-OG.png";
  const url = getPostUrl(post.slug);

  return {
    title,
    description,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    creator: post.author.name,
    publisher: "Kris Chase",
    metadataBase: new URL("https://krischase.com"),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.seo.ogTitle || title,
      description: post.seo.ogDescription || description,
      url,
      siteName: "Kris Chase Portfolio",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedDate,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: (post.seo.twitterCard as "summary" | "summary_large_image") || "summary_large_image",
      title: post.seo.ogTitle || title,
      description: post.seo.ogDescription || description,
      images: [image],
      creator: post.author.twitter || "@krischase",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const imageUrl = getPostImage(post);

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <ScrollProgress />
      <main className="relative w-full min-h-screen bg-black">
        {/* Hero Section - Full Width */}
        <section className="w-full border-b border-border/50 bg-gradient-to-b from-background via-background to-transparent">
          <div className="mx-auto w-full max-w-[85rem] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-32 sm:pt-40 md:pt-48 pb-12 md:pb-16">
            {/* Back Link */}
            <div className="mb-8">
              <Link
                href="/blog-gemini3"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm font-medium">Back to Blog</span>
              </Link>
            </div>

            {/* Category */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#96442e]/10 dark:bg-[#96442e]/20 text-[#96442e] dark:text-[#b46633] text-sm font-medium">
                <Tag className="h-3.5 w-3.5" />
                {getCategoryDisplayName(post.category)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-foreground mb-6">
              {post.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <time dateTime={post.publishedDate} className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedDate, "long")}
              </time>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readingTime} min read
              </span>
              {post.metadata.updatedDate && (
                <span className="text-xs">
                  Updated {formatDate(post.metadata.updatedDate, "short")}
                </span>
              )}
            </div>

            {/* Featured Image - Full Width */}
            <div className="relative w-full -mx-6 sm:-mx-8 md:-mx-10 lg:-mx-12 aspect-[21/9] md:aspect-video rounded-none md:rounded-2xl overflow-hidden bg-muted mb-8">
              <Image
                src={imageUrl}
                alt={post.title.replace(/"/g, '&quot;')}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>

            {/* Description/Excerpt */}
            {post.description && (
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 max-w-4xl">
                {post.description}
              </p>
            )}
          </div>
        </section>

        {/* Content Container - Optimized gutters and spacing */}
        <div className="mx-auto w-full max-w-[85rem] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16 lg:py-20">
          {/* Article Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-8 md:gap-12 lg:gap-16">
            {/* Main Content - Full width within grid */}
            <article className="prose prose-lg dark:prose-invert max-w-none w-full prose-headings:font-heading prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-p:text-foreground/90 prose-p:leading-relaxed prose-a:text-[#96442e] prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-strong:font-semibold prose-pre:max-w-full prose-code:max-w-full">
              {/* Content */}
              <div className="mb-12">
                <PostContent content={post.content} post={post} />
              </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mb-12 pt-8 border-t border-border">
                <h3 className="text-sm font-semibold text-foreground mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-muted/50 text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

              {/* Social Share */}
              <SocialShare post={post} />
            </article>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <TableOfContents />
            </aside>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 md:mt-20 pt-8 md:pt-12 border-t border-border">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-6 md:mb-8">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.slug} className="relative rounded-2xl p-2">
                    <GlowingEffect
                      spread={40}
                      glow
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={3}
                    />
                    <div className="relative rounded-2xl">
                      <BlogCard post={relatedPost} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

