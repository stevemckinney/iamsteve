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

  // Design
  if (theme === 'rio') {
    iconTheme = `text-rio-400`
  }
  // Code
  else if (theme === 'dandelion') {
    iconTheme = `text-dandelion-500`
  }
  // Magenta
  else if (theme === 'lavender') {
    iconTheme = `text-lavender-500`
  }
  // Magenta
  else if (theme === 'magenta') {
    iconTheme = `text-magenta-500`
  }
  // Grass
  else if (theme === 'grass') {
    iconTheme = `text-grass-500`
  }
  // Fern
  else if (theme === 'fern') {
    iconTheme = `text-fern-600`
  }
  // Moss
  else if (theme === 'moss') {
    iconTheme = `text-moss-400`
  }
  // neutral-01
  else if (theme === 'neutral-01') {
    iconTheme = `text-neutral-01-500`
  }
  // neutral-02
  else if (theme === 'neutral-02') {
    iconTheme = `text-neutral-02-500`
  }
  // Date
  else {
    iconTheme = `text-cornflour-600`
  }

  return (
    <span
      className={`${sizing} bg-white group-active:bg-neutral-01-50 shadow-reduced group-hover:shadow-picked group-active:shadow-reduced rounded-sm flex items-center justify-center transition-all duration-200 ease-linear ${className}`}
    >
      <Icon className={iconTheme} icon={icon} size={size} />
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
