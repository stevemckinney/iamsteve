/**
 * Frame
 * {children}
 */

const Frame = ({ children, id }) => {
  return (
    <div
      className="grid col-margin sm:col-container grid-cols-subgrid sm:frame sm:frame-16 lg:frame-40 gap-y-4 md:gap-y-8 pb-10 md:pb-18 sm:mt-[1.25rem] md:mt-[1.375rem]"
      id={id}
    >
      {children}
    </div>
  )
}

export default Frame
