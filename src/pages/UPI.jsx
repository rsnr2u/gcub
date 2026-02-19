const UPI = () => {
    return (
        <div className="upi-page">
            {/* Hero Section */}
            <section className="relative bg-[#002b5c] text-white py-20">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">UPI</h1>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">Unified Payments Interface - The future of mobile payments.</p>
                </div>
            </section>

            <main className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        <h2 className="text-3xl font-bold text-[#003399] mb-6">Overview</h2>
                        <p className="text-gray-600 leading-relaxed mb-8 text-justify">
                            <strong>Unified Payments Interface (UPI)</strong> is a system that powers multiple bank accounts into a single mobile application (of any participating bank), merging several banking features, seamless fund routing & merchant payments into one hood. It also caters to the "Peer to Peer" collect request which can be scheduled and paid as per requirement and convenience.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#003399] pl-4">Benefits of UPI</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-10">
                            <BenefitCard
                                icon="shield-alt"
                                title="Secure Transactions"
                                desc="Two Factor Authentication with a single click. No need to share bank details."
                            />
                            <BenefitCard
                                icon="bolt"
                                title="Real-Time Payment"
                                desc="Immediate money transfer 24*7*365 through your mobile device."
                            />
                            <BenefitCard
                                icon="qrcode"
                                title="Scan & Pay"
                                desc="Pay merchants easily by scanning QR codes at shops and online."
                            />
                            <BenefitCard
                                icon="university"
                                title="Single App"
                                desc="Access multiple bank accounts in a single mobile application."
                            />
                        </div>

                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#003399] pl-4">How to Register?</h3>
                        <ol className="list-decimal list-inside space-y-4 text-gray-600 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <li><strong className="text-gray-800">Download App:</strong> Download any UPI enabled app (Google Pay, PhonePe, BHIM, etc.).</li>
                            <li><strong className="text-gray-800">Verify Mobile:</strong> App will verify your mobile number via SMS.</li>
                            <li><strong className="text-gray-800">Link Account:</strong> Select 'Guntur Co-operative Urban Bank' from the bank list.</li>
                            <li><strong className="text-gray-800">Set PIN:</strong> Create your unique UPI PIN using your Debit Card details.</li>
                            <li><strong className="text-gray-800">Start Transacting:</strong> You are now ready to send and receive money!</li>
                        </ol>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/4 space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h4 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Related Services</h4>
                            <ul className="space-y-3">
                                <SidebarLink text="IMPS Transfer" path="/imps" />
                                <SidebarLink text="RuPay Cards" path="/rupay" />
                                <SidebarLink text="Mobile Banking" path="/net-banking" />
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
                            <i className="fas fa-file-download text-4xl text-gray-400 mb-3"></i>
                            <h4 className="font-bold text-gray-800 mb-2">Download Forms</h4>
                            <p className="text-xs text-gray-500 mb-4">Get application forms for mobile banking registration.</p>
                            <a href="/downloads" className="text-[#003399] text-sm font-bold hover:underline">Go to Downloads</a>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

const BenefitCard = ({ icon, title, desc }) => (
    <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 hover:shadow-md transition">
        <i className={`fas fa-${icon} text-[#003399] text-2xl mb-3`}></i>
        <h4 className="font-bold text-gray-800 mb-2">{title}</h4>
        <p className="text-sm text-gray-600">{desc}</p>
    </div>
);

const SidebarLink = ({ text, path }) => (
    <li>
        <a href={path} className="text-gray-600 hover:text-[#003399] flex items-center gap-2 transition">
            <i className="fas fa-chevron-right text-xs"></i> {text}
        </a>
    </li>
);

export default UPI;
