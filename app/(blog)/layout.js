export default function BlogLayout({ children }) {
  return (
    <main className="grid grid-cols-subgrid col-start-container-start col-end-container-end gap-y-18 frame frame-16 md:frame-40 frame frame-outset-top pt-10 pb-18 mb-18">
      {children}
    </main>
  )
}
