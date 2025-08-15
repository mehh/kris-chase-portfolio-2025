import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Kris Chase',
  description: 'Answers to common questions about how I work, engagement models, and outcomes.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ | Kris Chase',
    description: 'Answers to common questions about how I work, engagement models, and outcomes.',
    url: 'https://krischase.com/faq',
    images: [
      {
        url: '/api/og-image?title=FAQ&subtitle=How%20I%20Work&persona=default',
        width: 1200,
        height: 630,
        alt: 'FAQ – Kris Chase',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ | Kris Chase',
    description: 'Answers to common questions about how I work, engagement models, and outcomes.',
    images: ['/api/og-image?title=FAQ&subtitle=How%20I%20Work&persona=default'],
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
