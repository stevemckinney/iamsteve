'use client'

import { useState, useEffect, useCallback } from 'react'

export function useActiveSection(defaultSection = 'colours') {
  const [activeSection, setActiveSectionState] = useState(defaultSection)

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) setActiveSectionState(hash)

    const onHashChange = () => {
      const next = window.location.hash.slice(1)
      if (next) setActiveSectionState(next)
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const setActiveSection = useCallback((id) => {
    setActiveSectionState(id)
    history.replaceState(null, '', '#' + id)
  }, [])

  return { activeSection, setActiveSection }
}
