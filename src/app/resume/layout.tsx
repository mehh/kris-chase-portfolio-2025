import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume | Kris Chase',
  description:
    'Listen to a narrated resume, chat (soon) about my work, or download the latest PDF. Technical leadership across startups and scale-ups.',
  alternates: { canonical: '/resume' },
  openGraph: {
    title: 'Resume | Kris Chase',
    description:
      'Listen to a narrated resume, chat (soon) about my work, or download the latest PDF. Technical leadership across startups and scale-ups.',
    url: 'https://krischase.com/resume',
    images: ['/images/KrisChase-OG.png'],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume | Kris Chase',
    description:
      'Listen to a narrated resume, chat (soon) about my work, or download the latest PDF. Technical leadership across startups and scale-ups.',
    images: ['/images/KrisChase-OG.png'],
  },
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
