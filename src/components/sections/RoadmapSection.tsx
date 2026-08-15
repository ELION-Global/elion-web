import { PHASES } from '@/lib/constants'

export function RoadmapSection() {
  return (
    <section
      aria-labelledby="roadmap-heading"
      className="py-24 md:py-32 bg-space-900"
    >
      <div className="container-elion">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-2xs font-mono uppercase tracking-widest text-elion-blue-light mb-4">
            Roadmap
          </p>
          <h2
            id="roadmap-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-silver-100 mb-4 text-balance"
          >
            A staged path forward.
          </h2>
          <p className="text-silver-400 leading-relaxed">
            ELION is being built in deliberate phases — from public foundation to global engineering
            infrastructure. We are currently in Phase 0.
          </p>
        </div>

        <ol className="relative max-w-xl mx-auto flex flex-col gap-0" role="list">
          {PHASES.map((item, index) => (
            <li key={item.phase} className="flex gap-5 pb-8 last:pb-0">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold font-mono ${
                    item.current
                      ? 'border-gold-400 bg-gold-400/10 text-gold-400'
                      : 'border-space-600 bg-space-800 text-silver-500'
                  }`}
                  aria-current={item.current ? 'step' : undefined}
                >
                  {item.phase}
                </div>
                {index < PHASES.length - 1 && (
                  <div
                    className={`w-px flex-1 mt-2 ${
                      item.current ? 'bg-gold-400/30' : 'bg-space-600'
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Content */}
              <div className="pt-1 pb-2">
                <p
                  className={`text-sm font-semibold mb-0.5 ${
                    item.current ? 'text-gold-400' : 'text-silver-400'
                  }`}
                >
                  {item.label}
                </p>
                {item.current && (
                  <span className="inline-flex items-center gap-1.5 text-2xs font-mono uppercase tracking-wider text-gold-400/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" aria-hidden="true" />
                    Current phase
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
