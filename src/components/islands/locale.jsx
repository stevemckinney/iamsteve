// Every island renders inside this, so React Aria formats and labels for
// British English on the server and in the browser alike
import { I18nProvider } from 'react-aria-components'

export default function Locale({ children }) {
  return <I18nProvider locale="en-GB">{children}</I18nProvider>
}
