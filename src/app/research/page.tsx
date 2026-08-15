import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { ComingSoonPage } from '@/components/ui/ComingSoonPage'

export const metadata: Metadata = buildMetadata({
  title: 'Research',
  description: 'ELION research initiatives — coming in a future platform phase.',
  path: '/research',
})

export default function ResearchPage() {
  return (
    <ComingSoonPage
      title="Research"
      description="ELION's research platform is planned for a future phase. It will host technical literature, research notes, and collaborative knowledge capture across engineering disciplines."
      phase="Coming in Phase 3"
    />
  )
}
