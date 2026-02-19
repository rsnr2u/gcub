const IMPS = () => {
    return (
        <div className="imps-page">
            {/* Hero Section */}
            <section className="relative bg-[#002b5c] text-white py-20">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">IMPS</h1>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">Immediate Payment Service - Instant inter-bank electronic fund transfers, 24/7.</p>
                </div>
            </section>

            <main className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        <h2 className="text-3xl font-bold text-[#003399] mb-6">Overview</h2>
                        <p className="text-gray-600 leading-relaxed mb-8 text-justify">
                            <strong>Immediate Payment Service (IMPS)</strong> is an instant interbank electronic fund transfer service through mobile phones. IMPS offers an inter-bank electronic fund transfer service through mobile phones. Unlike NEFT and RTGS, the service is available 24/7 throughout the year including bank holidays.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#003399] pl-4">Key Features</h3>
                        <ul className="space-y-4 mb-10">
                            <FeatureItem
                                title="Instant Transfer"
                                desc="Funds are credited to the beneficiary account immediately."
                            />
                            <FeatureItem
                                title="24/7 Availability"
                                desc="Works round the clock, 365 days a year, including Sundays and holidays."
                            />
                            <FeatureItem
                                title="Multiple Channels"
                                desc="Accessible through Mobile Banking, Net Banking, and ATMs."
                            />
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#003399] pl-4">Transaction Limits</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-600 border border-gray-200">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 border-r border-gray-200">Channel</th>
                                        <th scope="col" className="px-6 py-3 border-r border-gray-200">Per Transaction Limit</th>
                                        <th scope="col" className="px-6 py-3">Daily Limit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b border-gray-200">
                                        <td className="px-6 py-4 font-medium text-gray-900 border-r border-gray-200">Mobile Banking</td>
                                        <td className="px-6 py-4 border-r border-gray-200">₹ 2,00,000</td>
                                        <td className="px-6 py-4">₹ 5,00,000</td>
                                    </tr>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <td className="px-6 py-4 font-medium text-gray-900 border-r border-gray-200">Net Banking</td>
                                        <td className="px-6 py-4 border-r border-gray-200">₹ 5,00,000</td>
                                        <td className="px-6 py-4">₹ 10,00,000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/4 space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h4 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Related Services</h4>
                            <ul className="space-y-3">
                                <SidebarLink text="UPI Payments" path="/upi" />
                                <SidebarLink text="NEFT / RTGS" path="/neft-rtgs" />
                                <SidebarLink text="Internet Banking" path="/net-banking" />
                            </ul>
                        </div>

                        <div className="bg-[#003399] text-white p-6 rounded-xl shadow-lg">
                            <i className="fas fa-headset text-4xl mb-4 opacity-80"></i>
                            <h4 className="font-bold text-lg mb-2">Need Assistance?</h4>
                            <p className="text-blue-100 text-sm mb-4">Contact our registered mobile support for any failed transactions.</p>
                            <a href="/contact" className="inline-block bg-white text-[#003399] px-4 py-2 rounded font-bold text-sm hover:bg-gray-100 transition">Contact Support</a>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

const FeatureItem = ({ title, desc }) => (
    <li className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-start gap-4">
        <i className="fas fa-check-circle text-green-500 mt-1"></i>
        <div>
            <strong className="block text-gray-800">{title}</strong>
            <span className="text-sm text-gray-600">{desc}</span>
        </div>
    </li>
);

const SidebarLink = ({ text, path }) => (
    <li>
        <a href={path} className="text-gray-600 hover:text-[#003399] flex items-center gap-2 transition">
            <i className="fas fa-chevron-right text-xs"></i> {text}
        </a>
    </li>
);

export default IMPS;
