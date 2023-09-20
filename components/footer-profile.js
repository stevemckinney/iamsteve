import Subscribe from '@/components/subscribe'
import Icon from '@/components/icon'
import Link from '@/components/link'

export default function FooterProfile() {
  return (
    <aside className="grid grid-cols-subgrid gap-y-18 col-start-container-start col-end-container-end  rounded-xl bg-white shadow-picked py-32">
      <Subscribe className="flex justify-between col-start-content-start col-end-content-end items-end" />
      <hr className="col-content bg-rule h-[2px] border-0" />
      <div className="col-start-content-start col-span-5">
        <Icon icon="logo" className="text-fern-1100 mb-2" size={32} />
        <h3 className="font-display font-variation-bold text-xl lowercase mb-1">
          Thanks for reading
        </h3>
        <p className="text-ui-body text-base mb-2">
          Hi, I’m Steve McKinney, I write this publication focusing on the
          design and build of websites. The aim is to bridge the gap between
          Figma and building your design.
        </p>
        <p className="text-ui-body text-base">
          And explore the craft and technique behind creating websites. It
          started—and remains—a way to encourage self learning and sharing what
          I know.
        </p>
      </div>

      <div className="col-start-10 col-span-5 flex flex-row gap-8">
        <div className="list flex-1">
          <h3 className="font-display font-variation-bold text-xl lowercase mb-4">
            Site
          </h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/"
                className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
              >
                <Icon icon="home" size={16} className="text-current" />
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
              >
                <Icon icon="folder" size={16} className="text-current" />
                Archive
              </Link>
            </li>
            <li>
              <Link
                href="/design"
                className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
              >
                <Icon icon="pen" size={16} className="text-current" /> Design
              </Link>
            </li>
            <li className="border-b border-neutral-02-100 pb-2">
              <Link
                href="/code"
                className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
              >
                <Icon icon="code" size={16} className="text-current" />
                Code
              </Link>
            </li>
            <li>
              <Link
                href="/uses"
                className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
              >
                <Icon icon="settings" size={16} className="text-current" />
                Uses
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
              >
                <Icon icon="person" size={16} className="text-current" />
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
              >
                <Icon icon="envelope" size={16} className="text-current" />
                Contact
              </Link>
            </li>
            <li className="border-b border-neutral-02-100 pb-2">
              <Link
                href="/newsletter"
                className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
              >
                <Icon icon="airplane" size={16} className="text-current" />
                Newsletter
              </Link>
            </li>
            <li>
              <Link
                href="https://v7.iamsteve.me"
                className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
              >
                <Icon icon="external" size={16} className="text-current" />
                Old design (V7)
              </Link>
            </li>
          </ul>
        </div>

        <div className="list flex-1">
          <h3 className="font-display font-variation-bold text-xl lowercase mb-4">
            Elsewhere
          </h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="x.com/irsteve"
                className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
              >
                <Icon icon="x" size={16} className="text-current" />
                x.com
              </Link>
            </li>
            <li>
              <Link
                href="x.com/irsteve"
                className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
              >
                <Icon icon="figma" size={16} className="text-current" />
                Figma
              </Link>
            </li>
            <li>
              <Link
                href="x.com/irsteve"
                className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
              >
                <Icon icon="github" size={16} className="text-current" />
                Github
              </Link>
            </li>
            <li>
              <Link
                href="x.com/irsteve"
                className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
              >
                <Icon icon="linkedin" size={16} className="text-current" />
                Linkedin
              </Link>
            </li>
            <li>
              <Link
                href="x.com/irsteve"
                className="flex flex-row items-center gap-2 text-base font-ui lowercase text-fern-1100 hover:text-dandelion-600 transition duration-200"
              >
                <Icon icon="mastodon" size={16} className="text-current" />
                Mastodon
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
