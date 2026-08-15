import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Join ELION',
  description: 'Learn when contributor applications will become available for ELION.',
  path: '/join',
})

export default function JoinPage() {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center py-32">
      <div className="container-elion max-w-xl">
        <p className="text-2xs font-mono uppercase tracking-widest text-gold-400 mb-4">
          Join ELION
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-silver-100 mb-4 text-balance">
          Contributor applications are not open yet.
        </h1>
        <p className="text-silver-400 leading-relaxed mb-8">
          ELION is in its earliest phase. Formal contributor applications will open as the platform
          develops, when there is a meaningful way to participate.
        </p>

        <div className="card-surface p-8">
          <p className="text-sm font-semibold text-silver-200 mb-6">
            Current availability
          </p>

          <div className="rounded bg-space-700 border border-space-600 p-4 mb-6">
            <p className="text-sm text-gold-400 font-medium mb-1">Applications are planned</p>
            <p className="text-xs text-silver-400 leading-relaxed">
              There is no application or interest form at this stage. ELION will publish a clear,
              accessible process here when it is ready.
            </p>
          </div>

          <p className="text-2xs text-silver-500 leading-relaxed">
            ELION is intended to welcome engineers, researchers, designers, and builders from every
            country and background.
          </p>
        </div>
      </div>
    </div>
  )
}
