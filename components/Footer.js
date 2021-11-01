import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="row between neutral-l2 contain contain-medium contain-large footer">
      <p className="m0 copyright">
        {`©`} <Link href="/">{siteMetadata.title}</Link> {`${new Date().getFullYear()}`}
      </p>
      <nav>
        <a href="https://www.iubenda.com/privacy-policy/12610320" className="iubenda-white iubenda-embed" title="Privacy Policy">Privacy Policy</a>
        <Link href="/feed" title="Subscribe to the blog RSS feed">RSS</Link>
        <Link href="/about">About</Link>
        <Link href="/uses" title="What the site was built with & software I use">Uses</Link>
        <Link href="#top" className="top">Top</Link>
      </nav>
    </footer>
  )
}
