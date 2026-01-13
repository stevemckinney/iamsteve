'use client'

import { useEffect, useState } from 'react'
import { Increment } from './increment'

const ViewCounter = ({
  slug,
  initialViews,
  trackView,
  className = 'text-emphasis',
}) => {
  const [views, setViews] = useState(initialViews)
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    const incrementView = async () => {
      if (
        trackView &&
        process.env.NEXT_PUBLIC_ENABLE_VIEW_COUNTING === 'true'
      ) {
        const hasViewed = sessionStorage.getItem(`viewed-${slug}`)
        if (!hasViewed) {
          try {
            const updatedViews = await Increment(slug)
            if (updatedViews !== null && updatedViews > views) {
              setViews(updatedViews)
              setIsUpdated(true)
              setTimeout(() => setIsUpdated(false), 2000)
              sessionStorage.setItem(`viewed-${slug}`, 'true')
            }
          } catch (error) {
            console.error('Error updating view count:', error)
          }
        }
      }
    }

    incrementView()
  }, [slug, trackView, views])

  if (process.env.NEXT_PUBLIC_ENABLE_VIEW_COUNTING !== 'true') {
    return null
  }

  return (
    <span
      className={`${className} ${
        isUpdated
          ? 'text-grass-500 dark:text-grass-300 transition-colors duration-1000 ease-out'
          : ''
      }`}
    >
      {`${views.toLocaleString()} views`}
    </span>
  )
}

export default ViewCounter
