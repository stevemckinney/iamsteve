'use client'

import { useState, useCallback } from 'react'
import { Button } from 'react-aria-components'

import { cn } from '@/lib/utils'
import Icon from '@/components/icon'

export default function CopyCode({ getCode }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    const code = getCode()
    if (!code) return
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [getCode])

  return (
    <Button
      onPress={handleCopy}
      className="flex gap-1.5 items-center justify-center px-3 py-1.5 rounded-sm bg-surface bg-[image:linear-gradient(to_bottom,transparent,color-mix(in_oklab,var(--color-neutral-01-250),transparent_88%))] dark:bg-[image:linear-gradient(to_top,transparent,color-mix(in_oklab,var(--color-fern-900),transparent_88%))] shadow-placed hover:shadow-picked active:shadow-reduced transition duration-100 ease-out font-ui cursor-pointer ml-auto text-body"
      aria-label={copied ? 'Copied' : 'Copy code'}
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
      <span>Copy</span>
    </Button>
  )
}
