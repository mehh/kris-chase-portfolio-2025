import type { NextConfig } from "next";
import { blogPosts } from "./src/data/blog-posts";

// Routes that exist at the root level - these should NOT be redirected
const reservedRoutes = new Set([
  'admin',
  'api',
  'aspect-90-day-plan',
  'blog',
  'connect',
  'contact',
  'drupal-candidate',
  'faq',
  'handoff-90-day-plan',
  'how-i-operate',
  'listen',
  'partners',
  'resume',
  'services',
  'testimonials',
  'tithely-90-day-plan',
]);

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wp.krischase.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'krischase.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'oaidalleapiprod.blob.core.windows.net',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    // Generate 301 redirects from root blog URLs to /blog/* subdirectory
    const blogRedirects = blogPosts
      .filter((post) => !reservedRoutes.has(post.slug))
      .map((post) => ({
        source: `/${post.slug}`,
        destination: `/blog/${post.slug}`,
        permanent: true, // 301 redirect
      }));

    return [
      {
        source: "/services",
        destination: "/how-i-operate",
        permanent: true,
      },
      {
        source: "/homes",
        destination: "/",
        permanent: true,
      },
      ...blogRedirects,
    ];
  },
};

export default nextConfig;
