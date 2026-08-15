'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ElionLogo } from '@/components/ui/ElionLogo'
import { Button } from '@/components/ui/Button'
import { navItems, ctaItem } from '@/content/navigation'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header
      role="banner"
      className="fixed top-0 inset-x-0 z-50 bg-space-950/90 backdrop-blur-sm border-b border-space-700/50"
    >
      <div className="container-elion">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            aria-label="ELION — home"
            className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elion-blue rounded"
          >
            <ElionLogo size="sm" priority className="w-[116px] h-auto" />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className={`px-3 py-2 text-sm rounded transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elion-blue ${
                  pathname === item.href
                    ? 'text-gold-400'
                    : 'text-silver-300 hover:text-silver-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button href={ctaItem.href} variant="primary" size="sm">
              {ctaItem.label}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded text-silver-300 hover:text-silver-100 hover:bg-space-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elion-blue transition-colors"
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
              {menuOpen ? (
                <path
                  d="M4 4l12 12M16 4L4 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 5h14M3 10h14M3 15h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-space-700/50 bg-space-950/95 backdrop-blur-sm"
        >
          <div className="container-elion py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2.5 text-sm hover:bg-space-800 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elion-blue ${
                  pathname === item.href
                    ? 'text-gold-400 bg-space-800'
                    : 'text-silver-300 hover:text-silver-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-space-700/50 mt-2">
              <Button href={ctaItem.href} variant="primary" size="sm" className="w-full">
                {ctaItem.label}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
