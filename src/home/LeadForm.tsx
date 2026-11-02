import { useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { CONTACT, GUIDE_WHATSAPP_URL } from './content';
import { CheckIcon } from './icons';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'whatsapp';

const WEBHOOK_URL = import.meta.env.PUBLIC_LEAD_WEBHOOK_URL?.trim() || '';
const TIMEOUT_MS = 12000;

/** Devuelve el número en formato +57XXXXXXXXXX, o null si no parece un WhatsApp válido. */
function normalizeWhatsApp(raw: string): string | null {
  const value = raw.trim();
  const digits = value.replace(/\D/g, '');
  if (digits.length === 10 && digits.startsWith('3')) return `+57${digits}`;
  if (digits.length === 12 && digits.startsWith('573')) return `+${digits}`;
  if (value.startsWith('+') && digits.length >= 8 && digits.length <= 15) return `+${digits}`;
  return null;
}

const ERROR_TEXT = 'Revisa el número: escribe tu celular de 10 dígitos, por ejemplo 300 123 4567.';

export function LeadForm() {
  const id = useId();
  const inputId = `${id}-whatsapp`;
  const errorId = `${id}-error`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const validate = (raw: string) => {
    const normalized = normalizeWhatsApp(raw);
    setError(normalized ? '' : ERROR_TEXT);
    return normalized;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading') return;

    // Honeypot anti-spam: si el campo oculto viene lleno, fingimos éxito.
    const honeypot = new FormData(e.currentTarget).get('empresa');
    if (typeof honeypot === 'string' && honeypot !== '') {
      setStatus('success');
      return;
    }

    const whatsapp = validate(value);
    if (!whatsapp) {
      inputRef.current?.focus();
      return;
    }

    if (!WEBHOOK_URL) {
      window.open(GUIDE_WHATSAPP_URL, '_blank', 'noopener,noreferrer');
      setStatus('whatsapp');
      return;
    }

    setStatus('loading');
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsapp, origen: 'web-guia', fecha: new Date().toISOString() }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
      setValue('');
    } catch {
      setStatus('error');
    } finally {
      window.clearTimeout(timer);
    }
  };

  const loading = status === 'loading';

  return (
    // Sin JS el formulario abre WhatsApp directamente (progressive enhancement).
    <form
      className="sr-lead-form"
      action={CONTACT.whatsappUrl}
      method="get"
      target="_blank"
      noValidate
      onSubmit={onSubmit}
    >
      <input type="hidden" name="text" value="Hola, quiero la guía de las 7 trampas" />
      <div className="sr-hp" aria-hidden="true">
        <label>
          Empresa
          <input type="text" name="empresa" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label htmlFor={inputId} className="sr-field-label">
        Tu WhatsApp
      </label>
      <div className="sr-field-row">
        <input
          ref={inputRef}
          id={inputId}
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="300 123 4567"
          required
          className="sr-input"
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) validate(e.target.value);
            if (status === 'error' || status === 'success') setStatus('idle');
          }}
          onBlur={() => {
            if (value.trim()) validate(value);
          }}
        />
        <button
          type="submit"
          className="sr-btn sr-btn--primary sr-btn--submit"
          aria-disabled={loading || undefined}
        >
          {loading ? (
            <>
              <span className="sr-spinner" aria-hidden="true" />
              Enviando…
            </>
          ) : (
            'Enviarme la guía'
          )}
        </button>
      </div>

      <p id={errorId} className="sr-field-error" role="alert">
        {error}
      </p>

      <div className="sr-form-status" role="status" aria-live="polite">
        {status === 'success' && (
          <p className="sr-status sr-status--ok">
            <CheckIcon size={18} />
            ¡Listo! Te llega en unos minutos por WhatsApp
          </p>
        )}
        {status === 'error' && (
          <p className="sr-status sr-status--error">
            No pudimos enviarla. Inténtalo de nuevo o{' '}
            <a href={GUIDE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              pídela por WhatsApp
            </a>
            .
          </p>
        )}
        {status === 'whatsapp' && (
          <p className="sr-status">
            Te abrimos WhatsApp con el mensaje listo. ¿No se abrió?{' '}
            <a href={GUIDE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Escríbenos aquí
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
