import Image from 'next/image'
import Link from './Link'
import Social from '@/components/Social'
import Logo from '@/images/logo-small.svg'

export default function FooterProfile() {
  return (
    <aside className="row row-normal pt6 pt8-d contain contain-medium contain-large between items-end">
      <section className="column column-4-b column-3-d mb6 mb0-b">
        <Link href="/" title="Back to the homepage" className="logo-footer mb4 primary">
          <Logo className="logo-small fill-currentcolor" />
        </Link>
        <p className="mb4">
          iamsteve is a blog written by Steve McKinney, focusing on the design and build of
          websites. The aim is to bridge the gap in building your design. It
          started&thinsp;—&thinsp;and remains&thinsp;—&thinsp;a way to encourage self learning and
          sharing, through a mixture of in depth tutorials and quick tips.
        </p>
        <p>
          <strong className="sans">You can find me elsewhere</strong> <br />
          <Social />
        </p>
      </section>
      <section className="column column-4-b column-5-d rio-osc text-right items-end-b" id="rio-osc">
        <Image
          src="/static/images/rio-osc.svg"
          alt="An illustration of two dogs, a red Border Collie and Jack Russell cross"
          width={512}
          height={288}
        />
      </section>
    </aside>
  )
}
