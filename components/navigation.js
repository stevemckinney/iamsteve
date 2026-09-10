'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { DialogTrigger, Button } from 'react-aria-components'
import clsx from 'clsx'

import { mobile } from '@/content/navigation'

// components
import Link from '@/components/link'
import Icon from '@/components/icon'
import Sheet from '@/components/sheet'

const Toggle = () => {
  return (
    <div className="relative before:z-1 before:-inset-y-10 before:-inset-x-4 before:absolute">
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

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        className="toggle-nav md:hidden"
        aria-label="Toggle navigation menu"
        data-state={isOpen ? 'open' : 'closed'}
      >
        <Toggle />
      </Button>
      <Sheet title="Menu" icon="navigation">
        <ul className="flex flex-col gap-2 px-2 min-h-0 overflow-auto">
          {mobile.map((link, index) => (
            <ListItem
              href={link.href}
              key={link.href}
              isOpen={isOpen}
              index={index}
              className={clsx(
                pathname === link.href ? 'text-nav-active' : 'text-emphasis'
              )}
            >
              <Icon
                icon={link.icon}
                size={link.size}
                className={clsx(
                  'relative -top-px',
                  pathname === link.href ? 'text-nav-active' : 'text-nav-icon'
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
              pathname === '/newsletter' ? 'text-nav-active' : 'text-emphasis'
            )}
          >
            <Icon
              icon="airplane"
              className={clsx(
                'relative -top-px',
                pathname === '/newsletter' ? 'text-nav-active' : 'text-nav-icon'
              )}
              variant="header"
            />
            Subscribe
          </ListItem>
        </ul>
      </Sheet>
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
