'use client'

import { useEffect, useState } from 'react'
import { Increment } from './increment'

const ViewCounter = ({
  slug,
  initialViews,
  trackView,
  className = 'text-fern-1100',
}) => {
  const [views, setViews] = useState(initialViews)
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    const incrementView = async () => {
      if (trackView) {
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

  return (
    <span
      className={`${className} ${
        isUpdated
          ? 'text-grass-500 transition-colors duration-1000 ease-out'
          : ''
      }`}
    >
      {`${views.toLocaleString()} views`}
    </span>
  )
}

export default ViewCounter
