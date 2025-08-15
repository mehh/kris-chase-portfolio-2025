import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Kris Chase',
  description: 'Interim leadership, delivery acceleration, platform modernization, and technical diligence.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services | Kris Chase',
    description: 'Interim leadership, delivery acceleration, platform modernization, and technical diligence.',
    url: 'https://krischase.com/services',
    images: [
      {
        url: '/api/og-image?title=Services&subtitle=Ship%20Faster%E2%80%A2Scale%20Safely&persona=cto',
        width: 1200,
        height: 630,
        alt: 'Services – Kris Chase',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | Kris Chase',
    description: 'Interim leadership, delivery acceleration, platform modernization, and technical diligence.',
    images: ['/api/og-image?title=Services&subtitle=Ship%20Faster%E2%80%A2Scale%20Safely&persona=cto'],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
