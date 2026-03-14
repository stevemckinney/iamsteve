const Chat = ({ title, children }) => {
  return (
    <div
      className="rounded-2xl bg-neutral-01-100 dark:bg-surface-02 shadow-placed overflow-hidden my-6 not-prose"
      role="log"
      aria-label={title ? `${title} conversation` : 'Chat conversation'}
    >
      {title && (
        <div className="text-center py-2 px-4 text-sm text-ui-body font-ui border-b border-neutral-01-200 dark:border-neutral-01-800">
          {title}
        </div>
      )}
      <div className="flex flex-col gap-1 p-3">{children}</div>
    </div>
  )
}

const ChatMessage = ({ align = 'left', children }) => {
  const isRight = align === 'right'
  const isAi = align === 'ai'

  const styles = isRight
    ? 'bg-cornflour-500 text-white'
    : isAi
    ? 'bg-transparent text-heading'
    : 'bg-neutral-01-200 dark:bg-neutral-01-800 text-heading'

  return (
    <div className={`flex ${isRight ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          max-w-[calc(100%-32px)] px-3 py-1.5 rounded-sm text-base leading-normal
          ${styles}
        `}
      >
        {children}
      </div>
    </div>
  )
}

export { Chat, ChatMessage }
