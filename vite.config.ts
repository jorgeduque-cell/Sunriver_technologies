import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

/**
 * En `vite preview` imita el comportamiento de Vercel:
 * "/" sirve la home prerenderizada (index.html) y el resto de rutas
 * de la SPA reciben el shell vacío (spa.html).
 */
const spaFallbackPreview = (): Plugin => ({
  name: 'sunriver-spa-fallback-preview',
  configurePreviewServer(server) {
    server.middlewares.use((req, _res, next) => {
      const pathname = (req.url ?? '/').split('?')[0]
      const isPage = req.method === 'GET' && pathname !== '/' && !path.extname(pathname)
      if (isPage) req.url = '/spa.html'
      next()
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Rutas absolutas: con './' las rutas anidadas (/blog/:slug) pedían /blog/assets/*.
  base: '/',
  // PUBLIC_LEAD_WEBHOOK_URL (formulario de la guía) se expone al navegador.
  envPrefix: ['VITE_', 'PUBLIC_'],
  plugins: [
    // Solo en desarrollo: en build añadía `code-path` a cada elemento del HTML.
    command === 'serve' && inspectAttr(),
    react(),
    spaFallbackPreview(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
