'use client';

import { useState, useMemo } from 'react';
import { BlogCard } from '@/components/blog/BlogCard';
import { TagFilter } from '@/components/blog/TagFilter';
import { SectionTransition } from '@/components/SmoothScrollProvider';
import type { BlogPost } from '@/data/blog-posts';

interface BlogListingProps {
  allPosts: BlogPost[];
}

export function BlogListing({ allPosts }: BlogListingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedTag, setSelectedTag] = useState<string | undefined>();

  // Filter posts based on selected category and tag
  const filteredPosts = useMemo(() => {
    let filtered = [...allPosts];

    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag));
    }

    return filtered;
  }, [allPosts, selectedCategory, selectedTag]);

  const featuredPosts = filteredPosts.slice(0, 1);
  const regularPosts = filteredPosts.slice(1);

  return (
    <>
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

      {/* Filter Section */}
      <SectionTransition id="filters">
        <section className="mb-12 md:mb-16">
          <div className="max-w-7xl mx-auto">
            <TagFilter
              posts={allPosts}
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
              onCategoryChange={setSelectedCategory}
              onTagChange={setSelectedTag}
            />
          </div>
        </section>
      </SectionTransition>

      {/* All Posts Grid */}
      <SectionTransition id="all-posts">
        <section className="pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-2">
                  {selectedCategory || selectedTag ? 'Filtered Articles' : 'All Articles'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                  {selectedCategory && ` in ${selectedCategory}`}
                  {selectedTag && ` tagged "${selectedTag}"`}
                </p>
              </div>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No articles found matching your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post, index) => (
                  <BlogCard key={post.slug} post={post} index={index + 1} />
                ))}
              </div>
            )}
          </div>
        </section>
      </SectionTransition>
    </>
  );
}
