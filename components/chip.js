import Icon from './icon'
import Link from '@/components/link'

export default function Chip({ children, theme, size = 16, iconStart, href }) {
  if (href) {
    return (
      <Link
        href={href}
        className="flex gap-1 font-variation-medium group transition-all duration-200 ease-linear"
      >
        <ChipIcon theme={theme} size={size}>
          <Icon icon={iconStart} size={size} />
        </ChipIcon>
        <ChipText theme={theme} size={size}>
          {children}
        </ChipText>
      </Link>
    )
  } else {
    return (
      <p className="flex gap-1 font-variation-medium">
        <ChipIcon theme={theme} size={size}>
          <Icon icon={iconStart} size={size} />
        </ChipIcon>
        <ChipText theme={theme} size={size}>
          {children}
        </ChipText>
      </p>
    )
  }
}

export function ChipIcon({ children, theme, size, className = 'ci' }) {
  const small = 'w-6 h-6 flex-[0_0_auto]'
  const large = 'w-8 h-8 flex-[0_0_auto]'
  const sizing = size === 16 ? small : large

  let iconTheme

  // Design
  if (theme === 'rio') {
    iconTheme = `bg-rio-300 group-hover:bg-rio-400`
  }
  // Code
  else if (theme === 'dandelion') {
    iconTheme = `bg-dandelion-300 group-hover:bg-dandelion-400`
  }
  // Magenta
  else if (theme === 'lavender') {
    iconTheme = `bg-lavender-200 group-hover:bg-lavender-400`
  }
  // Magenta
  else if (theme === 'magenta') {
    iconTheme = `bg-magenta-200 group-hover:bg-magenta-400`
  }
  // Grass
  else if (theme === 'grass') {
    iconTheme = `bg-grass-200 group-hover:bg-grass-400`
  }
  // Fern
  else if (theme === 'fern') {
    iconTheme = `bg-fern-200 group-hover:bg-fern-400`
  }
  // Moss
  else if (theme === 'moss') {
    iconTheme = `bg-moss-200 group-hover:bg-moss-400`
  }
  // neutral-01
  else if (theme === 'neutral-01') {
    iconTheme = `bg-neutral-01-200 group-hover:bg-neutral-01-400`
  }
  // neutral-02
  else if (theme === 'neutral-02') {
    iconTheme = `bg-neutral-02-200 group-hover:bg-neutral-02-300`
  }
  // Date
  else {
    iconTheme = `bg-cornflour-200 group-hover:bg-cornflour-500`
  }

  return (
    <span
      className={`${iconTheme} ${sizing} rounded flex items-center justify-center group-hover:transition-all duration-200 group-hover:transition-all duration-200 ease-linear ${className}`}
    >
      {children}
    </span>
  )
}

export function ChipText({ children, theme, size, className = 'ct' }) {
  const small = 'px-2 h-6 pt-[2px] text-base flex-[0_0_auto]'
  const large = 'px-3 h-8 pt-[2px] text-lg flex-[0_0_auto]'
  const sizing = size === 16 ? small : large

  let textTheme

  // Design
  if (theme === 'rio') {
    textTheme = `bg-rio-150/10 text-rio-700 group-hover:bg-rio-150/20 group-hover:text-rio-800`
  }
  // Code
  else if (theme === 'dandelion') {
    textTheme = `bg-dandelion-100/20 text-dandelion-700 group-hover:bg-dandelion-100/40 group-hover:text-dandelion-800`
  }
  // Magenta
  else if (theme === 'lavender') {
    textTheme = `bg-lavender-100/20 text-lavender-700 group-hover:bg-lavender-100/40 group-hover:text-lavender-800`
  }
  // Magenta
  else if (theme === 'magenta') {
    textTheme = `bg-magenta-100/20 text-magenta-700 group-hover:bg-magenta-100/40 group-hover:text-magenta-800`
  }
  // Grass
  else if (theme === 'grass') {
    textTheme = `bg-grass-100/20 text-grass-700 group-hover:bg-grass-100/40 group-hover:text-grass-800`
  }
  // Fern
  else if (theme === 'fern') {
    textTheme = `bg-fern-100/20 text-fern-700 group-hover:bg-fern-100/40 group-hover:text-fern-800`
  }
  // Moss
  else if (theme === 'moss') {
    textTheme = `bg-moss-100/20 text-moss-700 group-hover:bg-moss-100/40 group-hover:text-moss-800`
  }
  // neutral-01
  else if (theme === 'neutral-01') {
    textTheme = `bg-neutral-01-100/20 text-neutral-01-700 group-hover:bg-neutral-01-300/40 group-hover:text-neutral-01-800`
  }
  // neutral-02
  else if (theme === 'neutral-02') {
    textTheme = `bg-neutral-02-300/20 text-neutral-02-700 group-hover:bg-neutral-02-300/40 group-hover:text-neutral-02-800`
  }
  // Date
  else {
    textTheme = `bg-cornflour-400/20 text-cornflour-900 group-hover:bg-cornflour-400/40 group-hover:text-cornflour-1000`
  }

  return (
    <span
      className={`${textTheme} ${sizing} group-hover:transition-all duration-200 ease-linear font-ui lowercase leading-none rounded flex items-center ${className}`}
    >
      {children}
    </span>
  )
}
