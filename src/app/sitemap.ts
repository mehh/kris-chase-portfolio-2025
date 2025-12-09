import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/data/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://krischase.com';
  const now = new Date();

  const routes: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency']; priority: number; lastModified?: Date }>= [
    { path: '/', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/how-i-operate', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/resume', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/testimonials', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/partners', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
    { path: '/listen', changeFrequency: 'yearly', priority: 0.5 },
    { path: '/faq', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/services', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/blog-codex', changeFrequency: 'weekly', priority: 0.8 },
  ];

  // Add blog posts to sitemap
  const blogPosts = getBlogPosts();
  const blogRoutes = blogPosts.map((post) => ({
    path: `/blog-codex/${post.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    lastModified: new Date(post.metadata?.updatedDate || post.publishedDate),
  }));

  return [...routes, ...blogRoutes].map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: r.lastModified || now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
