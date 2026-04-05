import type { ReactNode } from 'react'
import Icon from './Icon'

interface LinkProps {
  href: string
  children: ReactNode
  className?: string
}

export function LinkFigma({ href, children }: LinkProps) {
  return (
    <a
      href={href}
      className="flex flex-1 justify-center items-center gap-2 select-none font-ui text-base/tight lowercase text-center button-dandelion w-full @sm:w-auto @sm:grow-0 flex-auto"
    >
      <Icon icon="figma" size={16} className="text-current shrink-0" />
      {children}
    </a>
  )
}

export function LinkGithub({ href, children }: LinkProps) {
  return (
    <a
      href={href}
      className="flex flex-1 justify-center items-center gap-2 select-none font-ui text-base/tight lowercase text-center button-dandelion w-full @sm:w-auto @sm:grow-0 flex-auto"
    >
      <Icon icon="github" size={16} className="text-current shrink-0" />
      {children}
    </a>
  )
}

interface DemoProps {
  src: string
  className?: string
  zoom?: string
}

export function Demo({
  src,
  className = '-mx-6 col-content h-[33vmax] overflow-hidden bg-fern-1100 p-1.5',
  zoom = '.5',
}: DemoProps) {
  const style = { '--zoom': zoom } as React.CSSProperties
  return (
    <div
      className={`demo sm:rounded-lg overflow-clip ${className}`}
      style={style}
    >
      <iframe
        src={src}
        className="sm:rounded-[2.35rem] ring ring-fern-800 origin-top-left w-[calc(1/var(--zoom)*100%)] h-[calc(1/var(--zoom)*100%)] transform-gpu scale-(--zoom)"
      />
    </div>
  )
}
