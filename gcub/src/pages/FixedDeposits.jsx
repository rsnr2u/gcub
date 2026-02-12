import SEO from '../components/SEO';
import SchemaOrg, { createFinancialProductSchema, createBreadcrumbSchema } from '../components/SchemaOrg';

const FixedDeposits = () => {
    return (
        <div className="fixed-deposits-page">
            {/* SEO Meta Tags */}
            <SEO
                title="Fixed Deposits - GCUB | High Interest Rates up to 7% p.a."
                description="Invest in GCUB Fixed Deposits with interest rates up to 7% p.a. Flexible tenure from 7 days to 10 years. 0.50% extra for senior citizens. Loan against deposit available."
                keywords="GCUB Fixed Deposit, FD Interest Rates, Senior Citizen FD, Fixed Deposit Guntur, High Interest FD"
                url="/fixed-deposits"
            />

            {/* Schema.org Structured Data */}
            <SchemaOrg schema={createFinancialProductSchema({
                name: 'Fixed Deposits',
                description: 'Secure your savings with high returns up to 7% p.a. and flexible tenure options from 7 days to 10 years.',
                slug: 'fixed-deposits',
                category: 'Deposits',
                features: 'High Interest up to 7%, Flexible Tenure, 0.50% Extra for Senior Citizens, Loan Against Deposit, Premature Withdrawal'
            })} />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Deposits', url: '/' },
                { name: 'Fixed Deposits', url: '/fixed-deposits' }
            ])} />

            <main className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <h1 className="text-3xl font-light text-gray-700 mb-6">Fixed Deposits</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Main Content */}
                    <div className="w-full lg:w-3/4">
                        {/* Banner Image */}
                        <div className="mb-6 rounded-lg overflow-hidden shadow-sm">
                            <img src="/assets/images/fixed_deposit/banner.png" alt="Fixed Deposit Banner" className="w-full h-auto object-cover" />
                        </div>

                        {/* Intro Text */}
                        <div className="mb-8 text-sm text-gray-600 leading-relaxed text-justify">
                            <p className="mb-4">
                                Grow your wealth with certainty. Our Fixed Deposit schemes offer you guaranteed returns and
                                complete peace of mind. With flexible tenures ranging from 7 days to 10 years, you can choose a
                                plan that best fits your financial goals.
                            </p>
                        </div>

                        {/* Features and Benefits */}
                        <div className="mb-10">
                            <h2 className="text-xl font-light text-gray-700 mb-4 border-b pb-2">Features and Benefits</h2>
                            <ul className="space-y-2">
                                <FeatureListItem text="High Interest Rates upto 7.00% p.a.*" />
                                <FeatureListItem text="Flexible Tenure options from 7 days to 10 years." />
                                <FeatureListItem text="0.50% Extra Interest for Senior Citizens." />
                                <FeatureListItem text="Loan against Deposit facility available (up to 90% of deposit value)." />
                                <FeatureListItem text="Premature withdrawal facility available (subject to penalty)." />
                                <FeatureListItem text="Nomination facility available." />
                            </ul>
                        </div>

                        {/* Documents Required */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-light text-gray-800 mb-6 pb-2 border-b border-gray-200">Documents Required</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        </div>
                                        <h3 className="font-bold text-gray-800">For New Customers</h3>
                                    </div>
                                    <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside marker:text-blue-500">
                                        <li>Photo ID Proof (Aadhar/PAN/Voter ID)</li>
                                        <li>Address Proof (Aadhar/Utilities Bill)</li>
                                        <li>latest Passport Size Photos (2)</li>
                                        <li>PAN Card Copy</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="w-full lg:w-1/4 space-y-6">
                        <div className="bg-[#0056b3] text-white overflow-hidden rounded shadow-sm">
                            <a href="#" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition sidebar-link text-sm font-medium">Reinvestment Deposit</a>
                            <a href="#" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition sidebar-link text-sm font-medium">Tax Saver FD</a>
                        </div>

                        <div className="bg-gray-100 border border-gray-200 rounded overflow-hidden">
                            <div className="bg-[#0056b3] text-white px-4 py-2 text-sm font-bold">Interest Calculator</div>
                            <a href="#" className="block p-4 text-sm text-gray-700 hover:text-[#003399] hover:bg-gray-50 transition">Calculate Returns</a>
                        </div>

                        <div className="rounded-lg overflow-hidden shadow-md group">
                            <div className="bg-yellow-500 text-white text-center py-2 font-bold text-sm">Recurring Deposit Scheme</div>
                            <div className="relative overflow-hidden">
                                <img src="/assets/images/current_account/rd_ad.png" alt="Recurring Deposit" className="w-full h-auto transform group-hover:scale-105 transition duration-500" />
                                <div className="bg-yellow-500 text-white text-center py-2 text-xs font-bold cursor-pointer hover:bg-yellow-600 transition">Know More</div>
                            </div>
                        </div>

                        <div className="bg-white border rounded p-4 shadow-sm">
                            <h3 className="bg-yellow-500 text-white text-center py-1 font-bold text-sm mb-4 -mx-4 -mt-4 rounded-t">Special Offers</h3>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <div className="font-bold text-gray-800">Gold Loans</div>
                                    <div className="text-xs text-gray-600">Lower ROI of 12.50%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const FeatureListItem = ({ text }) => (
    <li className="bg-gray-50 p-4 border-l-4 border-[#003399] shadow-sm text-sm text-gray-700 flex justify-between items-center group cursor-pointer hover:bg-white transition">
        <span>{text}</span>
        <span className="text-[#003399] group-hover:translate-x-1 transition-transform">▶</span>
    </li>
);

export default FixedDeposits;
