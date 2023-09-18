/**
 * title
 * title, link (optional), text (optional)
 */
import Link from 'next/link'
// import Icon from './icon'

const Title = ({ children, link, text, ariaID, className }) => {
  return (
    <header
      className={`col-start-content-start col-end-content-end flex justify-between items-center px-8 -mx-8 bg-neutral-01-100 ${className}`}
    >
      <h2
        className="font-display text-fern-1100 text-5xl font-variation-bold lowercase"
        id={ariaID}
      >
        {children}
      </h2>

      {link && (
        <Link
          href={link}
          className="flex items-center gap-1 text-xl font-ui lowercase transition duration-200 hover:text-dandelion-600"
        >
          {text ? text : 'All posts'}
          {/* <Icon icon="arrow-right" /> */}
        </Link>
      )}
    </header>
  )
}

export default Title
