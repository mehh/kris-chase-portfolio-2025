'use client';

import Link from 'next/link';
import { motion } from "motion/react";
import { formatBlogDate, formatRelativeDate } from '@/lib/blog-utils';
import type { BlogPost } from '@/data/blog-posts';
import { Clock, Calendar } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { capture } from '@/lib/posthog/client';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  index?: number;
}

const DEFAULT_BLOG_IMAGE = 'https://krischase.com/images/KrisChase-OG.png';

export function BlogCard({ post, featured = false, index = 0 }: BlogCardProps) {
  const imageUrl = post.featuredImage || post.firstImage || DEFAULT_BLOG_IMAGE;
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <motion.article
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className={cn(
        'group relative overflow-hidden rounded-2xl border transition-all duration-300',
        featured
          ? 'col-span-1 md:col-span-2 border-foreground/20 bg-card/50 hover:border-foreground/40 hover:shadow-lg hover:shadow-primary/10'
          : 'border-foreground/10 bg-card/30 hover:border-foreground/30 hover:shadow-md hover:shadow-primary/5'
      )}
    >
      <Link 
        href={`/blog/${post.slug}`} 
        onClick={() => {
          try {
            capture("blog_card_clicked", {
              post_slug: post.slug,
              post_title: post.title,
              post_category: post.category,
              is_featured: featured,
            });
          } catch {}
        }}
        className="block h-full"
      >
        <div className={`flex flex-col h-full ${featured ? 'md:flex-row' : ''}`}>
          {/* Image - Always show (has default fallback) */}
          <div
            className={cn(
              'relative overflow-hidden bg-muted',
              featured ? 'h-48 md:h-auto md:w-1/2' : 'h-48'
            )}
          >
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
              unoptimized={imageUrl.startsWith('http://') || imageUrl.startsWith('https://')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          </div>

          {/* Content */}
          <div
            className={cn(
              'flex flex-col p-6',
              featured ? 'md:w-1/2 md:justify-center' : 'flex-1'
            )}
          >
            {/* Category & Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {post.category && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {post.category}
                </span>
              )}
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs text-muted-foreground bg-muted/50"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2
              className={cn(
                'font-heading font-bold mb-3 text-foreground group-hover:text-primary transition-colors',
                featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
              )}
            >
              {post.title}
            </h2>

            {/* Description */}
            <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-3 flex-1">
              {post.description}
            </p>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
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
          </div>
        </div>
      </Link>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/0 group-hover:to-primary/5 transition-all duration-500 pointer-events-none" />
    </motion.article>
  );
}
