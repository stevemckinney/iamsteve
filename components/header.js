'use client'

import { usePathname } from 'next/navigation'

import siteMetadata from '@/content/metadata'
import navigation from '@/content/navigation'
import { cn } from '@/lib/utils'

// components
import Link from './link'
import Icon from '@/components/icon'
import { Navigation, Toggle } from '@/components/navigation'

// css
import styles from './header.module.css'

export default function Header() {
  const pathname = usePathname()
  const isArticlePage = pathname.startsWith('/blog/') && pathname !== '/blog'

  const nav =
    'flex justify-between lg:gap-8 max-lg:px-2 lg:-mx-4 lg:py-6.5 2xl:py-9 2xl:px-8 2xl:-mx-8 max-lg:-mx-4 bg-[url(/images/texture.png)] bg-size-[172px_auto] bg-blend-multiply bg-neutral-01-150'
  const tabbarNav = `max-lg:transition-all max-lg:duration-200 max-lg:ease-out max-lg:px-8 max-lg:bg-white/80 dark:max-lg:bg-fern-1200/90 max-lg:shadow-placed max-lg:fixed max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:z-100 max-lg:backdrop-blur-sm max-lg:backdrop-brightness-100 max-lg:backdrop-contrast-100 max-lg:backdrop-saturate-150 max-lg:gap-6 max-lg:rounded-full ${styles.tabbar}`

  // Some styles exist in the header.module to handle safe-area
  const navLink = `flex items-center gap-1 text-base font-ui lowercase leading-none relative ${styles.link}`
  const compactHorizontalNavLink =
    'lg:bg-neutral-01-500/10 lg:rounded-full lg:pl-10 lg:pr-1 lg:relative'
  const horizontalNavLink = 'lg:gap-2 lg:text-xl/none lg:py-1 xl:py-0.5'
  const tabbarNavLink =
    'max-lg:text-[12px] max-lg:font-sans max-lg:font-medium max-lg:flex-col max-lg:flex-1 max-lg:justify-center max-lg:py-3'

  return (
    <>
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

      <header
        className="grid grid-cols-subgrid col-start-margin-start col-end-margin-end relative z-10"
        id="top"
      >
        {/* <div
          className="absolute col-container lg:col-content lg:-mx-8 h-[4px] top-1/2 -translate-y-1/2 right-0 left-0 bg-[url(/images/texture.png)] bg-size-[172px_auto] bg-blend-multiply bg-canvas z-[-1]"
          aria-hidden="true"
        /> */}
        {/*bg-[url(/images/texture.png)] bg-size-[172px_auto] bg-blend-multiply bg-neutral-01-150*/}
        <div className="col-container 2xl:col-content flex items-center align-center justify-between max-2xl:gap-8 text-emphasis max-lg:py-4 max-lg:px-4">
          <Link
            href="/"
            className="flex bg-[url(/images/texture.png)] bg-size-[172px_auto] bg-blend-multiply bg-neutral-01-150 lg:-mx-4 lg:py-6.5 2xl:py-9 2xl:px-8 2xl:-mx-8 max-lg:-mx-4"
            title="iamsteve.me homepage"
          >
            <Icon
              icon="logo"
              role="img"
              size={32}
              className="max-xl:hidden"
              variant="header"
            />
            <Icon
              icon="logo"
              role="img"
              aria-hidden="true"
              size={24}
              className="xl:hidden"
              variant="header"
            />
          </Link>
          <nav className={cn(nav, tabbarNav)} id="nav" suppressHydrationWarning>
            {navigation.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  href={link.href}
                  className={cn(
                    navLink,
                    tabbarNavLink,
                    horizontalNavLink,
                    styles.start,
                    {
                      'lg:hidden': link.title === 'Home',
                      'max-lg:hidden': link.title === 'Contact',
                      'max-lg:text-emphasis': isActive,
                      'max-lg:text-fern-700 dark:max-lg:text-fern-400':
                        !isActive,
                    }
                  )}
                  key={link.href}
                  suppressHydrationWarning
                >
                  <Icon
                    icon={link.icon}
                    size={link.size}
                    className="text-current"
                    variant="header"
                  />
                  {link.title}
                </Link>
              )
            })}
          </nav>
          <Navigation />
        </div>
      </header>
    </>
  )
}
