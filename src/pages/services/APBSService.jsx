import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { apiFetch } from '../../utils/api';

const APBSService = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await apiFetch(`${import.meta.env.VITE_API_BASE_URL}/service-content/apbs-service`);
                const result = await res.json();
                setData(result);
            } catch (err) {
                console.error('Error fetching APBS content:', err);
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
    const beneficiaryBenefits = Array.isArray(data.beneficiary_benefits_json) ? data.beneficiary_benefits_json : [];
    const objectives = Array.isArray(data.objectives_json) ? data.objectives_json : [];
    const linkingSteps = Array.isArray(data.linking_steps_json) ? data.linking_steps_json : [];
    const sidebarBenefits = Array.isArray(data.sidebar_benefits_json) ? data.sidebar_benefits_json : [];

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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {data.beneficiary_benefits_json && (
                                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                    <h3 className="text-xl font-bold text-blue-900 mb-4">For Beneficiaries</h3>
                                    <ul className="space-y-4 text-sm text-slate-600">
                                        {beneficiaryBenefits.map((b, idx) => (
                                            <li key={idx} className="flex gap-3">
                                                <i className="fas fa-check-circle text-blue-600 mt-1"></i>
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {data.objectives_json && (
                                <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                                    <h3 className="text-xl font-bold text-blue-900 mb-4">Key Objectives</h3>
                                    <ul className="space-y-4 text-sm text-slate-600">
                                        {objectives.map((o, idx) => (
                                            <li key={idx} className="flex gap-3">
                                                <i className="fas fa-bullseye text-blue-600 mt-1"></i>
                                                {o}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {data.linking_steps_json && (
                            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 mb-12">
                                <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                                    <i className="fas fa-link"></i>
                                    How to Link Your Aadhaar?
                                </h3>
                                <p className="text-amber-800 text-sm mb-6 leading-relaxed">To receive Direct Benefit Transfer (DBT) into your account, you must link your Aadhaar with your GCUB bank account.</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {linkingSteps.map((step, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm">
                                            <span className="text-[10px] font-black text-amber-500 uppercase">Step {idx + 1}</span>
                                            <p className="text-xs font-bold text-slate-700 mt-1">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-slate-900 p-8 rounded-3xl text-white">
                            <h3 className="text-xl font-bold mb-4">DBT Benefits</h3>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">{data.sidebar_dbt_text}</p>
                            {data.sidebar_benefits_json && (
                                <div className="space-y-3">
                                    {sidebarBenefits.map((benefit, idx) => (
                                        <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4 group hover:bg-white/10 transition-colors">
                                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                                <i className={`fas fa-${benefit.icon || 'university'}`}></i>
                                            </div>
                                            <span className="font-bold text-sm tracking-wide">{benefit.title}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-8 bg-blue-900 rounded-3xl text-white">
                            <h4 className="font-bold mb-2">Check Linking Status</h4>
                            <p className="text-xs text-blue-200 mb-6">You can check your Aadhaar mapping status on the UIDAI official website.</p>
                            <a href={data.sidebar_status_url} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-white text-blue-900 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-50 transition">
                                Visit UIDAI Website
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default APBSService;
