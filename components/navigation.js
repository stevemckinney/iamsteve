'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { DialogTrigger, Button } from 'react-aria-components'
import clsx from 'clsx'
import { cn } from '@/lib/utils'

import { mobile } from '@/content/navigation'

// components
import Link from '@/components/link'
import Icon from '@/components/icon'
import Sheet, { itemStyle } from '@/components/sheet'

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
      <Sheet title="Menu">
        <ul className="flex flex-col gap-px px-2">
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
      className={cn(
        itemStyle,
        'shrink-0 basis-full transition-all duration-300 ease-in-out',
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
