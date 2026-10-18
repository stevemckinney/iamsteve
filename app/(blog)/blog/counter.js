'use client'

import { useEffect, useState } from 'react'

const ViewCounter = ({
  slug,
  initialViews,
  trackView,
  className = 'text-emphasis',
}) => {
  const [views, setViews] = useState(initialViews)
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    if (!trackView || process.env.NEXT_PUBLIC_ENABLE_VIEW_COUNTING !== 'true') {
      return
    }

    const storageKey = `viewed-${slug}`

    try {
      const seen = sessionStorage.getItem(storageKey)
      if (seen) {
        const count = Number(seen)
        // The cached page can be an hour behind the count this tab was given
        if (count) setViews((current) => Math.max(current ?? 0, count))
        return
      }
    } catch (error) {
      console.error('Error reading view session:', error)
    }

    fetch(`/api/views/${encodeURIComponent(slug)}`, {
      method: 'POST',
      keepalive: true,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!data) return

        try {
          sessionStorage.setItem(
            storageKey,
            typeof data.views === 'number' ? data.views : 'true'
          )
        } catch (error) {
          console.error('Error storing view session:', error)
        }

        if (typeof data.views !== 'number') return

        setViews((current) => {
          if (typeof current === 'number' && data.views <= current) {
            return current
          }
          setIsUpdated(true)
          window.setTimeout(() => setIsUpdated(false), 2000)
          return data.views
        })
      })
      .catch((error) => {
        console.error('Error updating view count:', error)
      })
  }, [slug, trackView])

  if (
    process.env.NEXT_PUBLIC_ENABLE_VIEW_COUNTING !== 'true' ||
    typeof views !== 'number'
  ) {
    return null
  }

  return (
    <span
      className={`${className} ${
        isUpdated
          ? 'text-counter-updated transition-colors duration-1000 ease-out'
          : ''
      }`}
    >
      {`${views.toLocaleString()} views`}
    </span>
  )
}

export default ViewCounter
