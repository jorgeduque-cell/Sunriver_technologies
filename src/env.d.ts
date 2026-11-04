/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Webhook de n8n para los leads de la guía. Si no existe, el formulario abre WhatsApp. */
  readonly PUBLIC_LEAD_WEBHOOK_URL?: string
  readonly VITE_N8N_WEBHOOK_URL?: string
}

interface Window {
  /** true mientras se hidrata la home prerenderizada (activa la hidratación diferida por sección). */
  __srHydrating?: boolean
}
