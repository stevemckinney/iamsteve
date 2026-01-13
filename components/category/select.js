'use client'
import * as Select from '@radix-ui/react-select'

import Icon from '@/components/icon'

const Selector = ({ categories }) => {
  return (
    <Select.Root defaultValue="design">
      <Select.Trigger asChild aria-label="Category">
        <span className={`lowercase text-inherit`}>
          <Select.Value placeholder="Pick an option" />
          <Select.Icon />
        </span>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="bg-surface dark:bg-gray-800 p-2 rounded-lg shadow-lg">
          <Select.ScrollUpButton />
          <Select.Viewport>
            <Select.Item>
              <Select.ItemText />
              <Select.ItemIndicator />
            </Select.Item>

            <Select.Group>
              {categories.map((category, i) => {
                if (category.exclude) return
                return (
                  <Select.Item
                    disabled={category.title === 'Design'}
                    key={`${category.slug}`}
                    value={category.slug}
                    className={`relative flex items-center px-8 py-2 rounded-md text-lg font-ui lowercase text-gray-700 dark:text-gray-300 font-medium focus:bg-gray-100 dark:focus:bg-gray-900 radix-disabled:opacity-50 focus:outline-hidden select-none`}
                  >
                    <Select.ItemText>{category.title}</Select.ItemText>
                    <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                      icon
                    </Select.ItemIndicator>
                  </Select.Item>
                )
              })}
            </Select.Group>

            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default Select
