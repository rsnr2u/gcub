import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const TollFreeBanking = () => {
    return (
        <div className="bg-white min-h-screen font-inter">
            <SEO
                title="Toll Free Banking - 24/7 Helpline | GCUB"
                description="Our dedicated toll-free helpline ensures you have access to banking support whenever you need it. Call us for any assistance."
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
                        <span className="text-white">Toll Free Banking</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Toll Free Banking</h1>
                    <p className="text-xl text-blue-100 max-w-2xl font-light">
                        Your direct connection to our customer care team, absolutely free.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Content Section */}
                    <div className="lg:col-span-8">
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-blue-900 mb-6">Assistance Around the Clock</h2>
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                We value your time and convenience. Our Toll Free Banking service allows you to get help with your banking queries, report lost cards, and get information on our latest products without any call charges.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-10 rounded-[32px] border border-slate-100 text-center mb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 text-blue-900 rounded-full mb-6">
                                <i className="fas fa-phone-alt text-3xl"></i>
                            </div>
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Our Dedicated Helpline</h3>
                            <a href="tel:18004258873" className="text-4xl md:text-5xl font-black text-blue-900 block mb-4 hover:text-black transition">1800 425 8873</a>
                            <p className="text-slate-500 font-medium">Available 24x7 | 365 Days a Year</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                                    Services Offered
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-slate-600">
                                        <i className="fas fa-angle-right text-blue-500"></i>
                                        Account Balance Inquiry
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-600">
                                        <i className="fas fa-angle-right text-blue-500"></i>
                                        Recent Transaction Details
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-600">
                                        <i className="fas fa-angle-right text-blue-500"></i>
                                        Cheque Book Request
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-600">
                                        <i className="fas fa-angle-right text-blue-500"></i>
                                        Stop Payment of Cheques
                                    </li>
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-red-700 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
                                    Emergency Services
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-slate-600 font-bold">
                                        <i className="fas fa-exclamation-triangle text-red-500"></i>
                                        Block ATM / Debit Card
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-600">
                                        <i className="fas fa-exclamation-triangle text-red-500"></i>
                                        Reporting Unauthorized Transactions
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-600">
                                        <i className="fas fa-exclamation-triangle text-red-500"></i>
                                        Fraud Alert Reporting
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                            <h3 className="text-xl font-bold text-blue-900 mb-6">IVR Guide</h3>
                            <p className="text-sm text-slate-600 mb-6">Choose from the following options for quick service:</p>
                            <div className="space-y-3">
                                <div className="flex justify-between p-3 bg-white rounded-xl border border-blue-100">
                                    <span className="text-sm font-bold text-slate-700">Press 1</span>
                                    <span className="text-sm text-slate-500">For Languages</span>
                                </div>
                                <div className="flex justify-between p-3 bg-white rounded-xl border border-blue-100">
                                    <span className="text-sm font-bold text-slate-700">Press 2</span>
                                    <span className="text-sm text-slate-500">ATM Card Blocking</span>
                                </div>
                                <div className="flex justify-between p-3 bg-white rounded-xl border border-blue-100">
                                    <span className="text-sm font-bold text-slate-700">Press 3</span>
                                    <span className="text-sm text-slate-500">Account Services</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 p-8 rounded-3xl text-white">
                            <h3 className="text-xl font-bold mb-4">International Calls</h3>
                            <p className="text-slate-400 text-sm mb-4">Calling from abroad? Use our international helpline:</p>
                            <a href="tel:+912212345678" className="text-xl font-black text-blue-400 hover:text-white transition">+91 22 1234 5678</a>
                            <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest font-bold">Standard rates apply</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TollFreeBanking;
