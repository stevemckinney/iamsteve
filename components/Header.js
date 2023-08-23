import React from 'react'
import siteMetadata from '@/content/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'

// layouts
import SearchLayout from '@/layouts/SearchLayout'

// components
import Link from './Link'
import Icon from '@/components/icon/index.js'

// image
import Logo from '@/images/logo-small.svg'
import Logotype from '@/images/logotype-filled.svg'

class Header extends React.Component {
  render() {
    return (
      <>
        <header
          className={`header contain-medium contain-large primary ${
            this.props.subtle ? 'header-solid header-transparent-c' : 'header-solid'
          }`}
          id="header"
        >
          <Link href="#content" id="skip-navigation" className="visuallyhidden">
            Skip navigation
          </Link>
          <Link href="/" title="Back to the homepage" className="logo">
            <Logotype className="logo-large fill-none" />
            <Logo className="logo-small fill-currentcolor" />
          </Link>
          <Link
            href="/newsletter"
            className="tabbar-item tabbar-item-v hide-c sans semibold end warm-l1"
          >
            <span className="tabbar-item-text warm-l1">Subscribe</span>
            <Icon kind="nwslttr" />
          </Link>
          <nav id="nav" className="nav hide-lt-c end primary">
            {headerNavLinks.map((link) => (
              <React.Fragment key={link.title}>
                {link.title !== 'Search' && (
                  <Link
                    key={link.title}
                    href={link.href}
                    className={`nav-item nav-item-${link.title.toLowerCase()}`}
                  >
                    <span className={`icon icon-${link.icon}`}>
                      <Icon kind={link.icon} />
                    </span>
                    {link.title !== 'Search' && <span className="nav-item-text">{link.title}</span>}
                  </Link>
                )}
              </React.Fragment>
            ))}
            <Link href="/search" className="nav-item nav-item-search">
              <span className={`icon icon-search`}>
                <Icon kind="search" />
              </span>
            </Link>
          </nav>
        </header>
      </>
    )
  }
}

export default Header
