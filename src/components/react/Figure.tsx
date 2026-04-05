import type { ReactNode } from 'react'

interface FigureProps {
  imageShadow?: boolean
  enlargeable?: boolean
  src?: string
  alt?: string
  className?: string
  children?: ReactNode
}

export function Figure({
  imageShadow,
  className = '',
  children,
  ...props
}: FigureProps) {
  const figureClass =
    `${imageShadow ? '[&_img]:drop-shadow-image' : ''} ${className}`.trim() ||
    undefined

  return (
    <figure className={figureClass} {...props}>
      {children}
    </figure>
  )
}

interface FigcaptionProps {
  children: ReactNode
  className?: string
}

export function Figcaption({ children, ...props }: FigcaptionProps) {
  return (
    <figcaption
      className="text-body/60 font-mono text-base tracking-[-0.03em] leading-tight pt-2"
      {...props}
    >
      {children}
    </figcaption>
  )
}

interface FigProps {
  children: ReactNode
}

export function Fig({ children }: FigProps) {
  return (
    <span className="text-heading/40 uppercase">Fig. {children}</span>
  )
}
