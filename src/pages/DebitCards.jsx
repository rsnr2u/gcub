import { Link } from 'react-router-dom';

const DebitCards = () => {
    return (
        <div className="debit-cards-page">
            <section className="relative bg-[#002b5c] text-white py-20">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Debit Cards</h1>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">Experience the power of cashless transactions with our range of Debit Cards.</p>
                </div>
            </section>

            <main className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-3/4">
                        <h2 className="text-3xl font-bold text-[#003399] mb-6">Overview</h2>
                        <p className="text-gray-600 leading-relaxed mb-8 text-justify">
                            Our <strong>Debit Cards</strong> give you instant access to your bank account anytime, anywhere. Shop at millions of merchant outlets, withdraw cash from ATMs, and make online payments securely. We offer both Visa and RuPay debit cards to suit your lifestyle needs.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-10">
                            <CardCard type="VISA" title="Visa Classic / Platinum" desc="Global acceptance with exclusive travel and dining offers." color="blue" />
                            <CardCard type="RuPay" title="RuPay PMJDY / Classic" desc="Domestic card with comprehensive insurance coverage." color="orange" />
                        </div>

                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#003399] pl-4">Features</h3>
                        <ul className="space-y-4 mb-10">
                            <FeatureItem icon="money-bill-wave" title="High Withdrawal Limits" desc="Withdraw up to ₹ 40,000 per day from ATMs." iconColor="text-green-500" />
                            <FeatureItem icon="shopping-cart" title="Shopping Limit" desc="Shop up to ₹ 1,00,000 per day at PoS terminals and online." iconColor="text-[#003399]" />
                            <FeatureItem icon="shield-alt" title="EMV Chip Security" desc="Enhanced security against skimming and cloning fraud." iconColor="text-red-500" />
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#003399] pl-4">Green PIN</h3>
                        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                            <p className="text-gray-700 mb-4">Forget waiting for PIN mailers! Generate your Debit Card PIN instantly (Green PIN) at any of our ATMs or through Internet Banking.</p>
                            <a href="#" className="text-[#008800] font-bold hover:underline">Learn how to generate Green PIN <i className="fas fa-arrow-right ml-1 text-xs"></i></a>
                        </div>
                    </div>

                    <div className="lg:w-1/4 space-y-8">
                        <div className="bg-[#E61111] text-white p-6 rounded-xl shadow-lg">
                            <h4 className="font-bold text-lg mb-2">Block Card</h4>
                            <p className="text-red-100 text-sm mb-4">Lost or Stolen card? Block it immediately via SMS or Call.</p>
                            <div className="bg-white/10 p-3 rounded mb-2">
                                <p className="text-xs text-white uppercase opacity-70">SMS</p>
                                <p className="font-mono font-bold">BLOCK XXXX to 56767</p>
                            </div>
                            <div className="bg-white/10 p-3 rounded">
                                <p className="text-xs text-white uppercase opacity-70">Call</p>
                                <p className="font-mono font-bold">1800-425-8873</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h4 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Related Services</h4>
                            <ul className="space-y-3">
                                <li><Link to="/rupay-cards" className="text-gray-600 hover:text-[#003399] flex items-center gap-2 transition"><i className="fas fa-chevron-right text-xs"></i> RuPay Cards</Link></li>
                                <li><a href="/net-banking" className="text-gray-600 hover:text-[#003399] flex items-center gap-2 transition"><i className="fas fa-chevron-right text-xs"></i> Net Banking</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const CardCard = ({ type, title, desc, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
        <div className={`w-16 h-10 ${color === 'blue' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'} rounded flex items-center justify-center font-bold italic`}>
            {type}
        </div>
        <div>
            <h4 className="font-bold text-gray-800 mb-1">{title}</h4>
            <p className="text-sm text-gray-600">{desc}</p>
        </div>
    </div>
);

const FeatureItem = ({ icon, title, desc, iconColor }) => (
    <li className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-start gap-4">
        <i className={`fas fa-${icon} ${iconColor} mt-1`}></i>
        <div>
            <strong className="block text-gray-800">{title}</strong>
            <span className="text-sm text-gray-600">{desc}</span>
        </div>
    </li>
);

export default DebitCards;
