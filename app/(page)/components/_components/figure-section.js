'use client'

import { Showcase, ShowcaseStack, CodeExample } from './_showcase'
import PropsTable from './props-table'

const components = [
  {
    name: 'Figure',
    description: 'Wrapper with optional imageShadow and enlargeable props',
  },
  {
    name: 'Figcaption',
    description: 'Styled caption with mono font and tight tracking',
  },
  { name: 'Fig', description: 'Figure number label, renders as "Fig. X"' },
  {
    name: 'FigureModal',
    description: 'Wraps a figure to make it zoom-to-enlarge on click',
  },
]

export default function FigureSection() {
  return (
    <Showcase
      title="Figure"
      description="Figure component system for images in posts. Supports optional drop shadow, zoom-to-enlarge via modal, and figure numbering."
    >
      <ShowcaseStack>
        <ShowcaseStack.Preview className="flex-col p-0!">
          <div className="rounded-sm overflow-hidden">
            {components.map((comp, i) => (
              <div
                key={comp.name}
                className={`flex items-start gap-4 px-4 py-3 ${
                  i % 2 === 0 ? 'bg-surface' : 'bg-surface-02'
                }`}
              >
                <span className="font-mono text-xs text-heading w-32 shrink-0 pt-0.5">
                  {comp.name}
                </span>
                <span className="text-sm text-body-80">{comp.description}</span>
              </div>
            ))}
          </div>
        </ShowcaseStack.Preview>
        <ShowcaseStack.Docs>
          <PropsTable
            props={[
              {
                name: 'imageShadow',
                type: 'boolean',
                description: 'Adds drop-shadow-image to child images',
              },
              {
                name: 'enlargeable',
                type: 'boolean',
                description: 'Wraps in FigureModal for click-to-zoom',
              },
              {
                name: 'src',
                type: 'string',
                description: 'Image source URL (used by FigureModal)',
              },
              {
                name: 'alt',
                type: 'string',
                description: 'Image alt text (used by FigureModal)',
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
          <CodeExample>{`{/* In MDX posts */}
<Figure enlargeable src="/images/blog/example.png" alt="Example">
  <Image src="/images/blog/example.png" alt="Example" width={960} height={540} />
  <Figcaption>An example image with zoom</Figcaption>
</Figure>

{/* Figure numbering */}
<Fig>1</Fig> {/* Renders: "Fig. 1" */}`}</CodeExample>
        </ShowcaseStack.Usage>
      </ShowcaseStack>
    </Showcase>
  )
}
