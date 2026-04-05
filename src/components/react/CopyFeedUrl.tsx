import { useState, useCallback, useRef } from 'react'
import { Button } from 'react-aria-components'
import { cn } from '../../../lib/utils'
import Icon from './Icon'

function CopyButton({ getText, label = 'Copy', className }: { getText: () => string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<any>(null)

  const handleCopy = useCallback(async () => {
    const text = getText()
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 2000)
  }, [getText])

  return (
    <Button
      onPress={handleCopy}
      className={cn(
        'flex items-center justify-center gap-1.5',
        'leading-normal px-3 py-1.5 rounded-sm',
        'bg-surface',
        'shadow-placed hover:shadow-picked active:shadow-reduced',
        'transition duration-100 ease-out',
        'font-ui cursor-pointer',
        className
      )}
      aria-label={copied ? 'Copied' : label}
    >
      <span className="relative w-4 h-4">
        <Icon
          icon="copy"
          size={16}
          variant="header"
          className={cn(
            'absolute top-0 left-0 transition-all duration-200',
            copied ? 'opacity-0 scale-75 blur-sm' : ''
          )}
        />
        <Icon
          icon="checkmark"
          size={16}
          variant="header"
          className={cn(
            'absolute top-0 left-0 transition-all duration-200',
            copied ? '' : 'opacity-0 scale-75 blur-sm'
          )}
        />
      </span>
      {label && <span>{label}</span>}
    </Button>
  )
}

function CopyFeedUrl({ className }: { className?: string }) {
  const feedUrl = 'https://iamsteve.me/feed.xml'
  const getText = useCallback(() => feedUrl, [feedUrl])
  return <CopyButton getText={getText} label="Copy feed URL" className={className} />
}

export { CopyButton, CopyFeedUrl }
