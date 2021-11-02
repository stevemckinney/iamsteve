import Link from 'next'
import Icon from './icon'

const SectionHeader = ({ title, href }) => (
<header class="row row-header contain contain-medium contain-large between">
  <h2 class="f4-l chunky neutral row-title" id="latest-posts-title">{title}</h2>
  <Link href={href} class="link-icon warm secondary-hover card-permalink semibold sans f5-l">
    All posts <Icon kind="arrowRight" />
  </Link>
</header>
)

export default SectionHeader