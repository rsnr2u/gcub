import { Helmet } from 'react-helmet-async';

const SchemaOrg = ({ schema }) => {
    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

// Predefined Schema Templates
export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "The Guntur Co-Operative Urban Bank Limited",
    "alternateName": "GCUB",
    "url": "https://gcub.in",
    "logo": "https://gcub.in/assets/images/gcublogo.png",
    "description": "A premier co-operative bank in Andhra Pradesh since 1947, offering comprehensive banking services including savings accounts, fixed deposits, loans, and digital banking solutions.",
    "foundingDate": "1947",
    "telephone": "1800-425-8873",
    "email": "info@gcub.in",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Main Branch, Guntur",
        "addressLocality": "Guntur",
        "addressRegion": "Andhra Pradesh",
        "postalCode": "522001",
        "addressCountry": "IN"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "1800-425-8873",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Telugu", "Hindi"]
    },
    "sameAs": [
        "https://facebook.com/gcub",
        "https://twitter.com/gcub",
        "https://linkedin.com/company/gcub"
    ]
};

export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Guntur Co-Operative Urban Bank Limited",
    "url": "https://gcub.in",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://gcub.in/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
    }
};

export const createBreadcrumbSchema = (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `https://gcub.in${item.url}`
    }))
});

export const createFinancialProductSchema = (product) => ({
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": product.name,
    "description": product.description,
    "url": `https://gcub.in/product/${product.slug}`,
    "provider": {
        "@type": "FinancialService",
        "name": "The Guntur Co-Operative Urban Bank Limited"
    },
    "category": product.category,
    "feesAndCommissionsSpecification": product.features || "Contact bank for details"
});

export const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BankOrCreditUnion",
    "name": "The Guntur Co-Operative Urban Bank Limited",
    "image": "https://gcub.in/assets/images/gcublogo.png",
    "telephone": "1800-425-8873",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Main Branch, Guntur",
        "addressLocality": "Guntur",
        "addressRegion": "Andhra Pradesh",
        "postalCode": "522001",
        "addressCountry": "IN"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "16.3067",
        "longitude": "80.4365"
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "10:00",
            "closes": "16:00"
        }
    ],
    "priceRange": "$$"
};

export default SchemaOrg;
