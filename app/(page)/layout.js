export default function PageLayout({ children }) {
  return (
    <main className="grid grid-cols-subgrid col-start-container-start col-end-container-end gap-y-18 sm:frame sm:frame-24 lg:frame-40 lg:frame-outset-top-md 2xl:frame-outset-top pt-12 pb-18 mb-18">
      {children}
    </main>
  )
}
