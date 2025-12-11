import { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import { BlogCard } from "@/components/blog/BlogCard";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export const metadata: Metadata = {
  title: "Blog | Kris Chase - Engineering Leadership & Technical Insights",
  description: "Thoughts on engineering leadership, platform modernization, team scaling, AI workflows, and building products that last. From a fractional CTO with 20+ years of experience.",
  keywords: [
    "Engineering Leadership",
    "CTO Blog",
    "Technical Leadership",
    "Platform Modernization",
    "Team Scaling",
    "AI Workflows",
    "Software Development",
    "Engineering Management",
  ],
  openGraph: {
    title: "Blog | Kris Chase - Engineering Leadership & Technical Insights",
    description: "Thoughts on engineering leadership, platform modernization, team scaling, and building products that last.",
    url: "https://krischase.com/blog-gemini3",
    siteName: "Kris Chase Portfolio",
    images: ["/images/KrisChase-OG.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Kris Chase - Engineering Leadership & Technical Insights",
    description: "Thoughts on engineering leadership, platform modernization, team scaling, and building products that last.",
    images: ["/images/KrisChase-OG.png"],
    creator: "@krischase",
  },
  alternates: {
    canonical: "/blog-gemini3",
  },
};

export default function BlogIndexPage() {
  // Get featured post (most recent) and regular posts
  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  // Group posts by category for future filtering
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)));

  return (
    <main className="relative w-full min-h-screen bg-black">
      {/* Hero Section - Full Width with Container */}
      <section className="w-full border-b border-border/50 bg-gradient-to-b from-background via-background to-transparent">
        <div className="mx-auto w-full max-w-[85rem] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-32 sm:pt-40 md:pt-48 pb-16 md:pb-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight text-foreground mb-6">
            Blog
          </h1>
          <p className="max-w-3xl text-lg sm:text-xl leading-relaxed text-muted-foreground">
            Thoughts on engineering leadership, platform modernization, team scaling, AI workflows, and building products that last. 
            From a fractional CTO with 20+ years of experience leading teams and shipping products.
          </p>
        </div>
      </section>

      {/* Content Container - Optimized gutters */}
      <div className="mx-auto w-full max-w-[85rem] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16 lg:py-20">
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16 md:mb-20">
            <div className="relative rounded-2xl p-2">
              <GlowingEffect
                spread={40}
                glow
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <div className="relative rounded-2xl">
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#96442e]/10 dark:bg-[#96442e]/20 text-[#96442e] dark:text-[#b46633] text-sm font-medium">
                    Featured
                  </span>
                </div>
                <BlogCard post={featuredPost} featured />
              </div>
            </div>
          </section>
        )}

        {/* All Posts Grid */}
        <section>
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
              All Posts
            </h2>
            <div className="text-sm text-muted-foreground font-medium">
              {blogPosts.length} {blogPosts.length === 1 ? "article" : "articles"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {regularPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index + 1} />
            ))}
          </div>
        </section>

        {/* Categories Section */}
        {categories.length > 0 && (
          <section className="mt-16 md:mt-20 pt-8 md:pt-12 border-t border-border">
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
              Browse by Category
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((category) => {
                const count = blogPosts.filter((p) => p.category === category).length;
                return (
                  <button
                    key={category}
                    className="px-5 py-2.5 rounded-lg bg-muted/50 hover:bg-muted text-sm font-medium text-foreground transition-colors border border-border/50 hover:border-border"
                  >
                    {category} <span className="text-muted-foreground">({count})</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

