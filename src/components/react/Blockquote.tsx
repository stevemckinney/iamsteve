import type { ReactNode } from 'react'

interface BlockquoteProps {
  style?: string
  children: ReactNode
}

const styleVariants: Record<string, string> = {
  notice: 'border-l-2 border-l-fern-500 pl-4 -ml-4',
  signpost: '',
  afterthought:
    'md:text-lg lg:text-xl border-l border-l-neutral-01-500/20 pl-4 mb-3 text-lg text-ui-body/60 italic',
}

export function Blockquote({ style, children }: BlockquoteProps) {
  return (
    <blockquote className={style ? styleVariants[style] || '' : ''}>
      {children}
    </blockquote>
  )
}
