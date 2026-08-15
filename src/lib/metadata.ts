import type { Metadata } from 'next'
import { SITE } from './constants'

interface PageMetaOptions {
  title?: string
  description?: string
  path?: string
  noIndex?: boolean
}

export function buildMetadata({
  title,
  description,
  path = '',
  noIndex = false,
}: PageMetaOptions = {}): Metadata {
  const pageTitle = title ? `${title} — ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`
  const pageDescription = description ?? SITE.description
  const url = `${SITE.url}${path}`

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: 'website',
      images: [{ url: '/branding/elion-logo.png', width: 1689, height: 931, alt: 'ELION official logo' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: ['/branding/elion-logo.png'],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
}
