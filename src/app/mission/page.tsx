import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { MissionSection } from '@/components/sections/MissionSection'

export const metadata: Metadata = buildMetadata({
  title: 'Mission',
  description: 'ELION exists to bring people across the world together to build peaceful technologies that improve human life.',
  path: '/mission',
})

export default function MissionPage() {
  return (
    <div className="pt-16">
      <MissionSection />
    </div>
  )
}
