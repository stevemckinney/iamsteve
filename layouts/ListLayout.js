import { useState } from 'react'

// utils
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'

// components
import Icon from '@/components/icon'
import Card from '@/components/card'
import Link from '@/components/Link'
import Pagination from '@/components/Pagination'
import Tag from '@/components/Tag'

export default function CardLayout({ posts, title, initialDisplayPosts = [], pagination, search }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontmatter) => {
    const searchContent = frontmatter.title + frontmatter.summary + frontmatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })
  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      {title && (
        <div className="row between subheader contain contain-medium contain-large pb4">
          {pagination && pagination.totalPages > 1 && !searchValue && (
            <Pagination
              stage="newer"
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
            />
          )}
          <h1 className="f4 f3-b f2-d neutral mb0 text-center">{title}</h1>
          {pagination && pagination.totalPages > 1 && !searchValue && (
            <Pagination
              stage="older"
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
            />
          )}
        </div>
      )}
      <div className="contain contain-search">
        <form className="form form-warm form-search content-center items-center">
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
        </form>
        {searchValue && (
          <div className="searched-posts">
            <h2 className="f3-l mb4 neutral flex-8">Results for {searchValue}</h2>
            {!filteredBlogPosts.length && 'No posts found.'}
            {displayPosts.map((frontmatter) => {
              return (
                <div className="card" key={frontmatter.id}>
                  <h2 className="f4-l mb4 flex-8 warm transition secondary-hover">
                    <Link href={frontmatter.slug}>{frontmatter.title}</Link>
                  </h2>
                </div>
              )
            })}
          </div>
        )}
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
