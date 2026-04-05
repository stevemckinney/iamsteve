import { useRef, useCallback, useState, type ReactNode } from 'react'

interface CodeFigureProps {
  title?: string
  language?: string
  children: ReactNode
}

export default function CodeFigure({ title, language, children }: CodeFigureProps) {
  const figureRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    const pre = figureRef.current?.querySelector('pre')
    const code = pre?.textContent || ''
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  return (
    <figure ref={figureRef} data-rehype-pretty-code-figure="">
      <figcaption data-rehype-pretty-code-title="" data-language={language}>
        <span className="text-base tracking-normal py-1.5 px-3">{title}</span>
        <button
          onClick={handleCopy}
          className="ml-auto text-body text-base cursor-pointer hover:text-heading transition-colors duration-200"
          aria-label="Copy code"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </figcaption>
      {children}
    </figure>
  )
}
