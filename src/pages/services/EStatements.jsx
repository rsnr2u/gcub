import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { apiFetch } from '../../utils/api';

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

                        {data.benefits_json && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                {data.benefits_json.map((b, idx) => (
                                    <div key={idx} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 border-b-4 border-b-blue-600 transition-all hover:shadow-xl group">
                                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <i className={`fas fa-${b.icon} text-2xl text-blue-900`}></i>
                                        </div>
                                        <h3 className="text-lg font-bold text-blue-900 mb-2">{b.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {data.subscription_methods_json && (
                            <div className="bg-slate-900 p-8 md:p-12 rounded-[40px] text-white relative overflow-hidden">
                                <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 translate-y-1/2 translate-x-1/2"></div>
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-sm">
                                        <i className="fas fa-plus"></i>
                                    </span>
                                    How to Subscribe?
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                                    {data.subscription_methods_json.map((m, idx) => (
                                        <div key={idx} className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-1">Option 0{idx + 1}</span>
                                            <p className="font-bold text-lg">{m}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-blue-900 p-8 rounded-3xl text-white">
                            <h3 className="text-xl font-bold mb-4">Note</h3>
                            <p className="text-blue-100 text-sm leading-relaxed mb-6 opacity-70 italic">{data.sidebar_note}</p>
                        </div>

                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                            <h4 className="font-bold text-slate-800 mb-2">Need Support?</h4>
                            <p className="text-xs text-slate-500 mb-4">If you face any issues while accessing your e-statements, contact us.</p>
                            <a href={`tel:${data.sidebar_support_phone}`} className="text-blue-900 font-black text-xl hover:text-blue-700 transition">
                                {data.sidebar_support_phone}
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EStatements;
