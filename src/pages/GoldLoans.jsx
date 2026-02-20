import SEO from '../components/SEO';
import SchemaOrg, { createFinancialProductSchema, createBreadcrumbSchema } from '../components/SchemaOrg';

const GoldLoans = () => {
    return (
        <div className="gold-loans-page">
            {/* SEO Meta Tags */}
            <SEO
                title="Gold Loans - GCUB | Instant Cash Against Gold at 12.50% p.a."
                description="Get instant gold loans from GCUB starting at 12.50% p.a. High loan value per gram, simple documentation, complete safety of ornaments. Quick processing and disbursement."
                keywords="GCUB Gold Loan, Gold Loan Guntur, Instant Gold Loan, Low Interest Gold Loan, Gold Loan 12.50%"
                url="/gold-loans"
            />

            {/* Schema.org Structured Data */}
            <SchemaOrg schema={createFinancialProductSchema({
                name: 'Gold Loans',
                description: 'Instant cash against gold with high loan value per gram and low interest rates starting from 12.50% p.a.',
                slug: 'gold-loans',
                category: 'Loans',
                features: 'Instant Sanction, High Loan Value, Low Interest 12.50% p.a., Simple Documentation, Complete Safety'
            })} />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Loans', url: '/' },
                { name: 'Gold Loans', url: '/gold-loans' }
            ])} />

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-light text-gray-700 mb-6">Gold Loans</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-3/4">
                        <div className="mb-6 rounded-lg overflow-hidden shadow-sm h-72 relative">
                            <img src="/assets/images/gold_loan/banner.png" alt="Gold Loan Banner" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                <div className="p-6 text-white">
                                    <h2 className="text-3xl font-bold mb-2">Instant Cash against Gold</h2>
                                    <p>Unlock the value of your gold ornaments to meet your financial needs.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8 text-sm text-gray-600 leading-relaxed text-justify">
                            <p className="mb-4">
                                Our Gold Loan is the easiest way to get instant finance. Use your gold ornaments to get a loan
                                for any purpose - be it education, marriage, medical emergency or business expansion. We offer
                                high per gram rate and low interest rates with quick processing.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-light text-gray-700 mb-4 border-b pb-2">Features and Benefits</h2>
                            <ul className="space-y-4">
                                <FeatureListItem text="Instant Loan Sanction and Disbursement." />
                                <FeatureListItem text="High Loan Value per gram." />
                                <FeatureListItem text="Low Interest Rates starting from 12.50% p.a." />
                                <FeatureListItem text="Simple Documentation." />
                                <FeatureListItem text="Complete Safety of your Ornaments." />
                            </ul>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-light text-gray-800 mb-6 pb-2 border-b border-gray-200">Documents Required</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        </div>
                                        <h3 className="font-bold text-gray-800">KYC Documents</h3>
                                    </div>
                                    <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside marker:text-blue-500">
                                        <li>Photo ID Proof (Aadhar/PAN/Voter ID)</li>
                                        <li>Address Proof (Aadhar/Utilities Bill)</li>
                                        <li>Passport Size Photos (2)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/4 space-y-6">
                        <div className="bg-[#0056b3] text-white overflow-hidden rounded shadow-sm">
                            <a href="#" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition sidebar-link text-sm font-medium">Interest Rates</a>
                            <a href="#" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition sidebar-link text-sm font-medium">EMI Calculator</a>
                        </div>

                        <div className="bg-gray-100 border border-gray-200 rounded overflow-hidden">
                            <div className="bg-[#0056b3] text-white px-4 py-2 text-sm font-bold">Contact Us</div>
                            <div className="p-4 text-sm text-gray-700">
                                <p className="mb-2">Visit your nearest branch for more details.</p>
                                <a href="/branch-locator" className="text-[#003399] font-medium hover:underline">Branch Locator</a>
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
                                <div>
                                    <div className="font-bold text-gray-800">Housing Loans</div>
                                    <div className="text-xs text-gray-600">Zero Processing Fees.</div>
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

export default GoldLoans;
