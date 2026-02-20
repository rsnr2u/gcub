const CyberSecurity = () => {
    return (
        <div className="cyber-security-page">
            <section className="relative bg-[#002b5c] text-white py-20">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Cyber Security</h1>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">Stay alert, stay safe. Your security is our priority.</p>
                </div>
            </section>

            <main className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-3/4">
                        <h2 className="text-3xl font-bold text-[#003399] mb-6">Safe Banking Practices</h2>
                        <p className="text-gray-600 leading-relaxed mb-8 text-justify">
                            In the digital age, cybersecurity is of paramount importance. At Guntur Co-operative Urban Bank, we are committed to providing you with a secure banking environment. However, your vigilance is equally important in preventing fraud.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#003399] pl-4">Do's and Don'ts</h3>
                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div>
                                <h4 className="font-bold text-green-600 mb-4 flex items-center"><i className="fas fa-check-circle mr-2"></i> Always Do</h4>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start gap-2"><span className="text-green-500">•</span> Update your mobile number and email ID with the bank.</li>
                                    <li className="flex items-start gap-2"><span className="text-green-500">•</span> Change your online banking passwords periodically.</li>
                                    <li className="flex items-start gap-2"><span className="text-green-500">•</span> Check your bank statements regularly for unauthorized transactions.</li>
                                    <li className="flex items-start gap-2"><span className="text-green-500">•</span> Log out immediately after completing your online transactions.</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-red-600 mb-4 flex items-center"><i className="fas fa-times-circle mr-2"></i> Never Do</h4>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start gap-2"><span className="text-red-500">•</span> Share your PIN, OTP, or CVV with anyone including bank officials.</li>
                                    <li className="flex items-start gap-2"><span className="text-red-500">•</span> Click on suspicious links received via SMS or Email.</li>
                                    <li className="flex items-start gap-2"><span className="text-red-500">•</span> Access net banking on public Wi-Fi networks.</li>
                                    <li className="flex items-start gap-2"><span className="text-red-500">•</span> Install unauthorized apps that ask for screen sharing permissions.</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#003399] pl-4">Report Fraud</h3>
                        <div className="bg-red-50 rounded-xl p-8 border border-red-100 text-center">
                            <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                            <h4 className="font-bold text-xl text-gray-800 mb-2">Noticed Suspicious Activity?</h4>
                            <p className="text-gray-600 mb-6 max-w-lg mx-auto">If you suspect any unauthorized transaction in your account, report it to the bank immediately to block your account/card.</p>
                            <div className="flex flex-col md:flex-row justify-center gap-4">
                                <a href="tel:18004258873" className="inline-flex items-center justify-center bg-[#E61111] text-white px-6 py-3 rounded font-bold hover:bg-red-700 transition">
                                    <i className="fas fa-phone-alt mr-2"></i> Call 1800-425-8873
                                </a>
                                <a href="mailto:cybercell@gcub.com" className="inline-flex items-center justify-center bg-white text-[#E61111] border border-[#E61111] px-6 py-3 rounded font-bold hover:bg-red-50 transition">
                                    <i className="far fa-envelope mr-2"></i> Email Cyber Cell
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/4 space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                            <h4 className="font-bold text-gray-800 mb-2">File a Complaint</h4>
                            <p className="text-sm text-gray-500 mb-4">Official grievance redressal</p>
                            <a href="/contact" className="block w-full bg-gray-100 text-gray-700 px-4 py-2 rounded font-bold hover:bg-gray-200 transition">Visit Contact Page</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CyberSecurity;
