import Link from 'next/link'
import Icon from '@/components/icon'
import Image from '@/components/image'

import styles from './hero.module.scss'

export default function Hero() {
  return (
    <div
      className={`${styles.hero} col-container flex flex-col items-center relative frame frame-outset-top pt-10 pb-[5.5rem] gap-y-4`}
    >
      <h1 className="text-fern-1100 font-display text-7xl col-start-7 col-end-12 font-variation-extrabold lowercase text-center max-w-[13ch]">
        Exploring web design craft
      </h1>
      <p className="text-2xl text-ui-body text-center w-2/4 max-w-[30ch]">
        Tips and tutorials about the design{'\u00A0'}and{'\u00A0'}build of web
        interfaces
      </p>
      <ul className="inline-flex gap-4 py-2">
        <li>
          <Link
            href="/design"
            className="flex gap-2 font-ui text-lg lowercase items-center"
          >
            <span className="p-1 bg-rio-300 rounded-lg">
              <Icon icon="pen" />
            </span>
            Explore design
          </Link>
        </li>
        <li>
          <Link
            href="/code"
            className="flex gap-2 font-ui text-lg lowercase items-center"
          >
            <span className="p-1 bg-dandelion-300 rounded-lg">
              <Icon icon="code" />
            </span>
            Explore code
          </Link>
        </li>
      </ul>
      <div className="w-[798px] h-[276px] relative">
        <Image
          src="/images/illustration/pencil.svg"
          width={962}
          height={46}
          className={`max-w-[initial] absolute right-[calc(100%_-_175px)] bottom-[10.125rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/ruler.svg"
          width={744}
          height={122}
          className={`max-w-[initial] absolute left-[calc(100%_-_111px)] bottom-[17.5rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot/sharpener.svg"
          width={96}
          height={96}
          className={`absolute top-[-4.35rem] left-[3.425rem] rotate-[15deg] max-w-[initial] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot/type.svg"
          width={32}
          height={32}
          className={`absolute max-w-[initial] top-[1.6rem] left-[13.275rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot/pen.svg"
          width={96}
          height={96}
          className={`absolute max-w-[initial] top-[.625rem] left-[21.75rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot/terminal.svg"
          width={96}
          height={96}
          className={`absolute max-w-[initial] top-[1.875rem] right-[12.525rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot/sticky.svg"
          width={96}
          height={96}
          className={`absolute max-w-[initial] top-[3.4rem] right-[3.525rem] rotate-[-15deg] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot/star.svg"
          width={96}
          height={96}
          className={`absolute max-w-[initial] bottom-[2.25rem] left-[5.95rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot/safari.svg"
          width={96}
          height={96}
          className={`absolute  max-w-[initial] top-[5.35rem] left-[12.95rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot/cursor.svg"
          width={32}
          height={32}
          className={`absolute max-w-[initial] bottom-[1.875rem] left-[16.2rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot/colour.svg"
          width={32}
          height={32}
          className={`absolute max-w-[initial] top-[8.625rem] left-[20.825rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot/component.svg"
          width={32}
          height={32}
          className={`absolute max-w-[initial] bottom-[4.235rem] right-[15.675rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot/figma.svg"
          width={96}
          height={96}
          className={`absolute max-w-[initial] bottom-[2.125rem] right-[19.05rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot/pencil.svg"
          width={96}
          height={96}
          className={`absolute max-w-[initial] bottom-[-.625rem] right-[7.45rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot/brush.svg"
          width={32}
          height={32}
          className={`absolute max-w-[initial] bottom-[3.625rem] right-[3rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
      </div>
    </div>
  )
}
