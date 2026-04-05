interface AppIconProps {
  src: string
  alt: string
  type?: 'app' | 'favicon'
  size?: number
  className?: string
}

export default function AppIcon({
  src,
  alt,
  type = 'app',
  size = 72,
  className = '',
}: AppIconProps) {
  return (
    <span
      className={`flex items-center justify-center row-span-2 self-start shrink-0 aspect-square ${
        type === 'favicon' ? 'relative top-[2px]' : ''
      } ${className}`.trim()}
    >
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-contain"
        loading="lazy"
      />
    </span>
  )
}
