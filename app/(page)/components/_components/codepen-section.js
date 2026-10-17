'use client'

import { Showcase, ShowcaseStack, CodeExample } from './_showcase'
import PropsTable from './props-table'

export default function CodePenSection() {
  return (
    <Showcase
      title="CodePen"
      description="Embeds CodePen pens as iframes. Replaces the external CodePen embed script for better reliability."
    >
      <ShowcaseStack>
        <ShowcaseStack.Docs>
          <PropsTable
            props={[
              {
                name: 'slug',
                type: 'string',
                description: 'CodePen pen ID (required)',
              },
              {
                name: 'user',
                type: 'string',
                default: "'stevemckinney'",
                description: 'CodePen username',
              },
              {
                name: 'height',
                type: 'number',
                default: '520',
                description: 'Iframe height in pixels',
              },
              {
                name: 'defaultTab',
                type: 'string',
                default: "'result'",
                description: "Default tab: 'result', 'html', 'css', 'js'",
              },
              {
                name: 'themeId',
                type: 'string',
                default: "'23161'",
                description: 'CodePen theme ID',
              },
              {
                name: 'title',
                type: 'string',
                default: "'CodePen'",
                description: 'Accessible iframe title',
              },
              {
                name: 'editable',
                type: 'boolean',
                default: 'false',
                description: 'Whether the embed is editable',
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
          <CodeExample>{`<CodePen
  slug="b513dec968b7749537ccbb8fd951532d"
  title="Lazy loading images"
  height={468}
  themeId="31700"
  editable={true}
/>`}</CodeExample>
        </ShowcaseStack.Usage>
      </ShowcaseStack>
    </Showcase>
  )
}
