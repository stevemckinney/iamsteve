'use client'

import CopyButton from '@/components/button/button-copy'

export default function CopyCode({ getCode }) {
  return (
    <CopyButton
      getText={getCode}
      label="Copy code"
      className="ml-auto text-body text-base"
    />
  )
}
