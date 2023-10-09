'use client'

import { forwardRef } from 'react'

import * as Form from '@radix-ui/react-form'
import Button from '@/components/button'

const Submit = forwardRef(function Submit(props, forwardedRef) {
  return <Button {...props} ref={forwardedRef} />
})

const ContactForm = () => (
  <Form.Root className="w-full">
    <Form.Field className="grid" name="email">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-ui">Name</Form.Label>
        <Form.Message className="text-ui" match="valueMissing">
          Please enter your name
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className={`form-input w-full text-base shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_rgb(79_64_63_/_0.1)] bg-gradient-to-b from-[rgb(79_64_63_/_0.03)] from-0% to-[rgb(79_64_63_/_0)] to-100% px-4 py-3 rounded-sm placeholder-fern-1100/30`}
          type="name"
          required
        />
      </Form.Control>
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-ui">Email</Form.Label>
        <Form.Message className="text-ui" match="valueMissing">
          Please enter your email
        </Form.Message>
        <Form.Message className="text-ui" match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className={`form-input w-full text-base shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_rgb(79_64_63_/_0.1)] bg-gradient-to-b from-[rgb(79_64_63_/_0.03)] from-0% to-[rgb(79_64_63_/_0)] to-100% px-4 py-3 rounded-sm placeholder-fern-1100/30`}
          type="email"
          required
        />
      </Form.Control>
    </Form.Field>
    <Form.Field className="grid" name="question">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-ui">Message</Form.Label>
        <Form.Message className="text-ui" match="valueMissing">
          Please enter a message
        </Form.Message>
      </div>
      <Form.Control asChild>
        <textarea
          className={`form-input w-full text-base shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_rgb(79_64_63_/_0.1)] bg-gradient-to-b from-[rgb(79_64_63_/_0.03)] from-0% to-[rgb(79_64_63_/_0)] to-100% px-4 py-3 rounded-sm placeholder-fern-1100/30`}
          required
        />
      </Form.Control>
    </Form.Field>
    <Form.Submit asChild>
      <button className="button-dandelion font-ui text-base/snug lowercase text-dandelion-800 text-center bg-dandelion-300 active:bg-dandelion-400 rounded-sm transition duration-200 shadow-placed hover:shadow-picked active:shadow-reduced px-8 py-3 flex-auto [--ui-border-color:theme(colors.dandelion.600)] [--ui-border-color-hover:theme(colors.dandelion.700)]">
        Send
      </button>
    </Form.Submit>
  </Form.Root>
)

export default ContactForm
