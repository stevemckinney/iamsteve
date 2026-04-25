'use client'
import { useId } from 'react'

export function Dialog({ trigger, children, label, className = '' }) {
  const id = `dialog-${useId().replace(/:/g, '')}`

  return (
    <>
      {trigger(id)}
      <div
        id={id}
        popover="auto"
        role="dialog"
        aria-label={label}
        className={`m-auto p-0 border-0 bg-transparent backdrop:bg-canvas outline-none ${className}`.trim()}
      >
        {typeof children === 'function' ? children(id) : children}
      </div>
    </>
  )
}
