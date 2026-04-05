import Icon from './Icon'

const links = [
  { href: 'https://x.com/irsteve', icon: 'x', label: 'x.com' },
  { href: 'https://www.figma.com/@stevemckinney', icon: 'figma', label: 'Figma' },
  { href: 'https://github.com/stevemckinney', icon: 'github', label: 'Github' },
  { href: 'https://www.linkedin.com/in/smcknny/', icon: 'linkedin', label: 'Linkedin' },
  { href: 'https://mastodon.design/@steve', icon: 'mastodon', label: 'Mastodon', rel: 'me' },
]

export default function Social() {
  return (
    <ul className="flex flex-row flex-wrap gap-x-6 gap-y-2 sm:gap-y-4">
      {links.map(({ href, icon, label, rel }) => (
        <li key={icon}>
          <a
            href={href}
            className="flex flex-row items-center gap-2 text-base font-ui lowercase text-emphasis hover:text-link-hover transition duration-200"
            {...(rel ? { rel } : {})}
          >
            <Icon icon={icon} size={16} className="text-current shrink-0" />
            {label}
          </a>
        </li>
      ))}
    </ul>
  )
}
