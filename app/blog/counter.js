'use client'

import { useEffect, useState } from 'react'
import Increment from './increment'

const ViewCounter = ({ slug, allViews, trackView }) => {
  const viewsForSlug = allViews && allViews.find((view) => view.slug === slug)
  const number = new Number(viewsForSlug?.view_count || 0)

  useEffect(() => {
    let isIncremented = true

    if (trackView & isIncremented) Increment(slug)

    return () => (isIncremented = false)
  }, [slug, trackView])

  return (
    <>
      <p className="text-neutral-600 dark:text-neutral-400">{`${number.toLocaleString()} views`}</p>
    </>
  )
}

export default ViewCounter
