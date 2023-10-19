import Image from 'next/image'
import Link from 'next/link'

import Icon from '@/components/icon'
import Category from '@/components/category'
import Placeholder from '@/components/placeholder'
import Date from '@/components/date'

const Small = ({ frontmatter }) => {
  const {
    slug,
    date,
    title,
    summary,
    tags,
    id,
    theme,
    categories,
    images,
    medium,
    lastmod,
  } = frontmatter

  const url = `/blog/${slug}`

  return (
    <div className="relative flex flex-col rounded-lg shadow-placed hover:shadow-picked active:shadow-reduced bg-white active:bg-neutral-01-50 bg-clip-padding transition ease-linear duration-200 overflow-hidden">
      <div className="flex flex-col flex-auto relative before:content-[''] before:w-16 before:h-6 before:absolute before:top-8 before:right-0 before:bg-gradient-to-r before:from-white/0 before:to-white before:z-[3] pb-[1.625rem]">
        {categories && (
          <div
            className={`flex flex-row gap-4 relative z-[2] overflow-x-auto pt-8 pb-4 px-8`}
          >
            {categories.map((category) => (
              <Category key={category} tabIndex="1">
                {category}
              </Category>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-[.5625rem] px-8 pt-[.8125rem]">
          <h3
            className="font-display font-variation-bold text-xl leading-xl lowercase m-0 p-0"
            id={`title-${id}`}
          >
            <Link
              href={slug}
              tabIndex="0"
              className="text-fern-1100 before:content-[''] before:absolute before:inset-0 before:cursor-pointer before:rounded-lg before:z-[1]"
            >
              {title}
            </Link>
          </h3>
          <span className="flex gap-1 items-center text-sm leading-none">
            <Icon
              icon="calendar"
              size={16}
              className="text-fern-1100 relative top-[-1px]"
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
    </div>
  )
}

export default Small
