import { Button } from '@/components/ui/Button'
import { ElionLogo } from '@/components/ui/ElionLogo'

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center bg-star-subtle overflow-hidden"
    >
      {/* Radial glow — CSS only, no image dependency */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(74,127,165,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Quiet orbital reference behind the official mark */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[68%] -translate-x-1/2 -translate-y-1/2 w-[820px] h-[520px] rounded-[50%] border border-elion-blue/10 pointer-events-none hidden lg:block"
      />

      <div className="container-elion relative z-10 py-28 md:py-32">
        <div className="max-w-3xl">
          <ElionLogo
            size="lg"
            priority
            className="w-[288px] sm:w-[352px] md:w-[416px] h-auto mb-5"
          />

          {/* Phase indicator */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-space-600 bg-space-800/50">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 motion-safe:animate-pulse" aria-hidden="true" />
            <span className="text-2xs font-mono uppercase tracking-widest text-silver-400">
              Phase 0 — Public Platform
            </span>
          </div>

          {/* Primary heading */}
          <h1
            id="hero-heading"
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-balance mb-6"
          >
            <span className="gradient-text-silver">Engineering</span>
            <br />
            <span className="gradient-text-gold">for Humanity.</span>
          </h1>

          {/* Mission statement */}
          <p className="text-lg sm:text-xl text-silver-300 leading-relaxed max-w-2xl mb-4 text-balance">
            ELION is a global organization bringing people together to research, design, and build
            peaceful technologies that improve human life.
          </p>

          <p className="text-base text-silver-400 leading-relaxed max-w-xl mb-10 text-balance">
            From orbital infrastructure to humanitarian systems — open to everyone, regardless of
            nationality, background, or belief.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Button href="/join" variant="primary" size="lg">
              Join ELION
            </Button>
            <Button href="/projects" variant="secondary" size="lg">
              Explore projects
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 motion-safe:animate-bounce"
      >
        <span className="text-2xs font-mono uppercase tracking-widest text-silver-500">Scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 3v10M4 9l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-silver-500"
          />
        </svg>
      </div>
    </section>
  )
}
