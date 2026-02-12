const Overdraft = () => {
    return (
        <div className="overdraft-page">
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-light text-gray-700 mb-6 font-outfit">Overdraft Facility</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-3/4">
                        <div className="mb-6 rounded-lg overflow-hidden shadow-sm h-72 relative">
                            <img src="/assets/images/overdraft/banner.png" alt="Overdraft Banner" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                <div className="p-6 text-white text-left">
                                    <h2 className="text-3xl font-bold mb-2">Manage Cash Flows</h2>
                                    <p>Flexible credit line against your deposits or property to meet short-term needs.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8 text-sm text-gray-600 leading-relaxed text-justify">
                            <p className="mb-4">
                                Our Overdraft facility offers you the flexibility to meet your working capital requirements and other short-term financial needs. You can avail an overdraft against your Fixed Deposits, LIC Policies, or immovable property. Pay interest only on the amount utilized.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-light text-gray-700 mb-4 border-b pb-2">Features and Benefits</h2>
                            <ul className="space-y-4">
                                <FeatureBenefit text="High Loan to Value ratio." />
                                <FeatureBenefit text="Interest charged only on the daily drawn balance." />
                                <FeatureBenefit text="Easy renewal process." />
                            </ul>
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

export default Overdraft;
