const Notepad = ({ children, className }) => {
  return (
    <div
      className={`bg-neutral-01-50 rounded-lg isolate relative ${className}`}
    >
      {children}
    </div>
  )
}

const NotepadHeader = ({ children }) => {
  return (
    <div className="px-10 pt-[1.75rem] pb-[1.625rem] bg-dandelion-300 shadow-dandelion-placed [--ui-border-color:theme(colors.dandelion.600)] [--ui-border-color-strong:theme(colors.dandelion.700)] rounded-tl-lg rounded-tr-lg relative z-20">
      <h2 className="font-display leading-xl font-variation-bold text-xl lowercase text-dandelion-800">
        {children}
      </h2>
    </div>
  )
}

const NotepadBody = ({ children, className }) => {
  return (
    <div className="px-10 py-8 shadow-placed overflow-x-hidden rounded-bl-lg rounded-br-lg flex flex-col gap-4 relative z-10">
      {children}

      <svg
        width="592"
        height="12"
        viewBox="0 0 592 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 right-0 pointer-events-none"
        aria-hidden="true"
      >
        <path
          d="M45 12L0 9V1H592V5L543 8.5L494 5L396 9L282.5 5.5L211 11L116.5 6L45 12Z"
          fill="#F1E8E4"
        />
        <path
          d="M45 11L0 8V0H592V4L543 7.5L494 4L396 8L282.5 4.5L211 10L116.5 5L45 11Z"
          fill="white"
        />
        <path
          d="M23.8847 8L0 6V1H592V5L509.256 6L323.297 4L148.427 7L75.9193 5L23.8847 8Z"
          fill="#F1E8E4"
        />
        <path
          d="M23.8847 7L0 5V0H592V4L509.256 5L323.297 3L148.427 6L75.9193 4L23.8847 7Z"
          fill="white"
        />
      </svg>
    </div>
  )
}

Notepad.Header = NotepadHeader
Notepad.Body = NotepadBody

export default Notepad
