import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Category = ({ text }) => {
  return (
    <Link href={`/category/${kebabCase(text)}`}>
      <a rel="category tag" class="warm secondary-hover">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Category
