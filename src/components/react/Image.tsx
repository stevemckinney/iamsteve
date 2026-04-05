interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
  [key: string]: unknown
}

export default function Image({
  src,
  alt,
  width,
  height,
  className = '',
  ...props
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-sm ${className}`.trim()}
      loading="lazy"
      {...props}
    />
  )
}
