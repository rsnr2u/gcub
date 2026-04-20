import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { apiFetch } from '../../utils/api';

const ATMService = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await apiFetch(`${import.meta.env.VITE_API_BASE_URL}/service-content/atm-services`);
                const result = await res.json();
                setData(result);
            } catch (err) {
                console.error('Error fetching ATM service content:', err);
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

                        {data.highlights_json && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                {data.highlights_json.map((h, idx) => (
                                    <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <i className={`fas fa-${h.icon} text-xl`}></i>
                                        </div>
                                        <h3 className="font-bold text-slate-800 mb-2">{h.title}</h3>
                                        <p className="text-xs text-slate-500">{h.desc}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="space-y-10">
                            {data.features_json && (
                                <div>
                                    <h3 className="text-xl font-bold text-blue-900 mb-6">Features & Facilities</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {data.features_json.map((f, idx) => (
                                            <div key={idx} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl">
                                                <i className="fas fa-check text-green-500"></i>
                                                <span className="text-slate-700">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {data.security_tips_json && (
                                <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                                    <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                                        <i className="fas fa-shield-alt"></i>
                                        ATM Security Tips
                                    </h3>
                                    <ul className="space-y-3 text-sm text-slate-700">
                                        {data.security_tips_json.map((tip, idx) => (
                                            <li key={idx} className="flex gap-3">
                                                <i className="fas fa-circle text-[6px] mt-2 text-blue-400"></i>
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-slate-900 text-white p-8 rounded-3xl">
                            <h3 className="text-xl font-bold mb-6">ATM Locator</h3>
                            <p className="text-slate-400 text-sm mb-6">Find the nearest GCUB ATM in seconds using our interactive branch & ATM locator.</p>
                            <Link to={data.sidebar_locator_link} className="block w-full text-center bg-blue-600 py-4 rounded-2xl font-bold hover:bg-blue-500 transition">
                                Find Nearest ATM
                            </Link>
                        </div>

                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 mb-6">Emergency</h3>
                            <p className="text-sm text-slate-600 mb-4">Lost your debit card? Block it immediately to prevent unauthorized transactions.</p>
                            <div className="space-y-3">
                                <a href={`tel:${data.sidebar_emergency_phone}`} className="flex items-center gap-3 text-red-600 font-bold hover:underline">
                                    <i className="fas fa-phone-alt"></i>
                                    {data.sidebar_emergency_phone}
                                </a>
                                <p className="text-xs text-slate-400 italic">Available 24/7 for card blocking.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ATMService;
