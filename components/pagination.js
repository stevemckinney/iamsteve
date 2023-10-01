'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Icon from '@/components/icon'

const Pagination = ({ total, current, category }) => {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = current - 1 > 0
  const nextPage = current + 1 <= total
  const categoryPath = category ? `/${category}` : ''

  const link = `flex items-center gap-1 text-xl font-ui lowercase leading-[1.1428571429] py-2`
  const linkState = `transition duration-200 hover:text-dandelion-600`
  const linkDisabled = `${link} cursor-auto disabled:text-ui-body`

  return (
    <nav className="flex justify-between items-center -my-2">
      {!prevPage && (
        <button className={`${linkDisabled}`} disabled={!prevPage}>
          <Icon icon="angle-left" className="stroke-current" />
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
          className={`${link} ${linkState}`}
          rel="prev"
        >
          <Icon icon="angle-left" className="stroke-current" />
          Previous
        </Link>
      )}
      <span
        className={`text-xl font-ui lowercase text-ui-body flex items-center gap-1 leading-[1.1428571429] py-2`}
        style={{
          fontVariantNumeric: 'lining-nums tabular-nums ordinal',
          fontFeatureSettings: "'dlig' on, 'case' on",
        }}
      >
        {current} of {total}
      </span>
      {!nextPage && (
        <button className={`${linkDisabled}`} disabled={!nextPage}>
          Next
        </button>
      )}
      {nextPage && (
        <Link
          href={`/${basePath}${categoryPath}/page/${current + 1}`}
          className={`${link} ${linkState}`}
          rel="next"
        >
          Next
          <Icon icon="angle-right" className="stroke-current" />
        </Link>
      )}
    </nav>
  )
}

export default Pagination
