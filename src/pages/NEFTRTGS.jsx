const NEFTRTGS = () => {
    return (
        <div className="neft-rtgs-page">
            {/* Hero Section */}
            <section className="relative bg-[#002b5c] text-white py-20">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">NEFT / RTGS</h1>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">Safe and secure electronic fund transfers for high-value transactions.</p>
                </div>
            </section>

            <main className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-[#003399] mb-4">NEFT (National Electronic Funds Transfer)</h2>
                            <p className="text-gray-600 leading-relaxed text-justify mb-4">
                                National Electronic Funds Transfer (NEFT) is a nation-wide payment system facilitating one-to-one funds transfer. Under this Scheme, individuals, firms and corporates can electronically transfer funds to any individual, firm or corporate having an account with any other bank agency in the country participating in the Scheme.
                            </p>
                            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 text-sm text-gray-700">
                                <strong>Note:</strong> NEFT transactions are settled in batches.
                            </div>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-[#003399] mb-4">RTGS (Real Time Gross Settlement)</h2>
                            <p className="text-gray-600 leading-relaxed text-justify mb-4">
                                'RTGS' stands for Real Time Gross Settlement, which can be defined as the continuous (real-time) settlement of funds transfers individually on an order by order basis (without netting). 'Real Time' means the processing of instructions at the time they are received rather than at some later time.
                            </p>
                            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500 text-sm text-gray-700">
                                <strong>Minimum Limit:</strong> The minimum amount to be remitted through RTGS is ₹ 2,00,000.
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#003399] pl-4">Comparison</h3>
                        <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
                            <table className="w-full text-sm text-left text-gray-600">
                                <thead className="text-xs text-white uppercase bg-[#003399]">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 border-r border-blue-800">Feature</th>
                                        <th scope="col" className="px-6 py-4 border-r border-blue-800">NEFT</th>
                                        <th scope="col" className="px-6 py-4">RTGS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr className="bg-white">
                                        <td className="px-6 py-4 font-bold text-gray-900 border-r border-gray-200">Minimum Amount</td>
                                        <td className="px-6 py-4 border-r border-gray-200">₹ 1</td>
                                        <td className="px-6 py-4">₹ 2,00,000</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-6 py-4 font-bold text-gray-900 border-r border-gray-200">Maximum Amount</td>
                                        <td className="px-6 py-4 border-r border-gray-200">No Limit</td>
                                        <td className="px-6 py-4">No Limit</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-6 py-4 font-bold text-gray-900 border-r border-gray-200">Settlement Type</td>
                                        <td className="px-6 py-4 border-r border-gray-200">Batches (Half-hourly)</td>
                                        <td className="px-6 py-4">Real Time</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#003399] pl-4">Information Required</h3>
                            <p className="text-gray-600 mb-4">To initiate a transfer, you need the following details of the beneficiary:</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 font-medium font-inter">
                                <li>Beneficiary Name</li>
                                <li>Beneficiary Account App</li>
                                <li>Beneficiary Bank Name & Branch</li>
                                <li>Beneficiary Bank IFSC Code</li>
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/4 space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h4 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Related Services</h4>
                            <ul className="space-y-3">
                                <li><a href="/imps" className="text-gray-600 hover:text-[#003399] flex items-center gap-2 transition"><i className="fas fa-chevron-right text-xs"></i> IMPS</a></li>
                                <li><a href="/upi" className="text-gray-600 hover:text-[#003399] flex items-center gap-2 transition"><i className="fas fa-chevron-right text-xs"></i> UPI Payments</a></li>
                            </ul>
                        </div>

                        <div className="bg-[#002b5c] text-white p-6 rounded-xl shadow-lg">
                            <h4 className="font-bold text-lg mb-2">Find IFSC Code?</h4>
                            <p className="text-blue-100 text-sm mb-4">Search for IFSC codes of all our branches.</p>
                            <a href="/branch-locator" className="inline-block w-full text-center bg-[#E61111] text-white px-4 py-2 rounded font-bold text-sm hover:bg-red-700 transition">Branch Locator</a>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default NEFTRTGS;
