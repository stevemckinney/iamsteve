import Icon from './icon'
import Link from '@/components/link'

export default function Chip({ children, theme, iconStart, href }) {
  let iconTheme
  let textTheme

  // Design
  if (theme === 'rio' || children === 'Design') {
    iconTheme = `bg-rio-300 group-hover:bg-rio-400 group-hover:transition-all duration-200 group-hover:transition-all duration-200 ease-linear`
    textTheme = `bg-rio-150/10 text-rio-700 text-lg font-display lowercase group-hover:bg-rio-150/20 group-hover:text-rio-800 group-hover:transition-all duration-200 ease-linear`
    iconStart = `pen`
  }
  // Code
  else if (theme === 'dandelion' || children === 'Code') {
    iconTheme = `bg-dandelion-400 group-hover:bg-dandelion-500 group-hover:transition-all duration-200 group-hover:transition-all duration-200 ease-linear`
    textTheme = `bg-dandelion-100/20 text-dandelion-700 text-lg font-display lowercase group-hover:bg-dandelion-100/40 group-hover:text-dandelion-800 group-hover:transition-all duration-200 ease-linear`
    iconStart = `code`
  }
  // Date
  else {
    iconTheme = `bg-cornflour-500 group-hover:bg-cornflour-600 group-hover:transition-all duration-200 group-hover:transition-all duration-200 ease-linear`
    textTheme = `bg-cornflour-400/20 text-cornflour-900 text-lg font-display lowercase group-hover:bg-cornflour-400/40 group-hover:text-cornflour-1000 group-hover:transition-all duration-200 ease-linear`
  }

  if (href) {
    return (
      <Link
        href={href}
        className="flex gap-1 font-variation-medium group transition-all duration-200 ease-linear"
      >
        <ChipIcon iconTheme={iconTheme} icon={iconStart} />
        <ChipText textTheme={textTheme}>{children}</ChipText>
      </Link>
    )
  } else {
    return (
      <p className="flex gap-1 font-variation-medium">
        <ChipIcon iconTheme={iconTheme} icon={iconStart} />
        <ChipText textTheme={textTheme}>{children}</ChipText>
      </p>
    )
  }
}

function ChipIcon({ iconTheme, icon }) {
  return (
    <span
      className={`${iconTheme} rounded w-8 h-8 flex items-center justify-center`}
    >
      <Icon icon={icon} />
    </span>
  )
}

function ChipText({ children, textTheme }) {
  return (
    <span
      className={`${textTheme} rounded px-3 h-8 pt-[2px] flex items-center leading-none font-ui`}
    >
      {children}
    </span>
  )
}
