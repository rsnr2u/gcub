const HousingLoans = () => {
    return (
        <div className="housing-loans-page">
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-light text-gray-700 mb-6 font-outfit">Housing Loans</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-3/4">
                        <div className="mb-6 rounded-lg overflow-hidden shadow-sm h-72 relative">
                            <img src="/assets/images/housing_loan/banner.png" alt="Housing Loan Banner" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                <div className="p-6 text-white text-left">
                                    <h2 className="text-3xl font-bold mb-2">Build Your Dream Home</h2>
                                    <p>Affordable housing loans with quick approval and easy EMIs.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8 text-sm text-gray-600 leading-relaxed text-justify">
                            <p className="mb-4">
                                Turn your dream of owning a home into reality with our Housing Loan. We offer loans for purchase of a new house/flat, construction of a house on a plot, or renovation/extension of your existing house. Enjoy attractive interest rates and flexible repayment options.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-light text-gray-700 mb-4 border-b pb-2">Features and Benefits</h2>
                            <ul className="space-y-4">
                                <FeatureBenefit text="High Loan Amount based on income and eligibility." />
                                <FeatureBenefit text="Long Repayment Tenure up to 20 years." />
                                <FeatureBenefit text="Competitive Interest Rates." />
                                <FeatureBenefit text="No Prepayment Penalty." />
                            </ul>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-light text-gray-800 mb-6 pb-2 border-b border-gray-200">Documents Required</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DocCard
                                    title="KYC & Income Proof"
                                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                                    items={['Photo ID & Address Proof', 'Salary Slips / IT Returns (Last 3 years)', 'Bank Statements (Last 6 months)']}
                                    theme="blue"
                                />
                                <DocCard
                                    title="Property Documents"
                                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                                    items={['Sale Deed / Agreement to Sale', 'Link Documents', 'Building Plan Approval', 'Estimation of Construction']}
                                    theme="green"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/4 space-y-6">
                        <div className="bg-[#0056b3] text-white overflow-hidden rounded shadow-sm">
                            <a href="/interest-rates" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition text-sm font-medium">Interest Rates</a>
                            <a href="/emi-calculator" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition text-sm font-medium">EMI Calculator</a>
                            {/* CTA Card */}
                            <div className="bg-[#003399] text-white p-8 rounded-xl shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                                <h3 className="text-2xl font-bold mb-4 relative z-10">Start Your Journey</h3>
                                <p className="text-blue-100 mb-8 relative z-10 font-light">Open an account today and experience banking services tailored for your lifestyle.</p>
                                <a href="/contact" className="w-full bg-white text-[#003399] flex items-center justify-center font-bold py-4 rounded-xl hover:bg-blue-50 transition shadow-lg relative z-10 uppercase tracking-widest text-sm text-center">Apply Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
};

const FeatureBenefit = ({ text }) => (
    <li className="bg-gray-50 p-4 border-l-4 border-[#003399] shadow-sm text-sm text-gray-700 flex justify-between items-center group cursor-pointer hover:bg-white transition">
        <span>{text}</span>
        <span className="text-[#003399] group-hover:translate-x-1 transition-transform">▶</span>
    </li>
);

const DocCard = ({ title, icon, items, theme }) => (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-full ${theme === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'} flex items-center justify-center`}>
                {icon}
            </div>
            <h3 className="font-bold text-gray-800">{title}</h3>
        </div>
        <ul className={`text-sm text-gray-600 space-y-2 list-disc list-inside marker:${theme === 'blue' ? 'text-blue-500' : 'text-green-500'}`}>
            {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
    </div>
);

export default HousingLoans;
