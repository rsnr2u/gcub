import SEO from '../components/SEO';
import SchemaOrg, { createFinancialProductSchema, createBreadcrumbSchema } from '../components/SchemaOrg';

const SavingsAccount = () => {
    return (
        <div className="savings-account-page">
            {/* SEO Meta Tags */}
            <SEO
                title="Savings Account - GCUB | Secure Banking with Attractive Interest Rates"
                description="Open a Savings Account with GCUB. Enjoy 3% p.a. interest, RuPay debit card, passbook facility, and standing instructions. Minimum deposit Rs. 500. Safe and convenient banking since 1947."
                keywords="GCUB Savings Account, Bank Account Guntur, Savings Account Interest Rate, RuPay Debit Card, Passbook Facility"
                url="/savings-account"
            />

            {/* Schema.org Structured Data */}
            <SchemaOrg schema={createFinancialProductSchema({
                name: 'Savings Account',
                description: 'Secure your future with our Savings Account offering attractive interest rates and comprehensive banking benefits.',
                slug: 'savings-account',
                category: 'Deposits',
                features: 'Attractive Interest Rates, RuPay Debit Card, Passbook Facility, Nomination Available, Standing Instructions'
            })} />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Deposits', url: '/' },
                { name: 'Savings Account', url: '/savings-account' }
            ])} />

            <main className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <h1 className="text-3xl font-light text-gray-700 mb-6">Savings Accounts</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Main Content */}
                    <div className="w-full lg:w-3/4">
                        {/* Banner Image */}
                        <div className="mb-6 rounded-lg overflow-hidden shadow-sm">
                            <img src="/assets/images/savings_account/banner.png" alt="Savings Account Banner" className="w-full h-auto object-cover" />
                        </div>

                        {/* Intro Text */}
                        <div className="mb-8 text-sm text-gray-600 leading-relaxed text-justify">
                            <p className="mb-4">
                                Secure your future with our Savings Account. Whether you are saving for a rainy day, your
                                child's education, or your dream home, our Savings Account offers you a safe and convenient way
                                to grow your money. Enjoy attractive interest rates and a host of other benefits designed to
                                make banking easy and rewarding for you.
                            </p>
                        </div>

                        {/* Features and Benefits */}
                        <div className="mb-10">
                            <h2 className="text-xl font-light text-gray-700 mb-4 border-b pb-2">Features and Benefits</h2>
                            <ul className="space-y-4">
                                <FeatureItem text="Attractive Interest Rates calculated on daily balance." />
                                <FeatureItem text="Rupay Debit Card facility for cash withdrawals and shopping." />
                                <FeatureItem text="Passbook facility to track all your transactions." />
                                <FeatureItem text="Nomination facility available." />
                                <FeatureItem text="Standing Instructions facility for utility bill payments." />
                            </ul>
                        </div>

                        {/* Documents Required */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-light text-gray-800 mb-6 pb-2 border-b border-gray-200">Documents Required</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Individuals */}
                                <DocCard title="Individuals" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} iconColor="text-blue-600" bgColor="bg-blue-50" items={['Latest Passport Size Photos (2)', 'Photo ID Proof (Aadhar/PAN/Voter ID)', 'Address Proof (Aadhar/Utilities Bill)', 'PAN Card']} markerColor="marker:text-blue-500" />
                                {/* Initial Deposit */}
                                <DocCard title="Initial Deposit" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} iconColor="text-green-600" bgColor="bg-green-50" items={['Minimum Amount for Cheque Book: Rs. 1000', 'Minimum Amount w/o Cheque Book: Rs. 500']} markerColor="marker:text-green-500" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="w-full lg:w-1/4 space-y-6">
                        {/* Nav Links */}
                        <div className="bg-[#0056b3] text-white overflow-hidden rounded shadow-sm">
                            <a href="#" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition sidebar-link text-sm font-medium">Student Savings Account</a>
                            <a href="#" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition sidebar-link text-sm font-medium">Senior Citizen Savings</a>
                        </div>

                        {/* Interest Rate */}
                        <div className="bg-gray-100 border border-gray-200 rounded overflow-hidden">
                            <div className="bg-[#0056b3] text-white px-4 py-2 text-sm font-bold">Interest Rate</div>
                            <div className="p-4 text-sm text-gray-700">3.00% p.a.</div>
                        </div>

                        {/* Ad Banner */}
                        <div className="rounded-lg overflow-hidden shadow-md group">
                            <div className="bg-yellow-500 text-white text-center py-2 font-bold text-sm">Recurring Deposit Scheme</div>
                            <div className="relative overflow-hidden">
                                <img src="/assets/images/current_account/rd_ad.png" alt="Recurring Deposit" className="w-full h-auto transform group-hover:scale-105 transition duration-500" />
                                <div className="bg-yellow-500 text-white text-center py-2 text-xs font-bold cursor-pointer hover:bg-yellow-600 transition">Know More</div>
                            </div>
                        </div>

                        {/* Special Offers */}
                        <div className="bg-white border rounded p-4 shadow-sm">
                            <h3 className="bg-yellow-500 text-white text-center py-1 font-bold text-sm mb-4 -mx-4 -mt-4 rounded-t">Special Offers</h3>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <div className="font-bold text-gray-800">Gold Loans</div>
                                    <div className="text-xs text-gray-600">Lower ROI of 12.50%</div>
                                </div>
                                <hr />
                                <div>
                                    <div className="font-bold text-gray-800">Higher Interest Rates</div>
                                    <div className="text-xs text-gray-600">Higher interest rates on Fixed Deposit.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const FeatureItem = ({ text }) => (
    <li className="bg-gray-50 p-4 border-l-4 border-[#003399] shadow-sm text-sm text-gray-700 flex justify-between items-center group cursor-pointer hover:bg-white transition">
        <span>{text}</span>
        <span className="text-[#003399] group-hover:translate-x-1 transition-transform">▶</span>
    </li>
);

const DocCard = ({ title, icon, iconColor, bgColor, items, markerColor }) => (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center ${iconColor}`}>
                {icon}
            </div>
            <h3 className="font-bold text-gray-800">{title}</h3>
        </div>
        <ul className={`text-sm text-gray-600 space-y-2 list-disc list-inside ${markerColor}`}>
            {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
    </div>
);

export default SavingsAccount;
