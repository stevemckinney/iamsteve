import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'
import Icon from '@/components/icon/index.js'

const Category = ({ text, styling = 'warm secondary-hover', icon }) => {
  return (
    <Link href={`/category/${kebabCase(text)}`} rel="category tag" className={styling}>
      <>
        {icon && <Icon kind={text.toLowerCase()} />}
        {text.split(' ').join('-')}
      </>
    </Link>
  )
}

export default Category
