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

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#001b44]"></div>
                <p className="text-gray-500 font-medium animate-pulse">Loading Services...</p>
            </div>
        </div>
    );

    if (!data) return <div className="min-h-screen flex items-center justify-center font-inter text-gray-500 font-medium">Service configuration is being initialized...</div>;

    return (
        <div className="bg-white min-h-screen font-inter pb-20">
            <SEO
                title={data.meta_title || 'NEFT / RTGS - GCUB'}
                description={data.meta_description}
                keywords={data.meta_keywords}
            />

            {/* Hero Section (Exactly as per image: Dark Blue, Centered) */}
            <div className="bg-[#001b44] py-20 text-center text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-5xl font-bold mb-4 tracking-tight uppercase">{data.hero_title || 'NEFT / RTGS'}</h1>
                    <p className="text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
                        {data.hero_description || 'Safe and secure electronic fund transfers for high-value transactions.'}
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Content Column (Left) */}
                    <div className="lg:col-span-8 space-y-12">
                        
                        {/* NEFT Section */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-[#003399] tracking-tight">
                                NEFT (National Electronic Funds Transfer)
                            </h2>
                            <p className="text-[15px] text-slate-700 leading-relaxed font-bold">
                                {data.neft_info || 'National Electronic Funds Transfer (NEFT) is a nation-wide payment system facilitating one-to-one funds transfer. Under this Scheme, individuals, firms and corporates can electronically transfer funds to any individual, firm or corporate having an account with any other bank agency in the country participating in the Scheme.'}
                            </p>
                            {data.neft_note && (
                                <div className="p-6 bg-[#F0F7FF] border-l-4 border-[#0066CC] rounded-r-xl">
                                    <p className="text-[#004C99] font-bold text-sm">
                                        {data.neft_note}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* RTGS Section */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-[#003399] tracking-tight">
                                RTGS (Real Time Gross Settlement)
                            </h2>
                            <p className="text-[15px] text-slate-700 leading-relaxed font-bold">
                                {data.rtgs_info || '\'RTGS\' stands for Real Time Gross Settlement, which can be defined as the continuous (real-time) settlement of funds transfers individually on an order by order basis (without netting). \'Real Time\' means the processing of instructions at the time they are received rather than at some later time.'}
                            </p>
                            {data.rtgs_note && (
                                <div className="p-6 bg-[#FFF2F2] border-l-4 border-[#E61111] rounded-r-xl">
                                    <p className="text-[#990000] font-bold text-sm">
                                        {data.rtgs_note}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Comparison Table */}
                        {data.comparison_json && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-10 bg-[#003399] rounded-full"></div>
                                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">Comparison</h3>
                                </div>
                                
                                <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-[#003399] text-white">
                                                <th className="px-8 py-4 font-bold uppercase tracking-widest text-[10px]">Feature</th>
                                                <th className="px-8 py-4 font-bold uppercase tracking-widest text-[10px]">NEFT</th>
                                                <th className="px-8 py-4 font-bold uppercase tracking-widest text-[10px]">RTGS</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {data.comparison_json.map((row, idx) => (
                                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}>
                                                    <td className="px-8 py-4 font-bold text-gray-800 text-[14px]">{row.feature}</td>
                                                    <td className="px-8 py-4 text-slate-600 font-medium text-[14px]">{row.neft}</td>
                                                    <td className="px-8 py-4 text-slate-600 font-medium text-[14px]">{row.rtgs}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Information Required */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-10 bg-[#003399] rounded-full"></div>
                                <h3 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">Information Required</h3>
                            </div>
                            
                            <div className="space-y-6">
                                <p className="text-slate-700 text-lg font-medium">
                                    {data.req_info_description || 'To initiate a transfer, you need the following details of the beneficiary:'}
                                </p>
                                
                                <ul className="space-y-3">
                                    {(data.req_info_json || []).map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-slate-700 font-bold text-base">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#003399]"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Section (Right) */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* Related Services */}
                        <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm">
                            <h4 className="text-[15px] font-bold text-slate-800 mb-6 tracking-tight uppercase">Related Services</h4>
                            <div className="space-y-4">
                                {(Array.isArray(data.sidebar_links_json) ? data.sidebar_links_json : []).map((link, idx) => (
                                    <Link 
                                        key={idx} 
                                        to={link.url} 
                                        className="flex items-center gap-3 text-slate-600 hover:text-[#003399] font-bold text-sm transition group"
                                    >
                                        <span className="text-slate-400 group-hover:text-[#003399] transition-colors">›</span>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* IFSC Promo (Exactly as per image) */}
                        <div className="bg-[#001b44] rounded-2xl p-8 text-white space-y-6">
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold tracking-tight">Find IFSC Code?</h4>
                                <p className="text-slate-400 text-[13px] font-medium leading-relaxed">
                                    {data.sidebar_ifsc_text || 'Search for IFSC codes of all our branches.'}
                                </p>
                                <Link 
                                    to="/branch-locator" 
                                    className="block w-full bg-[#E61111] hover:bg-red-700 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest text-center transition-all shadow-lg"
                                >
                                    Branch Locator
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default NEFTRTGS;
