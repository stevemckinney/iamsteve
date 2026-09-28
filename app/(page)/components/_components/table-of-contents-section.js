'use client'

import { Showcase, ShowcaseStack, CodeExample } from './_showcase'
import PropsTable from './props-table'
import Collapsible from '@/components/table-of-contents/collapsible'

const demoHeadings = [
  { level: 'two', text: 'Getting started', slug: 'getting-started' },
  { level: 'three', text: 'Installation', slug: 'installation' },
  { level: 'three', text: 'Configuration', slug: 'configuration' },
  { level: 'two', text: 'Usage', slug: 'usage' },
  { level: 'three', text: 'Basic example', slug: 'basic-example' },
  { level: 'two', text: 'API reference', slug: 'api-reference' },
]

const demoNestedHeadings = [
  {
    level: 'two',
    text: 'Getting started',
    slug: 'getting-started',
    url: '',
    children: [
      { level: 'three', text: 'Installation', slug: 'installation', url: '' },
      { level: 'three', text: 'Configuration', slug: 'configuration', url: '' },
    ],
  },
  {
    level: 'two',
    text: 'Usage',
    slug: 'usage',
    url: '',
    children: [
      { level: 'three', text: 'Basic example', slug: 'basic-example', url: '' },
    ],
  },
  {
    level: 'two',
    text: 'API reference',
    slug: 'api-reference',
    url: '',
    children: [],
  },
]

export default function TableOfContentsSection() {
  return (
    <Showcase
      title="Table of contents"
      description="Collapsible table of contents with sticky behaviour. Uses IntersectionObserver to highlight the active heading and smooth-scrolls to sections."
    >
      <ShowcaseStack>
        <ShowcaseStack.Preview className="flex-col">
          <div className="max-w-sm">
            <Collapsible
              nestedHeadings={demoNestedHeadings}
              headings={demoHeadings}
              open={true}
            />
          </div>
        </ShowcaseStack.Preview>
        <ShowcaseStack.Docs>
          <ul className="text-sm text-body-80 list-inside list-[square] flex flex-col gap-1">
            <li>
              Sticky positioning with scroll detection via useSyncExternalStore
            </li>
            <li>Collapsible on mobile, always visible on desktop</li>
            <li>Active heading tracking with IntersectionObserver</li>
            <li>Nested heading hierarchy (h2 with h3 children)</li>
            <li>Branch-line indicators for visual hierarchy</li>
            <li>Backdrop blur when sticky on mobile</li>
          </ul>
          <PropsTable
            props={[
              {
                name: 'nestedHeadings',
                type: 'array',
                description:
                  'Hierarchical heading structure from createNestedHeadings()',
              },
              {
                name: 'headings',
                type: 'array',
                description: 'Flat list of all headings',
              },
              {
                name: 'open',
                type: 'boolean',
                default: 'false',
                description: 'Initial open/closed state',
              },
            ]}
          />
        </ShowcaseStack.Docs>
        <ShowcaseStack.Usage>
          <CodeExample>{`import { Collapsible } from '@/components/table-of-contents'
import { createNestedHeadings } from '@/components/table-of-contents/create-nested-headings'

const nested = createNestedHeadings(post.headings)

<Collapsible
  nestedHeadings={nested}
  headings={post.headings}
/>`}</CodeExample>
        </ShowcaseStack.Usage>
      </ShowcaseStack>
    </Showcase>
  )
}
