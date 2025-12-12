'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BlogPost } from '@/data/blog-posts';

interface TagFilterProps {
  posts: BlogPost[];
  selectedCategory?: string;
  selectedTag?: string;
  onCategoryChange: (category: string | undefined) => void;
  onTagChange: (tag: string | undefined) => void;
}

export function TagFilter({
  posts,
  selectedCategory,
  selectedTag,
  onCategoryChange,
  onTagChange,
}: TagFilterProps) {
  const categories = Array.from(
    new Set(posts.map((post) => post.category).filter(Boolean))
  ).sort();

  const allTags = posts.flatMap((post) => post.tags);
  const uniqueTags = Array.from(new Set(allTags)).sort();

  const hasActiveFilters = selectedCategory || selectedTag;

  return (
    <div className="space-y-6">
      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() =>
                    onCategoryChange(isSelected ? undefined : category)
                  }
                  className={cn(
                    'inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                    isSelected
                      ? 'bg-primary text-primary-foreground border-2 border-primary shadow-md'
                      : 'bg-muted/50 text-muted-foreground border-2 border-border/50 hover:border-primary/50 hover:bg-muted/80'
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tags */}
      {uniqueTags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
            Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {uniqueTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => onTagChange(isSelected ? undefined : tag)}
                  className={cn(
                    'inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                    isSelected
                      ? 'bg-primary/20 text-primary border border-primary/50'
                      : 'bg-muted/50 text-muted-foreground border border-border/50 hover:border-primary/30 hover:bg-muted/80'
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={() => {
            onCategoryChange(undefined);
            onTagChange(undefined);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted border border-border/50 transition-all"
        >
          <X className="w-4 h-4" />
          Clear Filters
        </button>
      )}
    </div>
  );
}
