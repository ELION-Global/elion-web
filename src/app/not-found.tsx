import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-32">
      <div className="container-elion text-center max-w-md">
        <p className="text-2xs font-mono uppercase tracking-widest text-silver-500 mb-4">404</p>
        <h1 className="text-3xl font-bold tracking-tight text-silver-100 mb-4">
          Page not found.
        </h1>
        <p className="text-silver-400 mb-8 leading-relaxed">
          This page does not exist or has not been built yet.
        </p>
        <Button href="/" variant="secondary" size="md">
          ← Return home
        </Button>
      </div>
    </div>
  )
}
