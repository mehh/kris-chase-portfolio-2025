'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryFilterProps) {
  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Category:</span>
      <button
        onClick={() => onCategorySelect(null)}
        className={cn(
          'px-4 py-2 rounded-lg text-sm font-medium transition-all border-2',
          selectedCategory === null
            ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
            : 'bg-muted/50 text-foreground border-border/50 hover:border-primary/50 hover:bg-muted'
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category === selectedCategory ? null : category)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-all border-2 flex items-center gap-2',
            selectedCategory === category
              ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
              : 'bg-muted/50 text-foreground border-border/50 hover:border-primary/50 hover:bg-muted'
          )}
        >
          {category}
          {selectedCategory === category && <X className="w-3.5 h-3.5" />}
        </button>
      ))}
    </div>
  );
}
