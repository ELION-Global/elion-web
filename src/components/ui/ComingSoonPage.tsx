import { Button } from '@/components/ui/Button'

interface Props {
  title: string
  description: string
  phase?: string
}

export function ComingSoonPage({ title, description, phase }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 py-24 md:py-32 bg-star-subtle">
      <div className="container-elion max-w-2xl">
        <div className="card-surface p-7 sm:p-10 text-center">
        {phase && (
          <p className="text-2xs font-mono uppercase tracking-widest text-gold-400 mb-4">
            {phase}
          </p>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-silver-100 mb-4 text-balance">
          {title}
        </h1>
        <p className="text-silver-400 leading-relaxed mb-8">{description}</p>
        <p className="text-sm text-silver-500 leading-relaxed mb-8">
          The public foundation is available now. This area will open when ELION has the
          appropriate people, processes, and infrastructure in place.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button href="/projects" variant="secondary" size="md">
            Explore projects
          </Button>
          <Button href="/mission" variant="primary" size="md">
            Read the mission
          </Button>
        </div>
        </div>
      </div>
    </div>
  )
}
