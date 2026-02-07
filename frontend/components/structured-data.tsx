export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "LA Healthcare Access Dashboard",
    "description": "Interactive dashboard analyzing healthcare facility access across 2,498 LA County census tracts serving 9.9M residents",
    "url": "https://la-healthcare-access-mapping.vercel.app",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Caleb Newton",
      "url": "https://calebnewton.me"
    },
    "creator": {
      "@type": "Person",
      "name": "Caleb Newton",
      "url": "https://calebnewton.me"
    },
    "about": {
      "@type": "Thing",
      "name": "Healthcare Access Analysis",
      "description": "Geospatial analysis of healthcare facility access in Los Angeles County"
    },
    "keywords": "healthcare access, Los Angeles County, policy recommendations, geospatial analysis, HPSA, MUA, public health",
    "audience": {
      "@type": "Audience",
      "audienceType": "Public health officials, policymakers, researchers"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
