'use client';

import { useState, useMemo } from 'react';
import { getBlogPosts } from '@/data/blog-posts';
import { BlogCard } from '@/components/blog/BlogCard';
import { SectionTransition } from '@/components/SmoothScrollProvider';
import { TagFilter } from '@/components/blog/TagFilter';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BlogIndexPage() {
  const allPosts = getBlogPosts();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories and tags
  const categories = useMemo(
    () => Array.from(new Set(allPosts.map((post) => post.category))).filter(Boolean).sort(),
    [allPosts]
  );
  const allTags = useMemo(
    () => Array.from(new Set(allPosts.flatMap((post) => post.tags))).sort(),
    [allPosts]
  );

  // Filter posts
  const filteredPosts = useMemo(() => {
    let posts = [...allPosts];

    if (selectedCategory) {
      posts = posts.filter((post) => post.category === selectedCategory);
    }

    if (selectedTag) {
      posts = posts.filter((post) => post.tags.includes(selectedTag));
    }

    return posts;
  }, [allPosts, selectedCategory, selectedTag]);

  const featuredPosts = filteredPosts.slice(0, 1);
  const regularPosts = filteredPosts.slice(1);

  const hasActiveFilters = selectedTag !== null || selectedCategory !== null;

  const clearFilters = () => {
    setSelectedTag(null);
    setSelectedCategory(null);
  };

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

      {/* Featured Post - Enhanced Hero Treatment */}
      {featuredPosts.length > 0 && !hasActiveFilters && (
        <SectionTransition id="featured">
          <section className="mb-16 md:mb-20 lg:mb-24">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-1 w-12 bg-primary rounded-full" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Featured Article
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-2">
                    Latest Insights
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground">
                    Deep dives on engineering leadership, technical strategy, and building products that last
                  </p>
                </div>
              </div>
              <div className="relative">
                <BlogCard post={featuredPosts[0]} featured={true} index={0} />
                {/* Decorative gradient overlay */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-3xl blur-2xl opacity-50 -z-10" />
              </div>
            </div>
          </section>
        </SectionTransition>
      )}

      {/* All Posts Grid */}
      <SectionTransition id="all-posts">
        <section className="pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <div className="mb-8 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-2">
                    {hasActiveFilters ? 'Filtered Articles' : 'All Articles'}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                    {hasActiveFilters && ` matching your filters`}
                  </p>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-muted/50 hover:bg-muted border-2 border-border/50 hover:border-primary/50 transition-all text-foreground"
                  >
                    <X className="w-4 h-4" />
                    Clear filters
                  </button>
                )}
              </div>

              {/* Filter Controls */}
              <div className="space-y-4 p-6 rounded-xl border-2 border-border/50 bg-card/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </div>
                {categories.length > 0 && (
                  <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                  />
                )}
                {allTags.length > 0 && (
                  <TagFilter
                    tags={allTags}
                    selectedTag={selectedTag}
                    onTagSelect={setSelectedTag}
                  />
                )}
              </div>
            </div>

            {/* Posts Grid - Enhanced Layout */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {regularPosts.map((post, index) => (
                  <BlogCard key={post.slug} post={post} index={index + 1} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-6 rounded-xl border-2 border-border/50 bg-card/30">
                <p className="text-lg text-muted-foreground mb-4">
                  No articles found matching your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Topics Section (when no filters active) */}
            {!hasActiveFilters && categories.length > 0 && (
              <div className="mt-16 pt-12 border-t border-border/50">
                <div className="mb-6">
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
                    Browse by Topic
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-muted/50 text-foreground border-2 border-border/50 hover:border-primary/50 hover:bg-muted transition-all"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                {allTags.length > 0 && (
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                      Popular Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.slice(0, 20).map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(tag)}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-muted/30 text-muted-foreground border border-border/50 hover:border-primary/50 hover:bg-muted/50 hover:text-foreground transition-all"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </SectionTransition>
    </div>
  );
}
