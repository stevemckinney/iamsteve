import { cn } from '@/lib/utils'

const folderIcons = new Set(['everything', 'archive', 'all', 'folder'])
const penIcons = new Set(['design', 'pen'])

const variantClasses = {
  default: 'icon',
  header: 'icon-header',
  'on-light': 'icon-on-light',
  none: '',
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

  const variantClass = variantClasses[variant] || 'icon'

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn('shrink-0', 'text-current', variantClass, className)}
      {...props}
    >
      <use xlinkHref={`#${resolvedIcon}-${size}`} />
    </svg>
  )
}

export default Icon
