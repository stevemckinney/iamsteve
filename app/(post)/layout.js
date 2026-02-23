import { cn } from '@/lib/utils'

export default function PostLayout({ children }) {
  return (
    <main
      className={cn(
        'grid grid-cols-subgrid col-start-container-start col-end-container-end',
        'gap-y-8 sm:gap-y-12 md:gap-y-18',
        'md:frame md:frame-24 md:frame-outset-top-sm lg:frame-outset-top-md 2xl:frame-40 2xl:frame-outset-top',
        'sm:mb-18'
      )}
      id="content"
    >
      {children}
    </main>
  )
}
