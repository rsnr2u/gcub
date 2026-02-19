const RecurringDeposits = () => {
    return (
        <div className="recurring-deposits-page">
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-light text-gray-700 mb-6 font-outfit">Recurring Deposits</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-3/4">
                        <div className="mb-6 rounded-lg overflow-hidden shadow-sm">
                            <img src="assets/images/recurring_deposit/banner.png" alt="Recurring Deposit Banner" className="w-full h-auto object-cover" />
                        </div>

                        <div className="mb-8 text-sm text-gray-600 leading-relaxed text-justify">
                            <p className="mb-4">
                                Build a substantial corpus for your future needs through small monthly savings. Our Recurring Deposit scheme encourages disciplined savings and offers interest rates on par with Fixed Deposits. It is an ideal way to plan for your short-term and medium-term financial goals.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-light text-gray-700 mb-4 border-b pb-2">Features and Benefits</h2>
                            <ul className="space-y-4">
                                <FeatureBenefit text="Start with a small amount of Rs. 100/- per month." />
                                <FeatureBenefit text="Flexible tenure ranging from 12 months to 120 months." />
                                <FeatureBenefit text="Loan / Overdraft facility available against deposit." />
                                <FeatureBenefit text="No TDS on interest earned upto Rs. 40,000/- (Rs. 50,000/- for Senior Citizens)." />
                                <FeatureBenefit text="Standing Instructions facility for auto-debit from Savings Account." />
                            </ul>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-light text-gray-800 mb-6 pb-2 border-b border-gray-200">Documents Required</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DocCard
                                    title="Existing Customers"
                                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                                    items={['Application Form only (if KYC is updated)']}
                                    theme="blue"
                                />
                                <DocCard
                                    title="New Customers"
                                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>}
                                    items={['Photo ID Proof (Aadhar/PAN/Voter ID)', 'Address Proof (Aadhar/Utilities Bill)', 'Latest Passport Size Photos (2)']}
                                    theme="green"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/4 space-y-6">
                        <div className="bg-[#0056b3] text-white overflow-hidden rounded shadow-sm">
                            <a href="/interest-rates" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition text-sm font-medium">Monthly Savings Scheme</a>
                        </div>
                        <div className="bg-gray-100 border border-gray-200 rounded overflow-hidden">
                            <div className="bg-[#0056b3] text-white px-4 py-2 text-sm font-bold">Maturity Calculator</div>
                            <a href="#" className="block p-4 text-sm text-gray-700 hover:text-[#003399] hover:bg-gray-50 transition">Check Maturity Value</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
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

export default RecurringDeposits;
