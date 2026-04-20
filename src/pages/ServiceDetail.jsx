import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import SEO from '../components/SEO';
import SchemaOrg, { createBreadcrumbSchema } from '../components/SchemaOrg';

const ServiceDetail = () => {
    const { slug } = useParams();
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchService = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${apiBaseUrl}/services/show/${slug}`);
                if (!response.ok) {
                    throw new Error('Service not found');
                }
                const data = await response.json();
                setService(data);
            } catch (error) {
                console.error('Error fetching service data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
        window.scrollTo(0, 0);
    }, [slug, apiBaseUrl]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="inline-block w-8 h-8 border-2 border-[#003399] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h2>
                <p className="text-gray-500 mb-8">The service you are looking for might have been moved or deleted.</p>
                <Link to="/" className="bg-[#003399] text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition">
                    Return Home
                </Link>
            </div>
        );
    }

    return (
        <div className="service-detail-page bg-[#fcfcfc] min-h-screen">
            <SEO
                title={`${service.meta_title || service.title} - GCUB`}
                description={service.meta_description || service.excerpt}
                keywords={service.meta_keywords}
            />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Our Services', url: '#' },
                { name: service.title, url: `/service/${service.slug}` }
            ])} />

            {/* Header Section */}
            <section className="relative bg-[#001a37] text-white py-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="text-[#E61111] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Our Services</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">{service.title}</h1>
                        <div className="h-1.5 w-16 bg-white mx-auto mb-6"></div>
                        {service.excerpt && (
                            <p className="text-white text-lg md:text-xl leading-relaxed font-light opacity-90 max-w-2xl mx-auto">
                                {service.excerpt}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm rounded-2xl">
                        {service.image_path && (
                            <div className="mb-10 rounded-xl overflow-hidden shadow-lg border border-gray-50">
                                <img
                                    src={`${import.meta.env.VITE_BASE_URL}/${service.image_path}`}
                                    alt={service.title}
                                    className="w-full h-auto object-cover max-h-[400px]"
                                />
                            </div>
                        )}
                        
                        <div
                            className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed dynamic-content"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(service.content) }}
                        >
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#001a37] p-8 rounded-2xl text-white">
                        <div>
                            <h4 className="text-xl font-bold mb-2 text-white">Need more information?</h4>
                            <p className="text-blue-100 text-sm">Our team is always here to help you choose the right service.</p>
                        </div>
                        <div className="flex gap-4">
                            <Link to="/contact" className="bg-[#E61111] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition shadow-lg shadow-red-900/20">
                                Contact Us
                            </Link>
                            <Link to="/branch-locator" className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-lg font-bold hover:bg-white/20 transition">
                                Find a Branch
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ServiceDetail;
