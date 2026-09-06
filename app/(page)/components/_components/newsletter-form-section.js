'use client'

import { Showcase, ShowcaseStack, CodeExample } from './_showcase'
import PropsTable from './props-table'
import NewsletterForm from '@/components/newsletter-form'

export default function NewsletterFormSection() {
  return (
    <Showcase
      title="NewsletterForm"
      description="Email subscription form with name and email fields. Uses container queries for responsive layout."
    >
      <ShowcaseStack>
        <ShowcaseStack.Preview className="flex-col">
          <NewsletterForm unique="demo" initialCount={700} />
        </ShowcaseStack.Preview>
        <ShowcaseStack.Docs>
          <PropsTable
            props={[
              {
                name: 'className',
                type: 'string',
                default: "'w-full'",
                description: 'Container CSS classes',
              },
              {
                name: 'unique',
                type: 'string',
                default: "'footer'",
                description:
                  'Unique identifier for input IDs (prevents collisions when multiple forms exist)',
              },
              {
                name: 'initialCount',
                type: 'number',
                default: '700',
                description: 'Subscriber count to display',
              },
            ]}
          />
        </ShowcaseStack.Docs>
        <ShowcaseStack.Usage>
          <CodeExample>{`import NewsletterForm from '@/components/newsletter-form'

<NewsletterForm unique="sidebar" />

{/* The Newsletter async wrapper fetches the real subscriber count */}
import Newsletter from '@/components/newsletter'
<Newsletter unique="footer" />`}</CodeExample>
        </ShowcaseStack.Usage>
      </ShowcaseStack>
    </Showcase>
  )
}
