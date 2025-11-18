import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drupal Candidate Intake | Kris Chase',
  description: 'Submit your Drupal experience and availability for project opportunities.',
  alternates: { canonical: '/drupal-candidate' },
  openGraph: {
    title: 'Drupal Candidate Intake | Kris Chase',
    description: 'Submit your Drupal experience and availability for project opportunities.',
    url: 'https://krischase.com/drupal-candidate',
    images: ['/images/KrisChase-OG.png'],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drupal Candidate Intake | Kris Chase',
    description: 'Submit your Drupal experience and availability for project opportunities.',
    images: ['/images/KrisChase-OG.png'],
  },
};

export default function DrupalCandidateLayout({ children }: { children: React.ReactNode }) {
  return children;
}

