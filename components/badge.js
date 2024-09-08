import Icon from './icon'
import Link from '@/components/link'

const defaultVariants = {
  rio: 'text-rio-400',
  dandelion: 'text-dandelion-500',
  lavender: 'text-lavender-500',
  magenta: 'text-magenta-500',
  grass: 'text-grass-500',
  fern: 'text-fern-600',
  moss: 'text-moss-400',
  'neutral-01': 'text-neutral-01-500',
  'neutral-02': 'text-neutral-02-500',
  cornflour: 'text-cornflour-600',
  text: 'text-fern-1100',
}

const hoverVariants = {
  rio: 'hover:text-rio-400',
  dandelion: 'hover:text-dandelion-500',
  lavender: 'hover:text-lavender-500',
  magenta: 'hover:text-magenta-500',
  grass: 'hover:text-grass-500',
  fern: 'hover:text-fern-600',
  moss: 'hover:text-moss-400',
  'neutral-01': 'hover:text-neutral-01-500',
  'neutral-02': 'hover:text-neutral-02-500',
  cornflour: 'hover:text-cornflour-600',
  text: 'hover:text-fern-800',
}

export default function Badge({
  children,
  theme = 'cornflour',
  size = 16,
  iconStart,
  href,
  className = 'badge',
}) {
  if (href) {
    return (
      <Link
        href={href}
        className={`flex flex-[0_0_auto] gap-3 font-variation-medium group/badge transition-all duration-100 ease-linear text-fern-1100 ${hoverVariants[theme]} ${className}`}
      >
        <Badge.Icon theme={theme} icon={iconStart} size={size} />
        <Badge.Text size={size}>{children}</Badge.Text>
      </Link>
    )
  } else {
    return (
      <p
        className={`flex flex-[0_0_auto] gap-3 font-variation-medium text-fern-1100 ${className}`}
      >
        <Badge.Icon size={size} theme={theme} icon={iconStart} />
        <Badge.Text size={size}>{children}</Badge.Text>
      </p>
    )
  }
}

export function BadgeIcon({ icon, size, theme, className = 'badge' }) {
  const small = 'w-6 h-6 flex-[0_0_auto] rounded-[.375rem]'
  const large = 'w-8 h-8 flex-[0_0_auto] rounded-sm'
  const sizing = size === 16 ? small : large

  return (
    <span
      className={`${sizing} bg-white group-active/badge:bg-neutral-01-50 shadow-reduced group-hover/badge:shadow-picked group-active/badge:shadow-reduced flex items-center justify-center transition-all duration-100 ease-linear ${className} ${defaultVariants[theme]}`}
    >
      <Icon className={`text-current`} icon={icon} size={size} />
    </span>
  )
}

Badge.Icon = BadgeIcon

export function BadgeText({ children, size, className = 'ct' }) {
  const small = 'h-6 pt-[2px] text-base font-medium flex-[0_0_auto]'
  const large = 'h-8 pt-[2px] text-base font-medium flex-[0_0_auto]'
  const sizing = size === 16 ? small : large

  return (
    <span
      className={`${sizing} transition-all duration-100 ease-linear font-body leading-none rounded flex items-center text-current ${className}`}
    >
      {children}
    </span>
  )
}

Badge.Text = BadgeText
