import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Kris Chase',
  description: 'Answers on leadership, delivery, platform modernization, and scaling systems—including SaaS serving thousands of concurrent users.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ | Kris Chase',
    description: 'Answers on leadership, delivery, platform modernization, and scaling systems—including SaaS serving thousands of concurrent users.',
    url: 'https://krischase.com/faq',
    images: ['/images/KrisChase-OG.png'],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ | Kris Chase',
    description: 'Answers on leadership, delivery, platform modernization, and scaling systems—including SaaS serving thousands of concurrent users.',
    images: ['/images/KrisChase-OG.png'],
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
