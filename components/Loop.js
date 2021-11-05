import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'

export default function Loop({ posts, initialDisplayPosts = [], pagination }) {
  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && initialDisplayPosts
    
  return (
    <>
      {!displayPosts.length && 'No posts found.'}
      {displayPosts.map((frontmatter) => {
        const { slug, date, title, summary, tags } = frontmatter
        return (
          <article>
            <dl>
              <dt className="sr-only">Published on</dt>
              <dd>
                <time dateTime={date}>{formatDate(date)}</time>
              </dd>
            </dl>
            <div>
              <div>
                <h3><Link href={`/blog/${slug}`}>{title}</Link></h3>
                <div>
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
              <div>
                {summary}
              </div>
            </div>
          </article>
        )
      })}
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
