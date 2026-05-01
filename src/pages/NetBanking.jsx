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
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Content Section */}
                    <div className="lg:col-span-8">
                        <div className="mb-12">
                            <h2 className="text-[28px] font-bold text-[#003399] mb-6">{data.intro_title || 'Overview'}</h2>
                            <div className="text-[15px] text-gray-600 leading-relaxed font-light">
                                {/* Use dangerouslySetInnerHTML if description contains HTML, else just render text */}
                                {data.intro_description ? (
                                    <div dangerouslySetInnerHTML={{ __html: data.intro_description }} />
                                ) : (
                                    <p>Our <strong>Internet Banking</strong> service provides you with a convenient way to manage your finances from the comfort of your home or office. It is a secure, fast, and easy way to access your bank account 24/7.</p>
                                )}
                            </div>
                        </div>

                        {data.features_json && data.features_json.length > 0 && (
                            <div className="mb-12">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-1 h-6 bg-[#003399]"></div>
                                    <h3 className="text-[22px] font-bold text-gray-900">Key Features</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
                                    {data.features_json.map((f, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <i className="fas fa-check text-[#00b050] mt-1 text-sm"></i>
                                            <span className="text-[15px] text-gray-600">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-[#f4f7fc] rounded-[20px] p-8 mb-12 border border-blue-50/50">
                            <h4 className="text-lg font-bold text-[#003399] mb-4">How to Register?</h4>
                            <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
                                {data.registration_info || 'Visit your home branch to submit the Internet Banking application form. You will receive your User ID and Password via post/email.'}
                            </p>
                            <Link to="/downloads" className="inline-flex items-center gap-3 bg-[#003399] text-white px-6 py-3 rounded-lg text-[13px] font-medium hover:bg-blue-900 transition shadow-sm">
                                <i className="fas fa-download"></i>
                                Download Application Form
                            </Link>
                        </div>

                        {data.security_tips_json && data.security_tips_json.length > 0 && (
                            <div className="mb-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-1 h-6 bg-[#003399]"></div>
                                    <h3 className="text-[22px] font-bold text-gray-900">Security Tips</h3>
                                </div>
                                <ul className="space-y-4">
                                    {data.security_tips_json.map((tip, idx) => (
                                        <li key={idx} className="flex gap-3 text-[15px] text-gray-600 leading-relaxed items-start">
                                            <span className="text-gray-400 mt-1">•</span>
                                            {/* Allow bolding https:// inside the tip */}
                                            <span dangerouslySetInnerHTML={{ __html: tip.replace('https://', '<strong>https://</strong>') }}></span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Section */}
                    <div className="lg:col-span-4">
                        <div className="bg-[#003399] p-8 rounded-[16px] text-center sticky top-24 shadow-lg shadow-blue-900/20">
                            <i className="fas fa-lock text-3xl mb-4 text-white/90"></i>
                            <h3 className="text-lg font-bold text-white mb-6">Already Registered?</h3>
                            
                            {data.sidebar_login_links_json && data.sidebar_login_links_json.length >= 2 ? (
                                <div className="space-y-3">
                                    <button className="w-full bg-white text-[#003399] text-[14px] font-bold py-3.5 px-4 rounded-lg hover:bg-gray-50 transition shadow-sm">
                                        {data.sidebar_login_links_json[0]}
                                    </button>
                                    <button className="w-full bg-transparent border border-white/80 text-white text-[14px] font-bold py-3.5 px-4 rounded-lg hover:bg-white/10 transition">
                                        {data.sidebar_login_links_json[1]}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <button className="w-full bg-white text-[#003399] text-[14px] font-bold py-3.5 px-4 rounded-lg hover:bg-gray-50 transition shadow-sm">
                                        Retail Login
                                    </button>
                                    <button className="w-full bg-transparent border border-white/80 text-white text-[14px] font-bold py-3.5 px-4 rounded-lg hover:bg-white/10 transition">
                                        Corporate Login
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NetBanking;
