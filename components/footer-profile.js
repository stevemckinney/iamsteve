import Subscribe from '@/components/subscribe'
import Icon from '@/components/icon'
import Link from '@/components/link'

export default function FooterProfile() {
  return (
    <aside className="grid grid-flow-dense grid-cols-2 sm:grid-cols-[repeat(16,_minmax(min-content,_1fr))] grid-rows-[repeat(auto-fill,_minmax(min-content,1fr))] gap-2 col-start-container-start col-end-container-end">
      <Subscribe className="col-span-full lg:col-span-8 xl:col-span-6 row-span-6 rounded-lg lg:rounded-xl bg-white shadow-placed py-12 px-8 sm:px-12 sm:py-12 md:px-[10vmax] xl:px-[4.5rem]" />

      <div className="col-span-full sm:col-span-8 xl:col-span-10 row-span-4 rounded-lg lg:rounded-xl bg-white shadow-placed py-12 px-8 sm:px-12 sm:py-12 xl:px-[4.5rem] flex flex-col justify-end">
        <h3 className="font-display font-variation-bold text-lg sm:text-3xl lowercase flex gap-2 mb-3">
          About this site
        </h3>
        <p className="text-ui-body text-base mb-2">
          Hi, I’m Steve McKinney, I write this publication focusing on the
          design and build of websites. The aim is to bridge the gap between
          design tools and building your design.
        </p>
        <p className="text-ui-body text-base">
          And explore the craft and technique behind creating websites. It
          started—and remains—a way to encourage self learning and sharing what
          I know.
        </p>
      </div>

      <div className="col-span-1 sm:col-span-8 lg:col-span-4 xl:col-span-5 row-span-2 rounded-lg lg:rounded-xl bg-white shadow-placed py-12 px-8 sm:px-12 sm:py-12 xl:px-[4.5rem] flex flex-col justify-end">
        <h3 className="font-display font-variation-bold text-lg sm:text-3xl lowercase mb-4">
          Site
        </h3>
        <ul className="flex flex-row flex-wrap gap-x-6 gap-y-2 sm:gap-y-4">
          <li>
            <Link
              href="/"
              className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
            >
              <Icon icon="home" size={16} className="text-current shrink-0" />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
            >
              <Icon icon="folder" size={16} className="text-current shrink-0" />
              Archive
            </Link>
          </li>
          <li>
            <Link
              href="/design"
              className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
            >
              <Icon icon="pen" size={16} className="text-current shrink-0" />{' '}
              Design
            </Link>
          </li>
          <li>
            <Link
              href="/code"
              className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
            >
              <Icon icon="code" size={16} className="text-current shrink-0" />
              Code
            </Link>
          </li>
          <li>
            <Link
              href="/uses"
              className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
            >
              <Icon
                icon="settings"
                size={16}
                className="text-current shrink-0"
              />
              Uses
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
            >
              <Icon icon="person" size={16} className="text-current shrink-0" />
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
            >
              <Icon
                icon="envelope"
                size={16}
                className="text-current shrink-0"
              />
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/newsletter"
              className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
            >
              <Icon
                icon="airplane"
                size={16}
                className="text-current shrink-0"
              />
              Newsletter
            </Link>
          </li>
        </ul>
      </div>

      <div className="col-span-1 sm:col-span-8 lg:col-span-4 xl:col-span-5 row-span-1 rounded-lg lg:rounded-xl bg-white shadow-placed py-8 sm:p-12 flex items-center justify-center">
        <Link
          href="https://v7.iamsteve.me"
          className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
        >
          Old design
          <Icon icon="external" size={16} className="text-current shrink-0" />
        </Link>
      </div>

      <div className="col-span-1 sm:col-span-8 lg:col-span-4 xl:col-span-5 row-span-1 rounded-lg lg:rounded-xl bg-white shadow-placed py-12 px-8 sm:px-12 sm:py-12 xl:px-[4.5rem] flex flex-col justify-end">
        <h3 className="font-display font-variation-bold text-lg sm:text-3xl lowercase mb-4">
          Elsewhere
        </h3>
        <ul className="flex flex-row flex-wrap gap-x-6 gap-y-2 sm:gap-y-4">
          <li>
            <Link
              href="x.com/irsteve"
              className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
            >
              <Icon icon="x" size={16} className="text-current shrink-0" />
              x.com
            </Link>
          </li>
          <li>
            <Link
              href="x.com/irsteve"
              className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
            >
              <Icon icon="figma" size={16} className="text-current shrink-0" />
              Figma
            </Link>
          </li>
          <li>
            <Link
              href="x.com/irsteve"
              className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
            >
              <Icon icon="github" size={16} className="text-current shrink-0" />
              Github
            </Link>
          </li>
          <li>
            <Link
              href="x.com/irsteve"
              className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
            >
              <Icon
                icon="linkedin"
                size={16}
                className="text-current shrink-0"
              />
              Linkedin
            </Link>
          </li>
          <li>
            <Link
              href="x.com/irsteve"
              className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
            >
              <Icon
                icon="mastodon"
                size={16}
                className="text-current shrink-0"
              />
              Mastodon
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}
