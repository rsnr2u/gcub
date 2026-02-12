import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const ATMService = () => {
    return (
        <div className="bg-white min-h-screen font-inter">
            <SEO
                title="ATM Services - 24/7 Cash Access | GCUB"
                description="Our wide network of ATMs ensures you have access to cash whenever you need it. Secure, fast, and accessible 24/7."
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
                        <span className="text-white">ATM Services</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">ATM Services</h1>
                    <p className="text-xl text-blue-100 max-w-2xl font-light">
                        Experience 24/7 convenience with our state-of-the-art ATM network.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Content Section */}
                    <div className="lg:col-span-8">
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-blue-900 mb-6">Banking at Your Convenience</h2>
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                With the GCUB ATM network, you don't need to visit a branch for your basic banking needs. Our ATMs are strategically located and provide a range of services beyond just cash withdrawal.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-money-bill-wave text-xl"></i>
                                </div>
                                <h3 className="font-bold text-slate-800 mb-2">Fast Cash</h3>
                                <p className="text-xs text-slate-500">Quickly withdraw preset amounts of cash.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-unlock-alt text-xl"></i>
                                </div>
                                <h3 className="font-bold text-slate-800 mb-2">PIN Change</h3>
                                <p className="text-xs text-slate-500">Change your debit card PIN securely anytime.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-receipt text-xl"></i>
                                </div>
                                <h3 className="font-bold text-slate-800 mb-2">Mini Statements</h3>
                                <p className="text-xs text-slate-500">Get a print-out of your latest transactions.</p>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div>
                                <h3 className="text-xl font-bold text-blue-900 mb-6">Features & Facilities</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl">
                                        <i className="fas fa-check text-green-500"></i>
                                        <span className="text-slate-700">Cash Withdrawal (Own & Other Bank)</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl">
                                        <i className="fas fa-check text-green-500"></i>
                                        <span className="text-slate-700">Balance Inquiry</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl">
                                        <i className="fas fa-check text-green-500"></i>
                                        <span className="text-slate-700">Mini Statement</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl">
                                        <i className="fas fa-check text-green-500"></i>
                                        <span className="text-slate-700">PIN Change Facility</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                                <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                                    <i className="fas fa-shield-alt"></i>
                                    ATM Security Tips
                                </h3>
                                <ul className="space-y-3 text-sm text-slate-700">
                                    <li className="flex gap-3">
                                        <i className="fas fa-circle text-[6px] mt-2 text-blue-400"></i>
                                        Keep your PIN secret. Never write it on your card or share it.
                                    </li>
                                    <li className="flex gap-3">
                                        <i className="fas fa-circle text-[6px] mt-2 text-blue-400"></i>
                                        Shield the keypad while entering your PIN.
                                    </li>
                                    <li className="flex gap-3">
                                        <i className="fas fa-circle text-[6px] mt-2 text-blue-400"></i>
                                        Be wary of strangers offering help at the ATM.
                                    </li>
                                    <li className="flex gap-3">
                                        <i className="fas fa-circle text-[6px] mt-2 text-blue-400"></i>
                                        Check for any suspicious attachments on the card slot.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-slate-900 text-white p-8 rounded-3xl">
                            <h3 className="text-xl font-bold mb-6">ATM Locator</h3>
                            <p className="text-slate-400 text-sm mb-6">Find the nearest GCUB ATM in seconds using our interactive branch & ATM locator.</p>
                            <Link to="/branch-locator" className="block w-full text-center bg-blue-600 py-4 rounded-2xl font-bold hover:bg-blue-500 transition">
                                Find Nearest ATM
                            </Link>
                        </div>

                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 mb-6">Emergency</h3>
                            <p className="text-sm text-slate-600 mb-4">Lost your debit card? Block it immediately to prevent unauthorized transactions.</p>
                            <div className="space-y-3">
                                <a href="tel:18001234567" className="flex items-center gap-3 text-red-600 font-bold hover:underline">
                                    <i className="fas fa-phone-alt"></i>
                                    1800-456-7890
                                </a>
                                <p className="text-xs text-slate-400 italic">Available 24/7 for card blocking.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ATMService;
