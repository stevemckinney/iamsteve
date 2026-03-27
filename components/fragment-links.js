'use client'

import { useEffect } from 'react'

export default function FragmentLinks() {
  useEffect(() => {
    function handleClick(e) {
      const heading = e.target.closest('h2, h3, h4, h5, h6')
      if (!heading?.id) return

      history.replaceState(null, '', `#${heading.id}`)
      navigator.clipboard?.writeText(window.location.href)
    }

    const fragments = document.querySelectorAll('.fragment')
    fragments.forEach((el) => {
      el.style.cursor = 'pointer'
      el.addEventListener('click', handleClick)
    })

    return () => {
      fragments.forEach((el) => {
        el.removeEventListener('click', handleClick)
      })
    }
  }, [])

  return null
}
