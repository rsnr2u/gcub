import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { apiFetch } from '../utils/api';

const IMPS = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await apiFetch(`${import.meta.env.VITE_API_BASE_URL}/service-content/imps`);
                const result = await res.json();
                setData(result);
            } catch (err) {
                console.error('Error fetching IMPS content:', err);
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
    const features = Array.isArray(data.features_json) ? data.features_json : [];
    const txnLimits = Array.isArray(data.txn_limits_json) ? data.txn_limits_json : [];
    const sidebarLinks = Array.isArray(data.sidebar_links_json) 
        ? data.sidebar_links_json 
        : Object.entries(data.sidebar_links_json || {}).map(([url, label]) => ({ label, url }));

    return (
        <div className="bg-white min-h-screen font-inter">
            <SEO
                title={data.meta_title}
                description={data.meta_description}
                keywords={data.meta_keywords}
            />

            {/* Hero Section */}
            <div className="bg-[#001529] py-20 text-center">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">{data.hero_title}</h1>
                    <p className="text-blue-100/60 text-lg max-w-2xl mx-auto font-medium">
                        {data.hero_description}
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Content Section */}
                    <div className="lg:col-span-8">
                        <div className="mb-16">
                            <h2 className="text-2xl font-black text-blue-900 mb-8 border-l-4 border-blue-600 pl-4 uppercase tracking-widest">{data.intro_title || 'Overview'}</h2>
                            <p className="text-base text-slate-600 leading-relaxed font-medium">
                                {data.intro_description}
                            </p>
                        </div>

                        {features.length > 0 && (
                            <div className="mb-16">
                                <h3 className="text-xl font-black text-blue-900 mb-8 border-l-4 border-blue-600 pl-4 uppercase tracking-widest">Key Features</h3>
                                <div className="space-y-4">
                                    {features.map((f, idx) => (
                                        <div key={idx} className="flex gap-6 p-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                                            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 shrink-0 group-hover:scale-110 transition-transform">
                                                <i className={`fas fa-${f.icon || 'check-circle'} text-xl`}></i>
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 mb-1">{f.title}</h4>
                                                <p className="text-sm text-slate-500 leading-relaxed font-medium">{f.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {txnLimits.length > 0 && (
                            <div className="mb-16">
                                <h3 className="text-xl font-black text-blue-900 mb-8 border-l-4 border-blue-600 pl-4 uppercase tracking-widest">Transaction Limits</h3>
                                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-slate-50 text-slate-500 uppercase font-black text-[10px] tracking-widest border-b border-slate-200">
                                            <tr>
                                                <th className="px-8 py-5">Channel</th>
                                                <th className="px-8 py-5">Per Transaction Limit</th>
                                                <th className="px-8 py-5">Daily Limit</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 font-medium">
                                            {txnLimits.map((row, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-8 py-5 text-slate-900">{row.channel}</td>
                                                    <td className="px-8 py-5 text-slate-600">₹ {row.per_txn}</td>
                                                    <td className="px-8 py-5 text-slate-600">₹ {row.daily}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Section */}
                    <div className="lg:col-span-4 space-y-10">
                        {sidebarLinks.length > 0 && (
                            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest mb-6">Related Services</h3>
                                <div className="space-y-1">
                                    {sidebarLinks.map((link, idx) => (
                                        <Link key={idx} to={link.url || '#'} className="flex items-center gap-3 p-3 -mx-3 rounded-xl hover:bg-slate-50 transition group">
                                            <i className="fas fa-chevron-right text-[10px] text-slate-300 group-hover:text-blue-500 transition-colors"></i>
                                            <span className="font-bold text-slate-600 group-hover:text-blue-900 transition-colors text-sm">{link.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.assistance_box_json && (
                            <div className="bg-blue-800 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                    <i className="fas fa-headset text-8xl"></i>
                                </div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                                        <i className="fas fa-headset text-xl"></i>
                                    </div>
                                    <h3 className="text-xl font-black mb-4 uppercase tracking-wider">{data.assistance_box_json.title}</h3>
                                    <p className="text-blue-100 text-sm mb-8 leading-relaxed font-medium">{data.assistance_box_json.desc}</p>
                                    <Link to={data.assistance_box_json.btn_url || '#'} className="inline-block w-full text-center bg-white text-blue-900 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-50 transition shadow-lg">
                                        {data.assistance_box_json.btn_text}
                                    </Link>
                                </div>
                            </div>
                        )}

                        {data.downloads_box_json && (
                            <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-center group">
                                <div className="w-16 h-16 rounded-3xl bg-white shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <i className="fas fa-file-pdf text-2xl text-slate-400"></i>
                                </div>
                                <h4 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tight">{data.downloads_box_json.title}</h4>
                                <p className="text-sm text-slate-500 mb-8 font-medium leading-relaxed">{data.downloads_box_json.desc}</p>
                                <Link to={data.downloads_box_json.link_url || '#'} className="text-sm font-black text-blue-700 hover:text-blue-900 transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
                                    {data.downloads_box_json.link_text} <i className="fas fa-arrow-right text-[10px]"></i>
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default IMPS;
