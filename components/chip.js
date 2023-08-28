import Icon from './icon'
import Link from '@/components/Link'

export default function Chip({ children, theme, iconStart, href }) {
  let iconTheme
  let textTheme

  // Design
  if (theme === 'rio' || children === 'Design') {
    iconTheme = `bg-rio-400`
    textTheme = `bg-rio-150/20 text-rio-700 text-lg font-display lowercase`
    iconStart = `pen`
  }
  // Code
  else if (theme === 'dandelion' || children === 'Code') {
    iconTheme = `bg-dandelion-400`
    textTheme = `bg-dandelion-150/20 text-dandelion-700 text-lg font-display lowercase`
    iconStart = `code`
  }
  // Date
  else {
    iconTheme = `bg-cornflour-500`
    textTheme = `bg-cornflour-400/20 text-cornflour-900 text-lg font-display lowercase`
  }

  if (href) {
    return (
      <Link href={href} className="flex gap-1 font-variation-medium">
        <span className={`${iconTheme} rounded w-8 h-8 flex items-center justify-center`}>
          <Icon kind={iconStart} />
        </span>
        <span className={`${textTheme} rounded px-4 h-8 flex items-center leading-none font-ui`}>
          {children}
        </span>
      </Link>
    )
  } else {
    return (
      <p className="flex gap-1 font-variation-medium">
        <span className={`${iconTheme} rounded w-8 h-8 flex items-center justify-center`}>
          <Icon kind={iconStart} />
        </span>
        <span className={`${textTheme} rounded px-4 h-8 flex items-center leading-none font-ui`}>
          {children}
        </span>
      </p>
    )
  }
}
