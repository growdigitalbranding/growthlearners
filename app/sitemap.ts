import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/**
 * Two routes, both canonical. The sitemap exists less to help discovery on a
 * site this small than to state plainly which URLs are the real ones, so a
 * crawler that reaches a variant has something to reconcile against.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
