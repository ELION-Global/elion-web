import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { ComingSoonPage } from '@/components/ui/ComingSoonPage'

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: 'About ELION — a global engineering organization for peaceful technology.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <ComingSoonPage
      title="About ELION"
      description="A full organizational profile, team information, and governance documentation will be published here as ELION develops."
      phase="Coming soon"
    />
  )
}
