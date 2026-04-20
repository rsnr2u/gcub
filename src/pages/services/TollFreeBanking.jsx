import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { apiFetch } from '../../utils/api';

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

                        <div className="bg-slate-50 p-10 rounded-[32px] border border-slate-100 text-center mb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 text-blue-900 rounded-full mb-6">
                                <i className="fas fa-phone-alt text-3xl"></i>
                            </div>
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Our Dedicated Helpline</h3>
                            <a href={`tel:${data.helpline_number}`} className="text-4xl md:text-5xl font-black text-blue-900 block mb-4 hover:text-black transition">{data.helpline_number}</a>
                            <p className="text-slate-500 font-medium">Available 24x7 | 365 Days a Year</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                                    Services Offered
                                </h3>
                                {data.services_offered_json && (
                                    <ul className="space-y-4">
                                        {data.services_offered_json.map((s, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-slate-600">
                                                <i className="fas fa-angle-right text-blue-500"></i>
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-red-700 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
                                    Emergency Services
                                </h3>
                                {data.emergency_services_json && (
                                    <ul className="space-y-4">
                                        {data.emergency_services_json.map((s, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-slate-600 font-bold">
                                                <i className="fas fa-exclamation-triangle text-red-500"></i>
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                            <h3 className="text-xl font-bold text-blue-900 mb-6 font-primary">Balance Enquiry</h3>
                            <p className="text-sm text-slate-600 mb-6">Give a missed call through your registered mobile number for quick service:</p>
                            <div className="space-y-4">
                                <div className="p-5 bg-white rounded-2xl border border-blue-100 shadow-sm transition-all hover:shadow-md group">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Balance Enquiry</span>
                                        <i className="fas fa-wallet text-blue-600 opacity-50"></i>
                                    </div>
                                    <a href={`tel:${data.sidebar_balance_enquiry}`} className="text-xl font-black text-blue-900 group-hover:text-[#E61111] transition">{data.sidebar_balance_enquiry}</a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
                            <h3 className="text-xl font-bold text-red-900 mb-4">ATM Card Blocking</h3>
                            <p className="text-slate-600 text-sm mb-6">Lost or stolen card? Call immediately to block your card and protect your funds:</p>
                            <a href={`tel:${data.sidebar_card_blocking}`} className="w-full inline-flex items-center justify-center gap-3 bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-200">
                                <i className="fas fa-shield-alt"></i>
                                <span>{data.sidebar_card_blocking}</span>
                            </a>
                        </div>

                        <div className="bg-[#002b5c] p-8 rounded-3xl text-white">
                            <h3 className="text-xl font-bold mb-4">Quick Downloads</h3>
                            <p className="text-blue-100/70 text-sm mb-6">Download the Toll Free Banking request form to avail these services.</p>
                            <Link
                                to={data.sidebar_download_url}
                                className="w-full inline-flex items-center justify-center gap-3 bg-white text-[#002b5c] py-4 rounded-xl font-bold hover:bg-blue-50 transition"
                            >
                                <i className="fas fa-file-download"></i>
                                <span>Download Request Form</span>
                            </Link>
                            <p className="text-[10px] text-blue-300/50 mt-4 uppercase tracking-widest font-bold text-center">PDF Format | 1.2 MB</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TollFreeBanking;
