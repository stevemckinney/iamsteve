'use client'

import { Showcase, ShowcaseStack } from './_showcase'
import PropsTable from './props-table'
import Chip from '@/components/chip'

const themes = [
  'rio',
  'dandelion',
  'lavender',
  'magenta',
  'grass',
  'fern',
  'moss',
  'neutral-01',
  'neutral-02',
  'cornflour',
]
const icons = [
  'pen',
  'code',
  'vector-square',
  'play',
  'css',
  'settings',
  'puzzle',
  'folder',
  'type',
  'palette',
]

export default function ChipSection() {
  return (
    <Showcase
      title="Chip"
      description="Compact tag-like component with icon and tinted background. Similar to Badge but with a filled background style."
    >
      <ShowcaseStack>
        <ShowcaseStack.Preview>
          <div className="flex flex-wrap gap-3">
            {themes.map((theme, i) => (
              <Chip key={theme} theme={theme} iconStart={icons[i]} size={16}>
                {theme}
              </Chip>
            ))}
          </div>
        </ShowcaseStack.Preview>
        <ShowcaseStack.Docs>
          <PropsTable
            props={[
              {
                name: 'children',
                type: 'ReactNode',
                description: 'Chip label text',
              },
              { name: 'theme', type: 'string', description: 'Colour theme' },
              {
                name: 'size',
                type: '16 | 24',
                default: '16',
                description: 'Icon size',
              },
              { name: 'iconStart', type: 'string', description: 'Icon name' },
              {
                name: 'href',
                type: 'string',
                description: 'Makes the chip a link',
              },
            ]}
          />
        </ShowcaseStack.Docs>
      </ShowcaseStack>
    </Showcase>
  )
}
