import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
// import ThemeSwitch from './ThemeSwitch'

// components
import SectionContainer from './SectionContainer'
import Link from './Link'
import Subscribe from '@/components/Subscribe'
import Footer from './Footer'
import Tabbar from './Tabbar'
import Icon from '@/components/icon'
import Social from '@/components/Social'

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
        <Link href="{path='newsletter'}" className="tabbar-item tabbar-item-v hide-c sans semibold end warm-l1">
          <span className="tabbar-item-text warm-l2">Subscribe</span>
          <Icon kind="nwslttr" />
        </Link>
        <nav id="nav" className="nav hide-lt-c end primary">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="nav-item"
            >
              <span className={`icon icon-${link.icon}`}>
                <Icon kind={link.icon} />
              </span>
              {link.title !== 'Search' && (
                <span className="nav-item-text">{link.title}</span>
              )}
            </Link>
          ))}
        </nav>
      </header>

      <Tabbar />

      <main id="content">
        {children}
      </main>
      
      
      
            {siteMetadata.newsletter.provider !== '' && (
              <Subscribe />
            )}

      <aside className="row row-normal pt6 pt8-d contain contain-medium contain-large between items-end">
        <section className="column column-4-b column-3-d mb6 mb0-b">
          <a href="/" className="logo-footer mb4 primary"><Logo className="logo-small fill-currentcolor" /></a>
          <p className="mb4">iamsteve is a blog written by Steve McKinney, focusing on the design and build of websites. The aim is to bridge the gap in building your design. It started&thinsp;—&thinsp;and remains&thinsp;—&thinsp;a way to encourage self learning and sharing, through a mixture of in depth tutorials and quick tips.</p>
          <p><strong className="sans">You can find me elsewhere</strong> <br /><Social /></p>
        </section>
        <section className="column column-4-b column-5-d rio-osc text-right items-end-b" id="rio-osc">
          <Image src="/static/images/rio-osc.svg" width={512} height={288} />
        </section>
      </aside>
      <Footer />
    </>
  )
}

export default LayoutWrapper
