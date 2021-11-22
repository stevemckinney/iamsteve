import Link from './Link'
import { useRouter } from 'next/router'
import headerNavLinks from '@/data/headerNavLinks'
import Icon from '@/components/icon'

const Tabbar = () => {
  const router = useRouter()

  return (
    <nav className="tabbar hide-c" aria-hidden="true">
      {headerNavLinks.map((link) => (
        <Link
          key={link.title}
          href={link.href}
          className={
            router.pathname == link.href
              ? `tabbar-item tabbar-item-h flex-1 sans semibold active tertiary-dc`
              : `tabbar-item tabbar-item-h flex-1 sans semibold warm-l1`
          }
        >
          <span className={`icon icon-${link.icon}`}>
            <Icon kind={link.icon} />
          </span>
          <span className="tabbar-item-text warm-l2">{link.title}</span>
        </Link>
      ))}
    </nav>
  )
}

export default Tabbar
