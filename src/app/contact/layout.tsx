import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Kris Chase',
  description: 'Get in touch to discuss delivery, platform modernization, or interim leadership.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | Kris Chase',
    description: 'Get in touch to discuss delivery, platform modernization, or interim leadership.',
    url: 'https://krischase.com/contact',
    images: [
      {
        url: '/api/og-image?title=Contact&subtitle=Let%E2%80%99s%20Ship%20Outcomes&persona=default',
        width: 1200,
        height: 630,
        alt: 'Contact – Kris Chase',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Kris Chase',
    description: 'Get in touch to discuss delivery, platform modernization, or interim leadership.',
    images: ['/api/og-image?title=Contact&subtitle=Let%E2%80%99s%20Ship%20Outcomes&persona=default'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
