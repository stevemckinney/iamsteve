/**
 * title
 * title, link (optional), text (optional)
 */
import Link from 'next/link'
import Icon from './icon'

const Title = ({ title, link, text, ariaID }) => {
  return (
    <header className="col-content flex justify-between items-center">
      <h2 className="font-display text-4xl font-variation-bold lowercase" id={ariaID}>
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
