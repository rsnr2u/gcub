import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const EStatements = () => {
    return (
        <div className="bg-white min-h-screen font-inter">
            <SEO
                title="E-Statements - Go Paperless | GCUB"
                description="Subscribe to E-Statements and receive your account statements directly in your inbox. Eco-friendly, secure, and fast."
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
                        <span className="text-white">E-Statements</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">E-Statements</h1>
                    <p className="text-xl text-blue-100 max-w-2xl font-light">
                        Receive your bank statements securely in your email. Fast, free, and eco-friendly.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Content Section */}
                    <div className="lg:col-span-8">
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-blue-900 mb-6">Switch to Digital Statements</h2>
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                E-Statement is an electronic version of your bank statement, delivered as a PDF to your registered email address. It’s exactly the same as the paper statement you receive via mail, but without the clutter and delay.
                            </p>
                        </div>

                        <div className="space-y-12">
                            <div>
                                <h3 className="text-xl font-bold text-blue-900 mb-8 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                                    Benefits of E-Statements
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                                            <i className="fas fa-leaf"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-1">Eco-Friendly</h4>
                                            <p className="text-sm text-slate-500">Reduce paper waste and save trees by choosing digital delivery.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                                            <i className="fas fa-bolt"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-1">Instant Delivery</h4>
                                            <p className="text-sm text-slate-500">No more waiting for the mail. Get your statements as soon as they're generated.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                                            <i className="fas fa-lock"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-1">Secure Storage</h4>
                                            <p className="text-sm text-slate-500">Your statements are password-protected and safely archived in your email.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                                            <i className="fas fa-wallet"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-1">Completely Free</h4>
                                            <p className="text-sm text-slate-500">Subscribe to E-Statements at zero cost and avoid physical postal charges.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900 rounded-3xl p-10 text-white flex flex-col md:flex-row items-center gap-10">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-4">How to Subscribe?</h3>
                                    <p className="text-slate-400 mb-6 font-light leading-relaxed">It takes less than a minute to go paperless. Choose any of these easy methods:</p>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold">1</div>
                                            <span>Via Mobile Banking App</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold">2</div>
                                            <span>Visit your nearest branch</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold">3</div>
                                            <span>Send SMS 'ESTMT' to 56767</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="hidden md:block">
                                    <i className="fas fa-paper-plane text-[100px] text-blue-500/20"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                            <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                                <i className="fas fa-info-circle"></i>
                                Important Note
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                E-Statements are sent as password-protected PDF files. Generally, the password is your **PAN Number** (in uppercase) or a combination of your **Date of Birth**.
                                <br /><br />
                                Please check your welcome email for specific password instructions.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 mb-6">Need help?</h3>
                            <p className="text-sm text-slate-600 mb-6">Can't open your e-statement or didn't receive one? Contact our support.</p>
                            <a href="tel:18001234567" className="block w-full text-center bg-blue-900 py-4 rounded-2xl text-white font-bold hover:bg-black transition">
                                Contact Support
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EStatements;
