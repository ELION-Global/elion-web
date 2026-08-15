import type { NextConfig } from 'next'

const isStaticExport = process.env.ELION_BUILD_TARGET === 'static'

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join('; '),
  },
  ...(process.env.ENABLE_HSTS === 'true'
    ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }]
    : []),
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The normal build remains a portable Docker/AWS artifact. The static target is
  // intentionally opt-in for the Cloudflare Pages compatibility proof of concept.
  output: isStaticExport ? 'export' : 'standalone',

  // Static hosts do not execute Next.js header rules. The static build copies
  // the equivalent Cloudflare Pages `_headers` file into `out/` instead.
  ...(isStaticExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: '/(.*)',
              headers: securityHeaders,
            },
          ]
        },
      }),

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 86400,
  },

  // Compiler options for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig
