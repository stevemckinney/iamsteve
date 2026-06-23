'use client'

import { Showcase, ShowcaseStack } from './_showcase'
import PropsTable from './props-table'
import DateComponent from '@/components/date'

export default function DateSection() {
  return (
    <Showcase
      title="Date"
      description="Formats ISO date strings using date-fns. Supports absolute and relative formatting."
    >
      <ShowcaseStack>
        <ShowcaseStack.Preview className="gap-6 items-center">
          <div className="flex flex-col gap-1">
            <span className="text-2xs font-mono text-body-60">absolute</span>
            <DateComponent dateString="2024-03-14" className="text-heading" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xs font-mono text-body-60">relative</span>
            <DateComponent
              dateString="2024-03-14"
              relative
              className="text-heading"
            />
          </div>
        </ShowcaseStack.Preview>
        <ShowcaseStack.Docs>
          <PropsTable
            props={[
              {
                name: 'dateString',
                type: 'string',
                description: 'ISO date string (e.g. 2024-03-14)',
              },
              {
                name: 'relative',
                type: 'boolean',
                default: 'false',
                description: 'Show relative time instead of absolute date',
              },
              {
                name: 'className',
                type: 'string',
                default: "'date'",
                description: 'CSS class name',
              },
            ]}
          />
        </ShowcaseStack.Docs>
      </ShowcaseStack>
    </Showcase>
  )
}
