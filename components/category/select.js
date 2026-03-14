'use client'
import {
  Select,
  SelectValue,
  Button,
  Popover,
  ListBox,
  ListBoxItem,
} from 'react-aria-components'

const Selector = ({ categories }) => {
  return (
    <Select defaultSelectedKey="design" aria-label="Category">
      <Button className="lowercase text-inherit flex items-center gap-1">
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>

      <Popover className="bg-surface p-2 rounded-lg shadow-lg">
        <ListBox className="outline-none">
          {categories.map((category) => {
            if (category.exclude) return null
            return (
              <ListBoxItem
                key={category.slug}
                id={category.slug}
                isDisabled={category.title === 'Design'}
                className="relative flex items-center px-8 py-2 rounded-md text-lg font-ui lowercase text-body font-medium focus:bg-surface-02 data-[disabled]:opacity-50 outline-none select-none cursor-pointer"
              >
                {({ isSelected }) => (
                  <>
                    {isSelected && (
                      <span className="absolute left-2 inline-flex items-center">
                        ✓
                      </span>
                    )}
                    {category.title}
                  </>
                )}
              </ListBoxItem>
            )
          })}
        </ListBox>
      </Popover>
    </Select>
  )
}

export default Selector
