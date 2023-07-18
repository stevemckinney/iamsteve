'use client'

import { useEffect } from 'react';

export default function ViewCounter({
  useEffect(() => {
    fetch(`/api/views/${slug}`, {
      method: 'POST',
    })
  }, [slug])
})
