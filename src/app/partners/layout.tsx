import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partners | Kris Chase',
  description: 'Brands and teams I’ve supported across product, platform, and delivery.',
  alternates: { canonical: '/partners' },
  openGraph: {
    title: 'Partners | Kris Chase',
    description: 'Who I work best with: founders, product leaders, and teams ready to ship outcomes reliably.',
    url: 'https://krischase.com/partners',
    images: ['/images/KrisChase-OG.png'],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partners | Kris Chase',
    description: 'Who I work best with: founders, product leaders, and teams ready to ship outcomes reliably.',
    images: ['/images/KrisChase-OG.png'],
  },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
