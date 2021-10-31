import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import Tabbar from './Tabbar'
import Icon from '@/components/icon'
// import ThemeSwitch from './ThemeSwitch'

// image
import Logo from '@/images/logo-small.svg'
import Logotype from '@/images/logotype-filled.svg'

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <header className="header contain-medium contain-large primary" id="header">
        <Link href="#content" id="skip-navigation" className="visuallyhidden">Skip navigation</Link>
        <Link href="/" title="Back to the homepage" className="logo">
          <Logotype className="logo-large fill-none" />
          <Logo className="logo-small fill-currentcolor" />
        </Link>
        <Link href="{path='newsletter'}" className="tabbar-item tabbar-item-v hide-c sans semibold end">
          <span className="tabbar-item-text warm-l2">Subscribe</span>
          <span className="icon icon-nwslttr warm"><Icon kind="newsletter" /></span>
        </Link>
        <nav id="nav" className="nav hide-lt-c end primary">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="nav-item"
            >
              <Icon kind={link.icon} />
              {link.title !== 'Search' && (
                <span className="nav-item-text">{link.title}</span>
              )}
            </Link>
          ))}
        </nav>
      </header>
      <Tabbar />
      <main id="content">{children}</main>
      <Footer />
    </>
  )
}

export default LayoutWrapper
