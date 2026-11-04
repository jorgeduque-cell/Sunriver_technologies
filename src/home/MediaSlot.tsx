import { MEDIA, type MediaId } from './media';
import { MediaCarousel } from './MediaCarousel';

/**
 * Foto de la home o, si todavía no existe, un bloque con la paleta de marca y la etiqueta
 * "FOTO PENDIENTE". Siempre reserva su proporción (sin saltos de diseño).
 */
export function MediaSlot({
  id,
  className,
  sizes = '(max-width: 767px) 92vw, 40vw',
  eager = false,
  decorative = false,
  still = false,
}: {
  id: MediaId;
  className?: string;
  sizes?: string;
  eager?: boolean;
  /** Dentro de un bloque ya oculto a lectores de pantalla (p. ej. caras del cubo). */
  decorative?: boolean;
  /** Con varias imágenes, mostrar solo la primera (donde no cabe un carrusel). */
  still?: boolean;
}) {
  const base = MEDIA[id];
  const first = base.slides?.[0];
  const cls = ['sr-media', base.contain ? 'sr-media--contain' : '', className ?? ''].filter(Boolean).join(' ');

  if (base.slides && base.slides.length > 1 && !still && !decorative) {
    return <MediaCarousel media={base} className={cls} />;
  }
  // Con carrusel pero sin espacio para él: la primera imagen, como foto normal.
  const m = first ? { ...base, src: first.src, srcSmall: undefined, alt: first.alt } : base;

  if (!m.src) {
    return (
      <div
        className={`${cls} sr-media--pending`}
        style={{ aspectRatio: `${m.width} / ${m.height}` }}
        role={decorative || !m.alt ? undefined : 'img'}
        aria-label={decorative || !m.alt ? undefined : m.alt}
        aria-hidden={decorative || !m.alt ? true : undefined}
      >
        <span className="sr-media-tag">
          Foto pendiente · {m.label}
        </span>
      </div>
    );
  }

  return (
    <div className={cls} style={{ aspectRatio: `${m.width} / ${m.height}` }}>
      <img
        src={m.src}
        srcSet={m.srcSmall ? `${m.srcSmall} 640w, ${m.src} ${m.width}w` : undefined}
        sizes={m.srcSmall ? sizes : undefined}
        width={m.width}
        height={m.height}
        alt={decorative ? '' : m.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
}
