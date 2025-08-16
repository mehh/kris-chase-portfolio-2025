import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connect | Kris Chase',
  description: 'Book time with Kris Chase to discuss roles, advisory, or projects.',
  alternates: { canonical: '/connect' },
  openGraph: {
    title: 'Connect | Kris Chase',
    description: 'Book time with Kris Chase to discuss roles, advisory, or projects.',
    url: 'https://krischase.com/connect',
    images: ['/images/KrisChase-OG.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Connect | Kris Chase',
    description: 'Book time with Kris Chase to discuss roles, advisory, or projects.',
    images: ['/images/KrisChase-OG.png'],
  },
  robots: { index: false, follow: false },
};

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
