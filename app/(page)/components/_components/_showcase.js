'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Showcase({ title, description, children }) {
  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h2 className="font-display font-variation-bold text-2xl lowercase text-heading">
          {title}
        </h2>
        {description && (
          <p className="text-body-80 text-sm max-w-prose">{description}</p>
        )}
      </header>
      <div className="flex flex-col gap-6">{children}</div>
    </article>
  )
}

export function ShowcaseBlock({ title, description, children, className }) {
  return (
    <div className="flex flex-col gap-4">
      {(title || description) && (
        <div className="flex flex-col gap-0.5">
          {title && (
            <h3 className="font-display font-variation-bold text-lg lowercase text-heading">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-body-80 text-sm max-w-prose">{description}</p>
          )}
        </div>
      )}
      <div
        className={cn(
          'bg-surface rounded-lg shadow-placed p-4 sm:p-6 flex flex-wrap items-start gap-4',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function ShowcaseStack({ title, description, children, className }) {
  return (
    <div className="flex flex-col gap-4">
      {(title || description) && (
        <div className="flex flex-col gap-0.5">
          {title && (
            <h3 className="font-display font-variation-bold text-lg lowercase text-heading">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-body-80 text-sm max-w-prose">{description}</p>
          )}
        </div>
      )}
      <div
        className={cn(
          'bg-surface rounded-lg shadow-placed overflow-hidden divide-y divide-border-light',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

ShowcaseStack.Preview = function ShowcaseStackPreview({ children, className }) {
  return (
    <div
      className={cn('p-4 sm:p-6 flex flex-wrap items-start gap-4', className)}
    >
      {children}
    </div>
  )
}

ShowcaseStack.Docs = function ShowcaseStackDocs({ children, className }) {
  return (
    <div className={cn('flex flex-col gap-4 p-4 sm:p-6', className)}>
      {children}
    </div>
  )
}

ShowcaseStack.Usage = function ShowcaseStackUsage({ children, className }) {
  return (
    <div className={cn('flex flex-col gap-4 p-4 sm:p-6', className)}>
      {children}
    </div>
  )
}

ShowcaseStack.Split = function ShowcaseStackSplit({ children, className }) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border-light',
        className
      )}
    >
      {children}
    </div>
  )
}

const toggleItemClass = cn(
  'px-3 py-1.5 text-sm font-display font-variation-bold lowercase',
  'rounded-xs cursor-pointer transition-colors duration-150',
  'outline-none select-none'
)

export function VariantToggle({ label, options, value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {label && (
        <span className="text-2xs font-mono text-body-60 uppercase tracking-wider">
          {label}
        </span>
      )}
      <div
        className="flex gap-0.5 bg-surface-02 p-0.5 rounded-sm"
        role="radiogroup"
        aria-label={label}
      >
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={value === option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              toggleItemClass,
              value === option.id
                ? 'bg-surface shadow-reduced text-heading'
                : 'text-body-80 hover:text-heading'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function StateToggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {label && (
        <span className="text-2xs font-mono text-body-60 uppercase tracking-wider">
          {label}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          toggleItemClass,
          'bg-surface-02 p-0.5 rounded-sm',
          checked
            ? 'bg-fern-600 text-white shadow-reduced'
            : 'text-body-80 hover:text-heading'
        )}
      >
        {checked ? 'On' : 'Off'}
      </button>
    </div>
  )
}

export function CodeExample({ children }) {
  return (
    <pre className="text-sm bg-fern-1100 text-fern-200 p-4 rounded-lg overflow-x-auto">
      <code>{children}</code>
    </pre>
  )
}
