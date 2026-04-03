'use client'

import { useState, useCallback, useRef } from 'react'
import { Button } from 'react-aria-components'

import { cn } from '@/lib/utils'
import Icon from '@/components/icon'

const baseClass =
  'flex items-center justify-center gap-1.5 leading-normal px-3 py-1.5 rounded-sm bg-surface bg-[image:linear-gradient(to_bottom,transparent,color-mix(in_oklab,var(--color-neutral-01-250),transparent_88%))] dark:bg-[image:linear-gradient(to_top,transparent,color-mix(in_oklab,var(--color-fern-900),transparent_88%))] shadow-placed hover:shadow-picked active:shadow-reduced transition duration-100 ease-out font-ui cursor-pointer'

export default function CopyButton({ getText, label = 'Copy', className }) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef(null)

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
      className={cn(baseClass, className)}
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
