'use client'

import { Showcase, ShowcaseStack, CodeExample } from './_showcase'
import ContactForm from '@/components/contact-form'

export default function ContactFormSection() {
  return (
    <Showcase
      title="ContactForm"
      description="Accessible contact form built with React Aria components. Includes name, email, and message fields with validation, rate limiting, and honeypot spam protection."
    >
      <ShowcaseStack>
        <ShowcaseStack.Preview className="flex-col">
          <ContactForm />
        </ShowcaseStack.Preview>
        <ShowcaseStack.Docs>
          <ul className="text-sm text-body-80 list-inside list-[square] flex flex-col gap-1">
            <li>
              React Aria Form, TextField, Label, Input, TextArea, FieldError,
              Button
            </li>
            <li>Client-side rate limiting (max 5 submissions per hour)</li>
            <li>Minimum word count validation (8 words)</li>
            <li>Honeypot field for spam prevention</li>
            <li>Toast notification on success</li>
            <li>Netlify Forms integration</li>
          </ul>
        </ShowcaseStack.Docs>
        <ShowcaseStack.Usage>
          <CodeExample>{`import ContactForm from '@/components/contact-form'

{/* In MDX pages */}
<ContactForm />`}</CodeExample>
        </ShowcaseStack.Usage>
      </ShowcaseStack>
    </Showcase>
  )
}
