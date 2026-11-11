/** Metadatos de cada página. Los escribe en el <head> src/layouts/BaseLayout.astro. */
export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
  schema?: object;
}

// Predefined schemas for common page types
export const LocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SunRiver Solution',
  description: 'Websites con Propósito impulsados por IA. Transformamos tu presencia digital en una máquina de crecimiento.',
  url: 'https://www.sunriverstech.com',
  logo: 'https://www.sunriverstech.com/favicon.svg',
  image: 'https://www.sunriverstech.com/og-image.jpg',
  telephone: '+57-312-4183002',
  email: 'jdriosol97@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CO',
    addressRegion: 'Valle del Cauca',
    addressLocality: 'Cali',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '3.4516',
    longitude: '-76.5320',
  },
  priceRange: '$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/sunriver-solution',
    'https://www.instagram.com/sunriver.solution',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Desarrollo Web',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Desarrollo Web con Propósito',
          description: 'Websites profesionales optimizados para conversión y crecimiento',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Automatización con IA',
          description: 'Chatbots y automatizaciones inteligentes para negocios',
        },
      },
    ],
  },
};

export const WebPageSchema = (title: string, description: string, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title,
  description,
  url,
  publisher: {
    '@type': 'Organization',
    name: 'SunRiver Solution',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.sunriverstech.com/favicon.svg',
    },
  },
});

export const ServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Desarrollo Web con Propósito',
  description: 'Creamos websites profesionales impulsados por IA que transforman negocios en máquinas de crecimiento',
  provider: {
    '@type': 'LocalBusiness',
    name: 'SunRiver Solution',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Colombia',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Paquetes de Desarrollo Web',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Website Starter',
        description: 'Perfecto para emprendedores que inician su transformación digital',
        price: 'Consultar',
        priceCurrency: 'COP',
      },
      {
        '@type': 'Offer',
        name: 'Website Business',
        description: 'Para empresas en crecimiento que necesitan escalar',
        price: 'Consultar',
        priceCurrency: 'COP',
      },
    ],
  },
};
