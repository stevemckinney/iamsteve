// Copy a titled code block’s code, and show the tick for two seconds
const hidden = ['opacity-0', 'scale-75', 'blur-sm']

// The block’s lines, one per line. Its markup has no newlines between them,
// and numbered blocks keep their numbers inside the pre, so its textContent
// would run every line together behind the numbers
function codeOf(pre) {
  const lines = pre.querySelectorAll('.line')
  if (!lines.length) return pre.textContent
  return Array.from(lines, (line) => line.textContent).join('\n')
}

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy-code]')
  const pre = button?.closest('figure')?.querySelector('pre')
  const code = pre && codeOf(pre)
  if (!code) return

  await navigator.clipboard.writeText(code)
  const [copy, done] = button.querySelectorAll('svg')
  button.setAttribute('aria-label', 'Copied')
  copy.classList.add(...hidden)
  done.classList.remove(...hidden)

  clearTimeout(button.reset)
  button.reset = setTimeout(() => {
    button.setAttribute('aria-label', 'Copy code')
    copy.classList.remove(...hidden)
    done.classList.add(...hidden)
  }, 2000)
})
