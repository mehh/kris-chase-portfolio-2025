import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partners | Kris Chase',
  description: 'Brands and teams I’ve supported across product, platform, and delivery.',
  alternates: { canonical: '/partners' },
  openGraph: {
    title: 'Partners | Kris Chase',
    description: 'Brands and teams I’ve supported across product, platform, and delivery.',
    url: 'https://krischase.com/partners',
    images: [
      {
        url: '/api/og-image?title=Partners&subtitle=Product%E2%80%A2Platform%E2%80%A2People&persona=product',
        width: 1200,
        height: 630,
        alt: 'Partners – Kris Chase',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partners | Kris Chase',
    description: 'Brands and teams I’ve supported across product, platform, and delivery.',
    images: ['/api/og-image?title=Partners&subtitle=Product%E2%80%A2Platform%E2%80%A2People&persona=product'],
  },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
