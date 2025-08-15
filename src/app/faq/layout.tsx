import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Kris Chase',
  description: 'Answers to common questions about how I work, engagement models, and outcomes.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ | Kris Chase',
    description: 'Answers to common questions about how I work, engagement models, and outcomes.',
    url: 'https://krischase.com/faq',
    images: ['/images/KrisChase-OG.png'],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ | Kris Chase',
    description: 'Answers to common questions about how I work, engagement models, and outcomes.',
    images: ['/images/KrisChase-OG.png'],
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
