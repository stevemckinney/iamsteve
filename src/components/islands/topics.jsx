// components/topics.js: the category or collection list folded behind a
// button, in a sheet from the bottom edge. Next’s version could put the list
// in a popover instead, which no page asked for, so that isn’t ported
import { MenuTrigger, Button, Menu, MenuItem } from 'react-aria-components'
import { cn } from '@/lib/utils'
import { fieldStyle } from '../../lib/field-style.js'
import Icon from './icon.jsx'
import Locale from './locale.jsx'
import Sheet, { itemStyle } from './sheet.jsx'

// The item the page is on is marked in the list, and the button reads as a
// select would, showing that item, or the label where the page is on none.
export default function Topics({ items, current, label, icon, className }) {
  const chosen = items.find((item) => item.slug === current)

  return (
    <Locale>
      <MenuTrigger>
        <Button className={cn(fieldStyle, 'cursor-default', className)}>
          <Icon icon={icon} size={24} variant="header" aria-hidden="true" />
          <span className="truncate">{chosen ? chosen.title : label}</span>
          <Icon
            icon="angle-down"
            size={16}
            variant="header"
            className="ml-auto shrink-0"
            aria-hidden="true"
          />
        </Button>
        <Sheet title={label}>
          {/* Two plus the item’s four lines the icons up with the title’s */}
          <Menu
            aria-label={label}
            className="flex flex-col gap-px outline-none px-2"
          >
            {items.map((item) => (
              <MenuItem
                key={item.slug}
                id={item.slug}
                href={item.slug}
                textValue={item.title}
                data-current={item.slug === current || undefined}
                className={cn(
                  'cursor-pointer select-none outline-none',
                  itemStyle,
                  'text-emphasis data-[current]:text-nav-active',
                  'data-[focus-visible]:ring-2 data-[focus-visible]:ring-inset data-[focus-visible]:ring-cornflour-600 dark:data-[focus-visible]:ring-fern-400'
                )}
              >
                <Icon
                  icon={item.icon}
                  size={24}
                  variant="header"
                  className={cn(
                    'relative -top-px',
                    item.slug === current ? 'text-nav-active' : 'text-nav-icon'
                  )}
                  aria-hidden="true"
                />
                {item.title}
                {item.slug === current && (
                  <>
                    <span className="sr-only">, current page</span>
                    <Icon
                      icon="checkmark"
                      size={16}
                      variant="header"
                      className="ml-auto shrink-0"
                      aria-hidden="true"
                    />
                  </>
                )}
              </MenuItem>
            ))}
          </Menu>
        </Sheet>
      </MenuTrigger>
    </Locale>
  )
}
