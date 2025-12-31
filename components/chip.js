import Icon from './icon'
import Link from '@/components/link'

export default function Chip({ children, theme, size = 16, iconStart, href }) {
  if (href) {
    return (
      <Link
        href={href}
        className="flex gap-1 font-variation-medium group/chip transition-all duration-200 ease-linear"
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
    iconTheme = `bg-[light-dark(var(--color-rio-400),var(--color-rio-300))] group-hover/chip:bg-[light-dark(var(--color-rio-500),var(--color-rio-400))]`
  }
  // Code
  else if (theme === 'dandelion') {
    iconTheme = `bg-[light-dark(var(--color-dandelion-400),var(--color-dandelion-300))] group-hover/chip:bg-[light-dark(var(--color-dandelion-500),var(--color-dandelion-400))]`
  }
  // Magenta
  else if (theme === 'lavender') {
    iconTheme = `bg-[light-dark(var(--color-lavender-300),var(--color-lavender-200))] group-hover/chip:bg-[light-dark(var(--color-lavender-500),var(--color-lavender-400))]`
  }
  // Magenta
  else if (theme === 'magenta') {
    iconTheme = `bg-[light-dark(var(--color-magenta-300),var(--color-magenta-200))] group-hover/chip:bg-[light-dark(var(--color-magenta-500),var(--color-magenta-400))]`
  }
  // Grass
  else if (theme === 'grass') {
    iconTheme = `bg-[light-dark(var(--color-grass-300),var(--color-grass-200))] group-hover/chip:bg-[light-dark(var(--color-grass-500),var(--color-grass-400))]`
  }
  // Fern
  else if (theme === 'fern') {
    iconTheme = `bg-[light-dark(var(--color-fern-300),var(--color-fern-200))] group-hover/chip:bg-[light-dark(var(--color-fern-500),var(--color-fern-400))]`
  }
  // Moss
  else if (theme === 'moss') {
    iconTheme = `bg-[light-dark(var(--color-moss-300),var(--color-moss-200))] group-hover/chip:bg-[light-dark(var(--color-moss-500),var(--color-moss-400))]`
  }
  // neutral-01
  else if (theme === 'neutral-01') {
    iconTheme = `bg-[light-dark(var(--color-neutral-01-300),var(--color-neutral-01-200))] group-hover/chip:bg-[light-dark(var(--color-neutral-01-500),var(--color-neutral-01-400))]`
  }
  // neutral-02
  else if (theme === 'neutral-02') {
    iconTheme = `bg-[light-dark(var(--color-neutral-02-300),var(--color-neutral-02-200))] group-hover/chip:bg-[light-dark(var(--color-neutral-02-400),var(--color-neutral-02-300))]`
  }
  // Date
  else {
    iconTheme = `bg-[light-dark(var(--color-cornflour-300),var(--color-cornflour-200))] group-hover/chip:bg-[light-dark(var(--color-cornflour-600),var(--color-cornflour-500))]`
  }

  return (
    <span
      className={`${iconTheme} ${sizing} rounded flex items-center justify-center group-hover/chip:transition-all duration-200 group-hover/chip:transition-all duration-200 ease-linear ${className}`}
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
    textTheme = `bg-[light-dark(var(--color-rio-200),var(--color-rio-150))]/10 text-[light-dark(var(--color-rio-800),var(--color-rio-700))] group-hover/chip:bg-[light-dark(var(--color-rio-200),var(--color-rio-150))]/20 group-hover/chip:text-[light-dark(var(--color-rio-900),var(--color-rio-800))]`
  }
  // Code
  else if (theme === 'dandelion') {
    textTheme = `bg-[light-dark(var(--color-dandelion-200),var(--color-dandelion-100))]/20 text-[light-dark(var(--color-dandelion-800),var(--color-dandelion-700))] group-hover/chip:bg-[light-dark(var(--color-dandelion-200),var(--color-dandelion-100))]/40 group-hover/chip:text-[light-dark(var(--color-dandelion-900),var(--color-dandelion-800))]`
  }
  // Magenta
  else if (theme === 'lavender') {
    textTheme = `bg-[light-dark(var(--color-lavender-200),var(--color-lavender-100))]/20 text-[light-dark(var(--color-lavender-800),var(--color-lavender-700))] group-hover/chip:bg-[light-dark(var(--color-lavender-200),var(--color-lavender-100))]/40 group-hover/chip:text-[light-dark(var(--color-lavender-900),var(--color-lavender-800))]`
  }
  // Magenta
  else if (theme === 'magenta') {
    textTheme = `bg-[light-dark(var(--color-magenta-200),var(--color-magenta-100))]/20 text-[light-dark(var(--color-magenta-800),var(--color-magenta-700))] group-hover/chip:bg-[light-dark(var(--color-magenta-200),var(--color-magenta-100))]/40 group-hover/chip:text-[light-dark(var(--color-magenta-850),var(--color-magenta-800))]`
  }
  // Grass
  else if (theme === 'grass') {
    textTheme = `bg-[light-dark(var(--color-grass-200),var(--color-grass-100))]/20 text-[light-dark(var(--color-grass-800),var(--color-grass-700))] group-hover/chip:bg-[light-dark(var(--color-grass-200),var(--color-grass-100))]/40 group-hover/chip:text-[light-dark(var(--color-grass-900),var(--color-grass-800))]`
  }
  // Fern
  else if (theme === 'fern') {
    textTheme = `bg-[light-dark(var(--color-fern-200),var(--color-fern-100))]/20 text-[light-dark(var(--color-fern-800),var(--color-fern-700))] group-hover/chip:bg-[light-dark(var(--color-fern-200),var(--color-fern-100))]/40 group-hover/chip:text-[light-dark(var(--color-fern-900),var(--color-fern-800))]`
  }
  // Moss
  else if (theme === 'moss') {
    textTheme = `bg-[light-dark(var(--color-moss-200),var(--color-moss-100))]/20 text-[light-dark(var(--color-moss-800),var(--color-moss-700))] group-hover/chip:bg-[light-dark(var(--color-moss-200),var(--color-moss-100))]/40 group-hover/chip:text-[light-dark(var(--color-moss-900),var(--color-moss-800))]`
  }
  // neutral-01
  else if (theme === 'neutral-01') {
    textTheme = `bg-[light-dark(var(--color-neutral-01-200),var(--color-neutral-01-150))]/20 text-[light-dark(var(--color-neutral-01-800),var(--color-neutral-01-700))] group-hover/chip:bg-[light-dark(var(--color-neutral-01-400),var(--color-neutral-01-300))]/40 group-hover/chip:text-[light-dark(var(--color-neutral-01-900),var(--color-neutral-01-800))]`
  }
  // neutral-02
  else if (theme === 'neutral-02') {
    textTheme = `bg-[light-dark(var(--color-neutral-02-400),var(--color-neutral-02-300))]/20 text-[light-dark(var(--color-neutral-02-800),var(--color-neutral-02-700))] group-hover/chip:bg-[light-dark(var(--color-neutral-02-400),var(--color-neutral-02-300))]/40 group-hover/chip:text-[light-dark(var(--color-neutral-02-900),var(--color-neutral-02-800))]`
  }
  // Date
  else {
    textTheme = `bg-[light-dark(var(--color-cornflour-500),var(--color-cornflour-400))]/20 text-[light-dark(var(--color-cornflour-1000),var(--color-cornflour-900))] group-hover/chip:bg-[light-dark(var(--color-cornflour-500),var(--color-cornflour-400))]/40 group-hover/chip:text-[light-dark(var(--color-cornflour-1100),var(--color-cornflour-1000))]`
  }

  return (
    <span
      className={`${textTheme} ${sizing} group-hover/chip:transition-all duration-200 ease-linear font-ui lowercase leading-none rounded flex items-center ${className}`}
    >
      {children}
    </span>
  )
}
