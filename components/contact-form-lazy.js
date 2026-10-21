'use client'
import dynamic from 'next/dynamic'

// Loads the form, and Turnstile with it, only on pages that render it. Imported
// straight into a server component, it would ship with every post.
export default dynamic(() => import('@/components/contact-form'))
