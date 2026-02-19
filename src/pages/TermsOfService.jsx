import SEO from '../components/SEO';
import SchemaOrg, { organizationSchema, createBreadcrumbSchema } from '../components/SchemaOrg';

const TermsOfService = () => {
    return (
        <div className="terms-of-service-page">
            {/* SEO Meta Tags */}
            <SEO
                title="Terms of Service - GCUB | Banking Terms & Conditions"
                description="Read GCUB's Terms of Service to understand the terms and conditions governing the use of our banking services and website."
                keywords="GCUB Terms of Service, Banking Terms, Terms and Conditions, Service Agreement, User Agreement"
                url="/terms-of-service"
            />

            {/* Schema.org Structured Data */}
            <SchemaOrg schema={organizationSchema} />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Terms of Service', url: '/terms-of-service' }
            ])} />

            {/* Hero Section */}
            <section className="relative bg-[#002b5c] text-white py-16">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Terms of Service</h1>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">
                        Please read these terms carefully before using our services
                    </p>
                    <p className="text-sm text-gray-300 mt-4">Last Updated: February 10, 2026</p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8">

                        {/* Acceptance of Terms */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-700 leading-relaxed">
                                By accessing or using the services provided by The Guntur Co-Operative Urban Bank Limited ("GCUB", "we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                            </p>
                        </div>

                        {/* Eligibility */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">2. Eligibility</h2>
                            <p className="text-gray-700 leading-relaxed mb-2">To use our banking services, you must:</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li>Be at least 18 years of age (or the age of majority in your jurisdiction)</li>
                                <li>Have the legal capacity to enter into a binding agreement</li>
                                <li>Provide accurate and complete information during account opening</li>
                                <li>Comply with all applicable laws and regulations</li>
                            </ul>
                        </div>

                        {/* Account Terms */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">3. Account Terms</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">3.1 Account Opening</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        You must provide valid identification documents and complete KYC (Know Your Customer) requirements as mandated by the Reserve Bank of India (RBI) and other regulatory authorities.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">3.2 Account Security</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        You are responsible for maintaining the confidentiality of your account credentials, passwords, and PINs. You must notify us immediately of any unauthorized access or security breach.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">3.3 Account Closure</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        We reserve the right to suspend or terminate your account if you violate these terms, engage in fraudulent activity, or fail to comply with regulatory requirements.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Services */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">4. Banking Services</h2>
                            <p className="text-gray-700 leading-relaxed mb-2">GCUB offers various banking services including but not limited to:</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li>Savings and current accounts</li>
                                <li>Fixed and recurring deposits</li>
                                <li>Loans (gold, housing, education, etc.)</li>
                                <li>Net banking and mobile banking</li>
                                <li>Payment services (NEFT, RTGS, IMPS, UPI)</li>
                                <li>Debit cards and safe lockers</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                Each service is subject to specific terms and conditions, which will be provided to you at the time of service activation.
                            </p>
                        </div>

                        {/* Fees and Charges */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">5. Fees and Charges</h2>
                            <p className="text-gray-700 leading-relaxed">
                                You agree to pay all applicable fees and charges as outlined in our Service Charges schedule. We reserve the right to modify fees with prior notice. Interest rates on deposits and loans are subject to change based on RBI guidelines and market conditions.
                            </p>
                        </div>

                        {/* Transactions */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">6. Transactions</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">6.1 Transaction Limits</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Daily transaction limits apply to various services as per RBI regulations and our internal policies.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">6.2 Transaction Disputes</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        You must report any disputed or unauthorized transactions within 30 days of the transaction date. We will investigate and resolve disputes in accordance with banking regulations.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">6.3 Reversals and Refunds</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Transaction reversals and refunds are subject to verification and may take 7-10 working days to process.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Prohibited Activities */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">7. Prohibited Activities</h2>
                            <p className="text-gray-700 leading-relaxed mb-2">You agree not to:</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li>Use our services for any illegal or fraudulent purposes</li>
                                <li>Engage in money laundering or terrorist financing</li>
                                <li>Provide false or misleading information</li>
                                <li>Attempt to gain unauthorized access to our systems</li>
                                <li>Violate any applicable laws or regulations</li>
                                <li>Transfer your account to another person without authorization</li>
                            </ul>
                        </div>

                        {/* Liability */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">8. Limitation of Liability</h2>
                            <p className="text-gray-700 leading-relaxed">
                                GCUB shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our liability is limited to the extent permitted by law. We are not responsible for losses caused by circumstances beyond our control, including but not limited to system failures, network issues, or force majeure events.
                            </p>
                        </div>

                        {/* Privacy */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">9. Privacy</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
                            </p>
                        </div>

                        {/* Intellectual Property */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">10. Intellectual Property</h2>
                            <p className="text-gray-700 leading-relaxed">
                                All content on our website, including logos, trademarks, text, graphics, and software, is the property of GCUB and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
                            </p>
                        </div>

                        {/* Modifications */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">11. Modifications to Terms</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We reserve the right to modify these Terms of Service at any time. Changes will be effective upon posting on our website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.
                            </p>
                        </div>

                        {/* Governing Law */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">12. Governing Law</h2>
                            <p className="text-gray-700 leading-relaxed">
                                These Terms of Service are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Guntur, Andhra Pradesh.
                            </p>
                        </div>

                        {/* Grievance Redressal */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">13. Grievance Redressal</h2>
                            <p className="text-gray-700 leading-relaxed">
                                For any complaints or grievances, you may contact our customer service or escalate to the Banking Ombudsman as per RBI guidelines.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="bg-blue-50 border-l-4 border-[#003399] p-6 rounded-r-lg">
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">Contact Us</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have any questions about these Terms of Service, please contact us:
                            </p>
                            <div className="space-y-2 text-gray-700">
                                <p><strong>The Guntur Co-Operative Urban Bank Limited</strong></p>
                                <p>D.No: 3/2, Brodipet, Guntur – 522002, Andhra Pradesh</p>
                                <p>Email: gcubhelpdesk@guntururbanbank.org</p>
                                <p>Toll Free: 1800 425 8873</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsOfService;
