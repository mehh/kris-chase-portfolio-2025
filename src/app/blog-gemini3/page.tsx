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
    <main className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 md:px-10 lg:px-12 pt-32 sm:pt-40 md:pt-44 pb-20">
      {/* Hero Section */}
      <section className="mb-12 md:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight text-foreground mb-4">
          Blog
        </h1>
        <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          Thoughts on engineering leadership, platform modernization, team scaling, AI workflows, and building products that last. 
          From a fractional CTO with 20+ years of experience leading teams and shipping products.
        </p>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-12 md:mb-16">
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
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
            All Posts
          </h2>
          <div className="text-sm text-muted-foreground">
            {blogPosts.length} {blogPosts.length === 1 ? "article" : "articles"}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {regularPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Categories Section (for future filtering) */}
      {categories.length > 0 && (
        <section className="mt-16 pt-12 border-t border-border">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const count = blogPosts.filter((p) => p.category === category).length;
              return (
                <span
                  key={category}
                  className="px-4 py-2 rounded-lg bg-muted/50 text-sm text-muted-foreground"
                >
                  {category} ({count})
                </span>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}

