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
import Icon from '@/components/icon'

const variantOptions = [
  { id: 'default', label: 'Default' },
  { id: 'header', label: 'Header' },
  { id: 'on-light', label: 'On light' },
  { id: 'none', label: 'None' },
]

export default function IconComponentSection() {
  const [variant, setVariant] = useState('default')

  return (
    <Showcase
      title="Icon"
      description="SVG sprite-based icon component. References icons from the generated sprite sheets."
    >
      <ShowcaseStack>
        <ShowcaseStack.Preview className="flex-col gap-4">
          <VariantToggle
            label="Variant"
            options={variantOptions}
            value={variant}
            onChange={setVariant}
          />
          <div className="flex gap-8 items-center">
            {['star', 'pen', 'code', 'arrow-right', 'external'].map((icon) => (
              <div key={icon} className="flex flex-col items-center gap-2">
                <div
                  className={
                    variant === 'on-light'
                      ? 'bg-fern-800 p-3 rounded-sm'
                      : 'p-3'
                  }
                >
                  <Icon
                    icon={icon}
                    size={24}
                    variant={variant}
                    className={variant === 'none' ? 'text-heading' : ''}
                  />
                </div>
                <span className="text-2xs font-mono text-body-60">{icon}</span>
              </div>
            ))}
          </div>
        </ShowcaseStack.Preview>
        <ShowcaseStack.Docs>
          <PropsTable
            props={[
              {
                name: 'icon',
                type: 'string',
                description: 'Icon name (filename without extension)',
              },
              {
                name: 'size',
                type: '16 | 24',
                default: '24',
                description: 'Icon size, must match the sprite folder',
              },
              {
                name: 'variant',
                type: "'default' | 'header' | 'on-light' | 'none'",
                default: "'default'",
                description:
                  'Colour variant controlling fill via CSS variables',
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
          <CodeExample>{`import Icon from '@/components/icon'

<Icon icon="star" size={24} />
<Icon icon="arrow-right" size={16} variant="header" />`}</CodeExample>
        </ShowcaseStack.Usage>
      </ShowcaseStack>

      <ShowcaseBlock title="Aliases">
        <p className="text-sm text-body-80">
          Some icon names are aliased:{' '}
          <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
            everything
          </code>
          ,{' '}
          <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
            archive
          </code>
          ,{' '}
          <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
            all
          </code>{' '}
          &rarr;{' '}
          <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
            folder
          </code>
          ;{' '}
          <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
            design
          </code>{' '}
          &rarr;{' '}
          <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
            pen
          </code>
        </p>
      </ShowcaseBlock>
    </Showcase>
  )
}
