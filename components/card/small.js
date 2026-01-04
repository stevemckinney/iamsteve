import Image from 'next/image'
import Link from 'next/link'

import Icon from '@/components/icon'
import Category from '@/components/category'
import Placeholder from '@/components/placeholder'
import Date from '@/components/date'
import { ChipIcon } from '@/components/chip'

import Categories from '@/content/categories'

const Small = ({ frontmatter }) => {
  const {
    slug,
    date,
    title,
    summary,
    tags,
    _id,
    theme,
    categories,
    images,
    medium,
    lastmod,
  } = frontmatter

  const url = `/blog/${slug}`

  return (
    <div className="relative flex gap-4 rounded-lg shadow-placed hover:shadow-picked active:shadow-reduced active:scale-[.99375] bg-surface active:bg-neutral-01-50 bg-clip-padding transition ease-linear duration-200 overflow-hidden p-8">
      {categories && (
        <div className={`flex flex-row gap-4 relative z-2 overflow-x-auto`}>
          {categories.slice(0, 1).map((category) => {
            const current = Categories.findIndex(
              (cat) => cat.title === category
            )

            return (
              <ChipIcon
                size={24}
                theme={Categories[current].theme}
                key={category}
              >
                <Icon icon={Categories[current].icon} size={24} />
              </ChipIcon>
            )
          })}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-[.5625rem]">
        <h3
          className="font-display font-variation-bold text-xl leading-xl lowercase m-0 p-0"
          id={`title-${_id}`}
        >
          <Link
            href={slug}
            tabIndex="0"
            className="text-heading before:content-[''] before:absolute before:inset-0 before:cursor-pointer before:rounded-lg before:z-1"
          >
            {title}
          </Link>
        </h3>
        <span className="flex gap-1 items-center text-sm leading-none">
          <Icon
            icon="calendar"
            size={16}
            className="text-heading relative -top-px"
          />
          <Date
            dateString={date}
            className="date font-ui lowercase text-ui-body"
          />
        </span>
        <div className="sr-only" aria-hidden="true" tabIndex="-1">
          <Link
            href="/about"
            className="author vcard url fn"
            rel="author"
            tabIndex="-1"
          >
            Steve McKinney
          </Link>{' '}
          <time dateTime={lastmod} className="updated" tabIndex="-1">
            <Date dateString={lastmod} />
          </time>
        </div>
      </div>
    </div>
  )
}

export default Small
