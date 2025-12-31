import Icon from './icon'
import Link from '@/components/link'

const defaultVariants = {
  rio: 'text-[light-dark(var(--color-rio-500),var(--color-rio-400))]',
  dandelion: 'text-[light-dark(var(--color-dandelion-600),var(--color-dandelion-500))]',
  lavender: 'text-[light-dark(var(--color-lavender-600),var(--color-lavender-500))]',
  magenta: 'text-[light-dark(var(--color-magenta-600),var(--color-magenta-500))]',
  grass: 'text-[light-dark(var(--color-grass-600),var(--color-grass-500))]',
  fern: 'text-[light-dark(var(--color-fern-700),var(--color-fern-600))]',
  moss: 'text-[light-dark(var(--color-moss-500),var(--color-moss-400))]',
  'neutral-01': 'text-[light-dark(var(--color-neutral-01-600),var(--color-neutral-01-500))]',
  'neutral-02': 'text-[light-dark(var(--color-neutral-02-600),var(--color-neutral-02-500))]',
  cornflour: 'text-[light-dark(var(--color-cornflour-700),var(--color-cornflour-600))]',
  text: 'text-[light-dark(var(--color-fern-1100),var(--color-fern-1100))]',
}

const hoverVariants = {
  rio: 'hover:text-[light-dark(var(--color-rio-500),var(--color-rio-400))]',
  dandelion: 'hover:text-[light-dark(var(--color-dandelion-600),var(--color-dandelion-500))]',
  lavender: 'hover:text-[light-dark(var(--color-lavender-600),var(--color-lavender-500))]',
  magenta: 'hover:text-[light-dark(var(--color-magenta-600),var(--color-magenta-500))]',
  grass: 'hover:text-[light-dark(var(--color-grass-600),var(--color-grass-500))]',
  fern: 'hover:text-[light-dark(var(--color-fern-700),var(--color-fern-600))]',
  moss: 'hover:text-[light-dark(var(--color-moss-500),var(--color-moss-400))]',
  'neutral-01': 'hover:text-[light-dark(var(--color-neutral-01-600),var(--color-neutral-01-500))]',
  'neutral-02': 'hover:text-[light-dark(var(--color-neutral-02-600),var(--color-neutral-02-500))]',
  cornflour: 'hover:text-[light-dark(var(--color-cornflour-700),var(--color-cornflour-600))]',
  text: 'hover:text-[light-dark(var(--color-fern-900),var(--color-fern-800))]',
}

export default function Badge({
  children,
  theme = 'cornflour',
  size = 16,
  iconStart,
  href,
  className = 'badge',
}) {
  const small = 'gap-2'
  const large = 'gap-3'
  const sizing = size === 16 ? small : large

  if (href) {
    return (
      <Link
        href={href}
        className={`flex flex-[0_0_auto] font-variation-medium group/badge transition-all duration-100 ease-linear text-heading ${sizing} ${hoverVariants[theme]} ${className}`}
      >
        <Badge.Icon theme={theme} icon={iconStart} size={size} />
        <Badge.Text size={size}>{children}</Badge.Text>
      </Link>
    )
  } else {
    return (
      <p
        className={`flex flex-[0_0_auto] font-variation-medium text-heading ${sizing} ${className}`}
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
      className={`${sizing} transition-all duration-100 ease-linear font-body leading-none rounded flex items-center text-current relative top-px ${className}`}
    >
      {children}
    </span>
  )
}

Badge.Text = BadgeText
