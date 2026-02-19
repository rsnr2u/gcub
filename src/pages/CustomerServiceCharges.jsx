const CustomerServiceCharges = () => {
    return (
        <div className="customer-service-charges-page">
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-light text-gray-700 mb-6 font-outfit">Customer Service Charges</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-3/4">
                        <div className="mb-8 text-sm text-gray-600 leading-relaxed text-justify">
                            <p>
                                Effective from <strong>1st April 2024</strong>, the following service charges are applicable for various banking services. Please note that these charges are subject to change from time to time. GST is applicable on all service charges as per Government regulations.
                            </p>
                        </div>

                        <ChargeTable
                            title="Savings Account"
                            rows={[
                                { label: 'Avg. Monthly Balance Non-Maintenance', value: 'Rs. 50 / Month', red: true },
                                { label: 'Duplicate Passbook Issue', value: 'Rs. 100' },
                                { label: 'Cheque Book Charges (Beyond Free Limit)', value: 'Rs. 3 / Leaf' },
                                { label: 'Stop Payment Instruction', value: 'Rs. 100 / Cheque' },
                                { label: 'Account Closure (Within 12 Months)', value: 'Rs. 200' },
                            ]}
                        />

                        <ChargeTable
                            title="Remittance Charges (NEFT / RTGS / IMPS)"
                            rows={[
                                { label: 'Up to Rs. 10,000', value: 'Rs. 2.50' },
                                { label: 'Rs. 10,001 to Rs. 1,00,000', value: 'Rs. 5.00' },
                                { label: 'Rs. 1,00,001 to Rs. 2,00,000', value: 'Rs. 15.00' },
                                { label: 'Above Rs. 2,00,000', value: 'Rs. 25.00' },
                            ]}
                        />

                        <ChargeTable
                            title="Safe Deposit Locker Rents (Per Annum)"
                            rows={[
                                { label: 'Small', value: 'Rs. 1,500' },
                                { label: 'Medium', value: 'Rs. 3,000' },
                                { label: 'Large', value: 'Rs. 6,000' },
                                { label: 'Extra Large', value: 'Rs. 10,000' },
                            ]}
                        />

                        <p className="text-xs text-gray-500 italic">* GST @ 18% is applicable on all the above charges.</p>
                    </div>

                    <div className="w-full lg:w-1/4 space-y-6">
                        <div className="bg-[#0056b3] text-white overflow-hidden rounded shadow-sm">
                            <a href="/savings-account" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition text-sm font-medium">Savings Accounts</a>
                            <a href="/current-account" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition text-sm font-medium">Current Accounts</a>
                            <a href="/interest-rates" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition text-sm font-medium">Interest Rates</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const ChargeTable = ({ title, rows }) => (
    <div className="mb-10">
        <h2 className="text-xl font-light text-gray-700 mb-4 border-b pb-2">{title}</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
            <table className="min-w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                    <tr>
                        <th scope="col" className="px-6 py-3 w-2/3">Service / Particulars</th>
                        <th scope="col" className="px-6 py-3">Charges (Excl. GST)</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium">{row.label}</td>
                            <td className={`px-6 py-4 ${row.red ? 'text-[#E61111]' : ''}`}>{row.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default CustomerServiceCharges;
