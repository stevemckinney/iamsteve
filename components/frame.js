/**
 * Frame
 * {children}
 */

const Frame = ({ children, id }) => {
  return (
    <div
      className="grid col-start-margin-start col-end-margin-end sm:col-start-container-start sm:col-end-container-end grid-cols-subgrid sm:frame sm:frame-24 2xl:frame-40 gap-y-4 md:gap-y-8 pb-10 md:pb-18 sm:mt-5 md:mt-5.5"
      id={id}
    >
      {children}
    </div>
  )
}

export default Frame
