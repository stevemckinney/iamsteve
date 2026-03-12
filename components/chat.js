const Chat = ({ title, children }) => {
  return (
    <div
      className="rounded-2xl bg-neutral-01-100 dark:bg-surface-02 shadow-placed overflow-hidden my-6 not-prose"
      role="log"
      aria-label={title ? `${title} conversation` : 'Chat conversation'}
    >
      {title && (
        <div className="text-center py-2 px-4 text-sm text-ui-body/60 font-ui border-b border-neutral-01-200 dark:border-neutral-01-800">
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
    ? 'bg-cornflour-500 text-white rounded-br-md'
    : isAi
      ? 'bg-transparent text-heading border border-neutral-01-300 dark:border-neutral-01-700 rounded-bl-md'
      : 'bg-neutral-01-200 dark:bg-neutral-01-800 text-heading rounded-bl-md'

  return (
    <div
      className={`flex ${isRight ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`
          max-w-[75%] px-3 py-1.5 rounded-2xl text-base leading-normal
          ${styles}
        `}
      >
        {children}
      </div>
    </div>
  )
}

export { Chat, ChatMessage }
