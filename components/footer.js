import Link from './Link'
import siteMetadata from '@/content/metadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="row between neutral-l2 contain contain-medium contain-large footer">
      <p className="m0 copyright">
        {`©`} <Link href="/">{siteMetadata.title}</Link> {`${new Date().getFullYear()}`}
      </p>
      <nav>
        <Link href="#top" className="top">
          Top
        </Link>
        <Link href="/feed.xml" title="Subscribe to the blog RSS feed">
          RSS
        </Link>
        <Link href="/about">About</Link>
        <Link href="/uses" title="What the site was built with & software I use">
          Uses
        </Link>
      </nav>
    </footer>
  )
}
