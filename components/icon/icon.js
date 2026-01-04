import { cn } from '@/lib/utils'

const folderIcons = new Set(['everything', 'archive', 'all', 'folder'])
const penIcons = new Set(['design', 'pen'])

const variantClasses = {
  default: 'icon',
  header: 'icon-header',
  'on-light': 'icon-on-light',
}

const Icon = ({
  icon = 'folder',
  className,
  variant = 'default',
  size = 24,
  ...props
}) => {
  const normalisedIcon = icon.toLowerCase()

  const resolvedIcon = folderIcons.has(normalisedIcon)
    ? 'folder'
    : penIcons.has(normalisedIcon)
      ? 'pen'
      : normalisedIcon

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn(
        'text-heading',
        'shrink-0',
        variantClasses[variant] || 'icon',
        className
      )}
      {...props}
    >
      <use xlinkHref={`#${resolvedIcon}-${size}`} />
    </svg>
  )
}

export default Icon
