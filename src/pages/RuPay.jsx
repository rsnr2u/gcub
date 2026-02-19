const RuPay = () => {
    return (
        <div className="rupay-page">
            {/* Hero Section */}
            <section className="relative bg-[#002b5c] text-white py-20">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">RuPay Cards</h1>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">India's own card payment network. World-class privileges.</p>
                </div>
            </section>

            <main className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        <h2 className="text-3xl font-bold text-[#003399] mb-6">Overview</h2>
                        <p className="text-gray-600 leading-relaxed mb-8 text-justify">
                            <strong>RuPay</strong> is an Indian domestic card scheme conceived and launched by the National Payments Corporation of India (NPCI). It was created to fulfill the Reserve Bank of India's vision of having a domestic, open-loop, and multilateral system of payments in India. RuPay facilitates electronic payment at all Indian banks and financial institutions.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#003399] pl-4">Types of RuPay Cards</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-10">
                            <CardType
                                title="RuPay Classic"
                                color="bg-orange-500"
                                desc="Ideal for everyday shopping and cash withdrawals."
                                features={['Comprehensive Insurance Cover', 'Domestic Merchant Offers']}
                            />
                            <CardType
                                title="RuPay Platinum"
                                color="bg-gray-800"
                                desc="Premium card with exclusive benefits and higher limits."
                                features={['Airport Lounge Access', 'Concierge Services', '5% Cash Back on Utility Bills']}
                            />
                        </div>

                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#003399] pl-4">Safety Tips</h3>
                        <ul className="space-y-4 mb-10">
                            <SafetyTip
                                title="Never share your PIN"
                                desc="Your ATM/POS PIN is confidential. Do not share it with anyone, not even bank officials."
                                icon="shield-alt"
                            />
                            <SafetyTip
                                title="Hide your PIN"
                                desc="Always cover the keypad while entering your PIN at ATMs or POS terminals."
                                icon="eye-slash"
                            />
                        </ul>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/4 space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h4 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Related Services</h4>
                            <ul className="space-y-3">
                                <li><a href="/debit-cards" className="text-gray-600 hover:text-[#003399] flex items-center gap-2 transition"><i className="fas fa-chevron-right text-xs"></i> Debit Cards</a></li>
                                <li><a href="/net-banking" className="text-gray-600 hover:text-[#003399] flex items-center gap-2 transition"><i className="fas fa-chevron-right text-xs"></i> Net Banking</a></li>
                            </ul>
                        </div>

                        <div className="bg-[#E61111] text-white p-6 rounded-xl shadow-lg">
                            <h4 className="font-bold text-lg mb-2">Lost your Card?</h4>
                            <p className="text-red-100 text-sm mb-4">Immediately block your card to prevent misuse.</p>
                            <a href="/contact" className="inline-block w-full text-center bg-white text-[#E61111] px-4 py-2 rounded font-bold text-sm hover:bg-red-50 transition">Block Card Now</a>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

const CardType = ({ title, color, desc, features }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition">
        <div className={`${color} h-2 w-full`}></div>
        <div className="p-6">
            <h4 className="font-bold text-xl text-gray-800 mb-2">{title}</h4>
            <p className="text-gray-600 text-sm mb-4">{desc}</p>
            <ul className="text-sm space-y-2 text-gray-500">
                {features.map((f, i) => (
                    <li key={i}><i className="fas fa-check text-green-500 mr-2"></i> {f}</li>
                ))}
            </ul>
        </div>
    </div>
);

const SafetyTip = ({ title, desc, icon }) => (
    <li className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-start gap-4">
        <i className={`fas fa-${icon} text-[#E61111] mt-1`}></i>
        <div>
            <strong className="block text-gray-800">{title}</strong>
            <span className="text-sm text-gray-600">{desc}</span>
        </div>
    </li>
);

export default RuPay;
