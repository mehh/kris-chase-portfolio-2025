import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonials | Kris Chase',
  description:
    'Real quotes from colleagues and leaders about shipping faster, scaling safely, and aligning teams—including SaaS at thousands of concurrent users.',
  alternates: { canonical: '/testimonials' },
  openGraph: {
    title: 'Testimonials | Kris Chase',
    description:
      'Real quotes from colleagues and leaders about shipping faster, scaling safely, and aligning teams—including SaaS at thousands of concurrent users.',
    url: 'https://krischase.com/testimonials',
    images: ['/images/KrisChase-OG.png'],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Testimonials | Kris Chase',
    description:
      'Real quotes from colleagues and leaders about shipping faster, scaling safely, and aligning teams—including SaaS at thousands of concurrent users.',
    images: ['/images/KrisChase-OG.png'],
  },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
