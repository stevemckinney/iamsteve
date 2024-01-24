import Icon from './icon'
import Link from '@/components/link'

export default function Badge({ children, theme, size = 16, iconStart, href }) {
  if (href) {
    return (
      <Link
        href={href}
        className="flex flex-[0_0_auto] gap-2 font-variation-medium group transition-all duration-200 ease-linear"
      >
        <Badge.Icon icon={iconStart} theme={theme} size={size} />
        <Badge.Text theme={theme} size={size}>
          {children}
        </Badge.Text>
      </Link>
    )
  } else {
    return (
      <p className="flex flex-[0_0_auto] gap-2 font-variation-medium">
        <Badge.Icon theme={theme} size={size} icon={iconStart} />
        <Badge.Text theme={theme} size={size}>
          {children}
        </Badge.Text>
      </p>
    )
  }
}

export function BadgeIcon({ icon, theme, size, className = 'badge' }) {
  const small = 'w-6 h-6 flex-[0_0_auto]'
  const large = 'w-8 h-8 flex-[0_0_auto]'
  const sizing = size === 16 ? small : large

  let iconTheme

  const colorVariants = {
    rio: 'text-rio-400',
    dandelion: 'text-dandelion-500',
    lavender: 'text-lavender-500',
    magenta: 'text-magenta-500',
    grass: 'text-grass-500',
    fern: 'text-fern-600',
    moss: 'text-moss-400',
    'neutral-01': 'text-neutral-01-500',
    'neutral-02': 'text-neutral-02-500',
    default: 'text-cornflour-600',
  }

  return (
    <span
      className={`${sizing} bg-white group-active:bg-neutral-01-50 shadow-reduced group-hover:shadow-picked group-active:shadow-reduced rounded-sm flex items-center justify-center transition-all duration-200 ease-linear ${className}`}
    >
      <Icon className={colorVariants[theme]} icon={icon} size={size} />
    </span>
  )
}

Badge.Icon = BadgeIcon

export function BadgeText({ children, theme, size, className = 'ct' }) {
  const small = 'h-6 pt-[2px] text-base flex-[0_0_auto]'
  const large = 'h-8 pt-[2px] text-lg flex-[0_0_auto]'
  const sizing = size === 16 ? small : large

  return (
    <span
      className={`${sizing} transition-all duration-200 ease-linear text-fern-1100 font-ui lowercase leading-none rounded flex items-center ${className}`}
    >
      {children}
    </span>
  )
}

Badge.Text = BadgeText
