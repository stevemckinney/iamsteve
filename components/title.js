/**
 * title
 * title, link (optional), text (optional)
 */
import Link from 'next/link'
// import Icon from './icon'

const Title = ({ children, link, text, ariaID, className }) => {
  return (
    <header
      className={`col-start-content-start col-end-content-end flex justify-between items-baseline md:items-center ${className}`}
    >
      <h2
        className="font-display text-heading text-2xl md:text-5xl font-variation-bold lowercase"
        id={ariaID}
      >
        {children}
      </h2>

      {link && (
        <Link
          href={link}
          className="flex gap-1 text-base md:text-xl font-ui lowercase transition duration-200 hover:text-link-hover"
        >
          {text ? text : 'All posts'}
          {/* <Icon icon="arrow-right" /> */}
        </Link>
      )}
    </header>
  )
}

export default Title
