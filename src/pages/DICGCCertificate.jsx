import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import SEO from '../components/SEO';
import SchemaOrg, { organizationSchema, createBreadcrumbSchema } from '../components/SchemaOrg';

const DICGCCertificate = () => {
    const [content, setContent] = useState({ title: '', body: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/dicgc-certificate`);
            const data = await response.json();
            setContent(data);
        } catch (error) {
            console.error('Error fetching DICGC content:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <i className="fas fa-spinner fa-spin text-4xl text-[#003399] mb-4"></i>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dicgc-certificate-page">
            {/* SEO Meta Tags */}
            <SEO
                title="DICGC Certificate - GCUB | Deposit Insurance"
                description="View GCUB's DICGC (Deposit Insurance and Credit Guarantee Corporation) certificate. Your deposits are insured and protected up to ₹5 lakhs per depositor."
                keywords="DICGC Certificate, Deposit Insurance, GCUB Insurance, Bank Deposit Protection, DICGC Coverage"
                url="/dicgc-certificate"
            />

            {/* Schema.org Structured Data */}
            <SchemaOrg schema={organizationSchema} />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Disclosures', url: '#' },
                { name: 'DICGC Certificate', url: '/dicgc-certificate' }
            ])} />

            {/* Hero Section */}
            <section className="relative bg-[#002b5c] text-white py-16">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        {content.title || 'DICGC Certificate'}
                    </h1>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">
                        Deposit Insurance and Credit Guarantee Corporation
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">

                        {/* DICGC Information */}
                        <div className="space-y-6">
                            <div className="bg-blue-50 border-l-4 border-[#003399] p-6 rounded-r-lg">
                                <h2 className="text-xl font-bold text-[#003399] mb-3 flex items-center gap-2">
                                    <i className="fas fa-shield-alt"></i>
                                    Your Deposits are Protected
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    The Guntur Co-Operative Urban Bank Limited is registered with the Deposit Insurance and Credit Guarantee Corporation (DICGC).
                                    All eligible deposits are insured up to a maximum of <strong>₹5,00,000</strong> (Rupees Five Lakhs) per depositor.
                                </p>
                            </div>

                            {/* Dynamic Content */}
                            {content.body && (
                                <div
                                    className="prose prose-lg max-w-none"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.body) }}
                                />
                            )}

                            {/* Default Content if no dynamic content */}
                            {!content.body && (
                                <>
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#003399] mb-4">What is DICGC?</h2>
                                        <p className="text-gray-700 leading-relaxed">
                                            The Deposit Insurance and Credit Guarantee Corporation (DICGC) is a subsidiary of the Reserve Bank of India (RBI).
                                            It provides insurance coverage on bank deposits to protect depositors in case of bank failure.
                                        </p>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold text-[#003399] mb-4">Coverage Details</h2>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li><strong>Maximum Coverage:</strong> ₹5,00,000 per depositor per bank</li>
                                            <li><strong>Eligible Deposits:</strong> Savings, Current, Fixed, and Recurring Deposits</li>
                                            <li><strong>Coverage Includes:</strong> Principal and interest amounts</li>
                                            <li><strong>Automatic Protection:</strong> No separate application required</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold text-[#003399] mb-4">Important Points</h2>
                                        <div className="space-y-3 text-gray-700">
                                            <p>
                                                <strong>1. Per Depositor Limit:</strong> The insurance cover of ₹5 lakhs is per depositor per bank,
                                                not per account. If you have multiple accounts, the total coverage remains ₹5 lakhs.
                                            </p>
                                            <p>
                                                <strong>2. Excluded Deposits:</strong> Deposits of foreign governments, central/state governments,
                                                inter-bank deposits, and deposits specifically excluded by DICGC are not covered.
                                            </p>
                                            <p>
                                                <strong>3. Joint Accounts:</strong> For joint accounts, the insurance coverage is allocated
                                                equally among all account holders.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                                        <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
                                            <i className="fas fa-check-circle"></i>
                                            GCUB is DICGC Insured
                                        </h3>
                                        <p className="text-green-700 leading-relaxed">
                                            All eligible deposits with The Guntur Co-Operative Urban Bank Limited are fully insured
                                            under the DICGC scheme, providing you with peace of mind and financial security.
                                        </p>
                                    </div>
                                </>
                            )}

                            {/* Contact Information */}
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-8">
                                <h3 className="text-lg font-bold text-gray-800 mb-3">For More Information</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    For detailed information about DICGC coverage and claims, please visit the official DICGC website
                                    or contact our customer service.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href="https://www.dicgc.org.in"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#003399] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-800 transition"
                                    >
                                        <i className="fas fa-external-link-alt"></i>
                                        Visit DICGC Website
                                    </a>
                                    <a
                                        href="tel:18004258873"
                                        className="inline-flex items-center gap-2 bg-white text-[#003399] border-2 border-[#003399] px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-50 transition"
                                    >
                                        <i className="fas fa-phone-alt"></i>
                                        1800-425-8873
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DICGCCertificate;
