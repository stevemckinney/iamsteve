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
import styles from './header.module.scss'

export default function Header() {
  const pathname = usePathname()
  const nav =
    'flex flex-[1_0_auto] lg:gap-8 2xl:gap-12 xl:justify-center max-lg:px-2'
  const tabbarNav = `max-lg:transition-all max-lg:duration-200 max-lg:ease-out max-lg:px-6 max-lg:bg-white/75 max-lg:shadow-placed max-lg:justify-between max-lg:fixed max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:z-[100] max-lg:backdrop-blur max-lg:backdrop-brightness-100 max-lg:backdrop-contrast-100 max-lg:backdrop-saturate-150 max-lg:gap-4 max-lg:rounded-full ${styles.tabbar}`

  // Some styles exist in the header.module to handle safe-area
  const navLink = `flex items-center gap-1 text-base font-ui lowercase leading-none relative ${styles.link}`
  const compactHorizontalNavLink =
    'lg:bg-neutral-01-500/10 lg:rounded-full lg:pl-10 lg:pr-1 lg:relative'
  const horizontalNavLink = 'lg:gap-2 lg:text-xl/none lg:py-1 xl:py-0.5'
  const tabbarNavLink =
    'max-lg:text-[12px] max-lg:font-sans max-lg:font-medium max-lg:flex-col max-lg:flex-1 max-lg:justify-center max-lg:py-3'

  return (
    <>
      <header
        className="grid grid-cols-subgrid col-start-margin-start col-end-margin-end relative z-10"
        id="top"
      >
        <div
          className="absolute col-container lg:col-content lg:-mx-8 h-[4px] top-1/2 -translate-y-1/2 right-0 left-0 bg-[url(/images/texture.png)] bg-[172px_auto] bg-blend-multiply bg-neutral-01-150 z-[-1]"
          aria-hidden="true"
        />
        {/*bg-[url(/images/texture.png)] bg-[172px_auto] bg-blend-multiply bg-neutral-01-150*/}
        <div className="col-container 2xl:col-content flex items-center align-center max-lg:justify-between py-4 px-4 lg:-mx-4 lg:py-[1.625rem] 2xl:py-9 2xl:px-8 2xl:-mx-8 max-lg:-mx-4 max-2xl:gap-8">
          <Link
            href="/"
            className="flex-[1_0_10%]"
            title="iamsteve.me homepage"
          >
            <Icon icon="logo" role="img" size={32} className="max-xl:hidden" />
            <Icon
              icon="logo"
              role="img"
              aria-hidden="true"
              size={24}
              className="xl:hidden"
            />
          </Link>
          <ul
            role="list"
            id="accessibility-links"
            className="text-center bg-black text-white underline text-2xl sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0"
          >
            <li>
              <a href="#article">Skip to article</a>
            </li>
            <li>
              <a href="#content">Skip to main content</a>
            </li>
            <li>
              <a href="#nav">Skip to nav</a>
            </li>
          </ul>
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
                      'max-lg:opacity-100 max-lg:text-fern-1100': isActive,
                      'max-lg:opacity-60': !isActive,
                    }
                  )}
                  key={link.href}
                  suppressHydrationWarning
                >
                  <Icon
                    icon={link.icon}
                    size={link.size}
                    className="text-current"
                  />
                  {link.title}
                </Link>
              )
            })}
          </nav>
          <div className="flex-[1_0_10%] flex justify-end max-lg:hidden">
            <Link
              href="/newsletter"
              className={cn(navLink, horizontalNavLink, styles.end)}
            >
              <span>Subscribe</span>
              <Icon icon={`airplane`} size={24} className="text-current" />
            </Link>
          </div>
          <Navigation />
        </div>
      </header>
    </>
  )
}
