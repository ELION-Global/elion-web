import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ELION',
    short_name: 'ELION',
    description: 'Engineering for Humanity',
    start_url: '/',
    display: 'standalone',
    background_color: '#050810',
    theme_color: '#050810',
    icons: [
      { src: '/icon', sizes: '512x512', type: 'image/png' },
    ],
  }
}
