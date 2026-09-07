/**
 * SEO — metadata + JSON-LD builders per demo type.
 *
 * Generates structured data for search engines. Each template type has
 * its own JSON-LD builder (Organisation, Church, Store, etc.).
 *
 * @packageDocumentation
 */

export interface SEOMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  locale?: string;
}

interface OrganisationLD {
  "@context": "https://schema.org";
  "@type": "Organisation";
  name: string;
  url: string;
  description: string;
}

/** Build JSON-LD for an Organisation (parish, diocese, etc.). */
export function organisationLD(data: {
  name: string;
  url: string;
  description: string;
}): OrganisationLD {
  return {
    "@context": "https://schema.org",
    "@type": "Organisation",
    name: data.name,
    url: data.url,
    description: data.description,
  };
}

/** Build JSON-LD for a Store (online-store, basilica shop). */
export function storeLD(data: {
  name: string;
  url: string;
  description: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    name: data.name,
    url: data.url,
    description: data.description,
  };
}

/** Build Next.js metadata object from SEOMetadata. */
export function buildMetadata(meta: SEOMetadata) {
  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL(meta.canonicalUrl),
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.ogImage ? [{ url: meta.ogImage }] : undefined,
      locale: meta.locale ?? "lt_LT",
    },
  };
}
