'use client';

import Link from 'next/link';
import { BlogPost } from '@/data/blog-posts';
import { findRelatedPosts } from '@/lib/blog-utils';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { formatRelativeDate } from '@/lib/blog-utils';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

const DEFAULT_BLOG_IMAGE = 'https://krischase.com/images/KrisChase-OG.png';

export function RelatedPosts({ currentPost, allPosts }: RelatedPostsProps) {
  const related = findRelatedPosts(currentPost, allPosts, 3);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 pt-16 border-t-2 border-border/50">
      <div className="mb-10">
        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 text-foreground">
          Related Articles
        </h2>
        <p className="text-muted-foreground text-lg">
          Continue exploring similar topics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((post) => {
          const imageUrl = post.featuredImage || post.firstImage || DEFAULT_BLOG_IMAGE;
          
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="h-full rounded-xl border-2 border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/50 transition-all duration-300 overflow-hidden">
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden bg-muted">
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={imageUrl.startsWith('http://') || imageUrl.startsWith('https://')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  {post.category && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-3">
                      {post.category}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="font-heading font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border/50">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={post.publishedDate}>
                        {formatRelativeDate(post.publishedDate)}
                      </time>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>

                  {/* Read more indicator */}
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
