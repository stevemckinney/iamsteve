import Icon from '@/components/icon'
import Link from '@/components/link'

const Social = () => {
  return (
    <>
      <ul className="flex flex-row flex-wrap gap-x-6 gap-y-2 sm:gap-y-4">
        <li>
          <Link
            href="https://x.com/irsteve"
            className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
          >
            <Icon icon="x" size={16} className="text-current shrink-0" />
            x.com
          </Link>
        </li>
        <li>
          <Link
            href="https://www.figma.com/@stevemckinney"
            className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
          >
            <Icon icon="figma" size={16} className="text-current shrink-0" />
            Figma
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/stevemckinney"
            className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
          >
            <Icon icon="github" size={16} className="text-current shrink-0" />
            Github
          </Link>
        </li>
        <li>
          <Link
            href="https://www.linkedin.com/in/steve-mckinney-5b5836102/"
            className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
          >
            <Icon icon="linkedin" size={16} className="text-current shrink-0" />
            Linkedin
          </Link>
        </li>
        <li>
          <Link
            href="https://mastodon.design/@steve"
            className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
            rel="me"
          >
            <Icon icon="mastodon" size={16} className="text-current shrink-0" />
            Mastodon
          </Link>
        </li>
      </ul>
    </>
  )
}

export default Social
