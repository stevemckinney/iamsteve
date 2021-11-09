import formatDate from '@/lib/utils/formatDate'
import Link from 'next/link'
import Tag from '@/components/Tag'

const Small = ({ frontmatter }) => {
  const { slug, date, title, summary, tags, id } = frontmatter
  
  return (
    <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
      <dl>
        <dt className="sr-only">Published on</dt>
        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
          <time dateTime={date}>{formatDate(date)}</time>
        </dd>
      </dl>
      <div className="space-y-3 xl:col-span-3">
        <div>
          <h3 className="text-2xl font-bold leading-8 tracking-tight">
            <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
              {title}
            </Link>
          </h3>
          <div className="flex flex-wrap">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        </div>
        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
          {summary}
        </div>
      </div>
    </article>
  )
}

export default Small