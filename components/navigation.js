'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { DialogTrigger, Button, Popover } from 'react-aria-components'
import clsx from 'clsx'

import { mobile } from '@/content/navigation'

// components
import Link from '@/components/link'
import Icon from '@/components/icon'

const Toggle = () => {
  return (
    <div className="relative before:z-1 before:-inset-10 before:absolute">
      <span className="block w-[24px] h-[24px] relative">
        <span
          className={`h-[2px] w-[20px] bg-emphasis block rounded absolute`}
        ></span>
        <span
          className={`h-[2px] w-[16px] bg-emphasis block rounded absolute`}
        ></span>
        <span
          className={`h-[2px] w-[20px] bg-emphasis block rounded absolute `}
        ></span>
      </span>
    </div>
  )
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        className="toggle-nav md:hidden"
        aria-label="Toggle navigation menu"
        data-state={isOpen ? 'open' : 'closed'}
      >
        <Toggle />
      </Button>
      <Popover
        placement="bottom"
        offset={16}
        containerPadding={12}
        className={clsx(
          'w-[calc(100vw-1.5rem)] shadow-placed bg-[light-dark(rgb(255_255_255/.90),color-mix(in_oklab,var(--color-fern-1200),transparent_20%))] backdrop-blur-md backdrop-filter backdrop-contrast-200 backdrop-saturate-100 flex flex-col rounded-lg z-200 p-6 outline-none',
          'transition-all duration-300 ease-in-out',
          'data-[entering]:opacity-0 data-[exiting]:opacity-0',
          'max-h-[calc(100dvh-4rem)] overflow-y-auto'
        )}
      >
        <ul className="flex flex-col gap-2">
          {mobile.map((link, index) => (
            <ListItem
              href={link.href}
              key={link.href}
              isOpen={isOpen}
              index={index}
              className={clsx(
                pathname === link.href
                  ? 'text-dandelion-500 dark:text-dandelion-300'
                  : 'text-emphasis'
              )}
            >
              <Icon
                icon={link.icon}
                size={link.size}
                className={clsx(
                  'relative -top-px',
                  pathname === link.href
                    ? 'text-dandelion-500 dark:text-dandelion-300'
                    : 'text-neutral-03-500 dark:text-fern-500'
                )}
                variant="header"
              />
              {link.title}
            </ListItem>
          ))}
          <ListItem
            href="/newsletter"
            isOpen={isOpen}
            index={mobile.length}
            className={clsx(
              pathname === '/newsletter'
                ? 'text-dandelion-500 dark:text-dandelion-300'
                : 'text-emphasis'
            )}
          >
            <Icon
              icon="airplane"
              className={clsx(
                'relative -top-px',
                pathname === '/newsletter'
                  ? 'text-dandelion-500 dark:text-dandelion-300'
                  : 'text-neutral-03-500 dark:text-fern-500'
              )}
              variant="header"
            />
            Subscribe
          </ListItem>
        </ul>
      </Popover>
    </DialogTrigger>
  )
}

const ListItem = ({ className, children, isOpen, index, href, ...props }) => (
  <li className="flex">
    <Link
      href={href}
      className={clsx(
        'flex shrink-0 basis-full gap-4 py-2.5 rounded-sm px-4 text-2xl font-ui items-center lowercase',
        'transition-all duration-300 ease-in-out',
        className
      )}
      style={{
        filter: `blur(${isOpen ? 0 : 8}px)`,
        transitionDelay: `${isOpen ? index * 50 : 0}ms`,
      }}
      {...props}
    >
      {children}
    </Link>
  </li>
)

export { Navigation, Toggle }
