export default function PageHeader({
  className = 'col-start-content-start col-end-content-end grid-cols-subgrid',
  children,
}) {
  return <div className={`${className}`}>{children}</div>
}
