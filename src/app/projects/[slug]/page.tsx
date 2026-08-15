import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import { projects } from '@/content/projects'
import { Button } from '@/components/ui/Button'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.id === slug)
  if (!project) return {}
  return buildMetadata({
    title: project.name,
    description: project.description,
    path: `/projects/${slug}`,
  })
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.id === slug)
  if (!project) notFound()

  const statusLabel = { active: 'Active', planning: 'Planning', research: 'Research' }

  return (
    <div className="pt-16 min-h-screen">
      <article aria-labelledby="project-heading" className="py-24 md:py-32">
        <div className="container-elion max-w-3xl">
          <p className="text-2xs font-mono uppercase tracking-widest text-silver-500 mb-2">
            {project.domain}
          </p>
          <h1
            id="project-heading"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-silver-100 mb-4"
          >
            {project.name}
          </h1>
          <p className="text-lg text-gold-400 font-medium mb-6">{project.tagline}</p>

          <div className="flex items-center gap-3 mb-10">
            <span className="text-2xs font-semibold uppercase tracking-wider px-2 py-1 rounded border text-elion-blue-light bg-elion-blue/10 border-elion-blue/20">
              {statusLabel[project.status]}
            </span>
          </div>

          <p className="text-silver-300 leading-relaxed text-lg mb-12">{project.description}</p>

          <div className="card-surface p-6 mb-10">
            <p className="text-sm font-semibold text-silver-200 mb-2">Current program stage</p>
            <p className="text-sm text-silver-400 leading-relaxed">
              {project.name} is currently in the{' '}
              <strong className="text-silver-300">{statusLabel[project.status].toLowerCase()}</strong>{' '}
              stage. Detailed technical documentation, requirements, and team information will be
              published as ELION&apos;s platform develops.
            </p>
          </div>

          <Button href="/projects" variant="secondary" size="md">
            ← All projects
          </Button>
        </div>
      </article>
    </div>
  )
}
