'use client'

import {
  Showcase,
  ShowcaseBlock,
  ShowcaseStack,
  CodeExample,
} from './_showcase'
import PropsTable from './props-table'
import { Chat, ChatMessage } from '@/components/chat'

export default function ChatSection() {
  return (
    <Showcase
      title="Chat"
      description="Apple Messages-style conversation bubbles for MDX content. Supports left (received), right (sent), and AI response alignments."
    >
      <ShowcaseBlock title="With title">
        <div className="max-w-md">
          <Chat title="iMessage">
            <ChatMessage align="left">hello how are you</ChatMessage>
            <ChatMessage align="left">what have you been up to</ChatMessage>
            <ChatMessage align="right">
              hello I&rsquo;m good thank you
            </ChatMessage>
            <ChatMessage align="right">just working on the blog</ChatMessage>
            <ChatMessage align="left">nice, sounds fun</ChatMessage>
          </Chat>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="AI responses">
        <div className="max-w-md">
          <Chat title="Claude">
            <ChatMessage align="right">
              what colour should I use for links?
            </ChatMessage>
            <ChatMessage align="ai">
              I&rsquo;d recommend a blue with good contrast against your
              background.
            </ChatMessage>
          </Chat>
        </div>
      </ShowcaseBlock>

      <ShowcaseStack>
        <ShowcaseStack.Docs>
          <PropsTable
            props={[
              {
                name: 'title',
                type: 'string',
                description: 'Optional header title for the chat window',
              },
              {
                name: 'children',
                type: 'ReactNode',
                description: 'ChatMessage components',
              },
              {
                name: 'align',
                type: "'left' | 'right' | 'ai'",
                description: 'Message alignment (ChatMessage prop)',
              },
            ]}
          />
        </ShowcaseStack.Docs>
        <ShowcaseStack.Usage>
          <CodeExample>{`\`\`\`chat:iMessage
L: hello how are you
R: hello I'm good thank you
AI: here's a suggestion for you
\`\`\`

L:  left-aligned (received)
R:  right-aligned (sent)
AI: left-aligned, no background (AI response)`}</CodeExample>
        </ShowcaseStack.Usage>
      </ShowcaseStack>
    </Showcase>
  )
}
