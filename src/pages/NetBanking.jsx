import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { apiFetch } from '../utils/api';

const NetBanking = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await apiFetch(`${import.meta.env.VITE_API_BASE_URL}/service-content/net-banking`);
                const result = await res.json();
                setData(result);
            } catch (err) {
                console.error('Error fetching Net Banking content:', err);
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

                        {data.features_json && (
                            <div className="mb-12">
                                <h3 className="text-xl font-bold text-blue-900 mb-6">Key Features</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {data.features_json.map((f, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition">
                                            <i className="fas fa-check-circle text-blue-600"></i>
                                            <span className="font-bold text-slate-800">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-blue-50 p-8 md:p-12 rounded-[40px] border border-blue-100 mb-12">
                            <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-3">
                                <i className="fas fa-info-circle"></i>
                                Registration
                            </h3>
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                {data.registration_info}
                            </p>
                            <Link to="/downloads" className="inline-flex items-center gap-3 bg-blue-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition">
                                <i className="fas fa-file-download"></i>
                                Download Registration Form
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-slate-900 p-8 rounded-3xl text-white">
                            <h3 className="text-xl font-bold mb-6">Login</h3>
                            {data.sidebar_login_links_json && (
                                <div className="space-y-4">
                                    {data.sidebar_login_links_json.map((link, idx) => (
                                        <button key={idx} className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl transition border border-white/10">
                                            {link}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {data.security_tips_json && (
                            <div className="p-8 bg-amber-50 rounded-3xl border border-amber-100">
                                <h4 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                                    <i className="fas fa-shield-alt"></i>
                                    Security Tips
                                </h4>
                                <ul className="space-y-3">
                                    {data.security_tips_json.map((tip, idx) => (
                                        <li key={idx} className="flex gap-3 text-sm text-amber-800">
                                            <i className="fas fa-circle text-[6px] mt-2 text-amber-500"></i>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NetBanking;
