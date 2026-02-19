import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const APBSService = () => {
    return (
        <div className="bg-white min-h-screen font-inter">
            <SEO
                title="APBS Service - Aadhaar Payment Bridge | GCUB"
                description="Receive your government benefits and subsidies directly into your bank account with GCUB Aadhaar Payment Bridge System (APBS)."
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
                        <span className="text-white">APBS Service</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">APBS Service</h1>
                    <p className="text-xl text-blue-100 max-w-2xl font-light">
                        Aadhaar Payment Bridge System for seamless disbursement of government benefits.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Content Section */}
                    <div className="lg:col-span-8">
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-blue-900 mb-6">What is Aadhaar Payment Bridge (APB) System?</h2>
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                Aadhaar Payment Bridge (APB) System, implemented by NPCI, is a unique payment system that uses Aadhaar number as a central key for electronically channeling government subsidies and benefits in the Aadhaar Linked Bank Accounts (ALBA) of the beneficiaries.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                <h3 className="text-xl font-bold text-blue-900 mb-4">For Beneficiaries</h3>
                                <ul className="space-y-4 text-sm text-slate-600">
                                    <li className="flex gap-3">
                                        <i className="fas fa-check-circle text-blue-600 mt-1"></i>
                                        Eliminates inordinate delays associated with manual processing.
                                    </li>
                                    <li className="flex gap-3">
                                        <i className="fas fa-check-circle text-blue-600 mt-1"></i>
                                        Direct credit of benefits without any middlemen.
                                    </li>
                                    <li className="flex gap-3">
                                        <i className="fas fa-check-circle text-blue-600 mt-1"></i>
                                        Provides access to banking services at the doorstep.
                                    </li>
                                </ul>
                            </div>
                            <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                                <h3 className="text-xl font-bold text-blue-900 mb-4">Key Objectives</h3>
                                <ul className="space-y-4 text-sm text-slate-600">
                                    <li className="flex gap-3">
                                        <i className="fas fa-bullseye text-blue-600 mt-1"></i>
                                        To digitize benefit disbursement processes.
                                    </li>
                                    <li className="flex gap-3">
                                        <i className="fas fa-bullseye text-blue-600 mt-1"></i>
                                        To promote financial inclusion among the rural population.
                                    </li>
                                    <li className="flex gap-3">
                                        <i className="fas fa-bullseye text-blue-600 mt-1"></i>
                                        To ensure transparency in government payouts.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 mb-12">
                            <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                                <i className="fas fa-link"></i>
                                How to Link Your Aadhaar?
                            </h3>
                            <p className="text-amber-800 text-sm mb-6 leading-relaxed">To receive Direct Benefit Transfer (DBT) into your account, you must link your Aadhaar with your GCUB bank account. Follow these steps:</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-4 rounded-2xl shadow-sm">
                                    <span className="text-[10px] font-black text-amber-500 uppercase">Step 1</span>
                                    <p className="text-xs font-bold text-slate-700 mt-1">Visit your home branch</p>
                                </div>
                                <div className="bg-white p-4 rounded-2xl shadow-sm">
                                    <span className="text-[10px] font-black text-amber-500 uppercase">Step 2</span>
                                    <p className="text-xs font-bold text-slate-700 mt-1">Submit Aadhaar copy & Consent</p>
                                </div>
                                <div className="bg-white p-4 rounded-2xl shadow-sm">
                                    <span className="text-[10px] font-black text-amber-500 uppercase">Step 3</span>
                                    <p className="text-xs font-bold text-slate-700 mt-1">Seed Aadhaar with NPCI mapper</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-slate-900 p-8 rounded-3xl text-white">
                            <h3 className="text-xl font-bold mb-4">DBT Benefits</h3>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">Common benefits received through APBS include PM-Kisan, Gas Subsidy, MGNREGA wages, and Old Age Pensions.</p>
                            <div className="space-y-3">
                                <div className="p-3 bg-slate-800 rounded-xl flex items-center gap-3">
                                    <i className="fas fa-university text-blue-400"></i>
                                    <span className="text-xs">PM-Kisan Samman Nidhi</span>
                                </div>
                                <div className="p-3 bg-slate-800 rounded-xl flex items-center gap-3">
                                    <i className="fas fa-gas-pump text-blue-400"></i>
                                    <span className="text-xs">LPG Subsidy (PAHAL)</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-blue-900 rounded-3xl text-white">
                            <h4 className="font-bold mb-2">Check Linking Status</h4>
                            <p className="text-xs text-blue-200 mb-6">You can check your Aadhaar mapping status on the UIDAI official website.</p>
                            <a href="https://uidai.gov.in" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-white text-blue-900 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-50 transition">
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
