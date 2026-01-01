import { cn } from '@/lib/utils'

const Icon = ({
  icon = 'folder',
  className,
  variant = 'default', // 'default' | 'header'
  size = 24,
  ...props
}) => {
  if (icon === 'design' || icon === 'Design') icon = 'pen'
  if (
    icon === 'everything' ||
    icon === 'archive' ||
    icon === 'all' ||
    icon === 'Everything' ||
    icon === 'Archive' ||
    icon === 'All'
  ) {
    icon = 'folder'
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn(
        'text-heading',
        variant === 'header' ? 'icon-header' : 'icon',
        className
      )}
      {...props}
    >
      <use xlinkHref={`#${icon.toLowerCase()}-${size}`} />
    </svg>
  )
}

export default Icon
