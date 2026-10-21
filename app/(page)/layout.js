import { cn } from '@/lib/utils'

export default function PageLayout({ children }) {
  return (
    <main
      className={cn(
        'grid grid-cols-subgrid col-start-container-start col-end-container-end',
        'gap-y-8 sm:gap-y-12 md:gap-y-18',
        'md:frame md:frame-24 md:frame-outset-top-sm lg:frame-outset-top-md 2xl:frame-40 2xl:frame-outset-top',
        // There's no frame below md, so the space after the content matches the gap above
        'md:pt-12 2xl:pt-10 md:pb-18 mb-8 sm:mb-12 md:mb-18'
        // 'has-[.article-frame]:max-lg:border-none has-[.article-frame]:max-lg:pt-0 has-[.article-frame]:lg:pt-18'
      )}
      id="content"
    >
      {children}
    </main>
  )
}
