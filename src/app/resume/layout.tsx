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
    images: [
      {
        url: '/api/og-image?title=Resume&subtitle=Listen%E2%80%A2Chat%E2%80%A2Download&persona=founders',
        width: 1200,
        height: 630,
        alt: 'Kris Chase – Resume',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume | Kris Chase',
    description:
      'Listen to a narrated resume, chat (soon) about my work, or download the latest PDF. Technical leadership across startups and scale-ups.',
    images: ['/api/og-image?title=Resume&subtitle=Listen%E2%80%A2Chat%E2%80%A2Download&persona=founders'],
  },
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
