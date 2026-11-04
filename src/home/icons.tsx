import type { ReactNode, SVGProps } from 'react';

// Íconos de línea propios (trazo 1.8, color heredado). Sin librerías.
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 24, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </Icon>
);

export const ReelIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M3 8.5h18" />
    <path d="M7.5 4l2 4.5M13 4l2 4.5" />
    <path d="M10.5 12.2v4.6l3.9-2.3z" />
  </Icon>
);

export const BotIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 11.5a8 8 0 0 1-11.6 7.1L4 19.8l1.2-4A8 8 0 1 1 20 11.5z" />
    <path d="M8.5 10h7M8.5 13.5h4.5" />
  </Icon>
);

export const WebIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="M3 8.5h18" />
    <path d="M7 16.5l3-3 2.5 2 4.5-4.5" />
  </Icon>
);

export const AgentIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="6" y="6" width="12" height="12" rx="2.5" />
    <path d="M9.5 2.5v3M14.5 2.5v3M9.5 18.5v3M14.5 18.5v3M2.5 9.5h3M2.5 14.5h3M18.5 9.5h3M18.5 14.5h3" />
    <path d="M12 9.3l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z" />
  </Icon>
);

export const ShieldIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3l7 3v5.2c0 4.4-2.9 8.3-7 9.8-4.1-1.5-7-5.4-7-9.8V6z" />
    <path d="M9 12l2.2 2.2L15.5 10" />
  </Icon>
);

export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Icon>
);

export const PauseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 6v12M15 6v12" />
  </Icon>
);

export const PlayIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 5.5v13l10-6.5z" />
  </Icon>
);

export const MailIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M4 7l8 6 8-6" />
  </Icon>
);

export const WhatsAppIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20.5 11.7a8.5 8.5 0 0 1-12.4 7.6L3.5 20.5l1.3-4.4a8.5 8.5 0 1 1 15.7-4.4z" />
    <path d="M9 8.3c.3-.4.6-.5 1-.5h.4c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.6.7a5.7 5.7 0 0 0 2.6 2.6l.7-.6c.2-.1.4-.2.6-.1l1.7.7c.3.1.4.3.4.5v.4c0 .4-.2.7-.5 1-.7.5-1.8.6-3.2-.1a8.2 8.2 0 0 1-3.6-3.6c-.7-1.4-.6-2.5-.1-3.2z" />
  </Icon>
);

/** Sol de 8 rayos (logo SunRiver). */
export const SunLogo = ({ size = 26, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <circle cx="12" cy="12" r="3.6" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M19.07 4.93l-2.12 2.12M4.93 19.07l2.12-2.12" />
    </g>
  </svg>
);

/**
 * Marca de SunRiver (sol con rayos sobre una ola con cinta azul), redibujada en vectores.
 * Se usa en la barra, el favicon y la animación de entrada. `idPrefix` evita ids repetidos.
 */
export const LogoMarkShapes = ({ idPrefix = 'srm' }: { idPrefix?: string }) => (
  <>
    <defs>
      <clipPath id={`${idPrefix}-clip`}>
        <circle cx="200" cy="200" r="192" />
      </clipPath>
    </defs>
    <g clipPath={`url(#${idPrefix}-clip)`}>
      <rect width="400" height="400" fill="#FF7A1A" />
      <circle cx="200" cy="168" r="116" fill="#0B0C0F" />
      <circle cx="200" cy="168" r="104" fill="#FF7A1A" />
      <g stroke="#0B0C0F" strokeWidth="11">
        <line x1="200" y1="168" x2="200" y2="-10" />
        <line x1="200" y1="168" x2="354" y2="79" />
        <line x1="200" y1="168" x2="354" y2="257" />
        <line x1="200" y1="168" x2="46" y2="79" />
        <line x1="200" y1="168" x2="46" y2="257" />
        <line x1="200" y1="168" x2="410" y2="168" />
        <line x1="200" y1="168" x2="-10" y2="168" />
      </g>
      <circle cx="200" cy="168" r="104" fill="#FF7A1A" />
      <path d="M-10 238C70 205 150 212 205 245S335 282 410 222L410 410L-10 410Z" fill="#0B0C0F" />
      <path d="M-10 252C70 219 150 226 205 259S335 296 410 236L410 410L-10 410Z" fill="#FFFFFF" />
      <path d="M-10 282C70 262 150 262 205 285S335 296 410 246" fill="none" stroke="#0B0C0F" strokeWidth="44" />
      <path d="M-10 282C70 262 150 262 205 285S335 296 410 246" fill="none" stroke="#4B8BFF" strokeWidth="28" />
      <path d="M30 330C120 292 215 360 330 300" fill="none" stroke="#0B0C0F" strokeWidth="9" strokeLinecap="round" />
    </g>
  </>
);

export const SunRiverMark = ({
  size = 32,
  idPrefix = 'srm-nav',
  ...rest
}: SVGProps<SVGSVGElement> & { size?: number; idPrefix?: string }) => (
  <svg width={size} height={size} viewBox="0 0 400 400" aria-hidden="true" focusable="false" {...rest}>
    <LogoMarkShapes idPrefix={idPrefix} />
  </svg>
);

/**
 * Anillos de «Más allá de lo artificial».
 * PROVISIONAL: si tienes el SVG oficial del logo, reemplaza este componente.
 */
export const RingsLogo = ({ size = 96, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <circle cx="60" cy="60" r="44" />
    <circle cx="60" cy="60" r="30" />
    <ellipse cx="60" cy="60" rx="44" ry="15" />
    <circle cx="60" cy="60" r="4.5" fill="currentColor" stroke="none" />
  </svg>
);
