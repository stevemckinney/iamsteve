'use client'

import {
  Showcase,
  ShowcaseBlock,
  ShowcaseStack,
  CodeExample,
} from './_showcase'
import {
  Star,
  Pencil,
  Terminal,
  Envelope,
  Cursor,
  Figma,
} from '@/components/illustration'

export default function IllustrationSection() {
  return (
    <Showcase
      title="Illustrations"
      description="SVG illustration components with a theming system for fill and stroke colours. Supports default (warm) and cool variants."
    >
      <ShowcaseBlock title="Illustration tokens">
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'fill-foreground', var: 'var(--fill-foreground)' },
              { name: 'fill-surface', var: 'var(--fill-surface)' },
              { name: 'fill-surface-100', var: 'var(--fill-surface-100)' },
              { name: 'fill-surface-150', var: 'var(--fill-surface-150)' },
              { name: 'fill-lowlight', var: 'var(--fill-lowlight)' },
              { name: 'fill-subtle', var: 'var(--fill-subtle)' },
              { name: 'fill-muted', var: 'var(--fill-muted)' },
              { name: 'fill-border', var: 'var(--fill-border)' },
            ].map((token) => (
              <div key={token.name} className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-xs shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)] shrink-0"
                  style={{ backgroundColor: token.var }}
                />
                <span className="font-mono text-2xs text-body-80 truncate">
                  {token.name}
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border-light">
            {[
              { name: 'stroke-foreground', var: 'var(--stroke-foreground)' },
              { name: 'stroke-surface', var: 'var(--stroke-surface)' },
              { name: 'stroke-lowlight', var: 'var(--stroke-lowlight)' },
              { name: 'stroke-border', var: 'var(--stroke-border)' },
              { name: 'stroke-muted', var: 'var(--stroke-muted)' },
              { name: 'stroke-subtle', var: 'var(--stroke-subtle)' },
              { name: 'stroke-accent', var: 'var(--stroke-accent)' },
              { name: 'stroke-highlight', var: 'var(--stroke-highlight)' },
            ].map((token) => (
              <div key={token.name} className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-xs shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)] shrink-0"
                  style={{ backgroundColor: token.var }}
                />
                <span className="font-mono text-2xs text-body-80 truncate">
                  {token.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Examples">
        <div className="flex flex-wrap gap-6 items-end">
          {[
            { Component: Star, name: 'Star' },
            { Component: Pencil, name: 'Pencil' },
            { Component: Terminal, name: 'Terminal' },
            { Component: Envelope, name: 'Envelope' },
            { Component: Cursor, name: 'Cursor' },
            { Component: Figma, name: 'Figma' },
          ].map(({ Component, name }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <Component width={64} height={64} />
              <span className="font-mono text-2xs text-body-60">{name}</span>
            </div>
          ))}
        </div>
      </ShowcaseBlock>

      <ShowcaseStack>
        <ShowcaseStack.Docs>
          <p className="text-sm text-body-80">
            Each illustration uses CSS custom properties for fill and stroke
            colours, enabling both warm (default) and cool theme variants.
          </p>
          <p className="text-sm text-body-80">
            Available: Brush, Colour, Component, Cursor, Envelope, Figma, Pen,
            PencilMono, Pencil, RulerMono, Safari, Sharpener, Star, Sticky,
            Terminal, Type
          </p>
        </ShowcaseStack.Docs>
        <ShowcaseStack.Usage>
          <CodeExample>{`import { Pencil, Star, Terminal } from '@/components/illustration'

<Pencil />
<Star />
<Terminal />`}</CodeExample>
        </ShowcaseStack.Usage>
      </ShowcaseStack>
    </Showcase>
  )
}
