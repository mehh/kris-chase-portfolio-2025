import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonials | Kris Chase',
  description:
    'Real feedback from founders, CTOs, and peers about technical leadership, delivery, and scaling teams.',
  alternates: { canonical: '/testimonials' },
  openGraph: {
    title: 'Testimonials | Kris Chase',
    description:
      'Real feedback from founders, CTOs, and peers about technical leadership, delivery, and scaling teams.',
    url: 'https://krischase.com/testimonials',
    images: [
      {
        url: '/api/og-image?title=Testimonials&subtitle=Voices%20from%20the%20Field&persona=investor',
        width: 1200,
        height: 630,
        alt: 'Testimonials – Kris Chase',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Testimonials | Kris Chase',
    description:
      'Real feedback from founders, CTOs, and peers about technical leadership, delivery, and scaling teams.',
    images: ['/api/og-image?title=Testimonials&subtitle=Voices%20from%20the%20Field&persona=investor'],
  },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
