'use client'

import { useState } from 'react'
import { Button } from 'react-aria-components'

import { cn } from '@/lib/utils'
import Icon from '@/components/icon'
import { BadgeText } from '@/components/badge'
import siteMetadata from '@/content/metadata'

export default function CopyLink({ slug, className }) {
  const [copied, setCopied] = useState(false)
  const url = `${siteMetadata.siteUrl}${slug}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      onPress={handleCopy}
      className={cn(
        'flex flex-[0_0_auto] font-variation-medium text-emphasis gap-2 cursor-pointer group/badge',
        'transition-all duration-100 ease-linear',
        className
      )}
    >
      <span
        className={cn(
          'flex-[0_0_auto] bg-surface',
          'dark:bg-cornflour-300',
          'dark:ring-1 dark:ring-cornflour-300',
          'shadow-reduced dark:shadow-none',
          'group-hover/badge:shadow-picked',
          'group-active/badge:shadow-reduced',
          'flex items-center justify-center relative',
          'transition-all duration-100 ease-linear',
          'w-6 h-6 rounded-[.375rem]',
          'text-[light-dark(var(--color-cornflour-700),var(--color-cornflour-900))]'
        )}
      >
        <Icon
          icon="link"
          size={16}
          variant="default"
          className={cn(
            'absolute text-current transition-all duration-200',
            copied ? 'opacity-0 scale-75' : ''
          )}
        />
        <Icon
          icon="checkmark"
          size={16}
          variant="default"
          className={cn(
            'absolute text-current transition-all duration-200',
            copied ? '' : 'opacity-0 scale-75'
          )}
        />
      </span>
      <BadgeText size={16}>{copied ? 'Copied' : 'Copy link'}</BadgeText>
    </Button>
  )
}
