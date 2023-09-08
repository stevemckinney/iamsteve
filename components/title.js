/**
 * title
 * title, link (optional), text (optional)
 */
import Link from 'next/link'
import Icon from './icon'

const Title = ({ title, link, text, ariaID, className }) => {
  return (
    <header
      className={`col-start-content-start col-end-content-end flex justify-between items-center px-8 -mx-8 bg-neutral-01-100 ${className}`}
    >
      <h2 className="font-display text-5xl font-variation-bold lowercase" id={ariaID}>
        {title}
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
