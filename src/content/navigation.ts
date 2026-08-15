export interface NavItem {
  label: string
  href: string
  external?: boolean
}

export const navItems: NavItem[] = [
  { label: 'Mission', href: '/mission' },
  { label: 'Projects', href: '/projects' },
  { label: 'Research', href: '/research' },
  { label: 'Community', href: '/community' },
  { label: 'About', href: '/about' },
]

export const ctaItem: NavItem = {
  label: 'Join ELION',
  href: '/join',
}
