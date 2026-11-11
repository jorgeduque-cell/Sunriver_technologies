// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Sitio estático: cada página sale como HTML ya escrito en `dist/` y solo las partes
// interactivas (islas de React) cargan JavaScript. Las funciones de `api/` las sirve Vercel aparte.
export default defineConfig({
  site: 'https://www.sunriverstech.com',
  output: 'static',
  // `nosotros.html` en vez de `nosotros/index.html`: con `cleanUrls` (vercel.json)
  // las URLs quedan iguales que antes, sin barra final (/nosotros).
  build: { format: 'file' },
  trailingSlash: 'never',
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
