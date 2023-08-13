import Icon from './icon'

export default function Chip({ children, theme, iconKind }) {
  let iconTheme
  let textTheme

  if (theme === 'rio') {
    iconTheme = `bg-rio-400`
    textTheme = `bg-rio-150/20 text-rio-700 text-lg font-display lowercase`
  }

  if (children === 'Design') {
    iconKind = 'pen'
  }

  return (
    <p className="flex gap-1">
      <span className={`${iconTheme} rounded p-1`}>
        <Icon kind={iconKind} />
      </span>
      <span className={`${textTheme} rounded px-4 py-1`}>{children}</span>
    </p>
  )
}
