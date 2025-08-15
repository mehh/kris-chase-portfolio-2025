import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listen | Kris Chase',
  description: 'Podcast-style audio version of my resume with an ElevenLabs voice clone.',
  alternates: { canonical: '/listen' },
  openGraph: {
    title: 'Listen | Kris Chase',
    description: 'Podcast-style audio version of my resume with an ElevenLabs voice clone.',
    url: 'https://krischase.com/listen',
    images: [
      {
        url: '/api/og-image?title=Listen&subtitle=Audio%20Resume&persona=founders',
        width: 1200,
        height: 630,
        alt: 'Listen – Kris Chase',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Listen | Kris Chase',
    description: 'Podcast-style audio version of my resume with an ElevenLabs voice clone.',
    images: ['/api/og-image?title=Listen&subtitle=Audio%20Resume&persona=founders'],
  },
};

export default function ListenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
