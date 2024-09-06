'use client'
import { useState, forwardRef } from 'react'
import { usePathname } from 'next/navigation'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'

import siteMetadata from '@/content/metadata'
import navigation from '@/content/navigation'

// components
import Link from '@/components/link'
import Icon from '@/components/icon'

const Toggle = () => {
  return (
    <div className="relative before:z-[1] before:-inset-10 before:absolute">
      <span className="block w-[24px] h-[24px] relative">
        <span
          className={`h-[2px] w-[20px] bg-fern-1100 block rounded absolute`}
        ></span>
        <span
          className={`h-[2px] w-[16px] bg-fern-1100 block rounded absolute`}
        ></span>
        <span
          className={`h-[2px] w-[20px] bg-fern-1100 block rounded absolute `}
        ></span>
      </span>
    </div>
  )
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <NavigationMenu.Root
      orientation="vertical"
      className="flex nroot lg:hidden"
    >
      <NavigationMenu.List className="flex nlist">
        <NavigationMenu.Item className="flex nitem">
          <NavigationMenu.Trigger
            className="toggle-nav"
            onPointerMove={(event) => event.preventDefault()}
            onPointerLeave={(event) => event.preventDefault()}
            onClick={handleToggle}
          >
            <Toggle />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className={clsx(
              'nav-content shadow-placed bg-white/90 backdrop-blur-md backdrop-filter backdrop-contrast-200 backdrop-saturate-100 flex flex-col rounded-lg relative z-[200] lg:left-1/2 lg:-translate-x-1/2 p-6 outline-none',
              'transition-all duration-300 ease-in-out',
              isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            )}
          >
            <ul className="flex flex-col gap-2">
              {navigation.map((link, index) => (
                <ListItem
                  href={link.href}
                  key={link.href}
                  isOpen={isOpen}
                  index={index}
                  className={clsx(
                    pathname === link.href
                      ? 'text-dandelion-500'
                      : 'text-fern-1100'
                  )}
                >
                  <Icon
                    icon={link.icon}
                    size={link.size}
                    className={clsx(
                      'relative -top-px',
                      pathname === link.href
                        ? 'text-dandelion-500'
                        : 'text-neutral-03-500'
                    )}
                  />
                  {link.title}
                </ListItem>
              ))}
              <ListItem
                href="/newsletter"
                isOpen={isOpen}
                index={navigation.length}
                className={clsx(
                  pathname === '/newsletter'
                    ? 'text-dandelion-500'
                    : 'text-fern-1100'
                )}
              >
                <Icon
                  icon="airplane"
                  className={clsx(
                    'relative -top-px',
                    pathname === '/newsletter'
                      ? 'text-dandelion-500'
                      : 'text-neutral-03-500'
                  )}
                />
                Subscribe
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Viewport className="nav-viewport px-4 absolute flex justify-center top-full left-0 right-0" />
    </NavigationMenu.Root>
  )
}

const ListItem = forwardRef(
  ({ className, children, isOpen, index, ...props }, forwardedRef) => (
    <li className="flex">
      <NavigationMenu.Link asChild>
        <a
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
          ref={forwardedRef}
        >
          {children}
        </a>
      </NavigationMenu.Link>
    </li>
  )
)

ListItem.displayName = 'ListItem'

export { Navigation }
