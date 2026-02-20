import SEO from '../components/SEO';
import SchemaOrg, { organizationSchema, createBreadcrumbSchema } from '../components/SchemaOrg';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-page">
            {/* SEO Meta Tags */}
            <SEO
                title="Privacy Policy - GCUB | Data Protection & Privacy"
                description="Read GCUB's Privacy Policy to understand how we collect, use, and protect your personal information. Your privacy and data security are our top priorities."
                keywords="GCUB Privacy Policy, Data Protection, Privacy Rights, Information Security, Banking Privacy"
                url="/privacy-policy"
            />

            {/* Schema.org Structured Data */}
            <SchemaOrg schema={organizationSchema} />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Privacy Policy', url: '/privacy-policy' }
            ])} />

            {/* Hero Section */}
            <section className="relative bg-[#002b5c] text-white py-16">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Privacy Policy</h1>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">
                        Your privacy and data security are our top priorities
                    </p>
                    <p className="text-sm text-gray-300 mt-4">Last Updated: February 10, 2026</p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8">

                        {/* Introduction */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">Introduction</h2>
                            <p className="text-gray-700 leading-relaxed">
                                The Guntur Co-Operative Urban Bank Limited ("GCUB", "we", "us", or "our") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our banking services.
                            </p>
                        </div>

                        {/* Information We Collect */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">Information We Collect</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">Personal Information</h3>
                                    <p className="text-gray-700 leading-relaxed mb-2">We may collect the following personal information:</p>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Name, address, email address, and phone number</li>
                                        <li>Date of birth and government-issued identification numbers (Aadhaar, PAN)</li>
                                        <li>Financial information (account numbers, transaction history)</li>
                                        <li>Employment and income information</li>
                                        <li>Biometric data (for authentication purposes)</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">Automatically Collected Information</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>IP address and browser type</li>
                                        <li>Device information and operating system</li>
                                        <li>Pages visited and time spent on our website</li>
                                        <li>Cookies and similar tracking technologies</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* How We Use Your Information */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">How We Use Your Information</h2>
                            <p className="text-gray-700 leading-relaxed mb-2">We use your information for the following purposes:</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li>To provide and maintain banking services</li>
                                <li>To process transactions and manage your accounts</li>
                                <li>To verify your identity and prevent fraud</li>
                                <li>To comply with legal and regulatory requirements</li>
                                <li>To communicate with you about your accounts and services</li>
                                <li>To improve our website and services</li>
                                <li>To send promotional materials (with your consent)</li>
                            </ul>
                        </div>

                        {/* Information Sharing */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">Information Sharing and Disclosure</h2>
                            <p className="text-gray-700 leading-relaxed mb-2">We may share your information with:</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li><strong>Regulatory Authorities:</strong> Reserve Bank of India (RBI), DICGC, and other regulatory bodies</li>
                                <li><strong>Service Providers:</strong> Third-party vendors who assist in our operations</li>
                                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                                <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                We do not sell, rent, or trade your personal information to third parties for marketing purposes.
                            </p>
                        </div>

                        {/* Data Security */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">Data Security</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We implement industry-standard security measures to protect your information, including:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-2">
                                <li>SSL/TLS encryption for data transmission</li>
                                <li>Secure servers and firewalls</li>
                                <li>Regular security audits and assessments</li>
                                <li>Access controls and authentication mechanisms</li>
                                <li>Employee training on data protection</li>
                            </ul>
                        </div>

                        {/* Your Rights */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">Your Rights</h2>
                            <p className="text-gray-700 leading-relaxed mb-2">You have the right to:</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li>Access your personal information</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your data (subject to legal requirements)</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Lodge a complaint with regulatory authorities</li>
                            </ul>
                        </div>

                        {/* Cookies */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">Cookies and Tracking</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie preferences through your browser settings.
                            </p>
                        </div>

                        {/* Children's Privacy */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">Children's Privacy</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children without parental consent.
                            </p>
                        </div>

                        {/* Changes to Policy */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">Changes to This Policy</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="bg-blue-50 border-l-4 border-[#003399] p-6 rounded-r-lg">
                            <h2 className="text-2xl font-bold text-[#003399] mb-4">Contact Us</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have any questions about this Privacy Policy, please contact us:
                            </p>
                            <div className="space-y-2 text-gray-700">
                                <p><strong>The Guntur Co-Operative Urban Bank Limited</strong></p>
                                <p>D.No: 3/2, Brodipet, Guntur – 522002, Andhra Pradesh</p>
                                <p>Email: gcubhelpdesk@guntururbanbank.org</p>
                                <p>Toll Free: 1800-425-8873</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
