import siteMetadata from '@/content/metadata'
import navigation from '@/content/navigation'

// components
import Link from './link'
import Icon from '@/components/icon'

// css
import styles from './header.module.scss'

export default function Header() {
  const nav = `flex flex-1 md:gap-12`
  const maxmdNav = `max-md:px-4 max-md:bg-white/90 max-md:shadow-placed max-md:justify-between max-md:fixed max-md:left-0 max-md:right-0 max-md:bottom-0 max-md:z-10 max-md:backdrop-blur max-md:backdrop-brightness-100 max-md:backdrop-saturate-150`

  // Some styles exist in the header.module to handle safe-area
  const navLink = `flex items-center gap-1 text-base font-ui lowercase leading-none relative ${styles.link}`
  const mdNavLink = `md:gap-2 md:text-xl`
  const maxmdNavLink = `max-md:flex-col max-md:flex-1 max-md:justify-center max-md:pt-2`

  return (
    <>
      <header
        className="grid grid-cols-subgrid col-start-margin-start col-end-margin-end relative z-10"
        id="top"
      >
        <div className="col-content flex items-center align-center justify-between py-4 md:py-9 md:px-8 md:-mx-8 bg-neutral-01-100">
          <Link href="/" className="flex-1" title="iamsteve.me homepage">
            <Icon icon="logo" role="img" size={32} className="max-md:hidden" />
            <Icon
              icon="logo"
              role="img"
              aria-hidden="true"
              size={24}
              className="md:hidden"
            />
          </Link>
          <nav className={`${nav} ${maxmdNav}`}>
            {navigation.map((link) => (
              <Link
                href={link.href}
                className={`${navLink} ${styles.vertical} ${maxmdNavLink} ${mdNavLink} ${styles.start}`}
                key={link.href}
              >
                <Icon icon={link.icon} size={link.size} />
                {link.title}
              </Link>
            ))}
          </nav>
          <div className="flex-1 flex justify-end">
            <Link
              href="/newsletter"
              className={`${navLink} ${mdNavLink} ${styles.end}`}
            >
              Subscribe
              <Icon icon="airplane" />
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
