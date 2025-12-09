import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Engineering Leadership & Technical Strategy',
  description: 'Insights on engineering leadership, platform modernization, CI/CD, team scaling, and building products that last.',
  alternates: { canonical: '/blog-opus' },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}

