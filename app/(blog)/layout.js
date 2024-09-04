export default function BlogLayout({ children }) {
  return (
    <main className="grid grid-cols-subgrid col-container gap-y-8 sm:gap-y-12 md:gap-y-18 sm:frame sm:frame-24 2xl:frame-40 2xl:frame-outset-top-md 2xl:frame-outset-top sm:pt-12 md:pt-18 2xl:pt-12 pb-18 sm:mb-18" id="content">
      {children}
    </main>
  )
}
