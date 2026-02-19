import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import SchemaOrg, { organizationSchema, createBreadcrumbSchema } from '../components/SchemaOrg';
import { apiFetch } from '../utils/api';


const Ombudsman = () => {
    const [ombudsmanList, setOmbudsmanList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOmbudsman();
    }, []);

    const fetchOmbudsman = async () => {
        try {
            const response = await apiFetch('/ombudsman');
            const data = await response.json();
            setOmbudsmanList(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching Ombudsman data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ombudsman-page">
            {/* SEO Meta Tags */}
            <SEO
                title="Banking Ombudsman - GCUB | Grievance Redressal"
                description="Learn about the Banking Ombudsman Scheme and how to file complaints for banking service deficiencies. GCUB is committed to resolving customer grievances."
                keywords="Banking Ombudsman, Grievance Redressal, Customer Complaints, RBI Ombudsman, Banking Disputes"
                url="/ombudsman"
            />

            {/* Schema.org Structured Data */}
            <SchemaOrg schema={organizationSchema} />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Disclosures', url: '#' },
                { name: 'Ombudsman', url: '/ombudsman' }
            ])} />

            {/* Hero Section */}
            <section className="relative bg-[#002b5c] text-white py-16">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Banking Ombudsman</h1>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">
                        Grievance Redressal Mechanism for Banking Services
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8">

                        {/* Introduction */}
                        <div className="bg-blue-50 border-l-4 border-[#003399] p-6 rounded-r-lg">
                            <h2 className="text-xl font-bold text-[#003399] mb-3 flex items-center gap-2">
                                <i className="fas fa-gavel"></i>
                                What is Banking Ombudsman?
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                The Banking Ombudsman Scheme is a grievance redressal mechanism established by the Reserve Bank of India (RBI)
                                to resolve complaints of customers against banks for deficiency in banking services.
                            </p>
                        </div>

                        {/* When to Approach */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">When Can You Approach the Ombudsman?</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                You can file a complaint with the Banking Ombudsman if:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li>Your complaint is not resolved by the bank within 30 days</li>
                                <li>You are not satisfied with the bank's response</li>
                                <li>The bank has not responded to your complaint</li>
                                <li>The complaint relates to deficiency in banking service</li>
                            </ul>
                        </div>

                        {/* Grounds for Complaint */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">Grounds for Filing a Complaint</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                        <i className="fas fa-credit-card text-[#E61111]"></i>
                                        Deposits & Accounts
                                    </h3>
                                    <p className="text-sm text-gray-600">Non-payment or delay in payment of deposits, loans, or other amounts</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                        <i className="fas fa-exchange-alt text-[#E61111]"></i>
                                        Transactions
                                    </h3>
                                    <p className="text-sm text-gray-600">Delays in collection of cheques, bills, remittances, or payment services</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                        <i className="fas fa-mobile-alt text-[#E61111]"></i>
                                        Digital Banking
                                    </h3>
                                    <p className="text-sm text-gray-600">Issues with internet banking, mobile banking, ATM/debit cards</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                        <i className="fas fa-hand-holding-usd text-[#E61111]"></i>
                                        Loans & Advances
                                    </h3>
                                    <p className="text-sm text-gray-600">Non-observance of RBI guidelines on loans and advances</p>
                                </div>
                            </div>
                        </div>

                        {/* How to File */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">How to File a Complaint</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#003399] text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-1">Contact the Bank First</h3>
                                        <p className="text-gray-700 text-sm">File a complaint with GCUB's customer service and wait for 30 days for resolution.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#003399] text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-1">Approach the Ombudsman</h3>
                                        <p className="text-gray-700 text-sm">If not satisfied, file a complaint with the Banking Ombudsman within one year of the bank's reply.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#003399] text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-1">Submit Required Documents</h3>
                                        <p className="text-gray-700 text-sm">Provide complaint details, bank's response, and supporting documents.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ombudsman Contact Details */}
                        {loading ? (
                            <div className="text-center py-8">
                                <i className="fas fa-spinner fa-spin text-3xl text-[#003399]"></i>
                            </div>
                        ) : ombudsmanList.length > 0 ? (
                            <div>
                                <h2 className="text-2xl font-bold text-[#003399] mb-4">Contact Details</h2>
                                <div className="space-y-4">
                                    {ombudsmanList.map((ombudsman, index) => (
                                        <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                                            <h3 className="text-lg font-bold text-gray-800 mb-3">{ombudsman.office_name || 'Banking Ombudsman Office'}</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                {ombudsman.address && (
                                                    <div className="flex items-start gap-3">
                                                        <i className="fas fa-map-marker-alt text-[#E61111] mt-1"></i>
                                                        <div>
                                                            <p className="font-bold text-gray-700">Address:</p>
                                                            <p className="text-gray-600">{ombudsman.address}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {ombudsman.phone && (
                                                    <div className="flex items-start gap-3">
                                                        <i className="fas fa-phone text-[#E61111] mt-1"></i>
                                                        <div>
                                                            <p className="font-bold text-gray-700">Phone:</p>
                                                            <p className="text-gray-600">{ombudsman.phone}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {ombudsman.email && (
                                                    <div className="flex items-start gap-3">
                                                        <i className="fas fa-envelope text-[#E61111] mt-1"></i>
                                                        <div>
                                                            <p className="font-bold text-gray-700">Email:</p>
                                                            <p className="text-gray-600">{ombudsman.email}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {ombudsman.jurisdiction && (
                                                    <div className="flex items-start gap-3">
                                                        <i className="fas fa-globe text-[#E61111] mt-1"></i>
                                                        <div>
                                                            <p className="font-bold text-gray-700">Jurisdiction:</p>
                                                            <p className="text-gray-600">{ombudsman.jurisdiction}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-3">Banking Ombudsman - Hyderabad</h3>
                                <p className="text-gray-700 mb-4">
                                    For Andhra Pradesh and Telangana region, please contact the Banking Ombudsman office in Hyderabad.
                                </p>
                                <div className="text-sm text-gray-600">
                                    <p>For complete contact details, visit: <a href="https://cms.rbi.org.in" target="_blank" rel="noopener noreferrer" className="text-[#003399] hover:underline">RBI Banking Ombudsman Portal</a></p>
                                </div>
                            </div>
                        )}

                        {/* Important Notes */}
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                            <h3 className="text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
                                <i className="fas fa-exclamation-triangle"></i>
                                Important Notes
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-amber-900 text-sm ml-4">
                                <li>The complaint should be filed within one year from the date of bank's reply</li>
                                <li>Complaints involving amounts exceeding ₹20 lakhs are not covered</li>
                                <li>The Ombudsman's decision is binding on the bank if accepted by the complainant</li>
                                <li>No fee is charged for filing a complaint with the Ombudsman</li>
                            </ul>
                        </div>

                        {/* Additional Resources */}
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Additional Resources</h3>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="https://cms.rbi.org.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#003399] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-800 transition"
                                >
                                    <i className="fas fa-external-link-alt"></i>
                                    RBI Ombudsman Portal
                                </a>
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-2 bg-white text-[#003399] border-2 border-[#003399] px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-50 transition"
                                >
                                    <i className="fas fa-phone-alt"></i>
                                    Contact GCUB
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Ombudsman;
