const CurrentAccount = () => {
    return (
        <div className="current-account-page">
            <main className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <h1 className="text-3xl font-light text-gray-700 mb-6">Current Accounts</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Main Content */}
                    <div className="w-full lg:w-3/4">
                        {/* Banner Image */}
                        <div className="mb-6 rounded-lg overflow-hidden shadow-sm">
                            <img src="/assets/images/current_account/banner.png" alt="Current Account Banner" className="w-full h-auto object-cover" />
                        </div>

                        {/* Intro Text */}
                        <div className="mb-8 text-sm text-gray-600 leading-relaxed text-justify">
                            <p className="mb-4">
                                This Account is being offered at nominal minimum balance to meet the business needs of traders,
                                manufacturers, businessmen, corporates, etc. with a requirement to operate the account
                                frequently due to large number of daily business transactions. Experience the convenience of
                                7-day-a-week daily banking and other value added services delivered to you with personal touch
                                and speedy service.
                            </p>
                        </div>

                        {/* Features and Benefits */}
                        <div className="mb-10">
                            <h2 className="text-xl font-light text-gray-700 mb-4 border-b pb-2">Features and Benefits</h2>
                            <ul className="space-y-4">
                                <FeatureItem text="Cheque Book facility." />
                                <FeatureItem text="Rupay Debit Card - Any Bank ATM access Only for Individual accounts / Proprietary Concerns (Daily Withdrawal limit of Rs 40,000 and Daily POS limit of Rs 1,00,000)" />
                                <FeatureItem text="Free SMS Banking Alerts." />
                                <FeatureItem text="7 day week banking – Sunday Banking (Except on holidays declared under N.I. Act)" />
                                <FeatureItem text="Electronic Funds Transfer facility through RTGS, NEFT & IMPS. (View RTGS, NEFT & IMPS details)" />
                                <FeatureItem text="Anywhere banking facility (any branch of Urban Bank)" />
                                <FeatureItem text="Statement of Account through email for easy and convenient access and reconciliation." />
                            </ul>
                        </div>

                        {/* Documents Required */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-light text-gray-800 mb-6 pb-2 border-b border-gray-200">Documents Required</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DocCard title="Company" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} bgColor="bg-blue-50" iconColor="text-blue-600" items={['Photo ID & Address Proof', 'Certificate of Incorporation', 'Memorandum & Articles of Association', 'Board Resolution', 'Power of Attorney', 'GST Number']} />
                                <DocCard title="Partnership Firm" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} bgColor="bg-green-50" iconColor="text-green-600" items={['Photo ID & Address Proof', 'Registration Certificate', 'Partnership Deed', 'Power of Attorney', 'GST Registration']} />
                                <DocCard title="Trust" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>} bgColor="bg-purple-50" iconColor="text-purple-600" items={['Registration Certificate', 'Trust Deed', 'Power of Attorney', 'Photo ID & Address Proof']} />
                                <DocCard title="Association / Body" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} bgColor="bg-orange-50" iconColor="text-orange-600" items={['Resolution of Managing Body', 'Power of Attorney', 'Photo ID & Address Proof']} />
                                <ProprietaryCard />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="w-full lg:w-1/4 space-y-6">
                        <div className="bg-[#0056b3] text-white overflow-hidden rounded shadow-sm">
                            <a href="#" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition sidebar-link text-sm font-medium">Corporate Current Accounts</a>
                        </div>

                        <SidebarBox title="Minimum Balance Required" content="Rs 3000/- Only" />
                        <SidebarBox title="Service Charges" content={<a href="#" className="block p-4 text-sm text-gray-700 hover:text-[#003399] hover:bg-gray-50 transition">Schedule of service charges</a>} noPadding />

                        <div className="bg-gray-100 border border-gray-200 rounded overflow-hidden">
                            <div className="bg-[#0056b3] text-white px-4 py-2 text-sm font-bold">Related Downloads</div>
                            <ul className="divide-y divide-gray-200 text-sm">
                                {['Account Opening Form', 'Form 60', 'KYC Documents', "Partnership and company's account opening form", 'Rupay ATM Card Application Form'].map((link, idx) => (
                                    <li key={idx}><a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-200 transition">{link}</a></li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-lg overflow-hidden shadow-md group">
                            <div className="bg-yellow-500 text-white text-center py-2 font-bold text-sm">Recurring Deposit Scheme</div>
                            <div className="relative overflow-hidden">
                                <img src="/assets/images/current_account/rd_ad.png" alt="Recurring Deposit" className="w-full h-auto transform group-hover:scale-105 transition duration-500" />
                                <div className="bg-yellow-500 text-white text-center py-2 text-xs font-bold cursor-pointer hover:bg-yellow-600 transition">Know More</div>
                            </div>
                        </div>

                    </div>

                    {/* CTA Card */}
                    <div className="bg-[#003399] text-white p-8 rounded-xl shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                        <h3 className="text-2xl font-bold mb-4 relative z-10">Start Your Journey</h3>
                        <p className="text-blue-100 mb-8 relative z-10 font-light">Open an account today and experience banking services tailored for your lifestyle.</p>
                        <a href="/contact" className="w-full bg-white text-[#003399] flex items-center justify-center font-bold py-4 rounded-xl hover:bg-blue-50 transition shadow-lg relative z-10 uppercase tracking-widest text-sm">Apply Now</a>
                    </div>

                    <div className="bg-white border rounded p-4 shadow-sm">
                        <h3 className="bg-yellow-500 text-white text-center py-1 font-bold text-sm mb-4 -mx-4 -mt-4 rounded-t">Special Offers</h3>
                        <div className="space-y-4 text-sm">
                            <OfferItem title="Gold Loans" desc="Lower ROI of 12.50%" />
                            <hr />
                            <OfferItem title="Higher Interest Rates" desc="Higher interest rates on Fixed Deposit." />
                            <hr />
                            <OfferItem title="Platinum Cards" desc="Platinum cards at nominal charges." />
                        </div>
                    </div>
                </div>
        </div>
            </main >
        </div >
    );
};

const FeatureItem = ({ text }) => (
    <li className="bg-gray-50 p-4 border-l-4 border-[#003399] shadow-sm text-sm text-gray-700 flex justify-between items-center group cursor-pointer hover:bg-white transition">
        <span>{text}</span>
        <span className="text-[#003399] group-hover:translate-x-1 transition-transform">▶</span>
    </li>
);

const DocCard = ({ title, icon, bgColor, iconColor, items }) => (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center ${iconColor}`}>
                {icon}
            </div>
            <h3 className="font-bold text-gray-800">{title}</h3>
        </div>
        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside marker:text-blue-500">
            {items.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
    </div>
);

const ProprietaryCard = () => (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-6 md:col-span-2 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <h3 className="font-bold text-gray-800">Proprietary Concern</h3>
            <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase ml-auto">Any Two Required</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <div className="text-sm text-gray-600">
                <p className="mb-2 font-medium">Photo ID & Proof of Address plus:</p>
                <ul className="space-y-1 list-disc list-inside marker:text-red-500">
                    <li>Registration Certificate</li>
                    <li>Municipal Certificate (Shop Act)</li>
                    <li>Sales / Income Tax Returns</li>
                    <li>CST / VAT Certificate</li>
                </ul>
            </div>
            <div className="text-sm text-gray-600 mt-2 md:mt-7">
                <ul className="space-y-1 list-disc list-inside marker:text-red-500">
                    <li>Sales Tax / Prof. Tax Registration</li>
                    <li>Certificate by Professional Body</li>
                    <li>IT Returns in name of concern</li>
                </ul>
            </div>
        </div>
    </div>
);

const SidebarBox = ({ title, content, noPadding }) => (
    <div className="bg-gray-100 border border-gray-200 rounded overflow-hidden">
        <div className="bg-[#0056b3] text-white px-4 py-2 text-sm font-bold">{title}</div>
        <div className={noPadding ? '' : 'p-4 text-sm text-gray-700'}>{content}</div>
    </div>
);

const OfferItem = ({ title, desc }) => (
    <div>
        <div className="font-bold text-gray-800">{title}</div>
        <div className="text-xs text-gray-600">{desc}</div>
    </div>
);

export default CurrentAccount;
