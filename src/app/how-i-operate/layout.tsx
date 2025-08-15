import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How I Operate | Kris Chase',
  description:
    'My operating model for technical leadership: clarify strategy, design minimal-but-sufficient plans, and deliver outcomes transparently.',
  alternates: { canonical: '/how-i-operate' },
  openGraph: {
    title: 'How I Operate | Kris Chase',
    description:
      'My operating model for technical leadership: clarify strategy, design minimal-but-sufficient plans, and deliver outcomes transparently.',
    url: 'https://krischase.com/how-i-operate',
    images: [
      {
        url: '/api/og-image?title=How%20I%20Operate&subtitle=Diagnose%E2%80%A2Design%E2%80%A2Deliver&persona=cto',
        width: 1200,
        height: 630,
        alt: 'How I Operate – Kris Chase',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How I Operate | Kris Chase',
    description:
      'My operating model for technical leadership: clarify strategy, design minimal-but-sufficient plans, and deliver outcomes transparently.',
    images: ['/api/og-image?title=How%20I%20Operate&subtitle=Diagnose%E2%80%A2Design%E2%80%A2Deliver&persona=cto'],
  },
};

export default function HowIOperateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
