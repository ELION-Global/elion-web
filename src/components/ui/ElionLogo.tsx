import Image from 'next/image'

type Size = 'sm' | 'md' | 'lg'
type Variant = 'official' | 'blend'

const dimensions: Record<Variant, Record<Size, { width: number; height: number }>> = {
  official: {
    sm: { width: 128, height: 71 },
    md: { width: 240, height: 132 },
    lg: { width: 416, height: 230 },
  },
  blend: {
    sm: { width: 128, height: 72 },
    md: { width: 240, height: 135 },
    lg: { width: 416, height: 234 },
  },
}

interface Props {
  size?: Size
  variant?: Variant
  className?: string
  priority?: boolean
}

export function ElionLogo({
  size = 'md',
  variant = 'official',
  className = '',
  priority = false,
}: Props) {
  const { width, height } = dimensions[variant][size]

  return (
    <Image
      src={variant === 'blend' ? '/branding/elion-logo-blend.png' : '/branding/elion-logo.png'}
      alt="ELION"
      width={width}
      height={height}
      priority={priority}
      sizes={size === 'lg' ? '(max-width: 639px) 288px, (max-width: 1023px) 352px, 416px' : '128px'}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}
