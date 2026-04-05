export default function BentoGridShell() {
  return (
    <div
      className="bg-gunmetal-900 aspect-video flex justify-center p-4 lg:p-8"
      style={{
        '--color-gunmetal-900': 'rgb(24 36 37)',
        '--color-gunmetal-850': 'rgb(32 48 50)',
        '--color-gunmetal-800': 'rgb(40 60 62)',
        '--color-gunmetal-750': 'rgb(48 72 75)',
        '--color-gunmetal-700': 'rgb(43 78 81)',
        backgroundColor: 'var(--color-gunmetal-900, rgb(24 36 37))',
      } as React.CSSProperties}
    >
      <div className="w-full min-h-full grid grid-cols-12 grid-flow-dense auto-rows-auto gap-2">
        <section className="col-span-6 row-span-4 gap-2 p-2 bg-(--color-gunmetal-850) ring ring-(--color-gunmetal-750) rounded-sm" />
        <section className="col-span-6 row-span-4 gap-2 p-2 bg-(--color-gunmetal-850) ring ring-(--color-gunmetal-750) rounded-sm" />
        <section className="col-span-3 row-span-4 gap-2 p-2 bg-(--color-gunmetal-850) ring ring-(--color-gunmetal-750) rounded-sm" />
        <section className="col-span-6 row-span-4 gap-2 p-2 bg-(--color-gunmetal-850) ring ring-(--color-gunmetal-750) rounded-sm" />
        <section className="col-span-3 row-span-2 gap-2 p-2 bg-(--color-gunmetal-850) ring ring-(--color-gunmetal-750) rounded-sm" />
        <section className="col-span-3 row-span-2 gap-2 p-2 bg-(--color-gunmetal-850) ring ring-(--color-gunmetal-750) rounded-sm" />
      </div>
    </div>
  )
}
