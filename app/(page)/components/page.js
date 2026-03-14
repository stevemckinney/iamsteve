'use client'

import Sidebar from './_components/sidebar'
import ColourPalette from './_components/colour-palette'
import TypographySection from './_components/typography-section'
import SpacingSection from './_components/spacing-section'
import ShadowsSection from './_components/shadows-section'
import IconsSection from './_components/icons-section'
import {
  BadgeDemo,
  ButtonDemo,
  CardDemo,
  ChatDemo,
  ChipDemo,
  DateDemo,
  IconDemo,
  LinkDemo,
  ModalDemo,
  NotepadDemo,
  PaginationDemo,
  IllustrationDemo,
} from './_components/component-demos'

export default function ComponentsPage() {
  return (
    <div className="col-content py-18 flex flex-col gap-8">
      <header>
        <h1 className="font-display font-variation-bold text-4xl lowercase text-heading">
          Design system
        </h1>
        <p className="text-body-80 text-lg mt-2 max-w-prose">
          A comprehensive reference for the colour system, typography, spacing,
          and every component used across the site.
        </p>
      </header>

      <div className="flex gap-12 relative">
        <aside className="hidden lg:block w-48 shrink-0">
          <Sidebar />
        </aside>

        <article className="flex flex-col gap-18 min-w-0 flex-1">
          {/* ── Foundations ─────────────────────────────── */}
          <ColourPalette />
          <TypographySection />
          <SpacingSection />
          <ShadowsSection />
          <IconsSection />

          {/* ── Components ──────────────────────────────── */}
          <BadgeDemo />
          <ButtonDemo />
          <CardDemo />
          <ChatDemo />
          <ChipDemo />
          <DateDemo />
          <IconDemo />
          <LinkDemo />
          <ModalDemo />
          <NotepadDemo />
          <PaginationDemo />

          {/* ── Patterns ────────────────────────────────── */}
          <IllustrationDemo />
        </article>
      </div>
    </div>
  )
}
