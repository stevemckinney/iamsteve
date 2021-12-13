import { useState } from 'react'

// utils
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'

// layouts
import ListLayout from '@/layouts/ListLayout'

// components
import Card from '@/components/card'
import Icon from '@/components/icon'
import Link from '@/components/Link'
import Pagination from '@/components/Pagination'
import Tag from '@/components/Tag'

export default function SearchLayout({ posts, initialDisplayPosts = [], handleClose, show }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontmatter) => {
    const searchContent = frontmatter.title + frontmatter.summary + frontmatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div
        className={`overlay overlay-search flex items-center ${show ? 'showing' : 'hiding'}`}
        aria-labelledby="toggle-search-nav toggle-search"
      >
        {posts && (
          <ListLayout
            posts={posts}
            title={false}
            initialDisplayPosts={initialDisplayPosts}
            pagination={false}
          />
        )}
      </div>
    </>
  )
}
