// components/navigation.js: the menu toggle and the sheet it opens. Each
// page is its own document, so there’s no route change to close it on. The
// page passes its pathname, as the sheet’s links are also made on the server
import { useState } from 'react'
import { DialogTrigger, Button } from 'react-aria-components'

import { mobile } from '@/content/navigation'
import { cn } from '@/lib/utils'
import Icon from './icon.jsx'
import Locale from './locale.jsx'
import Sheet, { itemStyle } from './sheet.jsx'

const Toggle = () => {
  return (
    <div className="relative before:z-1 before:-inset-y-10 before:-inset-x-4 before:absolute">
      <span className="block w-[24px] h-[24px] relative">
        <span className="h-[2px] w-[20px] bg-emphasis block rounded absolute"></span>
        <span className="h-[2px] w-[16px] bg-emphasis block rounded absolute"></span>
        <span className="h-[2px] w-[20px] bg-emphasis block rounded absolute"></span>
      </span>
    </div>
  )
}

export default function Navigation({ pathname }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Locale>
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
                className={
                  pathname === link.href ? 'text-nav-active' : 'text-emphasis'
                }
              >
                <Icon
                  icon={link.icon}
                  size={link.size}
                  className={cn(
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
              className={
                pathname === '/newsletter' ? 'text-nav-active' : 'text-emphasis'
              }
            >
              <Icon
                icon="airplane"
                className={cn(
                  'relative -top-px',
                  pathname === '/newsletter'
                    ? 'text-nav-active'
                    : 'text-nav-icon'
                )}
                variant="header"
              />
              Subscribe
            </ListItem>
          </ul>
        </Sheet>
      </DialogTrigger>
    </Locale>
  )
}

const ListItem = ({ className, children, isOpen, index, href }) => (
  <li className="flex">
    <a
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
    >
      {children}
    </a>
  </li>
)
