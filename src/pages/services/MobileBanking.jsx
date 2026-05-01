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
import DownloadApp from '../../components/mobile-banking/DownloadApp';
import SidebarPromo from '../../components/mobile-banking/SidebarPromo';

const MobileBanking = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await apiFetch(`${import.meta.env.VITE_API_BASE_URL}/service-content/mobile-banking`);
                const result = await res.json();
                
                // Construct structured data object for components
                const structuredData = {
                    ...result,
                    hero: {
                        enabled: result.section_visibility_json?.hero !== false,
                        title: result.hero_title,
                        description: result.hero_description,
                        breadcrumb: result.hero_breadcrumb_text
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
                        items: result.key_features_json
                    },
                    tips: {
                        enabled: result.section_visibility_json?.tips !== false,
                        tips: result.sidebar_tips_json
                    },
                    help: {
                        enabled: result.section_visibility_json?.help !== false,
                        ...(result.helpbox_json || {
                            title: 'Need Help?',
                            description: 'Need assistance in registering for mobile banking? Our helpdesk is ready to assist you.',
                            phone: result.helpdesk_phone,
                            action: 'call'
                        })
                    },
                    promo: {
                        enabled: result.section_visibility_json?.promo !== false,
                        ...(result.sidebar_promo_json || {
                            title: 'Official Banking App',
                            subtitle: 'Safe Banking',
                            image: 'mobile-banking-sidebar.jpg',
                            description: 'Your security is our priority. Always use the official GCUB App for all your financial transactions.'
                        })
                    },
                    download: {
                        enabled: result.section_visibility_json?.download !== false,
                        ...(result.download_section_json || {
                            description: 'Available on both Android and iOS devices. Start your mobile banking journey today.',
                            playLink: result.play_store_url,
                            appLink: result.app_store_url
                        })
                    }
                };
                
                setData(structuredData);
            } catch (err) {
                console.error('Error fetching mobile banking content:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-500 animate-pulse font-medium">Loading Mobile Banking content...</div>
        </div>
    );

    if (!data) return <div className="min-h-screen flex items-center justify-center">Service content not found.</div>;

    return (
        <div className="mobile-banking-page bg-white font-inter text-gray-800">
            <SEO
                title={data.meta_title}
                description={data.meta_description}
                keywords={data.meta_keywords}
                url="/mobile-banking"
            />

            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Our Services', url: '/mobile-banking' },
                { name: data.hero.title, url: '/mobile-banking' }
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
                            <DownloadApp data={data.download} />
                        </div>

                        {/* Right Column: Sidebar (1/3) */}
                        <div className="lg:w-1/3 space-y-8">
                            <SidebarPromo data={data.promo} />
                            <QuickTips data={data.tips} />
                            <HelpBox data={data.help} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MobileBanking;
