export default function BlogLayout({ children }) {
  return (
    <main className="grid grid-cols-subgrid col-start-container-start col-end-container-end gap-y-18 sm:frame sm:frame-16 lg:frame-40 sm:frame-outset-top-sm lg:frame-outset-top pt-10 pb-18 mb-18">
      {children}
    </main>
  )
}
