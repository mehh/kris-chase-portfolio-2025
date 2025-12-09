import { getBlogPosts, getCategories } from '@/data/blog-posts';
import { BlogCard } from '@/components/blog/BlogCard';
import { Tag, BookOpen, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function BlogCodexPage() {
  const allPosts = getBlogPosts();
  const categories = getCategories();
  
  // Get featured posts (most recent 2)
  const featuredPosts = allPosts.slice(0, 2);
  const regularPosts = allPosts.slice(2);

  return (
    <div className="min-h-screen relative z-10 pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto py-12 md:py-16 lg:py-20">
        <div className="mb-12 md:mb-16">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
            Blog Codex
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Practical insights on engineering leadership, platform modernization, team scaling, 
            and technical excellence. From zero-to-one startups to SaaS serving thousands of concurrent users.
          </p>
        </div>

        {/* Categories Filter */}
        {categories.length > 0 && (
          <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="flex items-center gap-3 mb-4">
              <Tag className="h-5 w-5 text-[#96442e] dark:text-[#b46633]" />
              <h2 className="font-heading text-xl font-semibold text-foreground">Categories</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const categoryPosts = allPosts.filter((post) => post.category === category);
                return (
                  <Link
                    key={category}
                    href={`/blog-codex?category=${encodeURIComponent(category)}`}
                    className="group relative px-4 py-2 rounded-lg border border-gray-200/70 dark:border-gray-800 
                             bg-white/60 dark:bg-black/60 backdrop-blur-sm
                             hover:border-[#96442e]/40 dark:hover:border-[#96442e]/50
                             hover:shadow-md transition-all duration-300"
                  >
                    <span className="text-sm font-medium text-foreground group-hover:text-[#96442e] dark:group-hover:text-[#b46633] transition-colors">
                      {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({categoryPosts.length})
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-5 w-5 text-[#96442e] dark:text-[#b46633]" />
              <h2 className="font-heading text-2xl font-bold text-foreground">Featured</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} featured={true} />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-5 w-5 text-[#96442e] dark:text-[#b46633]" />
            <h2 className="font-heading text-2xl font-bold text-foreground">
              All Posts
              <span className="ml-3 text-lg font-normal text-muted-foreground">
                ({allPosts.length})
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {regularPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        {/* Empty State */}
        {allPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No posts yet. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  );
}

