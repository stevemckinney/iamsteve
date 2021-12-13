import React, { useState } from 'react'
import { withRouter } from 'next/router'
import Modal from 'react-modal'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'

// layouts
import SearchLayout from '@/layouts/SearchLayout'

// components
import Link from './Link'
import Icon from '@/components/icon/index.js'

// image
import Logo from '@/images/logo-small.svg'
import Logotype from '@/images/logotype-filled.svg'

export default withRouter(
  class Header extends React.Component {
    constructor() {
      super()
      this.state = {
        show: false,
      }
      this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal = (e) => {
      e.preventDefault()
      this.setState({ show: !this.state.show })
    }

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
              <span className="tabbar-item-text warm-l2">Subscribe</span>
              <Icon kind="nwslttr" />
            </Link>
            <nav id="nav" className="nav hide-lt-c end primary">
              {headerNavLinks.map((link) => (
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
              ))}
              <Link
                href="/?search=true"
                as="/search"
                className="nav-item nav-item-search"
                onClick={this.toggleModal}
              >
                <span className={`icon icon-search`}>
                  <Icon kind="search" />
                </span>
              </Link>
            </nav>
          </header>

          <Modal
            isOpen={!!this.props.router.search}
            onRequestClose={() => router.push('/')}
            contentLabel="Search modal"
          >
            <SearchLayout
              posts={posts}
              initialDisplayPosts={initialDisplayPosts}
              title="Search"
              show={true}
            />
          </Modal>
        </>
      )
    }
  }
)
