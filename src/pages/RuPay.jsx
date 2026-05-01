import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { apiFetch } from '../utils/api';

const RuPay = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await apiFetch(`${import.meta.env.VITE_API_BASE_URL}/service-content/rupay-cards`);
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
                console.error('Error fetching RuPay content:', err);
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
                title={data.meta_title || 'RuPay Cards - GCUB'}
                description={data.meta_description}
                keywords={data.meta_keywords}
            />

            {/* Hero Section (Exactly as per image: Dark Blue, Centered) */}
            <div className="bg-[#001b44] py-20 text-center text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-5xl font-bold mb-4 tracking-tight uppercase">{data.hero_title || 'RuPay Cards'}</h1>
                    <p className="text-lg text-slate-300 font-light max-w-2xl mx-auto">
                        {data.hero_description || 'India\'s own card payment network. World-class privileges.'}
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
                                    {data.intro_description}
                                </p>
                            </section>
                        )}

                        {/* Types of RuPay Cards */}
                        {isVisible('cards') && data.card_types_json && (
                            <section className="space-y-6">
                                <div className="border-l-4 border-[#003399] pl-4">
                                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">Types of RuPay Cards</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {data.card_types_json.map((card, idx) => (
                                        <div key={idx} className={`bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden border-t-4 ${card.border_color === 'orange-500' ? 'border-t-orange-500' : 'border-t-[#001b44]'}`}>
                                            <div className="p-8">
                                                <h4 className="text-xl font-bold text-slate-800 mb-2">{card.title}</h4>
                                                <p className="text-[14px] text-slate-500 mb-6">{card.desc}</p>
                                                <ul className="space-y-3">
                                                    {(card.benefits || []).map((benefit, bIdx) => (
                                                        <li key={bIdx} className="flex items-center gap-3">
                                                            <i className="fas fa-check text-green-500 text-xs"></i>
                                                            <span className="text-[13px] text-slate-600 font-medium">{benefit}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Safety Tips */}
                        {isVisible('safety') && data.safety_tips_json && (
                            <section className="space-y-6">
                                <div className="border-l-4 border-[#003399] pl-4">
                                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">Safety Tips</h3>
                                </div>
                                <div className="space-y-4">
                                    {data.safety_tips_json.map((tip, idx) => (
                                        <div key={idx} className="bg-slate-50/50 border border-slate-100 p-6 rounded-xl flex gap-6 items-center">
                                            <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-red-500 shadow-sm">
                                                <i className={`fas fa-${tip.icon || 'shield-alt'} text-xl`}></i>
                                            </div>
                                            <div>
                                                <h4 className="text-[15px] font-bold text-slate-800 mb-1">{tip.title}</h4>
                                                <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                                                    {tip.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
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

                        {/* Lost your Card? Box (Red as per image) */}
                        {isVisible('promo') && data.sidebar_promo_json && (
                            <div className="bg-[#e31e24] p-8 rounded-2xl text-white space-y-4 shadow-lg">
                                <h4 className="text-lg font-bold tracking-tight">{data.sidebar_promo_json.title || 'Lost your Card?'}</h4>
                                <p className="text-[13px] text-white/80 font-medium leading-relaxed">
                                    {data.sidebar_promo_json.subtitle || 'Immediately block your card to prevent misuse.'}
                                </p>
                                <Link 
                                    to={data.sidebar_promo_json.btn_url || '/block-card'} 
                                    className="block w-full text-center bg-white text-[#e31e24] py-3 rounded-lg font-bold text-[14px] hover:bg-slate-100 transition shadow-md"
                                >
                                    {data.sidebar_promo_json.btn_text || 'Block Card Now'}
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RuPay;
