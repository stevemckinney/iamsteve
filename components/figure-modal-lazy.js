'use client'
import dynamic from 'next/dynamic'

// Loads the lightbox, and motion with it, only where a figure uses it. Imported
// straight into a server component, it would ship with every post.
export const FigureModal = dynamic(() =>
  import('@/components/figure-modal').then((mod) => mod.FigureModal)
)
