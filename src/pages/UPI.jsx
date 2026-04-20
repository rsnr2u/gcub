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
                setData(result);
            } catch (err) {
                console.error('Error fetching UPI content:', err);
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                {data.benefits_json.map((b, idx) => (
                                    <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                            <i className={`fas fa-${b.icon} text-blue-600`}></i>
                                        </div>
                                        <h3 className="font-bold text-slate-800 mb-2">{b.title}</h3>
                                        <p className="text-xs text-slate-500">{b.desc}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {data.registration_steps_json && (
                            <div className="space-y-8">
                                <h3 className="text-xl font-bold text-blue-900">How to get started?</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {data.registration_steps_json.map((step, idx) => (
                                        <div key={idx} className="p-6 border border-slate-100 rounded-2xl relative">
                                            <span className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">{idx + 1}</span>
                                            <p className="font-bold text-slate-700 text-sm mt-2">{step}</p>
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
                                <h3 className="text-xl font-bold text-slate-800 mb-6">Related Services</h3>
                                <div className="space-y-3">
                                    {Object.entries(data.sidebar_links_json).map(([path, label]) => (
                                        <Link key={path} to={path} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 hover:border-blue-500 hover:shadow-md transition">
                                            <span className="font-bold text-slate-700 text-sm">{label}</span>
                                            <i className="fas fa-arrow-right text-blue-500 text-[10px]"></i>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-slate-900 p-8 rounded-3xl text-white">
                            <h3 className="text-xl font-bold mb-4">Registration?</h3>
                            <p className="text-slate-400 text-sm mb-6">{data.sidebar_download_text}</p>
                            <Link to="/downloads" className="inline-flex items-center gap-2 font-bold text-blue-400 hover:text-white transition">
                                View Download Forms
                                <i className="fas fa-external-link-alt text-[10px]"></i>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UPI;
