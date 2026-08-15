import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { ComingSoonPage } from '@/components/ui/ComingSoonPage'

export const metadata: Metadata = buildMetadata({
  title: 'Community',
  description: 'The ELION global engineering community — coming soon.',
  path: '/community',
})

export default function CommunityPage() {
  return (
    <ComingSoonPage
      title="Community"
      description="The ELION contributor community platform is being built. It will connect engineers, researchers, and builders from around the world on shared projects."
      phase="Coming in Phase 2"
    />
  )
}
