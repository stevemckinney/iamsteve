import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

// image
import LogoSmall from '@/images/logo-small.svg'
import LogoLarge from '@/images/logo-large.svg'
import Newsletter from '@/images/newsletter.svg'

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <header className="header contain-medium contain-large primary" id="header">
        <a id="skip-navigation" className="visuallyhidden" href="#content">Skip navigation</a>
        <Link href="/" title="Back to the homepage" className="logo">
          <LogoLarge />
          <LogoSmall />
        </Link>
        <Link href="{path='newsletter'}" className="tabbar-item tabbar-item-v hide-c sans semibold end">
          <span class="tabbar-item-text warm-l2">Subscribe</span>
          <span class="icon icon-nwslttr warm"><Newsletter /></span>
        </Link>
        <nav id="nav" className="nav hide-lt-c end primary">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="nav-item"
            >
              <span className="icon icon-home"></span>
              <span className="nav-item-text">{link.title}</span>
            </Link>
          ))}
        </nav>
        <ThemeSwitch />
        <MobileNav />
      </header>
      <main className="mb-auto">{children}</main>
      <Footer />
    </>
  )
}

export default LayoutWrapper
