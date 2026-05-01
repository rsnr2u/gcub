import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { apiFetch } from '../../utils/api';

const AnyBranchBanking = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await apiFetch(`${import.meta.env.VITE_API_BASE_URL}/service-content/any-branch-banking`);
                const result = await res.json();
                setData(result);
            } catch (err) {
                console.error('Error fetching ABB content:', err);
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {data.facilities_json && (
                                <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                                    <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                                        <i className="fas fa-university"></i>
                                        Key Facilities
                                    </h3>
                                    <ul className="space-y-4 text-slate-700">
                                        {data.facilities_json.map((f, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <i className="fas fa-check text-green-500"></i> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {data.guidelines_json && (
                                <div className="p-8 bg-slate-900 rounded-3xl text-white">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                        <i className="fas fa-exclamation-circle text-amber-500"></i>
                                        Guidelines
                                    </h3>
                                    <ul className="space-y-6 text-slate-400 text-sm">
                                        {data.guidelines_json.map((g, idx) => (
                                            <li key={idx} className="leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                                                    <div>
                                                        <span className="block font-bold text-white text-base mb-1 uppercase tracking-wide">{g.title}</span>
                                                        <p className="text-slate-400 leading-relaxed italic">{g.desc}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {data.txn_table_json && (
                            <div className="animate-in fade-in slide-in-from-bottom-8 delay-300">
                                <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                                    <i className="fas fa-table text-blue-500"></i>
                                    Transaction Information Table
                                </h3>
                                <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm bg-white">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-slate-50 text-slate-500 uppercase font-black text-[10px] tracking-widest border-b border-slate-200">
                                            <tr>
                                                <th className="px-8 py-5">Transaction Type</th>
                                                <th className="px-8 py-5 text-center bg-green-50/50 text-green-700">Home Branch</th>
                                                <th className="px-8 py-5 text-center bg-blue-50/50 text-blue-700">Non-Home Branch</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {data.txn_table_json.map((row, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-8 py-5 font-bold text-slate-800">{row.type}</td>
                                                    <td className="px-8 py-5 text-center font-black text-green-600">{row.home}</td>
                                                    <td className="px-8 py-5 text-center text-slate-600 font-medium">{row.non_home}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold flex items-center gap-2">
                                    <i className="fas fa-info-circle"></i>
                                    * Charges exclude GST and other statutory levies.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-blue-900 p-8 rounded-3xl text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-4">Find Your Nearest Branch</h3>
                                <p className="text-blue-200 text-sm mb-6">{data.sidebar_locator_text}</p>
                                <Link to="/branch-locator" className="inline-flex items-center gap-2 font-bold text-white group-hover:gap-4 transition-all">
                                    Open Branch Locator
                                    <i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                            <i className="fas fa-map-marked-alt absolute bottom-[-20px] right-[-20px] text-[100px] text-white/10 rotate-[-15deg]"></i>
                        </div>

                        <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl text-center">
                            <h4 className="font-bold text-slate-800 mb-2">Questions?</h4>
                            <p className="text-xs text-slate-500 mb-4">Our branch managers are happy to assist you with ABB services.</p>
                            <a href={`tel:${data.sidebar_phone}`} className="text-blue-900 font-black text-xs uppercase tracking-widest border-b-2 border-blue-900 pb-1 hover:text-blue-700 hover:border-blue-700 transition">
                                {data.sidebar_phone}
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AnyBranchBanking;
