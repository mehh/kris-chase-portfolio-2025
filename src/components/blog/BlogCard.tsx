'use client';

import Link from 'next/link';
import { motion } from "motion/react";
import { formatBlogDate, formatRelativeDate } from '@/lib/blog-utils';
import type { BlogPost } from '@/data/blog-posts';
import { Clock, Calendar } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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
        'group relative overflow-hidden rounded-2xl border-2 transition-all duration-500',
        featured
          ? 'col-span-1 md:col-span-2 border-primary/30 bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-sm hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1'
          : 'border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-0.5'
      )}
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className={`flex flex-col h-full ${featured ? 'md:flex-row' : ''}`}>
          {/* Image - Always show (has default fallback) */}
          <div
            className={cn(
              'relative overflow-hidden bg-muted',
              featured ? 'h-56 md:h-auto md:w-1/2' : 'h-52'
            )}
          >
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
              unoptimized={imageUrl.startsWith('http://') || imageUrl.startsWith('https://')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent group-hover:from-background/80 transition-colors duration-500" />
            {/* Featured badge overlay */}
            {featured && (
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm border border-primary/30">
                <span className="text-xs font-bold text-primary-foreground uppercase tracking-wider">
                  Featured
                </span>
              </div>
            )}
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
                'font-heading font-bold mb-3 text-foreground group-hover:text-primary transition-all duration-300',
                featured ? 'text-2xl md:text-3xl lg:text-4xl leading-tight' : 'text-xl md:text-2xl leading-snug'
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

      {/* Enhanced hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-primary/5 group-hover:to-primary/10 transition-all duration-700 pointer-events-none rounded-2xl" />
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </motion.article>
  );
}
