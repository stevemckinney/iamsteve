export default function PageHeader({
  className = 'col-start-content-start col-end-content-end grid-cols-subgrid flex flex-col gap-4',
  children,
}) {
  return <div className={`${className}`}>{children}</div>
}
