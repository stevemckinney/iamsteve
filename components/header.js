import siteMetadata from '@/content/metadata'
import navigation from '@/content/navigation'

// components
import Link from './link'
import Icon from '@/components/icon'

// css
import styles from './header.module.scss'

export default function Header() {
  const nav = `flex flex-1 lg:gap-12`
  const maxmdNav = `max-lg:px-4 max-lg:bg-white/90 max-lg:shadow-placed max-lg:justify-between max-lg:fixed max-lg:left-0 max-lg:right-0 max-lg:bottom-0 max-lg:z-10 max-lg:backdrop-blur max-lg:backdrop-brightness-100 max-lg:backdrop-saturate-150`

  // Some styles exist in the header.module to handle safe-area
  const navLink = `flex items-center gap-1 text-base font-ui lowercase leading-none relative ${styles.link}`
  const mdNavLink = `lg:gap-2 lg:text-xl`
  const maxmdNavLink = `max-lg:flex-col max-lg:flex-1 max-lg:justify-center max-lg:pt-2`

  return (
    <>
      <header
        className="grid grid-cols-subgrid col-start-margin-start col-end-margin-end relative z-10"
        id="top"
      >
        <div className="col-content flex items-center align-center justify-between py-4 lg:py-9 lg:px-8 lg:-mx-8 bg-neutral-01-100">
          <Link href="/" className="flex-1" title="iamsteve.me homepage">
            <Icon icon="logo" role="img" size={32} className="max-lg:hidden" />
            <Icon
              icon="logo"
              role="img"
              aria-hidden="true"
              size={24}
              className="lg:hidden"
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
