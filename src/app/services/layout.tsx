import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Kris Chase',
  description: 'Interim leadership, delivery acceleration, platform modernization, and technical diligence.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services | Kris Chase',
    description: 'Interim leadership, delivery acceleration, platform modernization, and technical diligence.',
    url: 'https://krischase.com/services',
    images: ['/images/KrisChase-OG.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | Kris Chase',
    description: 'Interim leadership, delivery acceleration, platform modernization, and technical diligence.',
    images: ['/images/KrisChase-OG.png'],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
