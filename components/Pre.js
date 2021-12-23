import { useState, useRef } from 'react'

const Pre = (props) => {
  const textInput = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const onEnter = () => {
    setHovered(true)
  }
  const onExit = () => {
    setHovered(false)
    setCopied(false)
  }
  const onCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(textInput.current.textContent)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div
      ref={textInput}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      className="code-block relative"
    >
      <button
        aria-label="Copy code"
        type="button"
        className={`absolute button button-t button-copy rounded alternate-l2 ${
          copied
            ? 'focus:outline-none focus:border-green-400 border-green-400'
            : 'border-gray-300'
        }`}
        onClick={onCopy}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          fill="none"
          className={
            copied ? 'sw-2 secondary' : 'sw-2'
          }
        >
          {copied ? (
            <>
              <rect x="4" y="4" width="16" height="18" rx="1.5"/>
              <rect x="8" y="4" width="8" height="3" className="fill-currentcolor"/>
              <path d="M7 14L10 17L17 10"/>
              <circle cx="12" cy="3" r="2"/>
            </>
          ) : (
            <>
              <rect x="4" y="4" width="16" height="18" rx="1.5"/>
              <rect x="8" y="4" width="8" height="3" className="fill-currentcolor"/>
              <circle cx="12" cy="3" r="2"/>
            </>
          )}
        </svg>
      </button>

      <pre>{props.children}</pre>
    </div>
  )
}

export default Pre
