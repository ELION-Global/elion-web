export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  status: 'active' | 'planning' | 'research'
  domain: string
  href: string
}

export const projects: Project[] = [
  {
    id: 'skybridge',
    name: 'SKYBRIDGE',
    tagline: 'Future orbital transportation infrastructure.',
    description:
      'A long-term engineering initiative to design and develop the infrastructure required for reliable, sustainable orbital transportation — connecting Earth to space for the benefit of humanity.',
    status: 'planning',
    domain: 'Aerospace / Space Systems',
    href: '/projects/skybridge',
  },
  {
    id: 'love',
    name: 'LOVE',
    tagline: 'Long-range Orbital Vehicle for Everyone.',
    description:
      'A spacecraft concept focused on accessibility, safety, and long-range orbital capability — designed from the beginning to serve people, not just payloads.',
    status: 'research',
    domain: 'Spacecraft / Aerospace',
    href: '/projects/love',
  },
]
