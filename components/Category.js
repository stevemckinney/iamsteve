import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'
import Icon from '@/components/icon'

const Category = ({ text, styling = 'warm secondary-hover', icon }) => {
  return (
    <Link href={`/category/${kebabCase(text)}`}>
      <a rel="category tag" className={styling}>
        <>
        {icon && (<Icon kind={text.toLowerCase()} />)}
        {text.split(' ').join('-')}
        </>
      </a>
    </Link>
  )
}

export default Category
