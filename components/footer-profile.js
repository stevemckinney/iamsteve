import Subscribe from '@/components/subscribe'
import Icon from '@/components/icon'
import Link from '@/components/link'
import { footer } from '@/content/navigation'

export default function FooterProfile() {
  return (
    <aside className="grid grid-flow-dense grid-cols-2 sm:grid-cols-[repeat(16,minmax(min-content,1fr))] grid-rows-[repeat(auto-fill,minmax(min-content,1fr))] gap-px col-start-container-start col-end-container-end shadow-placed rounded-lg lg:rounded-xl overflow-hidden">
      <Subscribe className="col-span-full lg:col-span-8 xl:col-span-7 row-span-10 bg-surface py-12 px-8 sm:px-12 sm:py-12 md:px-[5vmax] xl:py-16 xl:px-24" />

      <div className="@container/about col-span-full sm:col-span-8 xl:col-span-9 row-span-7 bg-surface py-12 px-8 sm:px-12 sm:py-12 xl:px-18 content-end dark:shadow-[-1px_1px_0_0_var(--color-surface-02)]">
        <h3 className="text-heading font-display font-variation-bold text-lg sm:text-3xl lowercase flex gap-2 mb-3">
          About the website
        </h3>
        <div className="flex flex-col @md:flex-row gap-x-6 gap-y-2">
          <p className="text-ui-body text-base flex-1">
            Hi, I’m Steve McKinney, I write this small publication focusing on
            the design and build of websites. The aim is to bridge the gap
            between your design tool and code. And look at the craft behind
            creating websites.
          </p>
          <p className="text-ui-body text-base flex-1">
            This is a broad topic in itself, which feels challenging to achieve.
            But it remains—a way to encourage self learning and sharing what I
            know…
            <Link
              href="/about"
              className="font-semibold text-link hover:text-link-hover transition duration-200 ease"
            >
              continue reading
            </Link>
          </p>
        </div>
      </div>

      <div className="col-span-1 sm:col-span-8 lg:col-span-4 xl:col-span-5 row-span-3 bg-surface py-12 px-8 sm:px-12 sm:py-12 xl:px-18 flex flex-col justify-end dark:shadow-[-1px_0_0_0_var(--color-surface-02)]">
        <h3 className="text-heading font-display font-variation-bold text-lg sm:text-3xl lowercase mb-4">
          Site
        </h3>
        <ul className="flex flex-row flex-wrap gap-x-6 gap-y-2 sm:gap-y-4">
          {footer.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex flex-row items-center gap-2 text-base font-ui lowercase text-body hover:text-link-hover transition duration-200"
              >
                <Icon
                  icon={link.icon}
                  size={link.size}
                  variant={link.icon === 'airplane' ? 'none' : 'header'}
                  style={
                    link.icon === 'airplane'
                      ? { '--icon-fill': 'transparent' }
                      : undefined
                  }
                />
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-1 sm:col-span-8 lg:col-span-4 xl:col-span-4 row-span-1 bg-surface py-8 sm:p-12 flex items-center justify-center dark:shadow-[-1px_1px_var(--color-surface-02)]">
        <Link
          href="https://v7.iamsteve.me"
          className="flex flex-row items-center gap-2 text-base font-ui lowercase text-body hover:text-link-hover transition duration-200"
        >
          Old design
          <Icon icon="external" size={16} />
        </Link>
      </div>

      <div className="col-span-1 sm:col-span-8 lg:col-span-4 xl:col-span-4 row-span-2 bg-surface py-12 px-8 sm:px-12 sm:py-12 xl:px-18 flex flex-col justify-end dark:shadow-[-1px_0_var(--color-surface-02)]">
        <h3 className="text-heading font-display font-variation-bold text-lg sm:text-3xl lowercase mb-4">
          Elsewhere
        </h3>
        <ul className="flex flex-row flex-wrap gap-x-6 gap-y-2 sm:gap-y-4">
          <li>
            <Link
              href="https://x.com/irsteve"
              className="flex flex-row items-center gap-2 text-base font-ui lowercase text-body hover:text-link-hover transition duration-200"
            >
              <Icon icon="x" size={16} variant="header" />
              x.com
            </Link>
          </li>
          <li>
            <Link
              href="https://www.figma.com/@stevemckinney"
              className="flex flex-row items-center gap-2 text-base font-ui lowercase text-body hover:text-link-hover transition duration-200"
            >
              <Icon icon="figma" size={16} variant="header" />
              Figma
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/stevemckinney"
              className="flex flex-row items-center gap-2 text-base font-ui lowercase text-body hover:text-link-hover transition duration-200"
            >
              <Icon icon="github" size={16} variant="header" />
              Github
            </Link>
          </li>
          <li>
            <Link
              href="https://www.linkedin.com/in/steve-mckinney-5b5836102/"
              className="flex flex-row items-center gap-2 text-base font-ui lowercase text-body hover:text-link-hover transition duration-200"
            >
              <Icon icon="linkedin" size={16} variant="header" />
              Linkedin
            </Link>
          </li>
          <li>
            <Link
              href="https://mastodon.design/@steve"
              className="flex flex-row items-center gap-2 text-base font-ui lowercase text-body hover:text-link-hover transition duration-200"
              rel="me"
            >
              <Icon icon="mastodon" size={16} variant="header" />
              Mastodon
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}
