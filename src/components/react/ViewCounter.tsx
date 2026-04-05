import { useEffect, useState } from 'react'

interface ViewCounterProps {
  slug: string
  initialViews?: number
  trackView?: boolean
  className?: string
}

export default function ViewCounter({
  slug,
  initialViews = 0,
  trackView = false,
  className = 'text-emphasis',
}: ViewCounterProps) {
  const [views, setViews] = useState(initialViews)
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    // Fetch current view count
    fetch(`/api/views/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.count > 0) setViews(data.count)
      })
      .catch(() => {})

    // Increment view count if tracking
    if (trackView) {
      const hasViewed = sessionStorage.getItem(`viewed-${slug}`)
      if (!hasViewed) {
        fetch(`/api/views/${slug}`, { method: 'POST' })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              sessionStorage.setItem(`viewed-${slug}`, 'true')
              // Re-fetch updated count
              fetch(`/api/views/${slug}`)
                .then((res) => res.json())
                .then((data) => {
                  if (data.count > views) {
                    setViews(data.count)
                    setIsUpdated(true)
                    setTimeout(() => setIsUpdated(false), 2000)
                  }
                })
                .catch(() => {})
            }
          })
          .catch((error) => {
            console.error('Error updating view count:', error)
          })
      }
    }
  }, [slug, trackView])

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
