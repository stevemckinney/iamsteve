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
  // Find the category object directly instead of using findIndex
  const category = Categories.find((category) => category.title === children)
  const slugger = new GithubSlugger()

  // Provide fallbacks if category isn't found
  const theme = category?.theme || 'cornflour'
  const icon = category?.icon || 'folder'

  if (badge) {
    return (
      <Badge
        href={`/category/${slugger.slug(children)}`}
        rel="category tag"
        theme={theme}
        iconStart={icon}
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
        <Icon className={`text-current shrink-0`} icon={icon} size={size} />
        {children}
      </Link>
    )
  }
}

export function CategoryItem({ ...props }) {
  const { className, children, size } = props
  const category = Categories.find((category) => category.title === children)
  const slugger = new GithubSlugger()
  const icon = category?.icon || 'folder'

  return (
    <Link href={`/category/${slugger.slug(children)}`} className={className}>
      <Icon className={`text-current`} icon={icon} size={size} />
      {children}
    </Link>
  )
}

export default Category
