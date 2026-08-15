export const SITE = {
  name: 'ELION',
  tagline: 'Engineering for Humanity',
  description:
    'ELION is a global engineering organization building peaceful technologies that improve human life — from orbital infrastructure to humanitarian systems.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: 'en',
} as const

export const PHASES = [
  { phase: '0', label: 'Brand & Public Platform', current: true },
  { phase: '1', label: 'Projects & Contributor Applications', current: false },
  { phase: '2', label: 'ELION ID & Team Workspaces', current: false },
  { phase: '3', label: 'Engineering Collaboration Platform', current: false },
  { phase: '4', label: 'AI Engineering Knowledge Layer', current: false },
  { phase: '5', label: 'Global ELION Infrastructure', current: false },
] as const

export const PRINCIPLES = [
  'Humanity first',
  'Peaceful technology',
  'Scientific honesty',
  'Engineering rigor',
  'Security by design',
  'Accessibility for everyone',
  'Global participation',
  'Transparency where appropriate',
  'Privacy and responsible data handling',
  'Performance matters',
] as const
