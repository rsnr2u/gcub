import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { apiFetch } from '../../utils/api';

const NACHService = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await apiFetch(`${import.meta.env.VITE_API_BASE_URL}/service-content/nach-service`);
                const result = await res.json();
                setData(result);
            } catch (err) {
                console.error('Error fetching NACH content:', err);
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

    // Normalize JSON data structures
    const nachCredit = Array.isArray(data.nach_credit_json) ? data.nach_credit_json : [];
    const nachDebit = Array.isArray(data.nach_debit_json) ? data.nach_debit_json : [];
    const whyUseNach = Array.isArray(data.why_use_nach_json) ? data.why_use_nach_json : [];

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
                                <h2 className="text-3xl font-bold text-blue-900 mb-6">{data.intro_title}</h2>
                                <p className="text-lg text-slate-700 leading-relaxed">
                                    {data.intro_description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                {data.nach_credit_json && (
                                    <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100 shadow-sm">
                                        <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                                            <i className="fas fa-arrow-down text-blue-500"></i>
                                            NACH Credit
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-6 italic">Used for making payments to multiple individuals by a single entity.</p>
                                        <ul className="space-y-4 text-slate-800 font-bold text-sm">
                                            {nachCredit.map((item, idx) => (
                                                <li key={idx} className="flex items-center gap-3">
                                                    <i className="fas fa-check text-green-500"></i> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {data.nach_debit_json && (
                                    <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                        <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                                            <i className="fas fa-arrow-up text-amber-500"></i>
                                            NACH Debit
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-6 italic">Used for collecting periodic payments from individuals by a single entity.</p>
                                        <ul className="space-y-4 text-slate-800 font-bold text-sm">
                                            {nachDebit.map((item, idx) => (
                                                <li key={idx} className="flex items-center gap-3">
                                                    <i className="fas fa-check text-blue-500"></i> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {data.why_use_nach_json && (
                                <div className="bg-slate-900 rounded-[3rem] p-12 text-white">
                                    <h3 className="text-3xl font-bold mb-10 text-center md:text-left">Why Use NACH?</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                        {whyUseNach.map((reason, idx) => (
                                            <div key={idx} className="space-y-3">
                                                <h4 className="font-bold text-xl text-blue-400">{reason.title}</h4>
                                                <p className="text-slate-400 text-sm leading-relaxed">{reason.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar Section */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100">
                                <h3 className="text-xl font-bold text-blue-900 mb-4">Mandate Registration</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">{data.sidebar_mandate_text}</p>
                                
                                {data.mandate_form_json && (
                                    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm">
                                        <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest mb-2">{data.mandate_form_json.title}</h4>
                                        <p className="text-[10px] text-slate-500 mb-4">{data.mandate_form_json.desc}</p>
                                        <a 
                                            href={data.mandate_form_json.url || '#'} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-800 transition flex items-center gap-2"
                                        >
                                            {data.mandate_form_json.title} <i className="fas fa-external-link-alt"></i>
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                <h4 className="text-xl font-bold text-slate-900 mb-4">MMS Service</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">{data.sidebar_mms_text}</p>
                            </div>
                        </div>

                </div>
            </div>
        </div>
    );
};

export default NACHService;
