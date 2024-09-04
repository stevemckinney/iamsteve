'use client'

import { usePathname } from 'next/navigation'

import siteMetadata from '@/content/metadata'
import navigation from '@/content/navigation'

// components
import Link from './link'
import Icon from '@/components/icon'
import { Navigation, Toggle } from '@/components/navigation'

// css
import styles from './header.module.scss'

export default function Header() {
  const pathname = usePathname()
  const nav = `flex flex-[1_0_auto] md:gap-8 2xl:gap-12 xl:justify-center`
  const tabbarNav = `max-md:px-4 max-md:bg-white/90 max-md:shadow-placed max-md:justify-between max-md:fixed max-md:left-0 max-md:right-0 max-md:bottom-0 max-md:z-[100] max-md:backdrop-blur max-md:backdrop-brightness-100 max-md:backdrop-saturate-150`

  // Some styles exist in the header.module to handle safe-area
  const navLink = `flex items-center gap-1 text-base font-ui lowercase leading-none relative ${styles.link}`
  const compactHorizontalNavLink = `md:bg-neutral-01-500/10 md:rounded-full lg:pl-10 lg:pr-1 md:relative`
  const horizontalNavLink = `md:gap-2 md:text-base lg:text-xl/none md:py-1 xl:py-0.5`
  const tabbarNavLink = `max-md:text-[12px] max-md:flex-col max-md:flex-1 max-md:justify-center max-md:pt-2`

  return (
    <>
      <header
        className="grid grid-cols-subgrid col-start-margin-start col-end-margin-end sticky z-[200]"
        id="top"
      >
        <div className="absolute col-container lg:col-content -mx-8 h-[4px] top-1/2 -translate-y-1/2 right-0 left-0 bg-[url(/images/texture.png)] bg-[172px_auto] bg-blend-multiply bg-neutral-01-150 z-[-1]" aria-hidden="true" />
        {/*bg-[url(/images/texture.png)] bg-[172px_auto] bg-blend-multiply bg-neutral-01-150*/}
        <div className="col-container 2xl:col-content flex items-center align-center max-md:justify-between py-4 px-4 md:-mx-4 lg:py-[1.625rem] 2xl:py-9 2xl:px-8 2xl:-mx-8 max-md:-mx-4 max-2xl:gap-8">
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
          <nav className={`${nav} ${tabbarNav}`}>
            {navigation.map((link) => {
              return (
                <Link
                  href={link.href}
                  className={`${navLink} ${
                    link.title === 'Home' ? 'md:hidden' : ''
                  } ${link.title === 'Contact' ? 'max-md:hidden' : ''} ${
                    styles.vertical
                  } ${tabbarNavLink} ${horizontalNavLink} ${styles.start} ${
                    pathname === link.href ? 'max-md:text-dandelion-500' : ''
                  }`}
                  key={link.href}
                >
                  <Icon
                    icon={link.icon}
                    size={link.size}
                    className="max-lg:hidden text-current"
                  />
                  <Icon
                    icon={link.icon}
                    size={16}
                    className="lg:hidden text-current"
                  />
                  {link.title}
                </Link>
              )
            })}
          </nav>
          <div className="flex-[1_0_10%] flex justify-end max-md:hidden">
            <Link
              href="/newsletter"
              className={`${navLink} ${horizontalNavLink} ${styles.end}`}
            >
              <span>Subscribe</span>
              <Icon
                icon={`airplane`}
                size={24}
                className="max-lg:hidden text-current"
              />
              <Icon
                icon={`airplane`}
                size={16}
                className="lg:hidden text-current"
              />
            </Link>
          </div>
          <Navigation />
        </div>
      </header>
    </>
  )
}
