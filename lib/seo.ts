export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Advokatska kancelarija Marić",
    alternateName: "Marić Law Office",
    url: "https://mariclaw.rs",
    telephone: "+381638964004",
    email: "kancelarija.maric@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ul. V. Zečevića K-1",
      addressLocality: "Loznica",
      addressCountry: "RS",
    },
    foundingDate: "1994-01",
    areaServed: {
      "@type": "Country",
      name: "Serbia",
    },
    knowsAbout: [
      "Criminal Law",
      "Labor Law",
      "Civil Law",
      "Administrative Law",
      "Commercial Law",
      "Misdemeanor Law",
      "Human Rights Protection",
    ],
    priceRange: "$$",
    sameAs: [],
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateArticleJsonLd(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Organization",
      name: "Advokatska kancelarija Marić",
    },
    publisher: {
      "@type": "Organization",
      name: "Advokatska kancelarija Marić",
      url: "https://mariclaw.rs",
    },
  };
}
