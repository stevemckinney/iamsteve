'use client'

import { useEffect, useRef } from 'react'

// Rebuilds the hero illustrations in 3D on large screens. The SVGs stay in the
// page as the layout and fallback; the scene measures them and hides them once ready.
export default function HeroScene() {
  const canvas = useRef(null)

  // Effect is needed here: WebGL, media queries and three.js live outside React
  useEffect(() => {
    const query = window.matchMedia('(min-width: 64rem)')
    let scene = null
    let cancelled = false

    const start = async () => {
      if (scene || !query.matches) return
      const { mount } = await import('@/lib/hero-scene')
      if (cancelled || scene || !query.matches) return
      scene = mount(canvas.current)
    }
    const stop = () => {
      scene?.dispose()
      scene = null
    }
    const change = () => (query.matches ? start() : stop())

    start()
    query.addEventListener('change', change)
    return () => {
      cancelled = true
      query.removeEventListener('change', change)
      stop()
    }
  }, [])

  return (
    <canvas
      ref={canvas}
      aria-hidden="true"
      className="absolute inset-0 size-full pointer-events-none drop-shadow-placed max-lg:hidden"
    />
  )
}
