'use client'

import Sidebar from './_components/sidebar'
import ColourPalette from './_components/colour-palette'
import TypographySection from './_components/typography-section'
import SpacingSection from './_components/spacing-section'
import ShadowsSection from './_components/shadows-section'
import IconsSection from './_components/icons-section'
import GridSection from './_components/grid-section'
import DarkModeSection from './_components/dark-mode-section'
import UtilitiesSection from './_components/utilities-section'
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
import {
  CategoryDemo,
  CodePenDemo,
  FigureDemo,
  ContactFormDemo,
  NewsletterFormDemo,
  SocialDemo,
  PlaceholderDemo,
  TableOfContentsDemo,
} from './_components/component-demos-extra'
import { MdxSection } from './_components/mdx-section'

export default function ComponentsPage() {
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

      <div className="flex gap-12 relative">
        <aside className="hidden lg:block w-48 shrink-0">
          <Sidebar />
        </aside>

        <article className="flex flex-col min-w-0 flex-1 gap-6 sm:gap-18 divide-y divide-subtle sm:divide-y-0 [&>*]:pt-6 sm:[&>*]:pt-0 [&>*:first-child]:pt-0">
          {/* ── Foundations ─────────────────────────────── */}
          <ColourPalette />
          <TypographySection />
          <SpacingSection />
          <ShadowsSection />
          <IconsSection />
          <GridSection />
          <DarkModeSection />
          <UtilitiesSection />

          {/* ── Components ──────────────────────────────── */}
          <BadgeDemo />
          <ButtonDemo />
          <CardDemo />
          <CategoryDemo />
          <ChatDemo />
          <ChipDemo />
          <CodePenDemo />
          <ContactFormDemo />
          <DateDemo />
          <FigureDemo />
          <IconDemo />
          <LinkDemo />
          <ModalDemo />
          <NewsletterFormDemo />
          <NotepadDemo />
          <PaginationDemo />
          <PlaceholderDemo />
          <SocialDemo />
          <TableOfContentsDemo />

          {/* ── MDX authoring ──────────────────────────── */}
          <MdxSection />

          {/* ── Patterns ────────────────────────────────── */}
          <IllustrationDemo />
        </article>
      </div>
    </div>
  )
}
