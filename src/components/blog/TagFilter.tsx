'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export function TagFilter({ tags, selectedTag, onTagSelect }: TagFilterProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Filter by topic:</span>
      <button
        onClick={() => onTagSelect(null)}
        className={cn(
          'px-4 py-2 rounded-lg text-sm font-medium transition-all border-2',
          selectedTag === null
            ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
            : 'bg-muted/50 text-foreground border-border/50 hover:border-primary/50 hover:bg-muted'
        )}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag === selectedTag ? null : tag)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-all border-2 flex items-center gap-2',
            selectedTag === tag
              ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
              : 'bg-muted/50 text-foreground border-border/50 hover:border-primary/50 hover:bg-muted'
          )}
        >
          {tag}
          {selectedTag === tag && <X className="w-3.5 h-3.5" />}
        </button>
      ))}
    </div>
  );
}
