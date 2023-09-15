'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Pagination = ({ total, current, category }) => {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = current - 1 > 0
  const nextPage = current + 1 <= total
  const categoryPath = category ? `/${category}` : ''

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}
          >
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={
              current - 1 === 1
                ? `/${basePath}/`
                : `/${basePath}${categoryPath}/page/${current - 1}`
            }
            rel="prev"
          >
            Previous{' '}
            {current - 1 === 1
              ? `/${basePath}/`
              : `/${basePath}${categoryPath}/page/${current - 1}`}
          </Link>
        )}
        <span>
          {current} of {total}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            Next
          </button>
        )}
        {nextPage && (
          <Link
            href={`/${basePath}${categoryPath}/page/${current + 1}`}
            rel="next"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default Pagination
