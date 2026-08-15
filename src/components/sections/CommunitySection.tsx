import { Button } from '@/components/ui/Button'

const domains = [
  'Aerospace Engineering',
  'Software Engineering',
  'Robotics',
  'Artificial Intelligence',
  'Systems Engineering',
  'Scientific Research',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Humanitarian Technology',
  'Project Management',
  'Design & UX',
  'And more',
]

export function CommunitySection() {
  return (
    <section
      aria-labelledby="community-heading"
      className="py-24 md:py-32 bg-space-950"
    >
      <div className="container-elion">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-2xs font-mono uppercase tracking-widest text-gold-400 mb-4">
            Community
          </p>
          <h2
            id="community-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-silver-100 mb-4 text-balance"
          >
            Built by people from everywhere.
          </h2>
          <p className="text-silver-400 leading-relaxed">
            ELION is open to contributors from every discipline, country, and background. If you
            want to build technology that genuinely helps people, there is a place for you here.
          </p>
        </div>

        {/* Domain tags */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-14"
          role="list"
          aria-label="Engineering disciplines"
        >
          {domains.map((domain) => (
            <span
              key={domain}
              role="listitem"
              className="px-3 py-1.5 text-xs font-medium text-silver-300 bg-space-800 border border-space-600 rounded-full"
            >
              {domain}
            </span>
          ))}
        </div>

        {/* CTA card */}
        <div className="max-w-xl mx-auto card-surface p-8 text-center">
          <h3 className="text-xl font-bold text-silver-100 mb-3">
            Interested in contributing?
          </h3>
          <p className="text-sm text-silver-400 mb-6 leading-relaxed">
            ELION is in its earliest phase. Contributor applications will open as the platform
            develops. Learn about the mission now, then return when applications become available.
          </p>
          <Button href="/join" variant="primary" size="md">
            Join ELION
          </Button>
          <p className="mt-4 text-2xs text-silver-500">
            Contributor infrastructure is coming in a future platform phase.
          </p>
        </div>
      </div>
    </section>
  )
}
