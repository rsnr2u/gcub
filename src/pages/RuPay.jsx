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
                const res = await apiFetch(`${import.meta.env.VITE_API_BASE_URL}/service-content/rupay`);
                const result = await res.json();
                setData(result);
            } catch (err) {
                console.error('Error fetching RuPay content:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
    </div>;

    if (!data) return <div className="min-h-screen flex items-center justify-center">Service content not found.</div>;

    return (
        <div className="bg-white min-h-screen font-inter">
            <SEO
                title={data.meta_title}
                description={data.meta_description}
                keywords={data.meta_keywords}
            />

            {/* Hero Section */}
            <div className="relative bg-[#003399] py-16 overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-30"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <nav className="flex items-center gap-2 text-blue-200 text-sm mb-4 font-medium">
                        <Link to="/" className="hover:text-white transition">Home</Link>
                        <i className="fas fa-chevron-right text-[10px]"></i>
                        <span className="text-white">Our Services</span>
                        <i className="fas fa-chevron-right text-[10px]"></i>
                        <span className="text-white">{data.hero_title}</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{data.hero_title}</h1>
                    <p className="text-xl text-blue-100 max-w-2xl font-light">
                        {data.hero_description}
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Content Section */}
                    <div className="lg:col-span-8">
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-blue-900 mb-6">{data.intro_title}</h2>
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                {data.intro_description}
                            </p>
                        </div>

                        {data.card_types_json && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                {data.card_types_json.map((c, idx) => (
                                    <div key={idx} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 relative overflow-hidden group">
                                        <div className="relative z-10">
                                            <h3 className="text-xl font-bold text-blue-900 mb-2">{c.title}</h3>
                                            <p className="text-sm text-slate-500">{c.desc}</p>
                                        </div>
                                        <i className="fas fa-credit-card absolute bottom-[-10px] right-[-10px] text-5xl text-blue-900/5 rotate-[-15deg] group-hover:scale-125 transition-transform"></i>
                                    </div>
                                ))}
                            </div>
                        )}

                        {data.safety_tips_json && (
                            <div className="space-y-8">
                                <h3 className="text-xl font-bold text-blue-900">Safety First</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {data.safety_tips_json.map((tip, idx) => (
                                        <div key={idx} className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
                                            <i className="fas fa-shield-alt text-amber-600 mt-1"></i>
                                            <div>
                                                <h4 className="font-bold text-amber-900 text-sm mb-1">{tip.title}</h4>
                                                <p className="text-xs text-amber-800/70 leading-relaxed">{tip.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Section */}
                    <div className="lg:col-span-4 space-y-8">
                        {data.sidebar_links_json && (
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-800 mb-6 font-primary uppercase tracking-widest text-xs">Explore More</h3>
                                <div className="space-y-3">
                                    {Object.entries(data.sidebar_links_json).map(([path, label]) => (
                                        <Link key={path} to={path} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 hover:border-blue-500 hover:shadow-md transition">
                                            <span className="font-bold text-slate-700 text-sm">{label}</span>
                                            <i className="fas fa-chevron-right text-blue-500 text-[10px]"></i>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-red-900 p-8 rounded-3xl text-white">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <i className="fas fa-exclamation-triangle"></i>
                                Lost Card?
                            </h3>
                            <p className="text-red-200 text-sm mb-6 leading-relaxed">{data.sidebar_lost_card_text}</p>
                            <a href="tel:18004258873" className="block w-full text-center bg-white text-red-900 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-50 transition">
                                Call Helpline Now
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RuPay;
