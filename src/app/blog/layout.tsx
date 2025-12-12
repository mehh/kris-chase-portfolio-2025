import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Engineering Leadership, Platform Modernization & Technical Strategy',
  description: 'Insights on engineering leadership, platform modernization, CI/CD, team scaling, technical architecture, and building products that last. Written by Kris Chase, fractional CTO and engineering leader.',
  keywords: [
    'Engineering Leadership',
    'CTO Blog',
    'Platform Modernization',
    'CI/CD',
    'Technical Strategy',
    'Team Scaling',
    'Software Architecture',
    'DevOps',
    'Engineering Management',
    'Technical Leadership',
  ],
  authors: [{ name: 'Kris Chase' }],
  creator: 'Kris Chase',
  publisher: 'Kris Chase',
  metadataBase: new URL('https://krischase.com'),
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | Engineering Leadership & Technical Strategy',
    description: 'Insights on engineering leadership, platform modernization, CI/CD, team scaling, and building products that last.',
    url: 'https://krischase.com/blog',
    siteName: 'Kris Chase Portfolio',
    images: ['/images/KrisChase-OG.png'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Engineering Leadership & Technical Strategy',
    description: 'Insights on engineering leadership, platform modernization, CI/CD, team scaling, and building products that last.',
    images: ['/images/KrisChase-OG.png'],
    creator: '@krischase',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}

