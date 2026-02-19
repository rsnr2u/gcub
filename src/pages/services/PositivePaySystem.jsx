import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const PositivePaySystem = () => {
    return (
        <div className="bg-white min-h-screen font-inter">
            <SEO
                title="Positive Pay System (PPS) - Secure Check Payments | GCUB"
                description="Enhanced security for your high-value cheque payments with GCUB Positive Pay System. Prevent fraud and ensure safe clearing."
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
                        <span className="text-white">Positive Pay System</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Positive Pay System</h1>
                    <p className="text-xl text-blue-100 max-w-2xl font-light">
                        Adding an extra layer of security to your high-value check payments.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Content Section */}
                    <div className="lg:col-span-8">
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-blue-900 mb-6">What is Positive Pay System (PPS)?</h2>
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                Positive Pay System is a process of reconfirming key details of high-value cheques. This involves the drawer of the cheque (the account holder) submitting certain minimum details of a cheque—such as date, name of beneficiary, and amount—to the bank.
                            </p>
                            <p className="text-slate-600">
                                When the cheque is presented for clearing, these details are matched with the information provided by the customer. Any discrepancy is flagged, preventing potential cheque fraud.
                            </p>
                        </div>

                        <div className="bg-blue-50 border-l-8 border-blue-900 p-8 rounded-r-3xl mb-12">
                            <h3 className="text-lg font-bold text-blue-900 mb-2 uppercase tracking-wide">Eligibility</h3>
                            <p className="text-slate-700 leading-relaxed">
                                PPS is applicable for all cheques of **₹ 50,000 and above**. While it is optional for customers at the discretion of the bank, we highly recommend it for your security.
                            </p>
                        </div>

                        <div className="space-y-12">
                            <div>
                                <h3 className="text-xl font-bold text-blue-900 mb-8 flex items-center gap-3">
                                    <span className="w-1.5 h-7 bg-blue-600 rounded-full"></span>
                                    Information Required for PPS
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
                                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">01</div>
                                        <span className="font-medium text-slate-700">Cheque Number</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
                                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">02</div>
                                        <span className="font-medium text-slate-700">Cheque Date</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
                                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">03</div>
                                        <span className="font-medium text-slate-700">Cheque Amount</span>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
                                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">04</div>
                                        <span className="font-medium text-slate-700">Beneficiary Name</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-blue-900">Submission Channels</h3>
                                <p className="text-slate-600">You can submit your PPS details through any of the following channels:</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-6 border border-slate-100 rounded-3xl text-center hover:bg-slate-50 transition cursor-default">
                                        <i className="fas fa-mobile-alt text-3xl text-blue-600 mb-4"></i>
                                        <h4 className="font-bold text-slate-800">Mobile App</h4>
                                    </div>
                                    <div className="p-6 border border-slate-100 rounded-3xl text-center hover:bg-slate-50 transition cursor-default">
                                        <i className="fas fa-university text-3xl text-blue-600 mb-4"></i>
                                        <h4 className="font-bold text-slate-800">Any Branch</h4>
                                    </div>
                                    <div className="p-6 border border-slate-100 rounded-3xl text-center hover:bg-slate-50 transition cursor-default">
                                        <i className="fas fa-envelope-open-text text-3xl text-blue-600 mb-4"></i>
                                        <h4 className="font-bold text-slate-800">SMS Banking</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-slate-900 text-white p-8 rounded-3xl text-center">
                            <i className="fas fa-shield-alt text-5xl text-blue-500 mb-6 block"></i>
                            <h3 className="text-xl font-bold mb-4">Protect Your Payments</h3>
                            <p className="text-slate-400 text-sm mb-8 leading-relaxed">Cheque fraud is a serious threat. Using Positive Pay System is the best way to ensure your high-value transactions are legitimate.</p>
                            <Link to="/mobile-banking" className="block w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-blue-100 transition">
                                Enable via App
                            </Link>
                        </div>

                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 mb-6">Need Assistance?</h3>
                            <p className="text-sm text-slate-600 mb-6">If you have any questions about how to use the Positive Pay System, don't hesitate to reach out.</p>
                            <div className="space-y-4">
                                <a href="tel:18004258873" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 group hover:border-blue-900 transition">
                                    <i className="fas fa-phone-alt text-blue-600 group-hover:text-blue-900"></i>
                                    <span className="font-bold text-slate-800">1800 425 8873</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PositivePaySystem;
