'use client'

import { useState } from 'react'
import {
  Showcase,
  ShowcaseBlock,
  ShowcaseStack,
  VariantToggle,
  CodeExample,
} from './_showcase'
import PropsTable from './props-table'
import Badge from '@/components/badge'

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

const sizeOptions = [
  { id: '16', label: '16' },
  { id: '24', label: '24' },
]

export default function BadgeSection() {
  const [size, setSize] = useState('16')

  return (
    <Showcase
      title="Badge"
      description="Icon badge with text label. Supports link and static variants with themed colours."
    >
      <ShowcaseStack>
        <ShowcaseStack.Preview>
          <div className="flex flex-col gap-4 w-full">
            <VariantToggle
              label="Size"
              options={sizeOptions}
              value={size}
              onChange={setSize}
            />
            <div className="flex flex-wrap gap-4">
              {themes.map((theme, i) => (
                <Badge
                  key={theme}
                  theme={theme}
                  iconStart={icons[i]}
                  size={Number(size)}
                >
                  {theme}
                </Badge>
              ))}
            </div>
          </div>
        </ShowcaseStack.Preview>
        <ShowcaseStack.Docs>
          <PropsTable
            props={[
              {
                name: 'children',
                type: 'ReactNode',
                description: 'Label text',
              },
              {
                name: 'theme',
                type: 'string',
                default: "'cornflour'",
                description:
                  'Colour theme: rio, dandelion, lavender, magenta, grass, fern, moss, neutral-01, neutral-02, cornflour, text',
              },
              {
                name: 'size',
                type: '16 | 24',
                default: '16',
                description: 'Icon and badge size',
              },
              {
                name: 'iconStart',
                type: 'string',
                description: 'Icon name from the sprite system',
              },
              {
                name: 'href',
                type: 'string',
                description: 'Makes the badge a link',
              },
              {
                name: 'className',
                type: 'string',
                description: 'Additional CSS classes',
              },
            ]}
          />
        </ShowcaseStack.Docs>
        <ShowcaseStack.Usage>
          <CodeExample>{`<Badge theme="rio" iconStart="pen" size={16} href="/category/design">
  Design
</Badge>`}</CodeExample>
        </ShowcaseStack.Usage>
      </ShowcaseStack>

      <ShowcaseBlock title="As link">
        <div className="flex gap-4">
          <Badge theme="rio" iconStart="pen" size={16} href="/category/design">
            Design
          </Badge>
          <Badge
            theme="dandelion"
            iconStart="code"
            size={16}
            href="/category/code"
          >
            Code
          </Badge>
        </div>
      </ShowcaseBlock>
    </Showcase>
  )
}
