'use client'

import { Showcase, ShowcaseStack, CodeExample } from './_showcase'
import PropsTable from './props-table'
import Button from '@/components/button'

export default function ButtonSection() {
  return (
    <Showcase
      title="Button"
      description="Flexible button component that renders as a button, internal link, or external link depending on the href prop."
    >
      <ShowcaseStack>
        <ShowcaseStack.Preview className="gap-4">
          <Button theme="dandelion" className="px-6 py-3 rounded-sm">
            Button
          </Button>
          <Button theme="dandelion" className="px-6 py-3 rounded-sm" href="/">
            Internal link
          </Button>
          <Button
            theme="dandelion"
            className="px-6 py-3 rounded-sm"
            href="#button"
          >
            Anchor link
          </Button>
        </ShowcaseStack.Preview>
        <ShowcaseStack.Docs>
          <PropsTable
            props={[
              {
                name: 'children',
                type: 'ReactNode',
                description: 'Button content',
              },
              {
                name: 'href',
                type: 'string',
                description:
                  'Internal path, anchor, or external URL. Determines rendered element.',
              },
              {
                name: 'theme',
                type: 'string',
                description: "Visual style variant (e.g. 'dandelion')",
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
          <CodeExample>{`<Button theme="dandelion" className="px-6 py-3 rounded-sm">
  Subscribe
</Button>

<Button theme="dandelion" href="/newsletter">
  Go to newsletter
</Button>`}</CodeExample>
        </ShowcaseStack.Usage>
      </ShowcaseStack>
    </Showcase>
  )
}
