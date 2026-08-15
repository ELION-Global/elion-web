import Image from 'next/image'

type Size = 'sm' | 'md' | 'lg'

const dimensions: Record<Size, { width: number; height: number }> = {
  sm: { width: 128, height: 71 },
  md: { width: 240, height: 132 },
  lg: { width: 416, height: 230 },
}

interface Props {
  size?: Size
  className?: string
  priority?: boolean
}

export function ElionLogo({ size = 'md', className = '', priority = false }: Props) {
  const { width, height } = dimensions[size]

  return (
    <Image
      src="/branding/elion-logo.png"
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
