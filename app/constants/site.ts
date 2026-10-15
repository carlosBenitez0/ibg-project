// URL pública del sitio, usada para metadataBase, sitemap y robots.
// Definir NEXT_PUBLIC_SITE_URL en producción (p. ej. https://getsemani.org.sv).
// En Vercel se usa el dominio de producción del proyecto si no está definida.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000')
).replace(/\/$/, '');
