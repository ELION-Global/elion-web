'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    // Log to monitoring service when available
    console.error('[ELION] Unhandled error:', error.digest ?? 'no-digest')
  }, [error])

  return (
    <html lang="en">
      <body className="bg-space-950 text-silver-200 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <p className="text-2xs font-mono uppercase tracking-widest text-silver-500 mb-4">
            System error
          </p>
          <h1 className="text-2xl font-bold text-silver-100 mb-4">Something went wrong.</h1>
          <p className="text-silver-400 text-sm mb-8 leading-relaxed">
            An unexpected error occurred. Please try again or return to the homepage.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={reset} variant="secondary" size="md">
              Try again
            </Button>
            <Button href="/" variant="ghost" size="md">
              Return home
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
