import { HeroSection } from '@/components/sections/HeroSection'
import { MissionSection } from '@/components/sections/MissionSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { RoadmapSection } from '@/components/sections/RoadmapSection'
import { CommunitySection } from '@/components/sections/CommunitySection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <ProjectsSection />
      <RoadmapSection />
      <CommunitySection />
    </>
  )
}
