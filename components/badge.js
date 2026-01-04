import { cn } from '@/lib/utils'
import Icon from './icon'
import Link from '@/components/link'

const defaultVariants = {
  rio: 'text-[light-dark(var(--color-rio-500),var(--color-rio-900))]',
  dandelion: 'text-[light-dark(var(--color-dandelion-600),var(--color-dandelion-900))]',
  lavender: 'text-[light-dark(var(--color-lavender-600),var(--color-lavender-900))]',
  magenta: 'text-[light-dark(var(--color-magenta-600),var(--color-magenta-800))]',
  grass: 'text-[light-dark(var(--color-grass-600),var(--color-grass-900))]',
  fern: 'text-[light-dark(var(--color-fern-700),var(--color-fern-900))]',
  moss: 'text-[light-dark(var(--color-moss-500),var(--color-moss-900))]',
  'neutral-01': 'text-[light-dark(var(--color-neutral-01-600),var(--color-neutral-01-900))]',
  'neutral-02': 'text-[light-dark(var(--color-neutral-02-600),var(--color-neutral-02-900))]',
  cornflour: 'text-[light-dark(var(--color-cornflour-700),var(--color-cornflour-900))]',
  text: 'text-[light-dark(var(--color-fern-1100),var(--color-fern-1100))]',
}

const hoverVariants = {
  rio: 'hover:text-[light-dark(var(--color-rio-500),var(--color-rio-200))]',
  dandelion: 'hover:text-[light-dark(var(--color-dandelion-600),var(--color-dandelion-200))]',
  lavender: 'hover:text-[light-dark(var(--color-lavender-600),var(--color-lavender-200))]',
  magenta: 'hover:text-[light-dark(var(--color-magenta-600),var(--color-magenta-200))]',
  grass: 'hover:text-[light-dark(var(--color-grass-600),var(--color-grass-200))]',
  fern: 'hover:text-[light-dark(var(--color-fern-700),var(--color-fern-200))]',
  moss: 'hover:text-[light-dark(var(--color-moss-500),var(--color-moss-200))]',
  'neutral-01': 'hover:text-[light-dark(var(--color-neutral-01-600),var(--color-neutral-01-200))]',
  'neutral-02': 'hover:text-[light-dark(var(--color-neutral-02-600),var(--color-neutral-02-200))]',
  cornflour: 'hover:text-[light-dark(var(--color-cornflour-700),var(--color-cornflour-200))]',
  text: 'hover:text-[light-dark(var(--color-fern-900),var(--color-fern-200))]',
}

const darkBgVariants = {
  rio: 'dark:bg-rio-300',
  dandelion: 'dark:bg-dandelion-300',
  lavender: 'dark:bg-lavender-300',
  magenta: 'dark:bg-magenta-300',
  grass: 'dark:bg-grass-300',
  fern: 'dark:bg-fern-300',
  moss: 'dark:bg-moss-300',
  'neutral-01': 'dark:bg-neutral-01-300',
  'neutral-02': 'dark:bg-neutral-02-300',
  cornflour: 'dark:bg-cornflour-500',
  text: 'dark:bg-fern-300',
}

const darkRingVariants = {
  rio: 'dark:ring-1 dark:ring-rio-300',
  dandelion: 'dark:ring-1 dark:ring-dandelion-200',
  lavender: 'dark:ring-1 dark:ring-lavender-300',
  magenta: 'dark:ring-1 dark:ring-magenta-300',
  grass: 'dark:ring-1 dark:ring-grass-300',
  fern: 'dark:ring-1 dark:ring-fern-300',
  moss: 'dark:ring-1 dark:ring-moss-300',
  'neutral-01': 'dark:ring-1 dark:ring-neutral-01-300',
  'neutral-02': 'dark:ring-1 dark:ring-neutral-02-300',
  cornflour: 'dark:ring-1 dark:ring-cornflour-300',
  text: 'dark:ring-1 dark:ring-fern-300',
}

const darkRingHoverVariants = {
  rio: 'dark:group-hover/badge:ring-rio-100',
  dandelion: 'dark:group-hover/badge:ring-dandelion-0',
  lavender: 'dark:group-hover/badge:ring-lavender-100',
  magenta: 'dark:group-hover/badge:ring-magenta-100',
  grass: 'dark:group-hover/badge:ring-grass-100',
  fern: 'dark:group-hover/badge:ring-fern-100',
  moss: 'dark:group-hover/badge:ring-moss-100',
  'neutral-01': 'dark:group-hover/badge:ring-neutral-01-100',
  'neutral-02': 'dark:group-hover/badge:ring-neutral-02-100',
  cornflour: 'dark:group-hover/badge:ring-cornflour-100',
  text: 'dark:group-hover/badge:ring-fern-100',
}

export default function Badge({
  children,
  theme = 'cornflour',
  size = 16,
  iconStart,
  href,
  className,
}) {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          'flex flex-[0_0_auto] font-variation-medium group/badge',
          'transition-all duration-100 ease-linear text-heading',
          size === 16 ? 'gap-2' : 'gap-3',
          hoverVariants[theme],
          className
        )}
      >
        <Badge.Icon theme={theme} icon={iconStart} size={size} />
        <Badge.Text size={size}>{children}</Badge.Text>
      </Link>
    )
  }

  return (
    <p
      className={cn(
        'flex flex-[0_0_auto] font-variation-medium text-heading',
        size === 16 ? 'gap-2' : 'gap-3',
        className
      )}
    >
      <Badge.Icon size={size} theme={theme} icon={iconStart} />
      <Badge.Text size={size}>{children}</Badge.Text>
    </p>
  )
}

export function BadgeIcon({ icon, size, theme, className }) {
  return (
    <span
      className={cn(
        'flex-[0_0_auto] bg-surface',
        darkBgVariants[theme],
        darkRingVariants[theme],
        darkRingHoverVariants[theme],
        'shadow-reduced dark:shadow-none',
        'group-hover/badge:shadow-picked',
        'group-active/badge:shadow-reduced',
        'flex items-center justify-center',
        'transition-all duration-100 ease-linear',
        size === 16
          ? 'w-6 h-6 rounded-[.375rem]'
          : 'w-8 h-8 rounded-sm',
        defaultVariants[theme],
        className
      )}
    >
      <Icon className="text-current" icon={icon} size={size} variant="default" />
    </span>
  )
}

Badge.Icon = BadgeIcon

export function BadgeText({ children, size, className }) {
  return (
    <span
      className={cn(
        'pt-[2px] text-base font-medium flex-[0_0_auto]',
        'transition-all duration-100 ease-linear',
        'font-body leading-none rounded',
        'flex items-center text-current relative top-px',
        size === 16 ? 'h-6' : 'h-8',
        className
      )}
    >
      {children}
    </span>
  )
}

Badge.Text = BadgeText
