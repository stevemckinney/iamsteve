import styles from './bento.module.css'
export default function BentoGridShell() {
  return (
    <>
      <div
        className={`${styles.bento} bg-gunmetal-900 aspect-video flex justify-center p-4 lg:p-8`}
      >
        <div className="w-full min-h-full grid grid-cols-12 grid-flow-dense auto-rows-auto gap-2">
          <section className="col-span-6 row-span-4 gap-2 p-2 bg-(--color-gunmetal-850) ring ring-(--color-gunmetal-750) rounded-sm"></section>
          <section className="col-span-6 row-span-4 gap-2 p-2 bg-(--color-gunmetal-850) ring ring-(--color-gunmetal-750) rounded-sm"></section>
          <section className="col-span-3 row-span-4 gap-2 p-2 bg-(--color-gunmetal-850) ring ring-(--color-gunmetal-750) rounded-sm"></section>
          <section className="col-span-6 row-span-4 gap-2 p-2 bg-(--color-gunmetal-850) ring ring-(--color-gunmetal-750) rounded-sm"></section>
          <section className="col-span-3 row-span-2 gap-2 p-2 bg-(--color-gunmetal-850) ring ring-(--color-gunmetal-750) rounded-sm"></section>
          <section className="col-span-3 row-span-2 gap-2 p-2 bg-(--color-gunmetal-850) ring ring-(--color-gunmetal-750) rounded-sm"></section>
        </div>
      </div>
    </>
  )
}
