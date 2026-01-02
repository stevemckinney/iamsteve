import { PencilMono } from '@/components/illustration'

export default function BlogLayout({ children }) {
  return (
    <main
      className="grid grid-cols-subgrid col-container gap-y-8 sm:gap-y-12 md:gap-y-18 lg:frame lg:frame-24 2xl:frame-40 2xl:frame-outset-top lg:pt-18 2xl:pt-12 pb-18 sm:mb-18"
      id="content"
    >
      <PencilMono
        width={962}
        height={46}
        className="col-start-1 col-end-3 row-start-1 max-w-[initial] justify-self-end self-start mt-3 drop-shadow-placed max-2xl:hidden"
      />
      {children}
    </main>
  )
}
