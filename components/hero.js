import Link from 'next/link'
import Icon from '@/components/icon'
import Image from '@/components/image'

import styles from './hero.module.scss'

export default function Hero() {
  return (
    <div
      className={`${styles.hero} max-lg:grid max-lg:grid-cols-subgrid col-container place-items-center flex flex-col items-center relative frame frame-16 lg:frame-40 frame lg:frame-outset-top py-12 lg:pt-10 lg:pb-[5.5rem] gap-y-4 max-lg:px-4`}
    >
      <h1 className="max-lg:col-content text-fern-1100 font-display text-3xl xs:text-5xl lg:text-7xl col-start-7 col-end-12 font-variation-bold lg:font-variation-extrabold lowercase text-center max-w-[13ch]">
        Exploring web design craft
      </h1>
      <p className="max-lg:col-content text-sm xs:text-base lg:text-2xl text-ui-body text-center max-w-[30ch]">
        Tips and tutorials about the design{'\u00A0'}and{'\u00A0'}build of web
        interfaces
      </p>
      <ul className="inline-flex flex-wrap justify-center gap-4 max-lg:col-content lg:py-2 max-lg:mb-12">
        <li>
          <Link
            href="/design"
            className="flex items-center gap-2 lowercase font-ui lg:text-lg"
          >
            <span
              className="p-1 rounded-lg bg-rio-300 max-lg:hidden"
              role="presentation"
              aria-hidden="true"
            >
              <Icon icon="pen" />
            </span>
            <span
              className="p-1 rounded-lg bg-rio-300 lg:hidden"
              role="presentation"
              aria-hidden="true"
            >
              <Icon icon="pen" size={16} />
            </span>
            Explore design
          </Link>
        </li>
        <li>
          <Link
            href="/code"
            className="flex items-center gap-2 lowercase font-ui lg:text-lg"
          >
            <span
              className="p-1 rounded-lg bg-dandelion-300 max-lg:hidden"
              aria-hidden="true"
            >
              <Icon icon="code" />
            </span>
            <span
              className="p-1 rounded-lg bg-dandelion-300 lg:hidden"
              aria-hidden="true"
            >
              <Icon icon="code" size={16} />
            </span>
            Explore code
          </Link>
        </li>
      </ul>
      <div className="flex flex-row justify-end max-w-full gap-2 max-lg:[grid-column:1/-1] flex-nowrap max-lg:px-12 lg:hidden">
        <Image
          src="/images/illustration/spot-mono/sharpener.svg"
          width={96}
          height={96}
          className={`max-w-[initial] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/star.svg"
          width={96}
          height={96}
          className={`max-w-[initial] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/sticky.svg"
          width={96}
          height={96}
          className={`max-w-[initial] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/safari.svg"
          width={96}
          height={96}
          className={`max-w-[initial] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/figma.svg"
          width={96}
          height={96}
          className={`max-w-[initial] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/terminal.svg"
          width={96}
          height={96}
          className={`max-w-[initial] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/pencil.svg"
          width={96}
          height={96}
          className={`max-w-[initial] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/pen.svg"
          width={96}
          height={96}
          className={`max-w-[initial] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/sharpener.svg"
          width={96}
          height={96}
          className={`max-w-[initial] lg:hidden drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/star.svg"
          width={96}
          height={96}
          className={`max-w-[initial] lg:hidden drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/sticky.svg"
          width={96}
          height={96}
          className={`max-w-[initial] lg:hidden drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/safari.svg"
          width={96}
          height={96}
          className={`max-w-[initial] lg:hidden drop-shadow-placed`}
          alt=""
          role="presentation"
        />
      </div>
      <div className="flex gap-2 flex-row flex-nowrap max-lg:[grid-column:1/-1] max-lg:px-12 max-w-full lg:relative lg:w-[798px] lg:h-[276px]">
        <Image
          src="/images/illustration/pencil-mono.svg"
          width={962}
          height={46}
          className={`max-lg:hidden max-w-[initial] lg:absolute right-[calc(100%_-_175px)] bottom-[10.125rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/ruler-mono.svg"
          width={744}
          height={122}
          className={`max-lg:hidden max-w-[initial] lg:absolute left-[calc(100%_-_111px)] bottom-[17.5rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/type.svg"
          width={32}
          height={32}
          className={`max-lg:hidden absolute max-w-[initial] top-[1.6rem] left-[13.275rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/pen.svg"
          width={96}
          height={96}
          className={`lg:absolute max-w-[initial] top-[.625rem] left-[21.75rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/terminal.svg"
          width={96}
          height={96}
          className={`lg:absolute max-w-[initial] top-[1.875rem] right-[12.525rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/sharpener.svg"
          width={96}
          height={96}
          className={`lg:absolute top-[-4.35rem] left-[3.425rem] lg:rotate-[15deg] max-w-[initial] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/star.svg"
          width={96}
          height={96}
          className={`lg:absolute max-w-[initial] bottom-[2.25rem] left-[5.95rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/sticky.svg"
          width={96}
          height={96}
          className={`lg:absolute max-w-[initial] top-[3.4rem] right-[3.525rem] lg:rotate-[-15deg] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/safari.svg"
          width={96}
          height={96}
          className={`lg:absolute max-w-[initial] top-[5.35rem] left-[12.95rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/cursor.svg"
          width={32}
          height={32}
          className={`max-lg:hidden absolute max-w-[initial] bottom-[1.875rem] left-[16.2rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/colour.svg"
          width={32}
          height={32}
          className={`max-lg:hidden absolute max-w-[initial] top-[8.625rem] left-[20.825rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/component.svg"
          width={32}
          height={32}
          className={`max-lg:hidden absolute max-w-[initial] bottom-[4.235rem] right-[15.675rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/figma.svg"
          width={96}
          height={96}
          className={`lg:absolute max-w-[initial] bottom-[2.125rem] right-[19.05rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/pencil.svg"
          width={96}
          height={96}
          className={`lg:absolute max-w-[initial] bottom-[-.625rem] right-[7.45rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/brush.svg"
          width={32}
          height={32}
          className={`max-lg:hidden absolute max-w-[initial] bottom-[3.625rem] right-[3rem] drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/sharpener.svg"
          width={96}
          height={96}
          className={`max-w-[initial] lg:hidden drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/star.svg"
          width={96}
          height={96}
          className={`max-w-[initial] lg:hidden drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/sticky.svg"
          width={96}
          height={96}
          className={`max-w-[initial] lg:hidden drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/spot-mono/safari.svg"
          width={96}
          height={96}
          className={`max-w-[initial] lg:hidden drop-shadow-placed`}
          alt=""
          role="presentation"
        />
      </div>
    </div>
  )
}
