import { PRINCIPLES } from '@/lib/constants'

export function MissionSection() {
  return (
    <section
      aria-labelledby="mission-heading"
      className="py-24 md:py-32 bg-space-900"
    >
      <div className="container-elion">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Mission statement */}
          <div>
            <p className="text-2xs font-mono uppercase tracking-widest text-gold-400 mb-4">
              Mission
            </p>
            <h2
              id="mission-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-silver-100 mb-6 text-balance"
            >
              A common foundation for disciplined work.
            </h2>
            <p className="text-silver-300 leading-relaxed mb-6">
              ELION exists to bring people across the world together to research, design, and build
              peaceful technologies that improve human life.
            </p>
            <p className="text-silver-400 leading-relaxed mb-8">
              International and open to all — regardless of nationality, religion, ethnicity,
              language, or background. A global effort rooted in dignity, cooperation, and shared
              human flourishing.
            </p>

            {/* Connected institutional framework */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 border-t border-space-600 pt-6">
              {[
                { term: 'Love', def: 'Why' },
                { term: 'Science', def: 'Understanding' },
                { term: 'Engineering', def: 'Capability' },
                { term: 'Technology', def: 'The means' },
                { term: 'Space', def: 'The frontier' },
                { term: 'Humanity', def: 'Who we serve' },
              ].map(({ term, def }) => (
                <div
                  key={term}
                  className="border-l border-gold-400/50 pl-4"
                >
                  <dt className="text-sm font-semibold text-silver-200 mb-0.5">{term}</dt>
                  <dd className="text-xs text-gold-400/90">{def}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Principles */}
          <div>
            <p className="text-2xs font-mono uppercase tracking-widest text-elion-blue-light mb-4">
              Principles
            </p>
            <h3 className="text-xl font-semibold text-silver-100 mb-6">
              What guides every decision.
            </h3>
            <ol className="flex flex-col gap-3" role="list">
              {PRINCIPLES.map((principle, i) => (
                <li key={principle} className="flex items-start gap-3">
                  <span
                    className="shrink-0 w-6 h-6 rounded-full bg-space-700 border border-space-600 flex items-center justify-center text-2xs font-mono text-silver-500"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm text-silver-300 pt-0.5">{principle}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
