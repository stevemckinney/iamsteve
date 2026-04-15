'use client'

import { useRef, useCallback } from 'react'
import CopyCode from '@/components/code/copy-code'

export default function CodeFigure({ title, language, children }) {
  const figureRef = useRef(null)

  const getCode = useCallback(() => {
    const pre = figureRef.current?.querySelector('pre')
    return pre?.textContent || ''
  }, [])

  return (
    <figure ref={figureRef} data-rehype-pretty-code-figure="">
      <figcaption data-rehype-pretty-code-title="" data-language={language}>
        <span className="text-base tracking-normal py-1.5 px-3">{title}</span>
        <CopyCode getCode={getCode} />
      </figcaption>
      {children}
    </figure>
  )
}
