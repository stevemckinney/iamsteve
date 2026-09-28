'use client'

import { Showcase, ShowcaseStack } from './_showcase'
import PropsTable from './props-table'
import Pagination from '@/components/pagination'

export default function PaginationSection() {
  return (
    <Showcase
      title="Pagination"
      description="Previous/next navigation for paginated content with a centred page counter."
    >
      <ShowcaseStack>
        <ShowcaseStack.Preview className="flex-col gap-6">
          <div className="w-full">
            <Pagination total={5} current={3} />
          </div>
        </ShowcaseStack.Preview>
        <ShowcaseStack.Docs>
          <PropsTable
            props={[
              {
                name: 'total',
                type: 'number',
                description: 'Total number of pages',
              },
              {
                name: 'current',
                type: 'number',
                description: 'Current page number',
              },
              {
                name: 'category',
                type: 'string',
                description:
                  'Optional category slug for category-filtered pagination',
              },
            ]}
          />
        </ShowcaseStack.Docs>
      </ShowcaseStack>
    </Showcase>
  )
}
