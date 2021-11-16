/**
 * title
 * title, link (optional)
 */
import Link from 'next/link'
import Icon from './icon'

const Title = ({ title, link, text = 'All posts' }) => {
  return (
    <header className="row row-header contain contain-medium contain-large between">
      <h2 className="f4-l chunky neutral row-title" id="latest-posts-title">{title}</h2>

      {link && (
        <Link href={link}>
          <a className="link-icon warm secondary-hover card-permalink semibold sans f5-l">
            {text}
            <span class="icon icon-medium icon-right secondary"><Icon kind="right" /></span>
          </a>
        </Link>
      )}
    </header>
  )
}

export default Title
