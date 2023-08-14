import Icon from './icon'

export default function Chip({ children, theme, iconKind }) {
  let iconTheme
  let textTheme

  // Design
  if (theme === 'rio') {
    iconTheme = `bg-rio-400`
    textTheme = `bg-rio-150/20 text-rio-700 text-lg font-display lowercase`
  }
  // Code
  else if (theme === 'dandelion') {
    iconTheme = `bg-dandelion-400`
    textTheme = `bg-dandelion-150/20 text-dandelion-700 text-lg font-display lowercase`
  }
  // Date
  else {
    iconTheme = `bg-cornflour-500`
    textTheme = `bg-cornflour-400/20 text-cornflour-900 text-lg font-display lowercase`
  }

  if (children === 'Design') {
    iconKind = 'pen'
  }

  return (
    <p className="flex gap-1">
      <span className={`${iconTheme} rounded w-8 h-8 flex items-center justify-center`}>
        <Icon kind={iconKind} />
      </span>
      <span className={`${textTheme} rounded px-4 h-8 flex items-center leading-none font-ui`}>
        {children}
      </span>
    </p>
  )
}
