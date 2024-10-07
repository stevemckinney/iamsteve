import GithubSlugger from 'github-slugger'
import Badge from '@/components/badge'
import Categories from '@/content/categories'
import Icon from './icon'
import Link from '@/components/link'

const Category = ({
  size = 16,
  badge = true,
  className = 'category',
  children,
}) => {
  const title = Categories.findIndex((category) => category.title === children)
  const slugger = new GithubSlugger()
  const category = Categories[title]

  const theme = category.theme !== undefined ? category.theme : 'cornflour'
  const icon = category.icon !== undefined ? category.icon : 'folder'
  // const theme = 'dandelion'
  // const icon = 'folder'

  if (badge) {
    return (
      <Badge
        href={`/category/${slugger.slug(children)}`}
        rel="category tag"
        theme={`${theme}`}
        iconStart={`${icon}`}
        size={size}
        className={className}
      >
        {children}
      </Badge>
    )
  } else {
    return (
      <Link
        href={`/category/${slugger.slug(children)}`}
        className={className}
        rel="category tag"
      >
        <Icon className={`text-current flex-shrink-0`} icon={category.icon} size={size} />
        {children}
      </Link>
    )
  }
}

export function CategoryItem({ ...props }) {
  const title = Categories.findIndex((category) => category.title === children)
  const slugger = new GithubSlugger()
  const category = Categories[title]
  const { className, children, size } = props

  return (
    <Link href={`/category/${slugger.slug(children)}`} className={className}>
      <Icon className={`text-current`} icon={category.icon} size={size} />
      {children}
    </Link>
  )
}

export default Category
