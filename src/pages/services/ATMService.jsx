import { useState, useEffect } from 'react';
import SEO from '../../components/SEO';
import { apiFetch } from '../../utils/api';
import SchemaOrg, { createBreadcrumbSchema } from '../../components/SchemaOrg';

// Modular Components
import HeroSection from '../../components/mobile-banking/HeroSection';
import IntroSection from '../../components/mobile-banking/IntroSection';
import HighlightCards from '../../components/mobile-banking/HighlightCards';
import FeaturesList from '../../components/mobile-banking/FeaturesList';
import QuickTips from '../../components/mobile-banking/QuickTips';
import HelpBox from '../../components/mobile-banking/HelpBox';
import SidebarPromo from '../../components/mobile-banking/SidebarPromo';
import AtmSecurityTips from '../../components/atm-service/AtmSecurityTips';

const ATMService = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await apiFetch(`${import.meta.env.VITE_API_BASE_URL}/service-content/atm-services`);
                const result = await res.json();
                
                // Construct structured data object for components
                const structuredData = {
                    ...result,
                    hero: {
                        enabled: result.section_visibility_json?.hero !== false,
                        title: result.hero_title,
                        description: result.hero_description,
                        breadcrumb: result.hero_breadcrumb_text || 'Our Services'
                    },
                    intro: {
                        enabled: result.section_visibility_json?.intro !== false,
                        title: result.intro_title,
                        heading: result.intro_heading,
                        description: result.intro_description
                    },
                    highlights: {
                        enabled: result.section_visibility_json?.highlights !== false,
                        cards: result.highlights_json || []
                    },
                    features: {
                        enabled: result.section_visibility_json?.features !== false,
                        items: result.features_json
                    },
                    security: {
                        enabled: result.section_visibility_json?.security !== false,
                        tips: result.security_tips_json
                    },
                    promo: {
                        enabled: result.section_visibility_json?.promo !== false,
                        ...(result.sidebar_promo_json || {
                            title: 'ATM Locator',
                            subtitle: 'GCUB Network',
                            image: 'atm-locator-sidebar.jpg',
                            description: 'Find the nearest GCUB ATM in seconds using our interactive branch & ATM locator.'
                        })
                    },
                    help: {
                        enabled: result.section_visibility_json?.help !== false,
                        ...(result.helpbox_json || {
                            title: 'Emergency',
                            description: 'Lost your debit card? Block it immediately to prevent unauthorized transactions.',
                            phone: result.sidebar_emergency_phone,
                            action: 'call'
                        })
                    },
                    tips: {
                        enabled: result.section_visibility_json?.tips !== false,
                        tips: result.sidebar_tips_json
                    }
                };
                
                setData(structuredData);
            } catch (err) {
                console.error('Error fetching ATM service content:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-500 animate-pulse font-medium">Loading ATM Services content...</div>
        </div>
    );

    if (!data) return <div className="min-h-screen flex items-center justify-center">Service content not found.</div>;

    return (
        <div className="atm-service-page bg-white font-inter text-gray-800">
            <SEO
                title={data.meta_title}
                description={data.meta_description}
                keywords={data.meta_keywords}
                url="/atm-services"
            />

            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Our Services', url: '/atm-services' },
                { name: data.hero.title, url: '/atm-services' }
            ])} />

            <HeroSection data={data.hero} />

            {/* Content Area following Corporate Layout Pattern */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row gap-16">
                        
                        {/* Left Column: Narrative (2/3) */}
                        <div className="lg:w-2/3">
                            <IntroSection data={data.intro} />
                            <HighlightCards data={data.highlights} />
                            <FeaturesList data={data.features} />
                            <AtmSecurityTips data={data.security} />
                        </div>

                        {/* Right Column: Sidebar (1/3) */}
                        <div className="lg:w-1/3 space-y-8">
                            <SidebarPromo data={data.promo} />
                            <HelpBox data={data.help} />
                            <QuickTips data={data.tips} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ATMService;
