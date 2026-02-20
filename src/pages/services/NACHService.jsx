import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const NACHService = () => {
    return (
        <div className="bg-white min-h-screen font-inter">
            <SEO
                title="NACH Credit & Debit - Automated Payments | GCUB"
                description="Automate your recurring payments and receive credits directly with National Automated Clearing House (NACH) service at GCUB."
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
                        <span className="text-white">NACH Service</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">NACH Credit & Debit</h1>
                    <p className="text-xl text-blue-100 max-w-2xl font-light">
                        Simplified automated clearing for high-volume, repetitive electronic transactions.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Content Section */}
                    <div className="lg:col-span-8">
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-blue-900 mb-6">What is NACH?</h2>
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                National Automated Clearing House (NACH) is a centralized system launched by NPCI for banks, financial institutions, Corporates and Government to facilitate interbank, high volume, electronic transactions which are repetitive and periodic in nature.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div className="p-8 rounded-3xl border border-blue-200 bg-blue-50">
                                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                                    <i className="fas fa-arrow-down"></i>
                                    NACH Credit
                                </h3>
                                <p className="text-sm text-slate-600 mb-6">Used for making payments to multiple individuals by a single entity.</p>
                                <ul className="space-y-3 text-sm text-slate-800 font-bold">
                                    <li className="flex items-center gap-2"><i className="fas fa-check text-green-500"></i> Dividend Payments</li>
                                    <li className="flex items-center gap-2"><i className="fas fa-check text-green-500"></i> Salary Disbursements</li>
                                    <li className="flex items-center gap-2"><i className="fas fa-check text-green-500"></i> Pension Payouts</li>
                                    <li className="flex items-center gap-2"><i className="fas fa-check text-green-500"></i> Interest Credits</li>
                                </ul>
                            </div>
                            <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50">
                                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-arrow-up"></i>
                                    NACH Debit
                                </h3>
                                <p className="text-sm text-slate-600 mb-6">Used for collecting periodic payments from individuals by a single entity.</p>
                                <ul className="space-y-3 text-sm text-slate-800 font-bold">
                                    <li className="flex items-center gap-2"><i className="fas fa-check text-blue-500"></i> Utility Bill Payments</li>
                                    <li className="flex items-center gap-2"><i className="fas fa-check text-blue-500"></i> SIP/Insurance Premiums</li>
                                    <li className="flex items-center gap-2"><i className="fas fa-check text-blue-500"></i> Loan EMI Collections</li>
                                    <li className="flex items-center gap-2"><i className="fas fa-check text-blue-500"></i> School/College Fees</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-3xl p-10 text-white">
                            <h3 className="text-2xl font-bold mb-6">Why Use NACH?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <h4 className="text-blue-400 font-bold">Direct & Fast</h4>
                                    <p className="text-sm text-slate-400">Eliminates the need for physical checks and manual processing, ensuring faster clearing cycles.</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-blue-400 font-bold">Reliable</h4>
                                    <p className="text-sm text-slate-400">Automated process reduces human error and ensures payments are made on time, every time.</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-blue-400 font-bold">Scalable</h4>
                                    <p className="text-sm text-slate-400">Handle millions of transactions in a single day across geographical locations.</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-blue-400 font-bold">Secure</h4>
                                    <p className="text-sm text-slate-400">Robust security measures implemented by NPCI for all interbank transactions.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                            <h3 className="text-xl font-bold text-blue-900 mb-6">Mandate Registration</h3>
                            <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                To enable NACH Debit, you need to sign a one-time mandate (E-Mandate) form authorizing the collection entity to debit your account.
                            </p>
                            <div className="bg-white p-4 rounded-xl border border-blue-200">
                                <h4 className="text-xs font-black text-blue-900 uppercase mb-2">Download the Form</h4>
                                <p className="text-xs text-slate-500 mb-3">Download the E-Mandate form to enable NACH Debit.</p>
                                <a className="text-[10px] font-black uppercase text-blue-600 hover:text-blue-900 transition" href="/downloads">Download the Form</a>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">MMS Service</h3>
                            <p className="text-xs text-slate-500 leading-loose">
                                Mandate Management System (MMS) allows you to manage your active mandates, including cancellation and modification requests through your bank.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NACHService;
