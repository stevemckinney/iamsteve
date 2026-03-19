'use client'

import { Suspense } from 'react'
import Sidebar from './_components/sidebar'
import MobileNavigation from './_components/mobile-navigation'
import { sectionComponents } from './_components/registry'
import { useActiveSection } from './_components/use-active-section'

export default function ComponentsPage() {
  const { activeSection, setActiveSection } = useActiveSection()
  const SectionComponent = sectionComponents[activeSection]

  return (
    <div className="col-content py-8 sm:py-18 flex flex-col gap-8">
      <header>
        <h1 className="font-display font-variation-bold text-4xl lowercase text-heading">
          Design system
        </h1>
        <p className="text-body-80 text-lg mt-2 max-w-prose">
          A comprehensive reference for the colour system, typography, spacing,
          and every component used across the site.
        </p>
      </header>

      <MobileNavigation
        activeSection={activeSection}
        onSelect={setActiveSection}
      />

      <div className="flex gap-12 relative">
        <aside className="hidden lg:block w-48 shrink-0">
          <Sidebar activeSection={activeSection} onSelect={setActiveSection} />
        </aside>

        <div className="flex flex-col min-w-0 flex-1">
          <Suspense
            fallback={
              <div className="flex flex-col gap-4 animate-pulse">
                <div className="h-8 w-48 bg-surface-02 rounded-sm" />
                <div className="h-4 w-96 bg-surface-02 rounded-sm" />
                <div className="h-64 bg-surface-02 rounded-lg" />
              </div>
            }
          >
            {SectionComponent && <SectionComponent />}
          </Suspense>
        </div>
      </div>
    </div>
  )
}
