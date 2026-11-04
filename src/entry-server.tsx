import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import Home from './pages/Home'

export { homeHeadTags } from './home/schema'

/**
 * Usado solo en build (scripts/prerender.mjs) para generar el HTML de la home.
 * La home no usa el router: se renderiza sola, con el mismo árbol que hidrata main.tsx.
 */
export function render(): string {
  return renderToString(
    <StrictMode>
      <Home />
    </StrictMode>,
  )
}
