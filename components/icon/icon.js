import * as AccessibleIcon from '@radix-ui/react-accessible-icon'
import About from './about.svg'
import ArrowLeft from './arrow-left.svg'
import ArrowRight from './arrow-right.svg'
import Blog from './blog.svg'
import Category from './category.svg'
import Code from './code.svg'
import Coffee from './buy-coffee.svg'
import Contact from './contact.svg'
import Date from './date.svg'
import Design from './design.svg'
import Home from './home.svg'
import Newsletter from './newsletter.svg'
import Save from './save.svg'
import Saved from './saved.svg'
import Search from './search.svg'
import SearchSmall from './search-small.svg'
import Time from './time.svg'

const components = {
  about: About,
  left: ArrowLeft,
  right: ArrowRight,
  blog: Blog,
  category: Category,
  code: Code,
  coffee: Coffee,
  contact: Contact,
  date: Date,
  design: Design,
  home: Home,
  nwslttr: Newsletter,
  save: Save,
  saved: Saved,
  search: Search,
  searchSmall: SearchSmall,
  time: Time,
  website: Home,
  technology: Code,
  life: Home,
  terminal: Code,
}

const Icon = ({ kind }) => {
  const IconSvg = components[kind]

  return (
    <>
      <AccessibleIcon.Root label={kind[0].toUpperCase() + kind.slice(1)} />
      <IconSvg />
    </>
  )
}

export default Icon
