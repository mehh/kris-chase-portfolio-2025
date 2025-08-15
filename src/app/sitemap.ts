import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://krischase.com';
  const now = new Date();

  const routes: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency']; priority: number }>= [
    { path: '/', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/how-i-operate', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/resume', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/testimonials', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/partners', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
    { path: '/listen', changeFrequency: 'yearly', priority: 0.5 },
    { path: '/faq', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/services', changeFrequency: 'yearly', priority: 0.4 },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
