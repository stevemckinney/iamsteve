import { useState } from 'react'

// utils
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'

// components
import Card from '@/components/card'
import Link from '@/components/Link'
import Pagination from '@/components/Pagination'
import Tag from '@/components/Tag'

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination, search }) {
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
      <div className="row between subheader contain contain-medium contain-large pb4">
        {pagination && pagination.totalPages > 1 && !searchValue && (
          <Pagination
            style="newer"
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        )}
        <h1 className="f4 f3-b f2-d neutral mb0 text-center">{title}</h1>
        {pagination && pagination.totalPages > 1 && !searchValue && (
          <Pagination
            style="older"
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        )}
      </div>
      <div className="grid-posts contain contain-medium contain-large pt3 pt6-b pb3 pb6-b">
        {!filteredBlogPosts.length && 'No posts found.'}
        {displayPosts.map((frontmatter) => {
          return <Card kind="medium" frontmatter={frontmatter} key={frontmatter.id} />
        })}
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
