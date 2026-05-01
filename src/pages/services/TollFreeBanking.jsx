import { useState, useEffect } from 'react';
import SEO from '../../components/SEO';
import { apiFetch } from '../../utils/api';
import HeroSection from '../../components/mobile-banking/HeroSection';
import IntroSection from '../../components/mobile-banking/IntroSection';
import FeaturesList from '../../components/mobile-banking/FeaturesList';
import HelpBox from '../../components/mobile-banking/HelpBox';
import SidebarPromo from '../../components/mobile-banking/SidebarPromo';
import HelplineCard from '../../components/toll-free/HelplineCard';
import SchemaOrg, { createBreadcrumbSchema } from '../../components/SchemaOrg';

const TollFreeBanking = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await apiFetch(`${import.meta.env.VITE_API_BASE_URL}/service-content/toll-free-banking`);
                const result = await res.json();
                setData(result);
            } catch (err) {
                console.error('Error fetching toll free banking content:', err);
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
                title={`${data.meta_title || 'Toll Free Banking'} - GCUB`}
                description={data.meta_description}
                keywords={data.meta_keywords}
            />

            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Our Services', url: '#' },
                { name: data.hero_title || 'Toll Free Banking', url: '/toll-free-banking' }
            ])} />

            <HeroSection data={{
                title: data.hero_title,
                description: data.hero_description,
                slug: 'toll-free-banking'
            }} />

            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content (2/3) */}
                    <div className="lg:col-span-2">
                        <IntroSection data={{
                            title: data.intro_title,
                            description: data.intro_description
                        }} />

                        <HelplineCard number={data.helpline_number} />

                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 mt-12">
                            <FeaturesList data={{
                                title: 'Key Features',
                                items: data.services_offered_json,
                                enabled: true
                            }} />

                            <FeaturesList data={{
                                title: 'Emergency Services',
                                icon: 'fa-exclamation-triangle',
                                items: data.emergency_services_json,
                                enabled: true
                            }} />
                        </div>
                    </div>

                    {/* Sidebar (1/3) */}
                    <div className="space-y-8">
                        <HelpBox data={{
                            enabled: true,
                            title: data.balance_enquiry_json?.title || 'Balance Enquiry',
                            description: data.balance_enquiry_json?.description || 'Give a missed call through your registered mobile number for quick service.',
                            phone: data.sidebar_balance_enquiry,
                            action: 'call',
                            icon: 'fa-wallet'
                        }} />

                        <HelpBox data={{
                            enabled: true,
                            title: data.card_blocking_json?.title || 'ATM Card Blocking',
                            description: data.card_blocking_json?.description || 'Lost or stolen card? Call immediately to block your card and protect your funds.',
                            phone: data.sidebar_card_blocking,
                            action: 'call',
                            icon: 'fa-shield-alt'
                        }} />

                        {data.helpbox_json && <HelpBox data={data.helpbox_json} />}

                        <div className="bg-[#002b5c] p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <i className="fas fa-file-download text-7xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-4 relative z-10">{data.downloads_json?.title || 'Quick Downloads'}</h3>
                            <p className="text-blue-100/70 text-sm mb-6 relative z-10 leading-relaxed">
                                {data.downloads_json?.description || 'Download the Toll Free Banking request form to avail these services securely.'}
                            </p>
                            <a
                                href={data.sidebar_download_url}
                                className="w-full inline-flex items-center justify-center gap-3 bg-white text-[#002b5c] py-4 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg relative z-10"
                            >
                                <i className="fas fa-cloud-download-alt"></i>
                                <span>{data.downloads_json?.button_label || 'Download Request Form'}</span>
                            </a>
                            <p className="text-[10px] text-blue-300/50 mt-4 uppercase tracking-[0.2em] font-black text-center relative z-10">PDF Format | 1.2 MB</p>
                        </div>

                        {data.sidebar_promo_json && <SidebarPromo data={data.sidebar_promo_json} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TollFreeBanking;
