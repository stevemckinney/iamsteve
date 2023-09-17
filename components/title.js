/**
 * title
 * title, link (optional), text (optional)
 */
import Link from 'next/link'
import Icon from './icon'

const Title = ({ children, link, text, ariaID, className }) => {
  return (
    <header
      className={`col-start-content-start col-end-content-end flex justify-between items-center px-8 -mx-8 bg-neutral-01-100 ${className}`}
    >
      <h2
        className="font-display text-fern-1100 text-5xl font-variation-bold lowercase flex flex-row items-baseline"
        id={ariaID}
      >
        {children}
      </h2>

      {link && (
        <Link href={link} className="flex gap-1">
          {text ? text : 'All posts'}
          <span className="icon icon-medium icon-right secondary">
            <Icon icon="arrow-right" />
          </span>
        </Link>
      )}
    </header>
  )
}

export default Title
