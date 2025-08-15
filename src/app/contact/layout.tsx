import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Kris Chase',
  description: 'Get in touch to discuss delivery, platform modernization, or interim leadership.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | Kris Chase',
    description: 'Get in touch to discuss delivery, platform modernization, or interim leadership.',
    url: 'https://krischase.com/contact',
    images: ['/images/KrisChase-OG.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Kris Chase',
    description: 'Get in touch to discuss delivery, platform modernization, or interim leadership.',
    images: ['/images/KrisChase-OG.png'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
