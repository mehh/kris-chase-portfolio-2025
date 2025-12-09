import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Codex | Engineering Leadership & Technical Insights | Kris Chase',
  description:
    'Practical insights on engineering leadership, platform modernization, team scaling, and technical excellence. From zero-to-one startups to SaaS serving thousands of concurrent users.',
  alternates: { canonical: '/blog-codex' },
  openGraph: {
    title: 'Blog Codex | Engineering Leadership & Technical Insights',
    description:
      'Practical insights on engineering leadership, platform modernization, team scaling, and technical excellence. From zero-to-one startups to SaaS serving thousands of concurrent users.',
    url: 'https://krischase.com/blog-codex',
    siteName: 'Kris Chase Portfolio',
    images: ['/images/KrisChase-OG.png'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Codex | Engineering Leadership & Technical Insights',
    description:
      'Practical insights on engineering leadership, platform modernization, team scaling, and technical excellence.',
    images: ['/images/KrisChase-OG.png'],
    creator: '@krischase',
  },
  keywords: [
    'Engineering Leadership',
    'Technical Blog',
    'CTO Insights',
    'Platform Modernization',
    'Team Scaling',
    'Software Development',
    'DevOps',
    'CI/CD',
    'Technical Excellence',
    'Startup Engineering',
  ],
};

export default function BlogCodexLayout({ children }: { children: React.ReactNode }) {
  return children;
}

