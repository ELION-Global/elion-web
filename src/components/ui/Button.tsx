import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elion-blue focus-visible:ring-offset-2 focus-visible:ring-offset-space-900 disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-gold-400 text-space-950 hover:bg-gold-300 active:bg-gold-500',
  secondary:
    'border border-silver-400 text-silver-200 hover:border-silver-200 hover:text-silver-100 active:bg-space-700',
  ghost:
    'text-silver-300 hover:text-silver-100 hover:bg-space-700 active:bg-space-600',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type Props = ButtonProps | LinkProps

export function Button({ variant = 'primary', size = 'md', className = '', ...props }: Props) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if ('href' in props && props.href !== undefined) {
    const { href, ...rest } = props as LinkProps
    const isExternal = href.startsWith('http')
    return (
      <Link
        href={href}
        className={classes}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(rest as object)}
      />
    )
  }

  return <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} />
}
