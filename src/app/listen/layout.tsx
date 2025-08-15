import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listen | Kris Chase',
  description: 'Podcast-style audio version of my resume with an ElevenLabs voice clone.',
  alternates: { canonical: '/listen' },
  openGraph: {
    title: 'Listen | Kris Chase',
    description: 'Podcast-style audio version of my resume with an ElevenLabs voice clone.',
    url: 'https://krischase.com/listen',
    images: ['/images/KrisChase-OG.png'],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Listen | Kris Chase',
    description: 'Podcast-style audio version of my resume with an ElevenLabs voice clone.',
    images: ['/images/KrisChase-OG.png'],
  },
};

export default function ListenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
