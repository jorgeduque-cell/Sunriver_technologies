import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
  schema?: object;
}

/**
 * SEO Component for dynamic meta tags
 * Usage: <SEO title="..." description="..." />
 */
export const SEO = ({
  title,
  description,
  keywords,
  ogImage = 'https://sunriver.solutions/og-image.jpg',
  canonical,
  noindex = false,
  schema,
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const metaTags = {
      description,
      keywords,
      robots: noindex ? 'noindex, nofollow' : 'index, follow',
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      if (!content) return;
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Update Open Graph tags
    const ogTags = {
      'og:title': title,
      'og:description': description,
      'og:image': ogImage,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Update canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    // Add JSON-LD schema
    if (schema) {
      const existingScript = document.querySelector('#json-ld-schema');
      if (existingScript) {
        existingScript.remove();
      }
      const script = document.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    // Cleanup on unmount
    return () => {
      const schemaScript = document.querySelector('#json-ld-schema');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [title, description, keywords, ogImage, canonical, noindex, schema]);

  return null;
};

// Predefined schemas for common page types
export const LocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SunRiver Solution',
  description: 'Websites con Propósito impulsados por IA. Transformamos tu presencia digital en una máquina de crecimiento.',
  url: 'https://sunriver.solutions',
  logo: 'https://sunriver.solutions/logo.png',
  image: 'https://sunriver.solutions/og-image.jpg',
  telephone: '+57-312-4183002',
  email: 'jorge_duque@sunriver.cloud',
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
      url: 'https://sunriver.solutions/logo.png',
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

export default SEO;
