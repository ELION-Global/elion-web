import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'
import { projects } from '@/content/projects'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/mission`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/research`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/community`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/join`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/projects/${p.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...projectRoutes]
}
