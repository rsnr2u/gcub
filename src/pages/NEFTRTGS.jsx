import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { apiFetch } from '../utils/api';

const NEFTRTGS = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await apiFetch(`${import.meta.env.VITE_API_BASE_URL}/service-content/neft-rtgs`);
                const result = await res.json();
                setData(result);
            } catch (err) {
                console.error('Error fetching NEFT/RTGS content:', err);
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                                <h3 className="text-xl font-bold text-blue-900 mb-4 uppercase tracking-widest text-xs">NEFT</h3>
                                <p className="text-slate-700 leading-relaxed text-sm">
                                    {data.neft_info}
                                </p>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                <h3 className="text-xl font-bold text-blue-900 mb-4 uppercase tracking-widest text-xs">RTGS</h3>
                                <p className="text-slate-700 leading-relaxed text-sm">
                                    {data.rtgs_info}
                                </p>
                            </div>
                        </div>

                        {data.comparison_json && (
                            <div className="mb-12">
                                <h3 className="text-xl font-bold text-blue-900 mb-6 font-primary">System Comparison</h3>
                                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-slate-50 text-slate-500 uppercase font-black text-[10px] tracking-widest border-b border-slate-200">
                                            <tr>
                                                <th className="px-6 py-4">Feature</th>
                                                <th className="px-6 py-4">NEFT</th>
                                                <th className="px-6 py-4">RTGS</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {data.comparison_json.map((row, idx) => (
                                                <tr key={idx}>
                                                    <td className="px-6 py-4 font-bold text-slate-800">{row.feature}</td>
                                                    <td className="px-6 py-4 text-slate-600">{row.neft}</td>
                                                    <td className="px-6 py-4 text-slate-600">{row.rtgs}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {data.req_info_json && (
                            <div className="bg-slate-900 p-8 md:p-12 rounded-[40px] text-white">
                                <h3 className="text-2xl font-bold mb-8">Details Required for Transfer</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {data.req_info_json.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <i className="fas fa-check-circle text-blue-400"></i>
                                            <span className="font-bold opacity-80">{item}</span>
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
                                <h3 className="text-xl font-bold text-slate-800 mb-6">Explore Other Ways</h3>
                                <div className="space-y-3">
                                    {Object.entries(data.sidebar_links_json).map(([path, label]) => (
                                        <Link key={path} to={path} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 hover:border-blue-500 hover:shadow-md transition">
                                            <span className="font-bold text-slate-700 text-sm">{label}</span>
                                            <i className="fas fa-chevron-right text-blue-500 text-[10px]"></i>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-blue-900 p-8 rounded-3xl text-white">
                            <h3 className="text-xl font-bold mb-4">IFSC Finder</h3>
                            <p className="text-blue-200 text-sm leading-relaxed mb-6 italic">{data.sidebar_ifsc_text}</p>
                            <Link to="/branch-locator" className="block w-full text-center bg-white text-blue-900 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-50 transition">
                                Go to Branch Locator
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NEFTRTGS;
