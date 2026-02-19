const InterestRates = () => {
    return (
        <div className="interest-rates-page">
            {/* Hero Section */}
            <section className="bg-[#003399] py-12 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl font-bold mb-2">Interest Rates</h1>
                    <p className="text-blue-200">Competitive rates for your savings and loans.</p>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-5xl mx-auto space-y-12">

                        {/* Deposit Rates */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                                <h3 className="text-[#003399] font-bold text-lg flex items-center gap-2">
                                    <i className="fas fa-piggy-bank"></i> Deposit Interest Rates
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-blue-50 text-[#003399] font-bold uppercase text-xs">
                                        <tr>
                                            <th className="px-6 py-4">Tenure</th>
                                            <th className="px-6 py-4">General Public (% p.a.)</th>
                                            <th className="px-6 py-4">Senior Citizens (% p.a.)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-gray-600">
                                        <RateRow tenure="7 Days to 45 Days" general="4.00%" senior="4.50%" />
                                        <RateRow tenure="46 Days to 90 Days" general="5.00%" senior="5.50%" />
                                        <RateRow tenure="91 Days to 179 Days" general="5.50%" senior="6.00%" />
                                        <RateRow tenure="180 Days to 364 Days" general="6.00%" senior="6.50%" />
                                        <RateRow tenure="1 Year to 3 Years" general="7.00%" senior="7.50%" isHighlight />
                                        <RateRow tenure="Above 3 Years" general="6.50%" senior="7.00%" />
                                        <RateRow tenure="Savings Account" general="3.00%" senior="3.00%" />
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Loan Rates */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                                <h3 className="text-[#003399] font-bold text-lg flex items-center gap-2">
                                    <i className="fas fa-hand-holding-usd"></i> Loan Interest Rates
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-red-50 text-[#E61111] font-bold uppercase text-xs">
                                        <tr>
                                            <th className="px-6 py-4">Loan Product</th>
                                            <th className="px-6 py-4">Interest Rate (% p.a.)</th>
                                            <th className="px-6 py-4">Processing Fee</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-gray-600">
                                        <LoanRow product="Gold Loan" rate="8.50% - 11.00%" fee="0.50%" />
                                        <LoanRow product="Housing Loan" rate="8.75% onwards" fee="0.75%" />
                                        <LoanRow product="Education Loan" rate="9.50% onwards" fee="Nil" />
                                        <LoanRow product="Vehicle Loan" rate="9.00% onwards" fee="1.00%" />
                                        <LoanRow product="Personal Loan (Salary)" rate="11.00% onwards" fee="1.00%" />
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-xs text-gray-400">Rates are subject to change at the sole discretion of the bank. Please contact your nearest branch for the latest rates.</p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

const RateRow = ({ tenure, general, senior, isHighlight }) => (
    <tr className={`${isHighlight ? 'bg-yellow-50 hover:bg-yellow-100 font-bold text-[#E61111]' : 'hover:bg-gray-50'}`}>
        <td className="px-6 py-4">{tenure}</td>
        <td className="px-6 py-4">{general}</td>
        <td className="px-6 py-4">{senior}</td>
    </tr>
);

const LoanRow = ({ product, rate, fee }) => (
    <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 font-medium">{product}</td>
        <td className="px-6 py-4">{rate}</td>
        <td className="px-6 py-4">{fee}</td>
    </tr>
);

export default InterestRates;
