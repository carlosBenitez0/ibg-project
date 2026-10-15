import type { MetadataRoute } from 'next';
import { SITE_URL } from './constants/site';
import { blogPosts } from './data/blog';

const staticRoutes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  {
    path: '/iglesia/sobre-nosotros',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  { path: '/iglesia/ubicacion', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/actividades/eventos', changeFrequency: 'weekly', priority: 0.9 },
  {
    path: '/actividades/ministerios',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/actividades/evangelismo',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  { path: '/medios/transmisiones', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/medios/blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/donaciones', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/contacto', changeFrequency: 'yearly', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path === '/' ? '' : route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const posts = blogPosts.map((post) => ({
    url: `${SITE_URL}/medios/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
