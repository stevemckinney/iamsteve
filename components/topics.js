'use client'

import { useRef, useState } from 'react'
import {
  MenuTrigger,
  Button,
  Popover,
  Menu,
  MenuItem,
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import Icon from '@/components/icon'
import { fieldStyle } from '@/components/search-field'

// The category or collection list folded into a menu for small screens. The
// item the page is on is marked in the list rather than named in the trigger,
// as half a row does not fit the longer names.
export default function Topics({ items, current, label, icon, className }) {
  const button = useRef(null)
  // Measured on open so the menu is never narrower than its trigger
  const [minWidth, setMinWidth] = useState(0)

  return (
    <MenuTrigger
      onOpenChange={(open) => open && setMinWidth(button.current.offsetWidth)}
    >
      <Button
        ref={button}
        className={cn(fieldStyle, 'cursor-pointer', className)}
      >
        <Icon icon={icon} size={24} variant="header" aria-hidden="true" />
        <span className="truncate">{label}</span>
        <Icon
          icon="angle-down"
          size={16}
          variant="header"
          className="ml-auto shrink-0"
          aria-hidden="true"
        />
      </Button>
      <Popover
        placement="bottom start"
        style={{ minWidth }}
        className={cn(
          'overflow-hidden rounded bg-surface dark:bg-fern-1200 shadow-picked',
          'transition-opacity duration-200 ease-out motion-reduce:transition-none',
          'data-[entering]:opacity-0 data-[exiting]:opacity-0'
        )}
      >
        <Menu
          aria-label={label}
          className="flex flex-col gap-px p-1 max-h-[inherit] overflow-auto outline-none"
        >
          {items.map((item) => (
            <MenuItem
              key={item.slug}
              id={item.slug}
              href={item.slug}
              textValue={item.title}
              data-current={item.slug === current || undefined}
              className={cn(
                'flex items-center gap-2 px-2 py-2 rounded-xs cursor-pointer select-none outline-none',
                'text-base font-ui lowercase leading-none text-body',
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
      </Popover>
    </MenuTrigger>
  )
}
