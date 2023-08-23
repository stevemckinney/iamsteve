export default function PageTitle({ children }) {
  return (
    <h1
      className="font-display lowercase text-7xl text-fern-1100 font-variation-xbold"
      style={{ fontVariationSettings: "'wdth' 100, 'wght' 750" }}
    >
      {children}
    </h1>
  )
}
