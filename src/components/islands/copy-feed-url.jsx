// components/button/copy-feed-url.js: copies the RSS feed’s address
import { useCallback } from 'react'
import siteMetadata from '@/content/metadata'
import CopyButton from './copy-button.jsx'

export default function CopyFeedUrl({ className }) {
  const feedUrl = `${siteMetadata.siteUrl}/feed.xml`
  const getText = useCallback(() => feedUrl, [feedUrl])

  return (
    <CopyButton getText={getText} label="Copy feed URL" className={className} />
  )
}
