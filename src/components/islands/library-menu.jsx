// The Library menu from components/header.js: the button in the desktop
// nav, and the popover it opens with the library links and the feed URL
import { Fragment } from 'react'
import {
  MenuTrigger,
  Button,
  Popover,
  Menu,
  MenuItem,
  MenuSection,
  Header as MenuHeader,
  Separator,
} from 'react-aria-components'

import { library } from '@/content/navigation'
import { cn } from '@/lib/utils'
import styles from '@/components/header.module.css'
import Icon from './icon.jsx'
import Locale from './locale.jsx'
import CopyFeedUrl from './copy-feed-url.jsx'

export default function LibraryMenu({ title, icon, size }) {
  return (
    <Locale>
      <MenuTrigger>
        <Button
          className={cn(
            'flex items-center gap-1 text-base font-ui lowercase leading-none relative',
            'lg:gap-2 lg:text-xl/none lg:py-1 xl:py-0.5',
            styles.link,
            styles.start
          )}
        >
          <Icon
            icon={icon}
            size={size}
            className="text-current"
            variant="header"
            aria-hidden="true"
          />
          {title}
          <Icon
            icon="angle-down"
            size={16}
            className="text-current"
            variant="header"
            aria-hidden="true"
          />
        </Button>
        <Popover
          placement="bottom"
          offset={-12}
          className={cn('flex flex-col items-center mt-4', styles.library)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="10"
            fill="none"
            viewBox="0 0 22 10"
            aria-hidden="true"
            className="relative z-10"
          >
            <path
              fill="light-dark(#fff, var(--color-fern-1200))"
              d="M10.375 2.5a1 1 0 0 1 1.25 0L21 10H1l9.375-7.5Z"
            />
            <path
              fill="light-dark(rgb(117 99 98), var(--color-fern-800))"
              opacity=".24"
              d="M21.35 9h-1.6l-8.125-6.5a1 1 0 0 0-1.25 0L2.25 9H.65l9.1-7.28a2 2 0 0 1 2.5 0L21.35 9Z"
            />
          </svg>
          <Menu className="w-[412px] rounded-2xl shadow-picked bg-neutral-01-100/80 backdrop-blur-sm dark:bg-fern-1200 outline-none focus-visible:outline-2 focus-visible:outline-fern-900 dark:focus-visible:outline-fern-400 focus-visible:outline-offset-2">
            <MenuSection className="rounded-t-2xl flex flex-col p-4 bg-surface shadow-reduced dark:shadow-[0_1px_var(--color-fern-1000)]">
              {library.map((item, index) => (
                <Fragment key={item.href}>
                  <MenuItem
                    href={item.href}
                    className="relative flex flex-col gap-1 p-4 data-[focused]:bg-neutral-01-50 dark:data-[focused]:bg-fern-1100 transition duration-200 ease-out rounded-sm outline-none cursor-pointer focus-visible:z-10"
                  >
                    <span className="flex items-center gap-2">
                      <Icon
                        icon={item.icon}
                        size={16}
                        className="text-emphasis"
                        variant="header"
                        aria-hidden="true"
                      />
                      <span className="text-base font-medium">
                        {item.title}
                      </span>
                    </span>
                    <span className="text-base">{item.description}</span>
                  </MenuItem>
                  {index < library.length - 1 && (
                    <Separator className="border-b border-neutral-01-50 dark:border-fern-1100" />
                  )}
                </Fragment>
              ))}
            </MenuSection>
            <MenuSection>
              <MenuHeader className="px-8 py-4 flex flex-row items-center justify-between gap-4">
                <span className="m-0 p-0 font-ui">Subscribe with RSS</span>
                <CopyFeedUrl />
              </MenuHeader>
            </MenuSection>
          </Menu>
        </Popover>
      </MenuTrigger>
    </Locale>
  )
}
