'use client'

import { useRouter } from 'next/navigation'
import * as Form from '@radix-ui/react-form'

const Label = ({ children, ...props }) => (
  <Form.Label className="font-ui text-base lowercase text-fern-1100 leading-none mb-1" {...props}>
    {children}
  </Form.Label>
)

const Input = ({ ...props }) => (
  <Form.Control asChild>
    <input
      {...props}
      className="form-input w-full text-base shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_rgb(79_64_63_/_0.1)] bg-gradient-to-b from-[rgb(79_64_63_/_0.03)] from-0% to-[rgb(79_64_63_/_0)] to-100% px-4 py-3 rounded-sm placeholder-fern-1100/30 focus-visible:shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_rgb(79_127_218),_0_0_0_6px_rgb(79_127_218_/_0.08)] data-[invalid=true]:shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_#E5542B,_0_0_0_5px_rgb(229_84_43_/_0.08)]"
    />
  </Form.Control>
)

const ContactForm = () => {
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })

      if (response.ok) {
        router.push('/success')
      } else {
        console.error('Form submission failed')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Form.Root
      className="w-full grid grid-cols-5 gap-8"
      data-netlify="true"
      name="contact-form"
      method="POST"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact-form" />

      <Form.Field className="col-span-2 flex flex-col relative" name="name">
        <Label htmlFor="name">Name</Label>
        <Input type="text" required name="name" id="name" />
        <Form.Message
          className="font-ui text-xs text-rio-600 absolute left-0 top-[100%] pt-2"
          match="valueMissing"
        >
          Please enter your name
        </Form.Message>
      </Form.Field>

      <Form.Field className="col-span-3 flex flex-col relative" name="email">
        <Label htmlFor="email">Email</Label>
        <Input type="email" required name="email" id="email" />
        <Form.Message
          className="font-ui text-xs text-rio-600 absolute left-0 top-[100%] pt-2"
          match="valueMissing"
        >
          Please enter your email
        </Form.Message>
        <Form.Message
          className="font-ui text-xs text-rio-600 absolute left-0 top-[100%] pt-2"
          match="typeMismatch"
        >
          Please provide a valid email
        </Form.Message>
      </Form.Field>

      <Form.Field className="col-span-5 flex flex-col relative" name="message">
        <Label htmlFor="message">Message</Label>
        <Form.Control asChild>
          <textarea
            className="form-input w-full text-base shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_rgb(79_64_63_/_0.1)] bg-gradient-to-b from-[rgb(79_64_63_/_0.03)] from-0% to-[rgb(79_64_63_/_0)] to-100% px-4 py-3 rounded-sm placeholder-fern-1100/30 min-h-[11.5rem] focus-visible:shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_rgb(79_127_218),_0_0_0_6px_rgb(79_127_218_/_0.08)] data-[invalid=true]:shadow-[0_-1px_rgb(79_64_63_/_0.2),_0_0_0_1px_#E5542B,_0_0_0_5px_rgb(229_84_43_/_0.08)]"
            required
            name="message"
            id="message"
          />
        </Form.Control>
        <Form.Message
          className="font-ui text-xs text-rio-600 absolute left-0 top-[100%] pt-2"
          match="valueMissing"
        >
          Please enter a message
        </Form.Message>
      </Form.Field>

      <Form.Submit asChild>
        <button
          className="button-dandelion self-start min-w-fit font-ui text-base/tight lowercase text-center button-dandelion button-dandelion select-none w-full @sm:w-[auto] @sm:grow-0 flex-auto"
        >
          Send
        </button>
      </Form.Submit>
    </Form.Root>
  )
}

export default ContactForm
