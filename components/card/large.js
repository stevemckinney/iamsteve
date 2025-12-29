import Image from 'next/image'
import Link from 'next/link'

import Icon from '@/components/icon'
import Category from '@/components/category'
import Placeholder from '@/components/placeholder'
import Date from '@/components/date'

// https://gist.github.com/aradnom/06ef051c1c96f10c144d
function autoParagraph(text, size) {
  return (
    `<p className="${size}">` + text.split(/\n+/).join(`</p>\n<p>`) + `</p>`
  )
}

const LargeImage = ({ ...props }) => {
  const { image, title, imageColor, categories } = props

  return (
    <>
      <Image
        src={image}
        width={592}
        height={368}
        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        placeholder="blur"
        alt={title}
        className={`object-fill object-center height-[initial]`}
      />
    </>
  )
}

const Large = ({ frontmatter, image, className }) => {
  const {
    slug,
    date,
    title,
    summary,
    tags,
    _id,
    theme,
    categories,
    large,
    medium,
    lastmod,
  } = frontmatter

  const imageColor = theme ? theme.toString() : '#e8dcd9'

  return (
    <article className="group/large relative flex flex-col self-start overflow-hidden transition duration-200 bg-white rounded-lg shadow-placed hover:shadow-picked active:shadow-reduced active:bg-neutral-01-50 bg-clip-padding">
      {image && large && (
        <Link
          href={slug}
          title=""
          className={`relative flex items-center justify-center aspect-[1.6086956522/1]`}
          style={{ backgroundColor: `${imageColor}` }}
          aria-labelledby={`title-${_id}`}
        >
          <>
            <div className="absolute before:transition before:duration-200 before:ease-in z-1 inset-0 bg-fade before:z-[-1] before:absolute before:bg-fade-neutral before:inset-0 before:opacity-0 group-active/large:before:opacity-100" />
            <LargeImage
              image={large}
              imageColor={imageColor}
              categories={categories}
              title={title}
            />
          </>
        </Link>
      )}
      {image && !large && (
        <>
          <div
            className="flex items-center self-stretch relative"
            style={{ backgroundColor: `${imageColor}` }}
          >
            <div className="absolute before:transition before:duration-200 before:ease-in z-1 inset-0 bg-fade before:z-[-1] before:absolute before:bg-fade-neutral before:inset-0 before:opacity-0 group-active/large:before:opacity-100" />
            {categories && categories.includes('Design') ? (
              <Placeholder
                category="Design"
                kind="post"
                width={592}
                height={384}
                href={slug}
                title=""
                className={`flex items-center justify-center aspect-[1.6086956522/1] ${className}`}
                style={{ backgroundColor: `${imageColor}` }}
                aria-labelledby={`title-${_id}`}
                tabIndex="0"
              />
            ) : (
              <Placeholder
                category="Code"
                kind="post"
                width={592}
                height={384}
                href={slug}
                title=""
                className={`flex items-center justify-center aspect-[1.6086956522/1] ${className}`}
                style={{ backgroundColor: `${imageColor}` }}
                aria-labelledby={`title-${_id}`}
                tabIndex="0"
              />
            )}
          </div>
        </>
      )}
      {/* spacing is weirdly distributed in the content to accommodate for scrolling categories */}
      <div className="flex flex-col flex-auto relative before:w-16 before:h-9 before:absolute before:top-7 before:right-0 before:bg-linear-to-r before:from-white/0 before:via-white/10 before:via-white/30 before:via-white/80 before:to-white active:before:from-neutral-01-50/0 active:before:to-neutral-01-50/10 active:before:to-neutral-01-50/30 active:before:to-neutral-01-50 active:before:to-neutral-01-50/80 active:before:via-50% before:z-3 pb-8 md:pb-10.5">
        {categories && (
          <div
            className={`flex flex-row gap-4 relative z-2 overflow-x-auto pb-4 md:pb-5 px-8 md:px-12 pt-px`}
          >
            {categories.map((category) => (
              <Category key={category} size={24} tabIndex="1">
                {category}
              </Category>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-2.5 px-8 pt-[.8125rem] md:pt-5 md:gap-5.5 md:px-12">
          <h2
            className="p-0 m-0 text-3xl leading-none lowercase font-display font-variation-bold hyphens-auto md:text-5xl"
            id={`title-${_id}`}
          >
            <Link
              href={slug}
              className="text-fern-1100 before:content-[''] before:absolute before:inset-0 before:cursor-pointer before:rounded-lg before:z-1"
            >
              {title}
            </Link>
          </h2>
          {summary && (
            <div
              className="flex-auto text-lg text-ui-body line-clamp-4 md:line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: autoParagraph(summary, 'font-body'),
              }}
            />
          )}
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
    </article>
  )
}

export default Large
