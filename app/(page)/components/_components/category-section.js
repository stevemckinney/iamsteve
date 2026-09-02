'use client'

import { Showcase, ShowcaseStack, CodeExample } from './_showcase'
import PropsTable from './props-table'
import Icon from '@/components/icon'

const categories = [
  { title: 'Design', theme: 'rio', icon: 'pen' },
  { title: 'Quick tip', theme: 'dandelion', icon: 'bolt' },
  { title: 'Typography', theme: 'neutral-02', icon: 'type' },
  { title: 'Colour', theme: 'cornflour', icon: 'palette' },
  { title: 'Resources', theme: 'fern', icon: 'settings' },
  { title: 'UX design', theme: 'grass', icon: 'cursor' },
  { title: 'Visual design', theme: 'lavender', icon: 'vector-square' },
  { title: 'Code', theme: 'dandelion', icon: 'code' },
  { title: 'Animation', theme: 'magenta', icon: 'play' },
  { title: 'CSS', theme: 'grass', icon: 'css' },
  { title: 'Patterns', theme: 'fern', icon: 'puzzle' },
  { title: 'JavaScript', theme: 'magenta', icon: 'note' },
]

export default function CategorySection() {
  return (
    <Showcase
      title="Category"
      description="Renders a category badge with its themed icon and colour. Looks up metadata from the categories content file."
    >
      <ShowcaseStack>
        <ShowcaseStack.Preview className="flex-col p-0!">
          <div className="rounded-sm overflow-hidden">
            {categories.map((cat, i) => (
              <div
                key={cat.title}
                className={`flex items-center gap-4 px-4 py-2 ${
                  i % 2 === 0 ? 'bg-surface' : 'bg-surface-02'
                }`}
              >
                <Icon
                  icon={cat.icon}
                  size={16}
                  variant="none"
                  className="text-heading shrink-0"
                />
                <span className="text-sm text-heading w-28">{cat.title}</span>
                <span className="font-mono text-2xs text-body-60">
                  {cat.theme}
                </span>
              </div>
            ))}
          </div>
        </ShowcaseStack.Preview>
        <ShowcaseStack.Docs>
          <PropsTable
            props={[
              {
                name: 'children',
                type: 'string',
                description: 'Category title (must match a categories entry)',
              },
              {
                name: 'size',
                type: '16 | 24',
                default: '16',
                description: 'Icon and badge size',
              },
              {
                name: 'badge',
                type: 'boolean',
                default: 'true',
                description: 'Render as badge (true) or plain link (false)',
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
          <CodeExample>{`import Category from '@/components/category'

{/* As a badge (default) */}
<Category>Design</Category>
<Category>Code</Category>

{/* As a plain link */}
<Category badge={false}>Typography</Category>

{/* Different sizes */}
<Category size={24}>Visual design</Category>`}</CodeExample>
        </ShowcaseStack.Usage>
      </ShowcaseStack>
    </Showcase>
  )
}
