import Link from 'next/link'
import { ElionLogo } from '@/components/ui/ElionLogo'
import { navItems } from '@/content/navigation'
import { SITE } from '@/lib/constants'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer role="contentinfo" className="border-t border-space-700/50 bg-space-950">
      <div className="container-elion py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label="ELION — home" className="w-fit rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elion-blue">
              <ElionLogo size="sm" className="w-[116px] h-auto" />
            </Link>
            <p className="text-sm text-silver-400 max-w-xs leading-relaxed">
              A global engineering organization building peaceful technologies for humanity.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="text-2xs font-mono uppercase tracking-widest text-silver-500 mb-4">
              Platform
            </p>
            <ul className="flex flex-col gap-2" role="list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-silver-400 hover:text-silver-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elion-blue rounded"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Philosophy */}
          <div>
            <p className="text-2xs font-mono uppercase tracking-widest text-silver-500 mb-4">
              Why we exist
            </p>
            <dl className="flex flex-col gap-1.5 text-sm">
              {[
                ['Love', 'Why'],
                ['Science', 'Understanding'],
                ['Engineering', 'Capability'],
                ['Technology', 'Means'],
                ['Space', 'Frontier'],
                ['Humanity', 'Who we serve'],
              ].map(([concept, meaning]) => (
                <div key={concept} className="flex gap-2">
                  <dt className="text-silver-300 font-medium w-28 shrink-0">{concept}</dt>
                  <dd className="text-silver-500">{meaning}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="divider-subtle mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-2xs text-silver-500">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <p className="font-mono">Phase 0 — Public Platform</p>
        </div>
      </div>
    </footer>
  )
}
