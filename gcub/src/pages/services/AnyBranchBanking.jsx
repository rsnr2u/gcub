import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const AnyBranchBanking = () => {
    return (
        <div className="bg-white min-h-screen font-inter">
            <SEO
                title="Any Branch Banking (ABB) - Bank Anywhere | GCUB"
                description="Operate your account from any of our networked branches with GCUB Any Branch Banking service. Experience true flexibility."
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
                        <span className="text-white">Any Branch Banking</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Any Branch Banking</h1>
                    <p className="text-xl text-blue-100 max-w-2xl font-light">
                        Your bank, everywhere you go. Transact seamlessly from any of our networked branches.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Content Section */}
                    <div className="lg:col-span-8">
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-blue-900 mb-6">Banking without Boundaries</h2>
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                Any Branch Banking (ABB) is a facility that allows you to operate your account from any of our networked branches across the country. You are no longer restricted to just your home branch for your daily banking needs.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                                <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-3">
                                    <i className="fas fa-university"></i>
                                    Key Facilities
                                </h3>
                                <ul className="space-y-4 text-slate-700">
                                    <li className="flex items-center gap-3">
                                        <i className="fas fa-check text-green-500"></i> Cash Deposit at any branch
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fas fa-check text-green-500"></i> Cash Withdrawal (Self only)
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fas fa-check text-green-500"></i> Funds Transfer across branches
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fas fa-check text-green-500"></i> Statement of Account
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fas fa-check text-green-500"></i> Submission of KYC documents
                                    </li>
                                </ul>
                            </div>
                            <div className="p-8 bg-slate-900 rounded-3xl text-white">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <i className="fas fa-exclamation-circle text-amber-500"></i>
                                    Guidelines
                                </h3>
                                <ul className="space-y-4 text-slate-400 text-sm">
                                    <li className="leading-relaxed">
                                        <span className="text-white font-bold block mb-1">Self Withdrawal:</span>
                                        Available up to daily limits with proper identification and passbook.
                                    </li>
                                    <li className="leading-relaxed">
                                        <span className="text-white font-bold block mb-1">Third Party:</span>
                                        Cash payments to third parties at non-home branches are generally not allowed.
                                    </li>
                                    <li className="leading-relaxed">
                                        <span className="text-white font-bold block mb-1">Service Charges:</span>
                                        Nominal charges may apply for ABB transactions as per bank policy.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-blue-900 mb-6">Transaction Table</h3>
                            <div className="overflow-x-auto rounded-2xl border border-slate-200">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 text-slate-500 uppercase font-black text-[10px] tracking-widest border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4">Transaction Type</th>
                                            <th className="px-6 py-4">Home Branch</th>
                                            <th className="px-6 py-4">Non-Home Branch</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr>
                                            <td className="px-6 py-4 font-bold text-slate-800">Cash Deposit</td>
                                            <td className="px-6 py-4 text-green-600 font-bold">Free</td>
                                            <td className="px-6 py-4 text-slate-600">Free up to ₹ 2 Lakhs/day</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-bold text-slate-800">Cash Withdrawal</td>
                                            <td className="px-6 py-4 text-green-600 font-bold">Free</td>
                                            <td className="px-6 py-4 text-slate-600">Free up to ₹ 50,000/day</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-bold text-slate-800">Funds Transfer</td>
                                            <td className="px-6 py-4 text-green-600 font-bold">Free</td>
                                            <td className="px-6 py-4 text-green-600 font-bold">Free</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">* Charges exclude GST and other statutory levies.</p>
                        </div>
                    </div>

                    {/* Sidebar Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-blue-900 p-8 rounded-3xl text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-4">Find Your Nearest Branch</h3>
                                <p className="text-blue-200 text-sm mb-6">Any branch is now your home branch. Find where we are located.</p>
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
                            <Link to="/contact" className="text-blue-900 font-black text-xs uppercase tracking-widest border-b-2 border-blue-900 pb-1 hover:text-blue-700 hover:border-blue-700 transition">
                                Contact Us
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AnyBranchBanking;
