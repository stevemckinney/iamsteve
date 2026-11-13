// components/icon/icon.js for islands: a symbol from the inline sprite the
// layout mounts, so islands draw the same icons as the .astro Icon
import { cn } from '@/lib/utils'

const folderIcons = new Set(['everything', 'archive', 'all', 'folder'])
const penIcons = new Set(['design', 'pen'])

const variantClasses = {
  default: 'icon',
  header: 'icon-header',
  'on-light': 'icon-on-light',
  none: '',
}

export default function Icon({
  icon = 'folder',
  className,
  variant = 'default',
  size = 24,
  ...props
}) {
  const name = icon.toLowerCase()
  const resolved = folderIcons.has(name)
    ? 'folder'
    : penIcons.has(name)
    ? 'pen'
    : name
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
      <use xlinkHref={`#${resolved}-${size}`} />
    </svg>
  )
}
