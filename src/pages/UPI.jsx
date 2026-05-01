import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { apiFetch } from '../utils/api';

const UPI = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await apiFetch(`${import.meta.env.VITE_API_BASE_URL}/service-content/upi`);
                const result = await res.json();
                
                // Data Normalization
                if (result.sidebar_links_json && !Array.isArray(result.sidebar_links_json)) {
                    result.sidebar_links_json = Object.entries(result.sidebar_links_json).map(([url, label]) => ({
                        label: String(label),
                        url: String(url)
                    }));
                }
                
                setData(result);
            } catch (err) {
                console.error('Error fetching UPI content:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#001b44]"></div>
        </div>
    );

    if (!data) return <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">Service configuration is being initialized...</div>;

    const isVisible = (section) => data.section_visibility_json?.[section] !== false;

    return (
        <div className="bg-white min-h-screen font-inter pb-20">
            <SEO
                title={data.meta_title || 'UPI - GCUB'}
                description={data.meta_description}
                keywords={data.meta_keywords}
            />

            {/* Hero Section (Exactly as per image: Dark Blue, Centered) */}
            <div className="bg-[#001b44] py-20 text-center text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-5xl font-bold mb-4 tracking-tight uppercase">{data.hero_title || 'UPI'}</h1>
                    <p className="text-lg text-slate-300 font-light max-w-2xl mx-auto">
                        {data.hero_description || 'Unified Payments Interface - The future of mobile payments.'}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Content Section (Left) */}
                    <div className="lg:col-span-8 space-y-12">
                        
                        {/* Overview */}
                        {isVisible('intro') && (
                            <section>
                                <h2 className="text-2xl font-bold text-[#003399] mb-6 tracking-tight">{data.intro_title || 'Overview'}</h2>
                                <p className="text-[15px] text-slate-700 leading-relaxed font-bold">
                                    {data.intro_description || 'Unified Payments Interface (UPI) is a system that powers multiple bank accounts into a single mobile application (of any participating bank), merging several banking features, seamless fund routing & merchant payments into one hood. It also caters to the "Peer to Peer" collect request which can be scheduled and paid as per requirement and convenience.'}
                                </p>
                            </section>
                        )}

                        {/* Benefits of UPI */}
                        {isVisible('benefits') && data.benefits_json && (
                            <section className="space-y-6">
                                <div className="border-l-4 border-[#003399] pl-4">
                                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">Benefits of UPI</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {data.benefits_json.map((benefit, idx) => (
                                        <div key={idx} className="p-6 bg-slate-50 rounded-xl border border-slate-100 h-full">
                                            <div className="mb-3">
                                                <i className={`fas fa-${benefit.icon || 'shield-alt'} text-[#003399] text-xl`}></i>
                                            </div>
                                            <h4 className="text-[15px] font-bold text-slate-800 mb-2">{benefit.title}</h4>
                                            <p className="text-[13px] text-slate-500 leading-relaxed">
                                                {benefit.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* How to Register? */}
                        {isVisible('registration') && data.registration_steps_json && (
                            <section className="space-y-6">
                                <div className="border-l-4 border-[#003399] pl-4">
                                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">How to Register?</h3>
                                </div>
                                <div className="bg-slate-50/50 border border-slate-100 p-8 rounded-xl shadow-sm">
                                    <div className="space-y-5">
                                        {data.registration_steps_json.map((step, idx) => (
                                            <div key={idx} className="flex gap-4 items-start">
                                                <span className="text-[14px] font-bold text-slate-800 pt-0.5">{idx + 1}.</span>
                                                <p className="text-[14px] text-slate-700 leading-relaxed font-medium">
                                                    {step}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar Section (Right) */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* Related Services */}
                        <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm">
                            <h4 className="text-[15px] font-bold text-slate-800 mb-6 tracking-tight">Related Services</h4>
                            <div className="space-y-4">
                                {(data.sidebar_links_json || []).map((link, idx) => (
                                    <Link key={idx} to={link.url} className="flex items-center gap-3 group">
                                        <span className="text-slate-400 group-hover:text-[#003399] transition-colors">{'>'}</span>
                                        <span className="text-[14px] font-bold text-slate-600 group-hover:text-[#003399] transition-colors tracking-tight">
                                            {link.label}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Download Forms Box (Greyed as per image) */}
                        {isVisible('downloads') && data.downloads_box_json && (
                            <div className="bg-slate-50 border border-slate-100 p-10 rounded-2xl text-center space-y-6">
                                <div className="w-16 h-16 bg-slate-200/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-file-download text-slate-400 text-2xl"></i>
                                </div>
                                <h4 className="text-lg font-bold text-slate-800 tracking-tight">{data.downloads_box_json.title || 'Download Forms'}</h4>
                                <p className="text-[13px] text-slate-500 font-medium leading-relaxed px-2">
                                    {data.downloads_box_json.desc || 'Get application forms for mobile banking registration.'}
                                </p>
                                <Link 
                                    to={data.downloads_box_json.link_url || '/downloads'} 
                                    className="inline-block text-[14px] font-bold text-[#003399] hover:underline"
                                >
                                    {data.downloads_box_json.link_text || 'Go to Downloads'}
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UPI;
