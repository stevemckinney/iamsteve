'use client'

import { useCallback } from 'react'
import siteMetadata from '@/content/metadata'
import CopyButton from './button-copy'

export default function CopyFeedUrl({ className }) {
  const feedUrl = `${siteMetadata.siteUrl}/feed.xml`
  const getText = useCallback(() => feedUrl, [feedUrl])

  return (
    <CopyButton getText={getText} label="Copy feed URL" className={className} />
  )
}
