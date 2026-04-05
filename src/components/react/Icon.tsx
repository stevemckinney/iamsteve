import { cn } from '../../../lib/utils'

const folderIcons = new Set(['everything', 'archive', 'all', 'folder'])
const penIcons = new Set(['design', 'pen'])

const variantClasses: Record<string, string> = {
  default: 'icon',
  header: 'icon-header',
  'on-light': 'icon-on-light',
  none: '',
}

interface IconProps {
  icon?: string
  className?: string
  variant?: 'default' | 'header' | 'on-light' | 'none'
  size?: number
  [key: string]: any
}

const Icon = ({
  icon = 'folder',
  className,
  variant = 'default',
  size = 24,
  ...props
}: IconProps) => {
  const normalisedIcon = icon.toLowerCase()

  const resolvedIcon = folderIcons.has(normalisedIcon)
    ? 'folder'
    : penIcons.has(normalisedIcon)
    ? 'pen'
    : normalisedIcon

  const variantClass =
    variant in variantClasses ? variantClasses[variant] : 'icon'

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
