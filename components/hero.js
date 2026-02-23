import Link from 'next/link'
import Icon from '@/components/icon'
import Image from '@/components/image'
import {
  Sharpener,
  Star,
  Sticky,
  Safari,
  Figma,
  Terminal,
  Pencil,
  Pen,
  Type,
  Cursor,
  Colour,
  Component,
  Brush,
  PencilMono,
  RulerMono,
} from '@/components/illustration'

export default function Hero() {
  return (
    <section
      className={`mb-10 md:mb-18 max-lg:grid max-lg:grid-cols-subgrid col-start-container-start col-end-container-end place-items-center flex flex-col items-center relative frame frame-24 2xl:frame-40 md:frame-outset-top-sm lg:frame-outset-top-md 2xl:frame-outset-top py-12 md:pt-10 lg:pb-22 gap-y-4 max-lg:px-4`}
      aria-labelledby="hero-title"
    >
      <h1
        id="hero-title"
        className="max-lg:col-content text-heading font-display text-3xl xs:text-5xl lg:text-7xl col-start-7 col-end-12 font-variation-bold lg:font-variation-extrabold lowercase text-center max-w-[13ch]"
      >
        Exploring web design craft
      </h1>
      <p className="max-lg:col-content text-sm xs:text-base lg:text-2xl text-ui-body text-center max-w-[30ch]">
        Tips and tutorials about the design{'\u00A0'}and{'\u00A0'}build of web
        interfaces
      </p>
      <ul className="inline-flex flex-wrap justify-center gap-4 max-lg:col-content lg:py-2 max-lg:mb-12">
        <li>
          <Link
            href="/category/design"
            className="flex items-center gap-2 lowercase font-ui lg:text-lg transition duration-200 ease-in hover:text-rio"
          >
            <span
              className="p-1 rounded-lg bg-[light-dark(var(--color-rio-300),var(--color-rio-300))] max-lg:hidden"
              aria-hidden="true"
            >
              <Icon icon="pen" variant="on-light" className="text-fern-1100" />
            </span>
            <span
              className="p-1 rounded-lg bg-rio lg:hidden"
              aria-hidden="true"
            >
              <Icon
                icon="pen"
                size={16}
                variant="on-light"
                className="text-fern-1100"
              />
            </span>
            Explore design
          </Link>
        </li>
        <li>
          <Link
            href="/category/code"
            className="flex items-center gap-2 lowercase font-ui lg:text-lg transition duration-200 ease-in hover:text-dandelion"
          >
            <span
              className="p-1 rounded-lg bg-dandelion max-lg:hidden"
              aria-hidden="true"
            >
              <Icon icon="code" variant="on-light" className="text-fern-1100" />
            </span>
            <span
              className="p-1 rounded-lg bg-[light-dark(var(--color-dandelion-300),var(--color-dandelion-200))] lg:hidden"
              aria-hidden="true"
            >
              <Icon
                icon="code"
                size={16}
                variant="on-light"
                className="text-fern-1100"
              />
            </span>
            Explore code
          </Link>
        </li>
      </ul>
      <div className="flex flex-row justify-end max-w-full gap-2 max-lg:col-span-full flex-nowrap max-lg:px-12 lg:hidden">
        <Sharpener
          className={`max-w-[initial] drop-shadow-placed flex-[0_0_auto]`}
        />
        <Star
          className={`max-w-[initial] drop-shadow-placed flex-[0_0_auto]`}
        />
        <Sticky
          className={`max-w-[initial] drop-shadow-placed flex-[0_0_auto]`}
        />
        <Safari
          className={`max-w-[initial] drop-shadow-placed flex-[0_0_auto]`}
        />
        <Figma
          className={`max-w-[initial] drop-shadow-placed flex-[0_0_auto]`}
        />
        <Terminal
          className={`max-w-[initial] drop-shadow-placed flex-[0_0_auto]`}
        />
        <Pencil
          className={`max-w-[initial] drop-shadow-placed flex-[0_0_auto]`}
        />
        <Pen className={`max-w-[initial] drop-shadow-placed flex-[0_0_auto]`} />
        <Sharpener
          className={`max-w-[initial] lg:hidden drop-shadow-placed flex-[0_0_auto]`}
        />
        <Star
          className={`max-w-[initial] lg:hidden drop-shadow-placed flex-[0_0_auto]`}
        />
        <Sticky
          className={`max-w-[initial] lg:hidden drop-shadow-placed flex-[0_0_auto]`}
        />
        <Safari
          className={`max-w-[initial] lg:hidden drop-shadow-placed flex-[0_0_auto]`}
        />
      </div>
      <div className="flex gap-2 flex-row flex-nowrap max-lg:col-span-full max-lg:px-12 max-w-full lg:relative lg:w-[798px] lg:h-[276px]">
        <Figma
          className={`max-w-[initial] lg:hidden drop-shadow-placed flex-[0_0_auto]`}
        />
        <PencilMono
          width={962}
          height={46}
          className={`max-lg:hidden max-w-[initial] lg:absolute right-[calc(100%-175px)] bottom-40.5 drop-shadow-placed`}
        />
        <RulerMono
          width={744}
          height={122}
          className={`max-lg:hidden max-w-[initial] lg:absolute left-[calc(100%-111px)] bottom-70 drop-shadow-placed`}
        />
        <Type
          width={32}
          height={32}
          className={`max-lg:hidden absolute max-w-[initial] top-[1.6rem] left-[13.275rem] drop-shadow-placed`}
        />
        <Terminal
          className={`lg:absolute max-w-[initial] top-7.5 right-[12.525rem] drop-shadow-placed flex-[0_0_auto]`}
        />
        <Pen
          className={`lg:absolute max-w-[initial] top-[.625rem] left-87 drop-shadow-placed flex-[0_0_auto]`}
        />
        <Pencil
          className={`lg:hidden max-w-[initial] drop-shadow-placed flex-[0_0_auto]`}
        />
        <Sharpener
          className={`lg:absolute top-[-4.35rem] left-[3.425rem] lg:rotate-15 max-w-[initial] drop-shadow-placed flex-[0_0_auto]`}
        />
        <Star
          className={`lg:absolute max-w-[initial] bottom-9 left-[5.95rem] drop-shadow-placed flex-[0_0_auto]`}
        />
        <Sticky
          className={`lg:absolute max-w-[initial] top-[3.4rem] right-[3.525rem] lg:rotate-[-15deg] drop-shadow-placed flex-[0_0_auto]`}
        />
        <Safari
          className={`lg:absolute max-w-[initial] top-[5.35rem] left-[12.95rem] drop-shadow-placed flex-[0_0_auto]`}
        />
        <Cursor
          width={32}
          height={32}
          className={`max-lg:hidden absolute max-w-[initial] bottom-7.5 left-[16.2rem] drop-shadow-placed flex-[0_0_auto]`}
        />
        <Colour
          width={32}
          height={32}
          className={`max-lg:hidden absolute max-w-[initial] top-34.5 left-[20.825rem] drop-shadow-placed flex-[0_0_auto]`}
        />
        <Component
          width={32}
          height={32}
          className={`max-lg:hidden absolute max-w-[initial] bottom-[4.235rem] right-[15.675rem] drop-shadow-placed flex-[0_0_auto]`}
        />
        <Figma
          className={`lg:absolute max-w-[initial] bottom-8.5 right-[19.05rem] drop-shadow-placed flex-[0_0_auto]`}
        />
        <Pencil
          className={`lg:absolute max-w-[initial] bottom-[-.625rem] right-[7.45rem] drop-shadow-placed flex-[0_0_auto]`}
        />
        <Brush
          width={32}
          height={32}
          className={`max-lg:hidden absolute max-w-[initial] bottom-14.5 right-12 drop-shadow-placed`}
        />
        <Sharpener
          className={`max-w-[initial] lg:hidden drop-shadow-placed flex-[0_0_auto]`}
        />
        <Star
          className={`max-w-[initial] lg:hidden drop-shadow-placed flex-[0_0_auto]`}
        />
        <Sticky
          className={`max-w-[initial] lg:hidden drop-shadow-placed flex-[0_0_auto]`}
        />
        <Safari
          className={`max-w-[initial] lg:hidden drop-shadow-placed flex-[0_0_auto]`}
        />
      </div>
    </section>
  )
}
