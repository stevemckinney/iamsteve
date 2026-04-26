'use client'
import { useCallback, useId, useState } from 'react'

const base = [
  'm-auto p-0 border-0 outline-none bg-transparent',
  'opacity-0 scale-95',
  'transition-all duration-200 ease-out transition-discrete',
  '[&:popover-open]:opacity-100 [&:popover-open]:scale-100',
  'starting:[&:popover-open]:opacity-0 starting:[&:popover-open]:scale-95',
  'backdrop:bg-canvas backdrop:opacity-0',
  'backdrop:transition-opacity backdrop:duration-200 backdrop:ease-out backdrop:transition-discrete',
  '[&:popover-open]:backdrop:opacity-100',
  'starting:[&:popover-open]:backdrop:opacity-0',
].join(' ')

export function Dialog({ trigger, children, label, className = '' }) {
  const id = `dialog-${useId().replace(/:/g, '')}`
  const [hasOpened, setHasOpened] = useState(false)

  const popoverRef = useCallback((el) => {
    if (!el) return
    const onToggle = (e) => {
      if (e.newState === 'open') {
        setHasOpened(true)
        e.target.focus()
      }
    }
    el.addEventListener('toggle', onToggle)
    return () => el.removeEventListener('toggle', onToggle)
  }, [])

  return (
    <>
      {trigger(id)}
      <div
        ref={popoverRef}
        id={id}
        popover="auto"
        role="dialog"
        aria-label={label}
        tabIndex={-1}
        className={`${base} ${className}`.trim()}
      >
        {hasOpened && (typeof children === 'function' ? children(id) : children)}
      </div>
    </>
  )
}
