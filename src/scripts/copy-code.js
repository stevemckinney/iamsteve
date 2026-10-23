// Copy a titled code block’s code, and show the tick for two seconds
const hidden = ['opacity-0', 'scale-75', 'blur-sm']

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy-code]')
  const code = button?.closest('figure')?.querySelector('pre')?.textContent
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
