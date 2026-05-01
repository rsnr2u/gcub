import { useState, useEffect } from 'react';
import SEO from '../../components/SEO';
import { apiFetch } from '../../utils/api';
import HeroSection from '../../components/mobile-banking/HeroSection';
import IntroSection from '../../components/mobile-banking/IntroSection';
import BenefitsSection from '../../components/e-statements/BenefitsSection';
import HelpBox from '../../components/mobile-banking/HelpBox';
import SidebarPromo from '../../components/mobile-banking/SidebarPromo';
import SubscriptionMethods from '../../components/e-statements/SubscriptionMethods';
import SchemaOrg, { createBreadcrumbSchema } from '../../components/SchemaOrg';

const EStatements = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await apiFetch(`${import.meta.env.VITE_API_BASE_URL}/service-content/e-statements`);
                const result = await res.json();
                setData(result);
            } catch (err) {
                console.error('Error fetching E-statements content:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
        window.scrollTo(0, 0);
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#003399] border-t-transparent rounded-full animate-spin"></div>
            </div>
        </div>
    );

    if (!data) return <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">Service content not found.</div>;

    return (
        <div className="service-page bg-[#fcfcfc] min-h-screen">
            <SEO
                title={`${data.meta_title || 'E-Statements'} - GCUB`}
                description={data.meta_description}
                keywords={data.meta_keywords}
            />
            
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Our Services', url: '#' },
                { name: data.hero_title || 'E-Statements', url: '/e-statements' }
            ])} />

            <HeroSection data={{
                title: data.hero_title,
                description: data.hero_description,
                slug: 'e-statements'
            }} />

            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Main Content (2/3) */}
                    <div className="lg:col-span-2 space-y-12">
                        <IntroSection data={{
                            title: data.intro_title,
                            description: data.intro_description
                        }} />

                        {data.benefits_json && (
                            <div className="benefits-section">
                                <h3 className="text-xl font-bold text-[#003399] mb-8 flex items-center gap-3">
                                    <span className="w-1.5 h-6 bg-[#22C55E] rounded-full"></span>
                                    {data.benefits_title || 'Benefits of E-Statements'}
                                </h3>
                                <BenefitsSection data={{
                                    enabled: true,
                                    items: data.benefits_json
                                }} />
                            </div>
                        )}

                        {data.subscription_json && (
                            <SubscriptionMethods data={data.subscription_json} />
                        )}
                    </div>

                    {/* Sidebar (1/3) */}
                    <div className="space-y-8">
                        {data.sidebar_note && (
                            <HelpBox data={{
                                enabled: true,
                                title: 'Important Note',
                                description: data.sidebar_note,
                                icon: 'fa-info-circle',
                                theme: 'blue-dark'
                            }} />
                        )}

                        {data.sidebar_support_phone && (
                            <HelpBox data={{
                                enabled: true,
                                title: 'Need help?',
                                description: 'If you face any issues while accessing your e-statements, contact our support team.',
                                phone: data.sidebar_support_phone,
                                action: 'call',
                                icon: 'fa-headset'
                            }} />
                        )}

                        {data.helpbox_json && <HelpBox data={data.helpbox_json} />}
                        {data.sidebar_promo_json && <SidebarPromo data={data.sidebar_promo_json} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EStatements;
