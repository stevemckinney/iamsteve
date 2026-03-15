'use client'

import { useState } from 'react'
import { TabList, TabPanel, Tab, Tabs } from 'react-aria-components'
import { cn } from '@/lib/utils'
import { Section, Subsection } from './section'

const primitives = {
  rio: {
    label: 'Rio',
    description: 'Warm orange, used for the Design category',
    steps: [0, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900],
  },
  dandelion: {
    label: 'Dandelion',
    description: 'Golden yellow, used for Code category and primary actions',
    steps: [0, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000],
  },
  fern: {
    label: 'Fern',
    description: 'Cool teal-green, the primary brand colour',
    steps: [
      0, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000, 1100,
      1200, 1300,
    ],
  },
  cornflour: {
    label: 'Cornflour',
    description: 'Bright blue, used for links and notices',
    steps: [
      0, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000, 1100,
    ],
  },
  grass: {
    label: 'Grass',
    description: 'Yellow-green, used for CSS and UX design categories',
    steps: [0, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900],
  },
  moss: {
    label: 'Moss',
    description: 'Forest green, a deeper natural green',
    steps: [0, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900],
  },
  lavender: {
    label: 'Lavender',
    description: 'Purple, used for Visual design category',
    steps: [
      0, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000, 1100,
    ],
  },
  magenta: {
    label: 'Magenta',
    description: 'Pink-magenta, used for Animation and JavaScript categories',
    steps: [0, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 750, 800, 900],
  },
  'neutral-01': {
    label: 'Neutral 01',
    description: 'Warm neutral (cream to brown), primary neutral palette',
    steps: [0, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900],
  },
  'neutral-02': {
    label: 'Neutral 02',
    description: 'Cool neutral (blue-grey), secondary neutral palette',
    steps: [0, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900],
  },
  'neutral-03': {
    label: 'Neutral 03',
    description: 'Green-grey neutral, used for code backgrounds',
    steps: [0, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900],
  },
}

const tokens = [
  {
    group: 'Content',
    items: [
      {
        name: '--color-heading',
        description: 'Main headings',
        variable: 'var(--color-heading)',
      },
      {
        name: '--color-body',
        description: 'Body text',
        variable: 'var(--color-body)',
      },
      {
        name: '--color-body-80',
        description: 'Body text at 80% opacity',
        variable: 'var(--color-body-80)',
      },
      {
        name: '--color-body-60',
        description: 'Body text at 60% opacity',
        variable: 'var(--color-body-60)',
      },
      {
        name: '--color-emphasis',
        description: 'Emphasised text',
        variable: 'var(--color-emphasis)',
      },
      {
        name: '--color-link',
        description: 'Link colour',
        variable: 'var(--color-link)',
      },
      {
        name: '--color-link-hover',
        description: 'Link hover colour',
        variable: 'var(--color-link-hover)',
      },
      {
        name: '--color-text-secondary',
        description: 'Secondary text',
        variable: 'var(--color-text-secondary)',
      },
      {
        name: '--color-text-tertiary',
        description: 'Tertiary text',
        variable: 'var(--color-text-tertiary)',
      },
      {
        name: '--color-text-inverse',
        description: 'Inverse text',
        variable: 'var(--color-text-inverse)',
      },
    ],
  },
  {
    group: 'Surfaces',
    items: [
      {
        name: '--color-canvas',
        description: 'Page background',
        variable: 'var(--color-canvas)',
      },
      {
        name: '--color-surface',
        description: 'Card/component backgrounds',
        variable: 'var(--color-surface)',
      },
      {
        name: '--color-surface-02',
        description: 'Elevated surface',
        variable: 'var(--color-surface-02)',
      },
      {
        name: '--color-surface-03',
        description: 'Higher elevation',
        variable: 'var(--color-surface-03)',
      },
      {
        name: '--color-surface-04',
        description: 'Highest elevation',
        variable: 'var(--color-surface-04)',
      },
      {
        name: '--color-surface-raised',
        description: 'Hover/raised state',
        variable: 'var(--color-surface-raised)',
      },
      {
        name: '--color-surface-pressed',
        description: 'Active/pressed state',
        variable: 'var(--color-surface-pressed)',
      },
    ],
  },
  {
    group: 'UI elements',
    items: [
      {
        name: '--color-subtle',
        description: 'Subtle backgrounds',
        variable: 'var(--color-subtle)',
      },
      {
        name: '--color-overlay',
        description: 'Modal/overlay backgrounds',
        variable: 'var(--color-overlay)',
      },
      {
        name: '--color-border-medium',
        description: 'Medium borders',
        variable: 'var(--color-border-medium)',
      },
      {
        name: '--color-border-strong',
        description: 'Strong borders',
        variable: 'var(--color-border-strong)',
      },
      {
        name: '--color-input',
        description: 'Form input backgrounds',
        variable: 'var(--color-input)',
      },
    ],
  },
  {
    group: 'Code',
    items: [
      {
        name: '--color-code-bg',
        description: 'Inline code background',
        variable: 'var(--color-code-bg)',
      },
      {
        name: '--color-code-text',
        description: 'Inline code text',
        variable: 'var(--color-code-text)',
      },
    ],
  },
  {
    group: 'Navigation',
    items: [
      {
        name: '--color-nav-active',
        description: 'Active navigation item',
        variable: 'var(--color-nav-active)',
      },
      {
        name: '--color-nav-icon',
        description: 'Navigation icon colour',
        variable: 'var(--color-nav-icon)',
      },
      {
        name: '--color-toc-active',
        description: 'Active TOC item',
        variable: 'var(--color-toc-active)',
      },
      {
        name: '--color-toc-branch',
        description: 'TOC branch lines',
        variable: 'var(--color-toc-branch)',
      },
    ],
  },
  {
    group: 'Notice',
    items: [
      {
        name: '--color-notice-bg',
        description: 'Notice background',
        variable: 'var(--color-notice-bg)',
      },
      {
        name: '--color-notice-text',
        description: 'Notice text',
        variable: 'var(--color-notice-text)',
      },
      {
        name: '--color-notice-muted',
        description: 'Notice muted text',
        variable: 'var(--color-notice-muted)',
      },
      {
        name: '--color-notice-icon',
        description: 'Notice icon',
        variable: 'var(--color-notice-icon)',
      },
    ],
  },
  {
    group: 'Tables',
    items: [
      {
        name: '--color-table',
        description: 'Table row background',
        variable: 'var(--color-table)',
      },
      {
        name: '--color-table-darker',
        description: 'Table alternate row',
        variable: 'var(--color-table-darker)',
      },
    ],
  },
  {
    group: 'Themed elements',
    items: [
      {
        name: '--color-rio',
        description: 'Themed rio',
        variable: 'var(--color-rio)',
      },
      {
        name: '--color-rio-hover',
        description: 'Themed rio hover',
        variable: 'var(--color-rio-hover)',
      },
      {
        name: '--color-dandelion',
        description: 'Themed dandelion',
        variable: 'var(--color-dandelion)',
      },
      {
        name: '--color-dandelion-hover',
        description: 'Themed dandelion hover',
        variable: 'var(--color-dandelion-hover)',
      },
      {
        name: '--color-cornflour',
        description: 'Themed cornflour',
        variable: 'var(--color-cornflour)',
      },
      {
        name: '--color-cornflour-hover',
        description: 'Themed cornflour hover',
        variable: 'var(--color-cornflour-hover)',
      },
    ],
  },
]

function Swatch({ color, step, name }) {
  const cssVar = `var(--color-${name}-${step})`
  const isDark = step >= 600

  return (
    <button
      type="button"
      className="group flex flex-col items-center gap-1.5"
      onClick={() => navigator.clipboard?.writeText(cssVar)}
      title={`Copy ${cssVar}`}
    >
      <div
        className={cn(
          'w-full aspect-square rounded-sm shadow-[var(--shadow-reduced),inset_0_0_0_1px_rgba(0,0,0,0.2)]',
          'transition-shadow duration-150 group-hover:shadow-[var(--shadow-picked),inset_0_0_0_1px_rgba(0,0,0,0.2)]'
        )}
        style={{ backgroundColor: cssVar }}
      />
      <span
        className={cn(
          'text-2xs font-mono tabular-nums',
          'text-body-60 group-hover:text-heading transition-colors'
        )}
      >
        {step}
      </span>
    </button>
  )
}

function TokenSwatch({ item }) {
  const isText =
    item.name.includes('text') ||
    item.name.includes('heading') ||
    item.name.includes('body') ||
    item.name.includes('link') ||
    item.name.includes('emphasis') ||
    item.name.includes('code-text') ||
    item.name.includes('notice-text') ||
    item.name.includes('notice-muted') ||
    item.name.includes('notice-icon') ||
    item.name.includes('nav') ||
    item.name.includes('toc') ||
    item.name.includes('counter')

  return (
    <button
      type="button"
      className="group flex items-center gap-3 py-2 px-3 rounded-sm hover:bg-surface-02/50 transition-colors"
      onClick={() => navigator.clipboard?.writeText(item.variable)}
      title={`Copy ${item.variable}`}
    >
      <div
        className="w-8 h-8 rounded-xs shadow-[var(--shadow-reduced),inset_0_0_0_1px_rgba(0,0,0,0.2)] shrink-0"
        style={
          isText
            ? { backgroundColor: item.variable }
            : { backgroundColor: item.variable }
        }
      />
      <div className="flex flex-col items-start text-left min-w-0">
        <span className="font-mono text-xs text-heading truncate max-w-full">
          {item.name.replace('--color-', '')}
        </span>
        <span className="text-2xs text-body-60">{item.description}</span>
      </div>
    </button>
  )
}

export default function ColourPalette() {
  return (
    <Section
      id="colours"
      title="Colours"
      description="A two-layer token system: primitives define raw colour scales, semantic tokens map them to purposes. Click any swatch to copy the CSS variable."
    >
      <Tabs className="flex flex-col gap-6">
        <TabList
          className="flex gap-1 bg-surface-02 p-1 rounded-sm w-fit"
          aria-label="Colour system layers"
        >
          <Tab
            id="primitives"
            className="px-4 py-2 text-sm font-display font-variation-bold lowercase rounded-xs cursor-pointer transition-colors duration-150 outline-none selected:bg-surface selected:shadow-reduced selected:text-heading text-body-80 hover:text-heading"
          >
            Primitives
          </Tab>
          <Tab
            id="tokens"
            className="px-4 py-2 text-sm font-display font-variation-bold lowercase rounded-xs cursor-pointer transition-colors duration-150 outline-none selected:bg-surface selected:shadow-reduced selected:text-heading text-body-80 hover:text-heading"
          >
            Tokens
          </Tab>
        </TabList>

        <TabPanel id="primitives" className="flex flex-col gap-8">
          {Object.entries(primitives).map(([name, palette]) => (
            <Subsection
              key={name}
              title={palette.label}
              description={palette.description}
            >
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(
                    palette.steps.length,
                    14
                  )}, minmax(0, 1fr))`,
                }}
              >
                {palette.steps.map((step) => (
                  <Swatch key={step} color={palette} step={step} name={name} />
                ))}
              </div>
            </Subsection>
          ))}
        </TabPanel>

        <TabPanel id="tokens" className="flex flex-col gap-8">
          {tokens.map((group) => (
            <Subsection key={group.group} title={group.group}>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-0.5">
                {group.items.map((item) => (
                  <TokenSwatch key={item.name} item={item} />
                ))}
              </div>
            </Subsection>
          ))}
        </TabPanel>
      </Tabs>
    </Section>
  )
}
