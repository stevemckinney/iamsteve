import Link from 'next'
import Title from './Title';
import Card from './Card';
import Loop from './Loop';
import Icon from './icon'

const Posts = ({ title, posts, initialDisplayPosts, pagination }) => (
  <section class="posts pt7 pb6 pb8-d" aria-labelledby="latest-posts-title">
    <Title title={title} href='/blog' />
    <div class="scroll scroll-medium contain-scroll" id="latest-posts">
      <Loop 
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination} />
      <Link href="{path='blog/P12'}" class="link-icon warm secondary-hover card-permalink semibold sans center f2-l">
        All posts <span class="icon icon-medium icon-right secondary"><Icon kind="arrowRight" /></span>
      </Link>
    </div>
  </section>
)

export default Posts