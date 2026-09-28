'use client'

import { Showcase, ShowcaseBlock, ShowcaseStack } from './_showcase'
import PropsTable from './props-table'
import Placeholder from '@/components/placeholder'

export default function PlaceholderSection() {
  return (
    <Showcase
      title="Placeholder"
      description="Generates deterministic coloured placeholder images for posts without a featured image. The colour is seeded from the slug hash so it\u2019s consistent."
    >
      <ShowcaseBlock title="Rendered examples">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { slug: 'getting-started-with-flexbox', category: 'Code' },
            { slug: 'colour-contrast-guide', category: 'Design' },
            { slug: 'responsive-typography', category: 'Code' },
          ].map((item) => (
            <Placeholder
              key={item.slug}
              slug={item.slug}
              category={item.category}
              alt={`${item.category} placeholder`}
              width={384}
              height={240}
              className="rounded-sm overflow-hidden"
            />
          ))}
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Colour palette">
        <div className="flex gap-2">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-xs shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]"
              style={{ backgroundColor: `var(--placeholder-color-${i})` }}
              title={`--placeholder-color-${i}`}
            />
          ))}
        </div>
      </ShowcaseBlock>

      <ShowcaseStack>
        <ShowcaseStack.Docs>
          <PropsTable
            props={[
              {
                name: 'category',
                type: "'Design' | 'Code'",
                description: 'Determines which default SVG image to show',
              },
              {
                name: 'slug',
                type: 'string',
                description:
                  'Post slug, used to generate a deterministic colour',
              },
              { name: 'alt', type: 'string', description: 'Image alt text' },
              {
                name: 'width',
                type: 'number',
                default: '384',
                description: 'Image width',
              },
              {
                name: 'height',
                type: 'number',
                default: '240',
                description: 'Image height',
              },
              {
                name: 'href',
                type: 'string',
                description: 'Makes the placeholder a link',
              },
              {
                name: 'className',
                type: 'string',
                description: 'Additional CSS classes',
              },
            ]}
          />
        </ShowcaseStack.Docs>
      </ShowcaseStack>
    </Showcase>
  )
}
