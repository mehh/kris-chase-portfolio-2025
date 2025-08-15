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
    images: ['/images/KrisChase-OG.png'],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How I Operate | Kris Chase',
    description:
      'My operating model for technical leadership: clarify strategy, design minimal-but-sufficient plans, and deliver outcomes transparently.',
    images: ['/images/KrisChase-OG.png'],
  },
};

export default function HowIOperateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
