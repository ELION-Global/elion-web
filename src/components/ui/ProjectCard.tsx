import Link from 'next/link'
import type { Project } from '@/content/projects'

const statusLabel: Record<Project['status'], string> = {
  active: 'Active',
  planning: 'Planning',
  research: 'Research',
}

const statusColor: Record<Project['status'], string> = {
  active: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  planning: 'text-elion-blue-light bg-elion-blue/10 border-elion-blue/20',
  research: 'text-gold-400 bg-gold-400/10 border-gold-400/20',
}

interface Props {
  project: Project
}

export function ProjectCard({ project }: Props) {
  return (
    <article className="card-surface p-6 flex flex-col gap-4 hover:border-space-500 transition-colors duration-200 group">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-2xs font-mono uppercase tracking-widest text-silver-400 mb-1">
            {project.domain}
          </p>
          <h3 className="text-xl font-bold tracking-tight text-silver-100 group-hover:text-gold-400 transition-colors duration-200">
            {project.name}
          </h3>
        </div>
        <span
          className={`shrink-0 text-2xs font-semibold uppercase tracking-wider px-2 py-1 rounded border ${statusColor[project.status]}`}
        >
          {statusLabel[project.status]}
        </span>
      </header>

      <p className="text-silver-300 text-sm leading-relaxed flex-1">{project.description}</p>

      <div className="border-t border-space-700 pt-3">
        <p className="text-2xs font-mono uppercase tracking-widest text-silver-500 mb-1">
          Program focus
        </p>
        <p className="text-sm text-silver-300">{project.tagline}</p>
      </div>

      <footer>
        <Link
          href={project.href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-elion-blue-light hover:text-gold-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elion-blue focus-visible:ring-offset-2 focus-visible:ring-offset-space-800 rounded"
          aria-label={`Learn more about ${project.name}`}
        >
          Learn more
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="motion-safe:group-hover:translate-x-0.5 transition-transform duration-200"
          >
            <path
              d="M3 7h8M7 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </footer>
    </article>
  )
}
