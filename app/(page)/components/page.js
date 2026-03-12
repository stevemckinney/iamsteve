'use client'

import { Chat, ChatMessage } from '@/components/chat'
import Icon from '@/components/icon'

export default function ComponentsPage() {
  return (
    <article className="col-content py-18 flex flex-col gap-18">
      <header>
        <h1 className="font-display font-variation-bold text-4xl lowercase text-heading">
          Components
        </h1>
        <p className="text-ui-body text-lg mt-2">
          A reference page for MDX components used across the site.
        </p>
      </header>

      {/* Chat */}
      <section className="flex flex-col gap-4 max-w-lg">
        <h2 className="font-display font-variation-bold text-2xl lowercase text-heading">
          Chat
        </h2>
        <p className="text-ui-body">
          Apple Messages-style conversation bubbles. Use a <code className="text-sm bg-neutral-01-200 dark:bg-neutral-01-800 px-1.5 py-0.5 rounded">chat</code> code fence in markdown.
        </p>

        <h3 className="font-display font-variation-bold text-lg lowercase text-heading mt-4">
          With title
        </h3>
        <Chat title="iMessage">
          <ChatMessage align="left">hello how are you</ChatMessage>
          <ChatMessage align="left">what have you been up to</ChatMessage>
          <ChatMessage align="right">hello I&rsquo;m good thank you</ChatMessage>
          <ChatMessage align="right">just working on the blog</ChatMessage>
          <ChatMessage align="left">nice, sounds fun</ChatMessage>
        </Chat>

        <h3 className="font-display font-variation-bold text-lg lowercase text-heading mt-4">
          Without title
        </h3>
        <Chat>
          <ChatMessage align="left">have you tried the new feature?</ChatMessage>
          <ChatMessage align="right">not yet, will check it out</ChatMessage>
          <ChatMessage align="right">looks great though</ChatMessage>
          <ChatMessage align="left">let me know what you think</ChatMessage>
        </Chat>

        <h3 className="font-display font-variation-bold text-lg lowercase text-heading mt-4">
          Short exchange
        </h3>
        <Chat title="Messages">
          <ChatMessage align="right">are you free tomorrow?</ChatMessage>
          <ChatMessage align="left">yes!</ChatMessage>
        </Chat>

        <div className="bg-surface shadow-placed rounded-lg p-6 mt-4">
          <h3 className="font-display font-variation-bold text-lg lowercase text-heading mb-2">
            Usage
          </h3>
          <pre className="text-sm bg-fern-1100 text-neutral-01-200 p-4 rounded-lg overflow-x-auto"><code>{`\`\`\`chat:iMessage
L: hello how are you
L: what have you been up to
R: hello I'm good thank you
R: just working on the blog
L: nice, sounds fun
\`\`\``}</code></pre>
        </div>
      </section>
    </article>
  )
}
