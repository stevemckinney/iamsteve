import GithubSlugger from 'github-slugger'
import Badge from '@/components/badge'
import Categories from '@/content/categories'

const Category = ({ size = 16, children }) => {
  const title = Categories.findIndex((category) => category.title === children)
  const slugger = new GithubSlugger()
  const category = Categories[title]

  const theme = category.theme !== undefined ? category.theme : 'cornflour'
  const icon = category.icon !== undefined ? category.icon : 'folder'

  return (
    <Badge
      href={`/category/${slugger.slug(children)}`}
      rel="category tag"
      theme={`${theme}`}
      iconStart={`${icon}`}
      size={size}
    >
      {children}
    </Badge>
  )
}

export default Category
