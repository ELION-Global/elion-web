import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { buildMetadata } from '@/lib/metadata'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = buildMetadata()

export const viewport: Viewport = {
  themeColor: '#050810',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Skip navigation — accessibility requirement */}
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>

        <SiteHeader />

        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  )
}
