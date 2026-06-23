'use client'

import { Showcase, ShowcaseStack, CodeExample } from './_showcase'
import PropsTable from './props-table'
import Notepad from '@/components/notepad'

export default function NotepadSection() {
  return (
    <Showcase
      title="Notepad"
      description="Skeuomorphic notepad container with a dandelion header and paper body. Used for callouts and featured content."
    >
      <ShowcaseStack>
        <ShowcaseStack.Preview className="flex-col max-w-md">
          <Notepad>
            <Notepad.Header>Example notepad</Notepad.Header>
            <Notepad.Body>
              <p className="text-body text-sm">
                This is the notepad body with a decorative torn paper edge along
                the top.
              </p>
              <p className="text-body-80 text-sm">
                Great for callouts, tips, or featured content that needs to
                stand out.
              </p>
            </Notepad.Body>
          </Notepad>
        </ShowcaseStack.Preview>
        <ShowcaseStack.Docs>
          <PropsTable
            props={[
              {
                name: 'children',
                type: 'ReactNode',
                description: 'Notepad.Header and Notepad.Body components',
              },
              {
                name: 'className',
                type: 'string',
                description: 'Additional CSS classes on the wrapper',
              },
            ]}
          />
        </ShowcaseStack.Docs>
        <ShowcaseStack.Usage>
          <CodeExample>{`<Notepad>
  <Notepad.Header>Tips</Notepad.Header>
  <Notepad.Body>
    <p>Your content here</p>
  </Notepad.Body>
</Notepad>`}</CodeExample>
        </ShowcaseStack.Usage>
      </ShowcaseStack>
    </Showcase>
  )
}
