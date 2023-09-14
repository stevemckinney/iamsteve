export default function PageTitle({ className = 'col-start-content-start col-end-content-end', children }) {
  return <h1 className={`font-display lowercase text-7xl text-fern-1100 font-variation-extrabold ${className}`}>{children}</h1>
}
