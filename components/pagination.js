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
  const linkState = `transition duration-200 hover:text-link-hover`
  const linkDisabled = `${link} cursor-not-allowed disabled:text-ui-body/70`

  return (
    <nav className="flex justify-between items-center -my-2 relative">
      {!prevPage && (
        <button className={`${linkDisabled}`} disabled={!prevPage}>
          <Icon icon="angle-left" className="stroke-current relative -top-px" />
          Newer
        </button>
      )}
      {prevPage && (
        <Link
          href={
            current - 1 === 1
              ? `/${basePath}${categoryPath}`
              : `/${basePath}${categoryPath}/page/${current - 1}`
          }
          className={`${link} ${linkState}`}
          rel="prev"
        >
          <Icon icon="angle-left" className="stroke-current relative -top-px" />
          Newer
        </Link>
      )}
      <span
        className={`absolute left-1/2 transform -translate-x-1/2 text-xl font-ui lowercase text-ui-body flex items-center gap-1 leading-[1.1428571429] py-2`}
        style={{
          fontVariantNumeric: 'lining-nums tabular-nums ordinal',
          fontFeatureSettings: "'dlig' on, 'case' on",
        }}
      >
        {current} of {total}
      </span>
      {!nextPage && (
        <button className={`${linkDisabled}`} disabled={!nextPage}>
          Older
          <Icon icon="angle-right" className="stroke-current relative -top-px" />
        </button>
      )}
      {nextPage && (
        <Link
          href={`/${basePath}${categoryPath}/page/${current + 1}`}
          className={`${link} ${linkState}`}
          rel="next"
        >
          Older
          <Icon icon="angle-right" className="stroke-current relative -top-px" />
        </Link>
      )}
    </nav>
  )
}

export default Pagination
