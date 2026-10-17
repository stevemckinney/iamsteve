'use client'

import { Showcase, ShowcaseStack } from './_showcase'
import PropsTable from './props-table'

export default function LinkSection() {
  return (
    <Showcase
      title="Link"
      description="Smart link component that auto-detects internal paths, anchor links, and external URLs to render the appropriate element."
    >
      <ShowcaseStack>
        <ShowcaseStack.Preview className="gap-6">
          <span className="flex flex-col gap-1">
            <span className="text-2xs font-mono text-body-60">internal</span>
            <a href="/" className="text-link hover:text-link-hover">
              Home page
            </a>
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-2xs font-mono text-body-60">anchor</span>
            <a href="#link" className="text-link hover:text-link-hover">
              Jump to section
            </a>
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-2xs font-mono text-body-60">external</span>
            <span className="text-link">Opens in new tab &nearr;</span>
          </span>
        </ShowcaseStack.Preview>
        <ShowcaseStack.Docs>
          <PropsTable
            props={[
              {
                name: 'href',
                type: 'string',
                description:
                  'Internal path (/...), anchor (#...), or external URL',
              },
              {
                name: '...props',
                type: 'HTMLAttributes',
                description:
                  'All standard link/anchor attributes are forwarded',
              },
            ]}
          />
        </ShowcaseStack.Docs>
      </ShowcaseStack>
    </Showcase>
  )
}
