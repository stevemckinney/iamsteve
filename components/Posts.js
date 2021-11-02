import Link from 'next'
import SectionHeader from 'SectionHeader';
import Card from 'Card';
import Icon from './icon'

const SectionHeader = ({ title, href }) => (
  <section class="posts pt7 pb6 pb8-d" aria-labelledby="latest-posts-title">
    <SectionHeader title='Latest posts' href="/blog" />
    <div class="scroll scroll-medium contain-scroll" id="latest-posts">
      <Card />
      <Link href="{path='blog/P12'}" class="link-icon warm secondary-hover card-permalink semibold sans center f2-l">
        All posts <span class="icon icon-medium icon-right secondary"><Icon kind="arrowRight" /></span>
      </Link>
    </div>
  </section>
)

export default Posts