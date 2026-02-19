import { Helmet } from 'react-helmet-async';

const SEO = ({
    title = 'The Guntur Co-Operative Urban Bank Limited',
    description = 'GCUB - A premier co-operative bank in Andhra Pradesh since 1947. Offering savings accounts, fixed deposits, gold loans, housing loans, and comprehensive banking services.',
    keywords = 'GCUB, Guntur Co-operative Bank, Urban Bank, Savings Account, Fixed Deposits, Gold Loans, Housing Loans, Andhra Pradesh Bank, Co-operative Bank',
    image = 'assets/images/gcublogo.png',
    url = '',
    type = 'website',
    author = 'The Guntur Co-Operative Urban Bank Limited',
    robots = 'index, follow'
}) => {
    const siteUrl = 'https://guntururban.bank.in';
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
    const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content={robots} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content="The Guntur Co-Operative Urban Bank Limited" />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />
            <meta name="twitter:site" content="@gcub" />
            <meta name="twitter:creator" content="@gcub" />

            {/* Additional Meta Tags */}
            <meta name="theme-color" content="#003399" />
            <meta name="msapplication-TileColor" content="#003399" />
        </Helmet>
    );
};

export default SEO;
