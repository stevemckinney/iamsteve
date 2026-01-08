'use client'

import { useEffect, useRef } from 'react'

export function ColumnBrowser({ children }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth,
        behavior: 'smooth',
      })
    }
  }, [children])

  return (
    <div ref={scrollRef} className="flex flex-1 overflow-x-auto">
      {children}
    </div>
  )
}
