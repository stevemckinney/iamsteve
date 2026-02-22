'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

import { navigation, library, tabbar } from '@/content/navigation'
import { cn } from '@/lib/utils'

import Link from './link'
import Icon from '@/components/icon'
import { Navigation } from '@/components/navigation'
import { CopyFeedUrl } from '@/components/button/index'
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

import styles from './header.module.css'

function AccessibilityLinks({ isArticlePage }) {
  return (
    <ul
      role="list"
      id="accessibility-links"
      className={cn(
        'sr-only focus-within:not-sr-only',
        'focus-within:fixed focus-within:top-2 focus-within:left-2 focus-within:z-[1000]',
        'focus-within:bg-fern-1200 focus-within:text-fern-100',
        'focus-within:p-8 focus-within:flex focus-within:flex-col focus-within:gap-2 rounded-md'
      )}
    >
      {isArticlePage && (
        <li>
          <a
            href="#article"
            className="text-lg underline underline-offset-3 [text-decoration-thickness:.25px]"
          >
            Skip to article
          </a>
        </li>
      )}
      <li>
        <a
          href="#content"
          className="text-lg underline underline-offset-3 [text-decoration-thickness:.25px]"
        >
          Skip to main content
        </a>
      </li>
      <li>
        <a
          href="#nav"
          className="text-lg underline underline-offset-3 [text-decoration-thickness:.25px]"
        >
          Skip to nav
        </a>
      </li>
    </ul>
  )
}

function Desktop({ pathname }) {
  return (
    <nav
      className={cn(
        'flex justify-between',
        'max-md:hidden',
        'bg-[url(/images/texture.png)] dark:bg-[url(/images/texture-dark.png)] bg-size-[172px_auto] bg-blend-multiply dark:bg-blend-color-dodge bg-canvas',
        'py-4 sm:px-4 lg:py-6.5 lg:-mx-4 xl:px-8 xl:-mx-8 2xl:py-7'
      )}
      id="nav"
      suppressHydrationWarning
    >
      <ul className="flex justify-between md:gap-8 2xl:py-0.5">
        {navigation.map((link) => {
          const isLibrary = link.title === 'Library'

          if (isLibrary) {
            return (
              <li key={link.href} className="relative -mr-1 group/library">
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
                      icon={link.icon}
                      size={link.size}
                      className="text-current"
                      variant="header"
                      aria-hidden="true"
                    />
                    {link.title}
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
                    className={cn(
                      'flex flex-col items-center mt-4',
                      styles.library
                    )}
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
                          <React.Fragment key={index}>
                            <MenuItem
                              key={item.href}
                              href={item.href}
                              className="relative flex flex-col gap-1 p-4 hover:bg-neutral-01-50 dark:hover:bg-fern-1100 transition duration-200 ease-out rounded-sm outline-none cursor-pointer focus-visible:z-10"
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
                              <span className="text-base">
                                {item.description}
                              </span>
                            </MenuItem>
                            {index < library.length - 1 && (
                              <Separator className="border-b border-neutral-01-50 dark:border-fern-1100" />
                            )}
                          </React.Fragment>
                        ))}
                      </MenuSection>
                      <MenuSection>
                        <MenuHeader className="px-8 py-4 flex flex-row items-center justify-between gap-4">
                          <span className="m-0 p-0 font-ui">
                            Subscribe with RSS
                          </span>
                          <CopyFeedUrl />
                        </MenuHeader>
                      </MenuSection>
                    </Menu>
                  </Popover>
                </MenuTrigger>
              </li>
            )
          }

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'flex items-center gap-1 text-base font-ui lowercase leading-none relative',
                  'lg:gap-2 lg:text-xl/none lg:py-1 xl:py-0.5',
                  styles.link,
                  styles.start
                )}
                suppressHydrationWarning
              >
                <Icon
                  icon={link.icon}
                  size={link.size}
                  className="text-current"
                  variant="header"
                  aria-hidden="true"
                />
                {link.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function Tabbar({ pathname }) {
  return (
    <nav
      className={cn(
        // Layout
        'flex justify-between md:hidden',
        // Mobile positioning
        'max-lg:fixed max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:z-100 isolate',
        // Mobile spacing
        'max-lg:px-8 max-lg:gap-6',
        // Mobile appearance
        'max-lg:rounded-full max-lg:shadow-placed',
        // Mobile background
        'max-lg:bg-white/80 dark:max-lg:bg-fern-1200/90',
        // Mobile backdrop
        'max-lg:backdrop-blur-sm max-lg:backdrop-brightness-100 max-lg:backdrop-contrast-100 max-lg:backdrop-saturate-150',
        // Mobile transition
        'max-lg:transition-all max-lg:duration-200 max-lg:ease-out',
        styles.tabbar
      )}
      id="tabbar"
      suppressHydrationWarning
    >
      <ul className="flex justify-between max-lg:gap-6">
        {tabbar.map((link) => {
          const isActive = pathname === link.href
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'flex items-center gap-1 text-base font-ui lowercase leading-none relative',
                  'max-lg:text-[12px] max-lg:font-sans max-lg:font-medium max-lg:flex-col max-lg:flex-1 max-lg:justify-center max-lg:py-3',
                  styles.link,
                  styles.start,
                  {
                    'max-lg:text-emphasis': isActive,
                    'max-lg:text-fern-700 dark:max-lg:text-fern-400': !isActive,
                  }
                )}
                suppressHydrationWarning
              >
                <Icon
                  icon={link.icon}
                  size={link.size}
                  className="text-current"
                  variant="header"
                  aria-hidden="true"
                />
                {link.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default function Header() {
  const pathname = usePathname()
  const isArticlePage = pathname.startsWith('/blog/') && pathname !== '/blog'

  return (
    <>
      <AccessibilityLinks isArticlePage={isArticlePage} />
      <header
        className="grid grid-cols-subgrid col-start-margin-start col-end-margin-end relative z-10"
        id="top"
      >
        <div
          className={cn(
            'col-container md:col-content lg:col-page flex items-center align-center justify-between gap-8 text-emphasis'
          )}
        >
          {/* span so that focus indicator isn't weird with the spacing applied here */}
          <span className="flex bg-[url(/images/texture.png)] dark:bg-[url(/images/texture-dark.png)] bg-size-[172px_auto] bg-blend-multiply dark:bg-blend-color-dodge bg-canvas py-4 sm:px-4 sm:-mx-4 lg:py-6.5 xl:px-8 xl:-mx-8 2xl:py-7">
            <Link href="/" className="flex" aria-label="iamsteve.me homepage">
              <Icon
                icon="logo"
                size={32}
                className="max-lg:hidden"
                variant="header"
                aria-hidden="true"
              />
              <Icon
                icon="logo"
                size={24}
                className="lg:hidden"
                variant="header"
                aria-hidden="true"
              />
            </Link>
          </span>
          <Desktop pathname={pathname} />
          <Tabbar pathname={pathname} />
          <Navigation />
        </div>
      </header>
    </>
  )
}
