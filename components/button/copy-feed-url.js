'use client'

import { useState } from 'react'
import { Button } from 'react-aria-components'

import { cn } from '@/lib/utils'
import Icon from '@/components/icon'
import siteMetadata from '@/content/metadata'

const buttonClass =
  'flex items-center justify-center pl-3 py-1.5 rounded-sm bg-surface bg-[image:linear-gradient(to_bottom,transparent,color-mix(in_oklab,var(--color-neutral-01-250),transparent_88%))] dark:bg-[image:linear-gradient(to_top,transparent,color-mix(in_oklab,var(--color-fern-900),transparent_88%))] shadow-placed hover:shadow-picked active:shadow-reduced transition duration-100 ease-out font-ui cursor-pointer'

export default function CopyFeedUrl({ className }) {
  const [copied, setCopied] = useState(false)
  const feedUrl = `${siteMetadata.siteUrl}/feed.xml`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(feedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button onPress={handleCopy} className={cn(buttonClass, className)}>
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
      <span className="pl-2 pr-4">Copy feed URL</span>
    </Button>
  )
}
