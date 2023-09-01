import siteMetadata from '@/content/siteMetadata'

// components
import Link from './Link'
import Icon from '@/components/icon'

// css
import styles from './header.module.scss'

export default function Header() {
  const navLink = `flex items-center gap-2 text-xl font-ui lowercase leading-none relative ${styles.link}`
  return (
    <>
      <header className="grid layout gap-x-8 gap-y-0">
        <div className="col-content flex items-center justify-between py-12 px-8 -mx-8">
          <div className="flex-1">
            <Icon icon="logo" size={32} />
          </div>
          <nav className="flex flex-1 gap-12">
            <Link href="/design" className={`${navLink} ${styles.start}`}>
              <Icon icon="pen" />
              Design
            </Link>
            <Link href="/code" className={`${navLink} ${styles.start}`}>
              <Icon icon="code" />
              Code
            </Link>
            <Link href="/blog" className={`${navLink} ${styles.start}`}>
              <Icon icon="folder" />
              Code
            </Link>
            <Link href="/about" className={`${navLink} ${styles.start}`}>
              <Icon icon="person" />
              About
            </Link>
            <Link href="/contact" className={`${navLink} ${styles.start}`}>
              <Icon icon="envelope" />
              Contact
            </Link>
          </nav>
          <div className="flex-1 flex justify-end">
            <Link href="/code" className={`${navLink} ${styles.end}`}>
              Subscribe
              <Icon icon="airplane" />
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
