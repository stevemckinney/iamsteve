'use client'

import { Showcase, ShowcaseStack, CodeExample } from './_showcase'
import Social from '@/components/social'

export default function SocialSection() {
  return (
    <Showcase
      title="Social"
      description="Social media link list with icons. Links to X, Figma, GitHub, LinkedIn, and Mastodon."
    >
      <ShowcaseStack>
        <ShowcaseStack.Preview>
          <Social />
        </ShowcaseStack.Preview>
        <ShowcaseStack.Usage>
          <CodeExample>{`import Social from '@/components/social'

<Social />`}</CodeExample>
        </ShowcaseStack.Usage>
      </ShowcaseStack>
    </Showcase>
  )
}
