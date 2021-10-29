import Link from './Link'
import { useRouter } from 'next/router';
import headerNavLinks from '@/data/headerNavLinks'

const Tabbar = () => {
  const router = useRouter();
  
  return (
    <>
    {headerNavLinks.map((link) => (    
      <Link
        key={link.title}
        href={link.href}
        className={router.pathname == link.href ? `tabbar-item tabbar-item-h flex-1 sans semibold active tertiary-dc` : `tabbar-item tabbar-item-h flex-1 sans semibold warm-l1`}
      >
        <span className="icon"></span>
        <span className="tabbar-item-text warm-l2">{link.title}</span>
      </Link>
    ))}
    </>
  )
}

export default Tabbar