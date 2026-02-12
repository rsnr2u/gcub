const KYCNorms = () => {
    return (
        <div className="kyc-norms-page">
            {/* Hero Section */}
            <section className="bg-[#003399] py-12 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl font-bold mb-2">KYC Norms</h1>
                    <p className="text-blue-200">Know Your Customer Guidelines and Required Documents.</p>
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto space-y-8">

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                            <h3 className="text-xl font-bold text-[#003399] mb-4 border-b border-gray-100 pb-2">What is KYC?</h3>
                            <p className="text-gray-600 mb-4 text-justify">KYC (Know Your Customer) is a process by which banks obtain information about the identity and address of the customers. This process helps to innovative services and prevent money laundering.</p>
                            <p className="text-gray-600 font-bold">Please submit one document from each of the following lists for account opening:</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* ID Proof */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                        <i className="fas fa-id-card"></i>
                                    </div>
                                    <h4 className="font-bold text-gray-800 text-lg">Proof of Identity</h4>
                                </div>
                                <ul className="space-y-3 text-gray-600 text-sm list-disc pl-5">
                                    <li>PAN Card</li>
                                    <li>Aadhaar Card</li>
                                    <li>Voter ID Card</li>
                                    <li>Driving License</li>
                                    <li>Passport</li>
                                    <li>Identity Card issued by Govt/PSU</li>
                                </ul>
                            </div>

                            {/* Address Proof */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <h4 className="font-bold text-gray-800 text-lg">Proof of Address</h4>
                                </div>
                                <ul className="space-y-3 text-gray-600 text-sm list-disc pl-5">
                                    <li>Aadhaar Card</li>
                                    <li>Voter ID Card</li>
                                    <li>Driving License</li>
                                    <li>Passport</li>
                                    <li>Utility Bill (Electricity/Water/Gas) - not more than 3 months old</li>
                                    <li>Property Tax Bill</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-[#003399] p-6 rounded-r-lg">
                            <h4 className="font-bold text-[#003399] mb-2">For Companies / Firms</h4>
                            <p className="text-xs text-blue-900 mb-2">Additional documents required:</p>
                            <ul className="list-disc pl-5 text-xs text-blue-800 space-y-1">
                                <li>Registration Certificate</li>
                                <li>Partnership Deed (for firms)</li>
                                <li>Memorandum & Articles of Association (for companies)</li>
                                <li>Resolution of Board of Directors</li>
                                <li>PAN Card of the Company/Firm</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default KYCNorms;
