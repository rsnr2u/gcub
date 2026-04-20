import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { apiFetch } from '../../utils/api';

const MobileBanking = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await apiFetch(`${import.meta.env.VITE_API_BASE_URL}/service-content/mobile-banking`);
                const result = await res.json();
                setData(result);
            } catch (err) {
                console.error('Error fetching mobile banking content:', err);
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
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-blue-900 mb-6">{data.intro_title}</h2>
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                {data.intro_description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                                    <i className="fas fa-shield-alt text-2xl text-blue-900 mb-4"></i>
                                    <h3 className="font-bold text-blue-900 mb-2">{data.feature_1_title}</h3>
                                    <p className="text-sm text-slate-600">{data.feature_1_desc}</p>
                                </div>
                                <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                                    <i className="fas fa-bolt text-2xl text-green-700 mb-4"></i>
                                    <h3 className="font-bold text-green-800 mb-2">{data.feature_2_title}</h3>
                                    <p className="text-sm text-slate-600">{data.feature_2_desc}</p>
                                </div>
                            </div>
                        </div>

                        {data.key_features_json && (
                            <div className="space-y-8">
                                <h3 className="text-xl font-bold text-blue-900">Key Features</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {data.key_features_json.map((f, idx) => (
                                        <li key={idx} className="flex items-start gap-3 p-4 border border-slate-100 rounded-xl hover:shadow-md transition">
                                            <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                            <div>
                                                <span className="font-bold text-slate-800 block">{f.title}</span>
                                                <p className="text-xs text-slate-500">{f.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Download Section */}
                        <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-3xl font-bold mb-4">Download Our App Now</h2>
                                    <p className="text-slate-400 mb-8">Available on both Android and iOS devices. Start your mobile banking journey today.</p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                        <a target='_blank' rel="noopener noreferrer" href={data.play_store_url} className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-slate-200 transition">
                                            <i className="fab fa-google-play text-2xl"></i>
                                            <div className="text-left">
                                                <div className="text-[10px] uppercase font-bold leading-none">Get it on</div>
                                                <div className="text-lg leading-none">Google Play</div>
                                            </div>
                                        </a>
                                        <a target='_blank' rel="noopener noreferrer" href={data.app_store_url} className="flex items-center gap-3 px-6 py-3 bg-black border border-slate-700 text-white rounded-xl font-bold hover:bg-slate-800 transition">
                                            <i className="fab fa-apple text-2xl"></i>
                                            <div className="text-left">
                                                <div className="text-[10px] uppercase font-bold leading-none">Download on the</div>
                                                <div className="text-lg leading-none">App Store</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="w-48 h-auto">
                                    <i className="fas fa-mobile-alt text-[180px] text-blue-500/20"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Section */}
                    <div className="lg:col-span-4 space-y-8">
                        {data.sidebar_tips_json && (
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                    <i className="fas fa-info-circle text-blue-600"></i>
                                    Quick Tips
                                </h3>
                                <ul className="space-y-4">
                                    {data.sidebar_tips_json.map((tip, idx) => (
                                        <li key={idx} className="flex gap-4">
                                            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">{idx + 1}</span>
                                            <p className="text-sm text-slate-600">{tip}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="bg-blue-900 p-8 rounded-3xl text-white">
                            <h3 className="text-xl font-bold mb-4">Registration Help?</h3>
                            <p className="text-blue-200 text-sm mb-6">Need assistance in registering for mobile banking? Our helpdesk is ready to assist you.</p>
                            <a href={`tel:${data.helpdesk_phone}`} className="flex items-center justify-center gap-3 w-full bg-white text-blue-900 py-4 rounded-2xl font-bold hover:bg-blue-50 transition">
                                <i className="fas fa-phone-alt"></i>
                                {data.helpdesk_phone}
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MobileBanking;
