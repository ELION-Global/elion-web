import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { projects } from '@/content/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'

export const metadata: Metadata = buildMetadata({
  title: 'Projects',
  description: 'ELION engineering projects — from orbital transportation infrastructure to spacecraft design.',
  path: '/projects',
})

export default function ProjectsPage() {
  return (
    <div className="pt-16 min-h-screen">
      <section aria-labelledby="projects-page-heading" className="py-24 md:py-32">
        <div className="container-elion">
          <p className="text-2xs font-mono uppercase tracking-widest text-gold-400 mb-4">Projects</p>
          <h1
            id="projects-page-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-silver-100 mb-4"
          >
            What we are building.
          </h1>
          <p className="text-silver-400 max-w-xl mb-12 leading-relaxed">
            ELION&apos;s current projects are in early planning and research phases. More projects
            will be added as the organization grows.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
