import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/**
 * The callback endpoint is not a page and has nothing to index. Everything
 * else is public and wants crawling.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
