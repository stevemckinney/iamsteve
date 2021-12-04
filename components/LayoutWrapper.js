import React, { useState } from 'react'
import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
// import ThemeSwitch from './ThemeSwitch'

// components
import SectionContainer from './SectionContainer'
import Link from './Link'
import Subscribe from '@/components/Subscribe'
import FooterProfile from '@/components/FooterProfile'
import Footer from './Footer'
import Tabbar from './Tabbar'
import Search from '@/components/Search'
import Icon from '@/components/icon/index.js'

// image
import Logo from '@/images/logo-small.svg'
import Logotype from '@/images/logotype-filled.svg'

class LayoutWrapper extends React.Component {
  constructor() {
    super()
    this.state = {
      show: false
    };
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal = (e) => {
    e.preventDefault()
    this.setState({ show: !this.state.show })
  }

  render() {
    return (
      <>
        <header className="header contain-medium contain-large primary" id="header">
          <Link href="#content" id="skip-navigation" className="visuallyhidden">
            Skip navigation
          </Link>
          <Link href="/" title="Back to the homepage" className="logo">
            <Logotype className="logo-large fill-none" />
            <Logo className="logo-small fill-currentcolor" />
          </Link>
          <Link
            href="{path='newsletter'}"
            className="tabbar-item tabbar-item-v hide-c sans semibold end warm-l1"
          >
            <span className="tabbar-item-text warm-l2">Subscribe</span>
            <Icon kind="nwslttr" />
          </Link>
          <nav id="nav" className="nav hide-lt-c end primary">
            {headerNavLinks.map((link) => (
              <Link key={link.title} href={link.href} className={`nav-item nav-item-${link.title.toLowerCase()}`}>
                <span className={`icon icon-${link.icon}`}>
                  <Icon kind={link.icon} />
                </span>
                {link.title !== 'Search' && <span className="nav-item-text">{link.title}</span>}
              </Link>
            ))}
            <Link href="/search" className="nav-item nav-item-search" onClick={this.toggleModal}>
              <span className={`icon icon-search`}>
                <Icon kind="search" />
              </span>
            </Link>
          </nav>
        </header>

        <Tabbar />

        <Search show={this.state.show} handleClose={this.hideModal} />

        <main id="content">{this.props.children}</main>

        {siteMetadata.newsletter.provider !== '' && <Subscribe />}

        <FooterProfile />
        <Footer />
      </>
    )
  }
}

export default LayoutWrapper
