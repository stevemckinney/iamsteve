import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

// utils
import siteMetadata from '@/content/siteMetadata'
import formatDate from '@/lib/utils/formatDate'

// layouts
import CardLayout from '@/layouts/CardLayout'

// components
import Card from '@/components/card'
import Icon from '@/components/icon'
import Link from '@/components/link'
import Pagination from '@/components/Pagination'
import Tag from '@/components/Tag'

export default function Search({ posts, initialDisplayPosts = [], handleClose, show }) {
  const [isBrowser, setIsBrowser] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  // const filteredBlogPosts = posts.filter((frontmatter) => {
  //   const searchContent = frontmatter.title + frontmatter.summary + frontmatter.tags.join(' ')
  //   return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  // })
  // If initialDisplayPosts exist, display it if no searchValue is specified
  const filteredBlogPosts = false

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const searchContent = (
    <>
      <div
        className={`overlay overlay-search flex items-center center ${show ? 'showing' : 'hiding'}`}
        aria-labelledby="toggle-search-nav toggle-search"
        role="dialog"
      >
        <div className="form form-warm form-search content-center items-center">
          <div className="field field-search m-center">
            <label htmlFor="keywords" className="visuallyhidden">
              Search
            </label>
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="find a post…"
              autoCorrect="off"
              autoCapitalize="off"
              className="input input-search f2"
            />
            <button type="submit" className="button button-search primary" aria-label="Search">
              <span className="f2 f3-c icon icon-medium icon-large-c icon-search">
                <Icon kind="search" />
              </span>
            </button>
          </div>
        </div>
        <div className="searched-posts">
          <h2 className="f3-l mb1 neutral flex-8">You may be looking for</h2>
          {posts && (
            <CardLayout
              posts={posts}
              title={false}
              initialDisplayPosts={initialDisplayPosts}
              pagination={false}
            />
          )}
        </div>
      </div>
    </>
  )

  if (isBrowser) {
    return ReactDOM.createPortal(searchContent, document.getElementById('modal-root'))
  } else {
    return null
  }
}
