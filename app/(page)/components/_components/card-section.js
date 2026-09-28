'use client'

import { Showcase, ShowcaseStack, CodeExample } from './_showcase'
import PropsTable from './props-table'
import Card from '@/components/card'

const dummyPost = {
  slug: 'how-to-use-colour-in-ui-design',
  date: '2025-11-20',
  title: 'How to use colour in UI design',
  summary:
    'A practical guide to choosing and applying colour palettes that work well across interfaces.',
  categories: ['Design'],
  _id: 'demo-card',
  lastmod: '2025-11-20',
  theme: '#f1e8e4',
  images: false,
  medium: null,
  tags: [],
}

export default function CardSection() {
  return (
    <Showcase
      title="Card"
      description="Content card with four size variants: container, large, medium, and small. Each renders a different layout optimised for the content area."
    >
      <ShowcaseStack>
        <ShowcaseStack.Preview className="flex-col gap-6">
          <div className="max-w-lg">
            <Card size="small" frontmatter={dummyPost} />
          </div>
        </ShowcaseStack.Preview>
        <ShowcaseStack.Docs>
          <PropsTable
            props={[
              {
                name: 'size',
                type: "'container' | 'large' | 'medium' | 'small'",
                description: 'Card layout variant',
              },
              {
                name: 'frontmatter',
                type: 'object',
                description:
                  'Post metadata: title, summary, slug, date, categories, etc.',
              },
              {
                name: 'image',
                type: 'object',
                description:
                  'Image data for the card (not used by small variant)',
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
          <CodeExample>{`import Card from '@/components/card'

// Card auto-selects the right layout based on size
<Card size="large" frontmatter={post} image={image} />
<Card size="medium" frontmatter={post} image={image} />
<Card size="small" frontmatter={post} />
<Card size="container" frontmatter={post} image={image} />`}</CodeExample>
        </ShowcaseStack.Usage>
      </ShowcaseStack>
    </Showcase>
  )
}
