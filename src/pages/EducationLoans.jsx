const EducationLoans = () => {
    return (
        <div className="education-loans-page">
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-light text-gray-700 mb-6 font-outfit">Education Loans</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-3/4">
                        <div className="mb-6 rounded-lg overflow-hidden shadow-sm h-72 relative">
                            <img src="/assets/images/education_loan/banner.png" alt="Education Loan Banner" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                <div className="p-6 text-white text-left">
                                    <h2 className="text-3xl font-bold mb-2">Fuel Your Ambitions</h2>
                                    <p>Comprehensive education loans for studies in India and abroad.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8 text-sm text-gray-600 leading-relaxed text-justify">
                            <p className="mb-4">
                                We believe that financial constraints should not hinder your pursuit of higher education. Our Education Loan scheme is designed to cover tuition fees, hostel charges, purchase of books and equipment, and travel expenses for studies abroad.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-light text-gray-700 mb-4 border-b pb-2">Features and Benefits</h2>
                            <ul className="space-y-4">
                                <FeatureBenefit text="Courses covered: Graduate, Post-Graduate, Professional courses." />
                                <FeatureBenefit text="Moratorium period available." />
                                <FeatureBenefit text="Tax benefit under Section 80E of IT Act." />
                            </ul>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-light text-gray-800 mb-6 pb-2 border-b border-gray-200">Documents Required</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DocCard
                                    title="Academic & KYC"
                                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                                    items={['Admission Letter / Cost of study details', 'Academic Records (Marksheets)', 'KYC of Student and Guardian/Co-borrower', 'Income Proof of Guardian/Co-borrower']}
                                    theme="blue"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/4 space-y-6">
                        <div className="bg-[#0056b3] text-white overflow-hidden rounded shadow-sm">
                            <a href="/interest-rates" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition text-sm font-medium">Interest Rates</a>
                        </div>
                        {/* CTA Card */}
                        <div className="bg-[#003399] text-white p-8 rounded-xl shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                            <h3 className="text-2xl font-bold mb-4 relative z-10">Start Your Journey</h3>
                            <p className="text-blue-100 mb-8 relative z-10 font-light">Open an account today and experience banking services tailored for your lifestyle.</p>
                            <a href="/contact" className="w-full bg-white text-[#003399] flex items-center justify-center font-bold py-4 rounded-xl hover:bg-blue-50 transition shadow-lg relative z-10 uppercase tracking-widest text-sm">Apply Now</a>
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

export default EducationLoans;
