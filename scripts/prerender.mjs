// Prerender de la home.
// 1) `vite build` genera dist/index.html (shell vacío).
// 2) `vite build --ssr src/entry-server.tsx --outDir dist-ssr` genera el render de servidor.
// 3) Este script:
//    - guarda el shell vacío como dist/spa.html (fallback para el resto de rutas),
//    - escribe dist/index.html con el HTML de la home ya renderizado + canonical + JSON-LD.
// Así la home se lee completa sin JavaScript (y Google ve "1.000.000", nunca "0").
import { readFile, writeFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const ROOT_MARK = '<div id="root"></div>'
const HEAD_MARK = '<!--app-head-->'

const template = await readFile(path.join(distDir, 'index.html'), 'utf8')
if (!template.includes(ROOT_MARK) || !template.includes(HEAD_MARK)) {
  throw new Error('prerender: index.html no contiene los marcadores esperados')
}

const { render, homeHeadTags } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const appHtml = render('/')
if (!appHtml.includes('data-countup="pending">1.000.000<')) {
  throw new Error('prerender: el HTML de la home no contiene la cifra final (1.000.000)')
}

await writeFile(path.join(distDir, 'spa.html'), template.replace(HEAD_MARK, ''))
await writeFile(
  path.join(distDir, 'index.html'),
  template.replace(HEAD_MARK, homeHeadTags()).replace(ROOT_MARK, `<div id="root">${appHtml}</div>`),
)
await rm(ssrDir, { recursive: true, force: true })

console.log(`prerender: home lista (${(appHtml.length / 1024).toFixed(1)} KB de HTML), spa.html creado`)
