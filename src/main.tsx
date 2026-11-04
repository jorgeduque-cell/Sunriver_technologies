import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import Home from './pages/Home'

const container = document.getElementById('root')!

// La home llega prerenderizada en index.html: se hidrata sola, sin el router (no lo usa; sus
// enlaces son anclas o páginas completas). Así un cambio de historial (#ancla, Atrás) no la
// vuelve a renderizar, y sus secciones se activan cuando se acercan (ver home/lazyHydrate.ts).
// El resto de rutas llegan con spa.html (raíz vacía): render normal con el router.
if (container.firstElementChild) {
  window.__srHydrating = true
  hydrateRoot(
    container,
    <StrictMode>
      <Home />
    </StrictMode>,
  )
} else {
  createRoot(container).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}
