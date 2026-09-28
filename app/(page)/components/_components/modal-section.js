'use client'

import { Showcase, ShowcaseStack, CodeExample } from './_showcase'
import PropsTable from './props-table'
import { Modal } from '@/components/modal'
import { Button as AriaButton } from 'react-aria-components'

export default function ModalSection() {
  return (
    <Showcase
      title="Modal"
      description="Accessible modal dialog using React Aria. Renders as an overlay with backdrop blur and scale animation."
    >
      <ShowcaseStack>
        <ShowcaseStack.Preview className="gap-4">
          <Modal
            content={({ close }) => (
              <div
                className="flex items-center justify-center h-full p-8"
                onClick={close}
              >
                <div
                  className="bg-surface rounded-lg shadow-floating p-8 max-w-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="font-display font-variation-bold text-xl lowercase text-heading mb-2">
                    Example modal
                  </h3>
                  <p className="text-body-80 text-sm mb-4">
                    This modal uses React Aria&rsquo;s DialogTrigger with
                    accessible focus management and keyboard navigation.
                  </p>
                  <AriaButton
                    onPress={close}
                    className="button-dandelion px-4 py-2 rounded-sm font-ui text-sm lowercase cursor-pointer"
                  >
                    Close
                  </AriaButton>
                </div>
              </div>
            )}
          >
            <AriaButton className="button-dandelion px-4 py-2 rounded-sm font-ui text-sm lowercase cursor-pointer">
              Open modal
            </AriaButton>
          </Modal>
        </ShowcaseStack.Preview>
        <ShowcaseStack.Docs>
          <PropsTable
            props={[
              {
                name: 'children',
                type: 'ReactNode',
                description: 'Trigger element (usually a Button)',
              },
              {
                name: 'content',
                type: '({ close }) => ReactNode',
                description:
                  'Render function for modal content, receives close callback',
              },
            ]}
          />
        </ShowcaseStack.Docs>
      </ShowcaseStack>
    </Showcase>
  )
}
