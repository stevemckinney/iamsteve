import { cn } from '@/lib/utils'
import { PencilMono } from '@/components/illustration'

{
  /* <PencilMono
  width={962}
  height={46}
  className="col-start-1 col-end-3 row-start-1 max-w-[initial] justify-self-end self-start mt-3 drop-shadow-placed max-2xl:hidden"
/> */
}

export default function BlogLayout({ children }) {
  return (
    <main
      className={cn(
        'grid grid-cols-subgrid col-container gap-y-8 sm:gap-y-12 md:gap-y-18',
        'md:frame md:frame-24 md:frame-outset-top-md 2xl:frame-40 2xl:frame-outset-top',
        'pb-18 sm:mb-18'
        // 'has-[.article-frame]:max-lg:border-none has-[.article-frame]:max-lg:pt-0 has-[.article-frame]:lg:pt-18'
      )}
      id="content"
    >
      {children}
    </main>
  )
}
