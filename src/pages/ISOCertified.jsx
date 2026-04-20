import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import SEO from '../components/SEO';
import SchemaOrg, { organizationSchema, createBreadcrumbSchema } from '../components/SchemaOrg';

const ISOCertified = () => {
    const [content, setContent] = useState({ title: '', body: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/iso-certified`);
            const data = await response.json();
            setContent(data);
        } catch (error) {
            console.error('Error fetching ISO content:', error);
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
        <div className="iso-certified-page">
            {/* SEO Meta Tags */}
            <SEO
                title="ISO Certified - GCUB | Quality Management System"
                description="GCUB is ISO certified, demonstrating our commitment to quality management, customer satisfaction, and continuous improvement in banking services."
                keywords="ISO Certification, Quality Management, ISO 9001, Banking Standards, GCUB Certification"
                url="/iso-certified"
            />

            {/* Schema.org Structured Data */}
            <SchemaOrg schema={organizationSchema} />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Disclosures', url: '#' },
                { name: 'ISO Certified', url: '/iso-certified' }
            ])} />

            {/* Hero Section */}
            <section className="relative bg-[#002b5c] text-white py-16">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        {content.title || 'ISO Certified'}
                    </h1>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">
                        Committed to Quality Excellence in Banking Services
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">

                        {/* ISO Certification Badge */}
                        <div className="flex justify-center mb-8">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-full p-8 shadow-lg">
                                <i className="fas fa-certificate text-6xl text-[#003399]"></i>
                            </div>
                        </div>

                        {/* Introduction */}
                        <div className="bg-blue-50 border-l-4 border-[#003399] p-6 rounded-r-lg mb-8">
                            <h2 className="text-xl font-bold text-[#003399] mb-3 flex items-center gap-2">
                                <i className="fas fa-award"></i>
                                Quality Assurance
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                The Guntur Co-Operative Urban Bank Limited is proud to be ISO certified, demonstrating our unwavering
                                commitment to maintaining the highest standards of quality management and customer service excellence.
                            </p>
                        </div>

                        {/* Dynamic Content */}
                        {content.body && (
                            <div
                                className="prose prose-lg max-w-none mb-8"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.body) }}
                            />
                        )}

                        {/* Default Content if no dynamic content */}
                        {!content.body && (
                            <>
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#003399] mb-4">What is ISO Certification?</h2>
                                        <p className="text-gray-700 leading-relaxed">
                                            ISO (International Organization for Standardization) certification is a globally recognized
                                            standard that ensures organizations meet international quality management requirements.
                                            It demonstrates our commitment to:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-3">
                                            <li>Consistent quality in products and services</li>
                                            <li>Customer satisfaction and continuous improvement</li>
                                            <li>Efficient processes and risk management</li>
                                            <li>Regulatory compliance and best practices</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold text-[#003399] mb-4">Our Certification</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <i className="fas fa-check-circle text-2xl text-[#003399]"></i>
                                                    </div>
                                                    <h3 className="text-lg font-bold text-gray-800">ISO 9001:2015</h3>
                                                </div>
                                                <p className="text-gray-600 text-sm">
                                                    Quality Management System certification ensuring consistent delivery of
                                                    high-quality banking services.
                                                </p>
                                            </div>

                                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                                        <i className="fas fa-shield-alt text-2xl text-green-600"></i>
                                                    </div>
                                                    <h3 className="text-lg font-bold text-gray-800">Verified Standards</h3>
                                                </div>
                                                <p className="text-gray-600 text-sm">
                                                    Regular audits and assessments ensure we maintain compliance with
                                                    international quality standards.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold text-[#003399] mb-4">Benefits to Our Customers</h2>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full bg-[#003399] text-white flex items-center justify-center font-bold flex-shrink-0">
                                                    <i className="fas fa-star"></i>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800 mb-1">Consistent Service Quality</h3>
                                                    <p className="text-gray-700 text-sm">
                                                        Standardized processes ensure you receive the same high-quality service every time.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full bg-[#003399] text-white flex items-center justify-center font-bold flex-shrink-0">
                                                    <i className="fas fa-users"></i>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800 mb-1">Customer-Focused Approach</h3>
                                                    <p className="text-gray-700 text-sm">
                                                        Our processes are designed with your needs and satisfaction as the top priority.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full bg-[#003399] text-white flex items-center justify-center font-bold flex-shrink-0">
                                                    <i className="fas fa-sync-alt"></i>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800 mb-1">Continuous Improvement</h3>
                                                    <p className="text-gray-700 text-sm">
                                                        We regularly review and enhance our services based on feedback and best practices.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full bg-[#003399] text-white flex items-center justify-center font-bold flex-shrink-0">
                                                    <i className="fas fa-lock"></i>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800 mb-1">Risk Management</h3>
                                                    <p className="text-gray-700 text-sm">
                                                        Robust risk assessment and mitigation strategies protect your interests.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold text-[#003399] mb-4">Our Commitment</h2>
                                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                                            <p className="text-gray-700 leading-relaxed mb-4">
                                                At GCUB, ISO certification is not just a badge—it's a promise. We are committed to:
                                            </p>
                                            <ul className="space-y-2 text-gray-700">
                                                <li className="flex items-center gap-2">
                                                    <i className="fas fa-check text-green-600"></i>
                                                    <span>Maintaining the highest quality standards in all our operations</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <i className="fas fa-check text-green-600"></i>
                                                    <span>Continuously improving our processes and services</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <i className="fas fa-check text-green-600"></i>
                                                    <span>Ensuring customer satisfaction through excellence</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <i className="fas fa-check text-green-600"></i>
                                                    <span>Adhering to regulatory requirements and industry best practices</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Contact Information */}
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-8">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Questions About Our Certification?</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                For more information about our ISO certification and quality management practices,
                                please contact our customer service team.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-2 bg-[#003399] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-800 transition"
                                >
                                    <i className="fas fa-envelope"></i>
                                    Contact Us
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
            </section>
        </div>
    );
};

export default ISOCertified;
