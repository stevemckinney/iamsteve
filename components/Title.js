/**
 * title
 * title, link (optional), text (optional)
 */
import Link from 'next/link'
import Icon from './icon'

const Title = ({ title, link, text }) => {
  return (
    <header className="row row-header contain contain-medium contain-large between">
      <h2 className="f6 f5-a f4-c chunky neutral row-title" id="latest-posts-title">
        {title}
      </h2>

      {link && (
        <Link href={link}>
          <a className="link-icon warm secondary-hover card-permalink semibold sans f7 f6-a f5-c">
            {text ? text : 'All posts'}
            <span className="icon icon-medium icon-right secondary">
              <Icon kind="right" />
            </span>
          </a>
        </Link>
      )}
    </header>
  )
}

export default Title
