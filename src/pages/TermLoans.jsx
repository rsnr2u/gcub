const TermLoans = () => {
    return (
        <div className="term-loans-page">
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-light text-gray-700 mb-6 font-outfit">Term Loans</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-3/4">
                        <div className="mb-6 rounded-lg overflow-hidden shadow-sm h-72 relative">
                            <img src="assets/images/term_loan/banner.png" alt="Term Loan Banner" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                <div className="p-6 text-white text-left">
                                    <h2 className="text-3xl font-bold mb-2">Grow Your Business</h2>
                                    <p>Flexible term loans for business expansion, machinery purchase, and more.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8 text-sm text-gray-600 leading-relaxed text-justify">
                            <p className="mb-4">
                                We offer Term Loans to meet the long-term capital requirements of your business. Whether you are setting up a new unit, expanding an existing one, or purchasing machinery, our Term Loans are designed to support your growth.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-light text-gray-700 mb-4 border-b pb-2">Features and Benefits</h2>
                            <ul className="space-y-4">
                                <FeatureBenefit text="Flexible repayment tenure tailored to your cash flow." />
                                <FeatureBenefit text="Competitive Interest Rates." />
                            </ul>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-light text-gray-800 mb-6 pb-2 border-b border-gray-200">Documents Required</h2>
                            <p className="text-sm text-gray-600 mb-4">Please contact the branch manager for a detailed list of documents required based on your specific proposal.</p>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/4 space-y-6">
                        <div className="bg-[#0056b3] text-white overflow-hidden rounded shadow-sm">
                            <a href="/interest-rates" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition text-sm font-medium">Interest Rates</a>
                        </div>
                        <div className="bg-gray-100 border border-gray-200 rounded overflow-hidden">
                            <div className="bg-[#0056b3] text-white px-4 py-2 text-sm font-bold">Contact Us</div>
                            <div className="p-4 text-sm text-gray-700">
                                <p className="mb-2">Visit your nearest branch for more details.</p>
                                <a href="/branch-locator" className="text-[#003399] font-medium hover:underline">Branch Locator</a>
                            </div>
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

export default TermLoans;
