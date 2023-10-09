const Notepad = ({ children }) => {
  return <div className={`bg-neutral-01-50`}>{children}</div>
}

const NotepadHeader = ({ children }) => {
  return <div>{children}</div>
}

const NotepadBody = ({ children }) => {
  return <div>{children}</div>
}

Notepad.Header = NotepadHeader
Notepad.Body = NotepadBody

export default Notepad
