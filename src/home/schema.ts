import { CONTACT, FAQS, SITE_URL } from './content';

const professionalService = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}#organizacion`,
  name: 'SunRiver Solutions',
  url: SITE_URL,
  image: `${SITE_URL}og-image.jpg`,
  logo: `${SITE_URL}favicon.svg`,
  description:
    'Creamos contenido que llega a gente nueva y bots que responden a cada cliente en Instagram, WhatsApp y tu web.',
  telephone: CONTACT.whatsappE164,
  email: CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bogotá',
    addressRegion: 'Bogotá D.C.',
    addressCountry: 'CO',
  },
  areaServed: { '@type': 'Country', name: 'Colombia' },
  sameAs: [CONTACT.instagramUrl],
};

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const jsonLd = (id: string, data: object) =>
  `<script type="application/ld+json" id="${id}">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

/** Etiquetas que solo van en la home (las añade src/pages/index.astro). */
export function homeHeadTags(): string {
  return [
    `<link rel="canonical" href="${SITE_URL}" />`,
    `<meta property="og:url" content="${SITE_URL}" />`,
    jsonLd('ld-professional-service', professionalService),
    jsonLd('ld-faq', faqPage),
  ].join('\n  ');
}
