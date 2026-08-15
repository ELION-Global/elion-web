import { projects } from '@/content/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Button } from '@/components/ui/Button'

export function ProjectsSection() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="py-24 md:py-32 bg-space-950"
    >
      <div className="container-elion">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-2xs font-mono uppercase tracking-widest text-gold-400 mb-4">
              Projects
            </p>
            <h2
              id="projects-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-silver-100 text-balance"
            >
              What we are building.
            </h2>
          </div>
          <Button href="/projects" variant="ghost" size="sm" className="shrink-0">
            All projects →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <p className="mt-8 text-sm text-silver-500 text-center">
          Additional projects will be announced as ELION grows.
        </p>
      </div>
    </section>
  )
}
