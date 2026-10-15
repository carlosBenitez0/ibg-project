import type { MetadataRoute } from 'next';
import { SITE_URL } from './constants/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // La página "en desarrollo" no aporta contenido indexable
      disallow: ['/page-under-construction', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
