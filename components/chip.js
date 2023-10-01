import Icon from './icon'
import Link from '@/components/link'

export default function Chip({
  children,
  theme,
  size = 'small',
  iconStart,
  href,
}) {
  let iconTheme
  let textTheme

  // Design
  if (theme === 'rio') {
    iconTheme = `bg-rio-200 group-hover:bg-rio-300 group-hover:transition-all duration-200 group-hover:transition-all duration-200 ease-linear`
    textTheme = `bg-rio-150/10 text-rio-700 group-hover:bg-rio-150/20 group-hover:text-rio-800 group-hover:transition-all duration-200 ease-linear`
  }
  // Code
  else if (theme === 'dandelion') {
    iconTheme = `bg-dandelion-200 group-hover:bg-dandelion-400 group-hover:transition-all duration-200 group-hover:transition-all duration-200 ease-linear`
    textTheme = `bg-dandelion-100/20 text-dandelion-700 group-hover:bg-dandelion-100/40 group-hover:text-dandelion-800 group-hover:transition-all duration-200 ease-linear`
  }
  // Magenta
  else if (theme === 'lavender') {
    iconTheme = `bg-lavender-200 group-hover:bg-lavender-400 group-hover:transition-all duration-200 group-hover:transition-all duration-200 ease-linear`
    textTheme = `bg-lavender-100/20 text-lavender-700 group-hover:bg-lavender-100/40 group-hover:text-lavender-800 group-hover:transition-all duration-200 ease-linear`
  }
  // Magenta
  else if (theme === 'magenta') {
    iconTheme = `bg-magenta-200 group-hover:bg-magenta-400 group-hover:transition-all duration-200 group-hover:transition-all duration-200 ease-linear`
    textTheme = `bg-magenta-100/20 text-magenta-700 group-hover:bg-magenta-100/40 group-hover:text-magenta-800 group-hover:transition-all duration-200 ease-linear`
  }
  // Grass
  else if (theme === 'grass') {
    iconTheme = `bg-grass-200 group-hover:bg-grass-400 group-hover:transition-all duration-200 group-hover:transition-all duration-200 ease-linear`
    textTheme = `bg-grass-100/20 text-grass-700 group-hover:bg-grass-100/40 group-hover:text-grass-800 group-hover:transition-all duration-200 ease-linear`
  }
  // Fern
  else if (theme === 'fern') {
    iconTheme = `bg-fern-200 group-hover:bg-fern-400 group-hover:transition-all duration-200 group-hover:transition-all duration-200 ease-linear`
    textTheme = `bg-fern-100/20 text-fern-700 group-hover:bg-fern-100/40 group-hover:text-fern-800 group-hover:transition-all duration-200 ease-linear`
  }
  // Moss
  else if (theme === 'moss') {
    iconTheme = `bg-moss-200 group-hover:bg-moss-400 group-hover:transition-all duration-200 group-hover:transition-all duration-200 ease-linear`
    textTheme = `bg-moss-100/20 text-moss-700 group-hover:bg-moss-100/40 group-hover:text-moss-800 group-hover:transition-all duration-200 ease-linear`
  }
  // neutral-01
  else if (theme === 'neutral-01') {
    iconTheme = `bg-neutral-01-200 group-hover:bg-neutral-01-400 group-hover:transition-all duration-200 group-hover:transition-all duration-200 ease-linear`
    textTheme = `bg-neutral-01-100/20 text-neutral-01-700 group-hover:bg-neutral-01-300/40 group-hover:text-neutral-01-800 group-hover:transition-all duration-200 ease-linear`
  }
  // neutral-02
  else if (theme === 'neutral-02') {
    iconTheme = `bg-neutral-02-200 group-hover:bg-neutral-02-300 group-hover:transition-all duration-200 group-hover:transition-all duration-200 ease-linear`
    textTheme = `bg-neutral-02-300/20 text-neutral-02-700 group-hover:bg-neutral-02-300/40 group-hover:text-neutral-02-800 group-hover:transition-all duration-200 ease-linear`
  }
  // Date
  else {
    iconTheme = `bg-cornflour-200 group-hover:bg-cornflour-500 group-hover:transition-all duration-200 group-hover:transition-all duration-200 ease-linear`
    textTheme = `bg-cornflour-400/20 text-cornflour-900 group-hover:bg-cornflour-400/40 group-hover:text-cornflour-1000 group-hover:transition-all duration-200 ease-linear`
  }

  if (href) {
    return (
      <Link
        href={href}
        className="flex gap-1 font-variation-medium group transition-all duration-200 ease-linear"
      >
        <ChipIcon iconTheme={iconTheme} icon={iconStart} size={size} />
        <ChipText textTheme={textTheme} size={size}>
          {children}
        </ChipText>
      </Link>
    )
  } else {
    return (
      <p className="flex gap-1 font-variation-medium">
        <ChipIcon iconTheme={iconTheme} icon={iconStart} size={size} />
        <ChipText textTheme={textTheme} size={size}>
          {children}
        </ChipText>
      </p>
    )
  }
}

function ChipIcon({ iconTheme, icon, size }) {
  const small = 'w-6 h-6'
  const large = 'w-8 h-8'
  const sizing = size === 'small' ? small : large
  const iconSize = size === 'small' ? 16 : 24

  return (
    <span
      className={`${iconTheme} ${sizing} rounded flex items-center justify-center`}
    >
      <Icon icon={icon} size={iconSize} />
    </span>
  )
}

function ChipText({ children, textTheme, size }) {
  const small = 'px-3 h-6 pt-[2px]'
  const large = 'px-3 h-8 pt-[2px]'
  const sizing = size === 'small' ? small : large
  const theme = `${textTheme} text-lg font-ui lowercase leading-none`

  return (
    <span className={`${theme} ${sizing} rounded flex items-center`}>
      {children}
    </span>
  )
}
