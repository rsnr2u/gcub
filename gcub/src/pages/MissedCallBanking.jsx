const MissedCallBanking = () => {
    return (
        <div className="missed-call-banking-page">
            {/* Hero Section */}
            <section className="bg-[#003399] py-12 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl font-bold mb-2">Missed Call Banking</h1>
                    <p className="text-blue-200">Bank conveniently with just a missed call.</p>
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100">

                        <div className="flex items-center gap-6 mb-8 border-b border-gray-100 pb-8">
                            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                <i className="fas fa-phone-alt text-3xl text-[#003399]"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">How it works?</h3>
                                <p className="text-gray-600 text-sm">Register your mobile number with your branch. Give a missed call to the designated numbers from your registered mobile number to get instant SMS alerts.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Service 1 */}
                            <ServiceItem
                                title="Balance Inquiry"
                                desc="Check your account balance instantly."
                                phone="09223009999"
                            />

                            {/* Service 2 */}
                            <ServiceItem
                                title="Mini Statement"
                                desc="Get last 5 transactions via SMS."
                                phone="09223009998"
                            />

                            {/* Service 3 */}
                            <ServiceItem
                                title="Block Debit Card"
                                desc="Lost your card? Block it immediately."
                                phone="09223009997"
                            />
                        </div>

                        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-900 flex items-start gap-3">
                            <i className="fas fa-info-circle mt-1"></i>
                            <p>Note: Regular SMS charges may apply depending on your mobile network provider for the confirmation SMS received. This service is available 24x7.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ServiceItem = ({ title, desc, phone }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div>
            <h4 className="font-bold text-[#003399]">{title}</h4>
            <p className="text-xs text-gray-500">{desc}</p>
        </div>
        <div className="text-right">
            <a href={`tel:${phone}`} className="text-xl font-bold text-[#E61111] hover:underline">{phone}</a>
        </div>
    </div>
);

export default MissedCallBanking;
