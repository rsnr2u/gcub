const AnyBranchBanking = () => {
    return (
        <div className="any-branch-banking-page">
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-light text-gray-700 mb-6 font-outfit">Any Branch Banking (ABB) Services</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-3/4">
                        <div className="mb-8 text-sm text-gray-600 leading-relaxed text-justify">
                            <p className="mb-4">
                                <strong>Experience the freedom of Banking Anywhere, Anytime!</strong>
                            </p>
                            <p className="mb-4">
                                Any Branch Banking (ABB) is a facility that allows you to operate your account from any of our networked branches. You are no longer restricted to your home branch for your banking needs. With our robust Core Banking Solution, we bring the bank to your neighborhood.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-light text-gray-700 mb-4 border-b pb-2">Services Available under ABB</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ABBService icon="money-bill-wave" title="Cash Deposits" desc="Deposit cash into your account from any of our branches." />
                                <ABBService icon="hand-holding-usd" title="Cash Withdrawals" desc="Withdraw cash from your account at any branch (Subject to limits)." />
                                <ABBService icon="exchange-alt" title="Fund Transfers" desc="Transfer funds between accounts held at different branches instantly." />
                                <ABBService icon="file-invoice" title="Statement of Account" desc="Obtain your account statement from any branch." />
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-light text-gray-700 mb-4 border-b pb-2">Transaction Limits & Charges</h2>
                            <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
                                <table className="min-w-full text-sm text-left text-gray-600">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 w-2/3">Transaction Type</th>
                                            <th scope="col" className="px-6 py-3">Limit / Charges</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <TableRow label="Cash Deposit (Parent Branch)" value="Unlimited / Free" />
                                        <TableRow label="Cash Deposit (Non-Home Branch)" value="Free up to Rs. 2 Lakhs per day" />
                                        <TableRow label="Cash Withdrawal (Self)" value="Rs. 50,000 per day" />
                                        <TableRow label="Third Party Cash Withdrawal" value="Not Allowed" red />
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-gray-500 italic mt-2">* Charges may apply for transactions exceeding the free limits. Please refer to <a href="/customer-service-charges" className="text-blue-600 hover:underline">Service Charges</a> page.</p>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/4 space-y-6">
                        <div className="bg-[#0056b3] text-white overflow-hidden rounded shadow-sm">
                            <a href="/imps" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition text-sm font-medium">IMPS Service</a>
                            <a href="/upi" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition text-sm font-medium">UPI Services</a>
                            <a href="/customer-service-charges" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition text-sm font-medium">Service Charges</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const ABBService = ({ icon, title, desc }) => (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="font-bold text-[#003399] mb-2 flex items-center">
            <i className={`fas fa-${icon} mr-2`}></i> {title}
        </h3>
        <p className="text-xs text-gray-600">{desc}</p>
    </div>
);

const TableRow = ({ label, value, red }) => (
    <tr className="bg-white border-b hover:bg-gray-50">
        <td className="px-6 py-4 font-medium">{label}</td>
        <td className={`px-6 py-4 ${red ? 'text-red-600' : ''}`}>{value}</td>
    </tr>
);

export default AnyBranchBanking;
