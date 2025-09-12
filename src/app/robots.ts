import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/.*', '/id$', '/en$'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/id$', '/en$'],
      },
    ],
    sitemap: 'https://holiday.forpublic.id/sitemap.xml',
    host: 'https://holiday.forpublic.id',
  };
}
