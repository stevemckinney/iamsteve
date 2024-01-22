import siteMetadata from '@/content/metadata'
import navigation from '@/content/navigation'

// components
import Link from './link'
import Icon from '@/components/icon'
import { Navigation, Toggle } from '@/components/navigation'

// css
import styles from './header.module.scss'

export default function Header() {
  const nav = `flex flex-[1_0_auto] md:gap-8 lg:gap-12 justify-center`
  const tabbarNav = `max-md:px-4 max-md:bg-white/90 max-md:shadow-placed max-md:justify-between max-md:fixed max-md:left-0 max-md:right-0 max-md:bottom-0 max-md:z-[100] max-md:backdrop-blur max-md:backdrop-brightness-100 max-md:backdrop-saturate-150`

  // Some styles exist in the header.module to handle safe-area
  const navLink = `flex items-center gap-1 text-base font-ui lowercase leading-none relative ${styles.link}`
  const horizontalNavLink = `md:gap-2 md:text-base lg:text-xl/none lg:py-0.5`
  const tabbarNavLink = `max-md:flex-col max-md:flex-1 max-md:justify-center max-md:pt-2`

  return (
    <>
      <header
        className="grid grid-cols-subgrid col-start-margin-start col-end-margin-end relative z-[1]"
        id="top"
      >
        <div className="col-container lg:col-content flex items-center align-center py-4 px-4 lg:py-6 2xl:py-9 2xl:px-8 2xl:-mx-8 bg-neutral-01-100 max-md:-mx-4">
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
            {navigation.map((link) => (
              <Link
                href={link.href}
                className={`${navLink} ${styles.vertical} ${tabbarNavLink} ${horizontalNavLink} ${styles.start}`}
                key={link.href}
              >
                <Icon icon={link.icon} size={link.size} />
                {link.title}
              </Link>
            ))}
          </nav>
          <div className="flex-[1_0_10%] flex justify-end max-md:hidden">
            <Link
              href="/newsletter"
              className={`${navLink} ${horizontalNavLink} ${styles.end}`}
            >
              <span className="max-xl:sr-only">Subscribe</span>
              <Icon icon="airplane" />
            </Link>
          </div>
          <Navigation />
        </div>
      </header>
    </>
  )
}
