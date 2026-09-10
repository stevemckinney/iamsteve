'use client'

import {
  MenuTrigger,
  Button,
  Popover,
  Menu,
  MenuItem,
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import Icon from '@/components/icon'
import Sheet from '@/components/sheet'
import { fieldStyle } from '@/components/search-field'

// The category or collection list folded behind a button. The list is the
// same whichever container holds it: a sheet from the bottom edge for small
// screens, or a popover under the button where there is room for one. The
// item the page is on is marked in the list. The button carries only its
// label, as half a row does not fit an icon beside the longer ones.
export default function Topics({
  items,
  current,
  label,
  icon,
  container = 'sheet',
  className,
}) {
  const sheet = container === 'sheet'

  const list = (
    <Menu
      aria-label={label}
      className={cn(
        'flex flex-col gap-px outline-none',
        // Two plus the item's four lines the icons up with the title's
        sheet ? 'px-2' : 'p-1 max-h-[inherit]'
      )}
    >
      {items.map((item) => (
        <MenuItem
          key={item.slug}
          id={item.slug}
          href={item.slug}
          textValue={item.title}
          data-current={item.slug === current || undefined}
          className={cn(
            'flex items-center rounded-xs cursor-pointer select-none outline-none',
            'font-ui lowercase text-body',
            sheet ? 'gap-3 px-4 py-3 text-xl' : 'gap-2 px-2 py-2 text-base',
            // After the size: tailwind-merge drops a leading that precedes a text size
            'leading-none',
            'data-[focused]:bg-surface-02 data-[focused]:text-heading data-[current]:text-heading',
            'data-[focus-visible]:ring-2 data-[focus-visible]:ring-inset data-[focus-visible]:ring-cornflour-600 dark:data-[focus-visible]:ring-fern-400'
          )}
        >
          <Icon
            icon={item.icon}
            size={24}
            variant="header"
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
  )

  return (
    <MenuTrigger>
      <Button className={cn(fieldStyle, 'cursor-pointer', className)}>
        <span className="truncate">{label}</span>
        <Icon
          icon="angle-down"
          size={16}
          variant="header"
          className="ml-auto shrink-0"
          aria-hidden="true"
        />
      </Button>
      {sheet ? (
        <Sheet title={label} icon={icon}>
          {list}
        </Sheet>
      ) : (
        <Popover
          placement="bottom start"
          className={cn(
            'min-w-(--trigger-width) overflow-hidden rounded bg-surface dark:bg-fern-1200 shadow-picked',
            'transition-opacity duration-200 ease-out motion-reduce:transition-none',
            'data-[entering]:opacity-0 data-[exiting]:opacity-0'
          )}
        >
          {list}
        </Popover>
      )}
    </MenuTrigger>
  )
}
