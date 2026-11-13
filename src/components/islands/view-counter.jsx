// app/(blog)/blog/counter.js: a post’s view count. It records the view
// once a session, then shows the count the endpoint answers with,
// highlighted while it changes. Posts only mount it when view counting is
// on, so the flag is checked at build rather than here
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import Locale from './locale.jsx'

export default function ViewCounter({
  slug,
  initialViews,
  trackView,
  className = 'text-emphasis',
}) {
  const [views, setViews] = useState(initialViews)
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    if (!trackView) return

    const storageKey = `viewed-${slug}`

    try {
      const seen = sessionStorage.getItem(storageKey)
      if (seen) {
        const count = Number(seen)
        // The page can be a build behind the count this tab was given
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

  if (typeof views !== 'number') return null

  // As in production, className’s colour wins over text-counter-updated
  return (
    <Locale>
      <span
        className={cn(
          isUpdated &&
            'text-counter-updated transition-colors duration-1000 ease-out',
          className
        )}
      >
        {`${views.toLocaleString()} views`}
      </span>
    </Locale>
  )
}
