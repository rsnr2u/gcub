import { useState } from 'react';

const DeafAccounts = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState(null);

    const accounts = [
        { id: 1, account_no: '1001001234', name: 'Rajesh Kumar', address: '12-34, Gandhi Nagar, Guntur', status: 'Unclaimed > 10 Yrs' },
        { id: 2, account_no: '1001005678', name: 'Sita Devi', address: '4-21, Main Road, Tenali', status: 'Unclaimed > 10 Yrs' },
        { id: 3, account_no: '1002009012', name: 'Venkateswara Rao', address: '7/1, Brodipet, Guntur', status: 'Unclaimed > 10 Yrs' },
        { id: 4, account_no: '1003003456', name: 'Lakshmi Narayana', address: 'Plot 55, Arundalpet, Guntur', status: 'Unclaimed > 10 Yrs' },
        { id: 5, account_no: '1004007890', name: 'Krishna Murthy', address: 'Near Bus Stand, Vijayawada', status: 'Unclaimed > 10 Yrs' },
        { id: 6, account_no: '1005002134', name: 'Srinivas Rao', address: 'D.No 23, Kothapet, Guntur', status: 'Unclaimed > 10 Yrs' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        const found = accounts.filter(acc => acc.account_no === searchQuery);
        setResults(found);
    };

    return (
        <div className="deaf-accounts-page">
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-light text-gray-700 mb-6 font-outfit">DEAF Accounts (Unclaimed Deposits)</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-3/4">
                        <div className="mb-12">
                            <h2 className="text-2xl font-light text-gray-800 mb-6 pb-2 border-b border-gray-200">Search Unclaimed Accounts</h2>

                            <div className="mb-8">
                                <form onSubmit={handleSearch} className="flex gap-4 max-w-lg">
                                    <input
                                        type="text"
                                        placeholder="Enter Account Number..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#003399] focus:border-[#003399] block p-2.5 outline-none transition"
                                        pattern="[0-9]+"
                                        title="Please enter a valid Account Number"
                                    />
                                    <button
                                        type="submit"
                                        className="text-white bg-[#003399] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none transition"
                                    >
                                        <i className="fas fa-search mr-2"></i> Search
                                    </button>
                                </form>
                            </div>

                            {results !== null ? (
                                <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
                                    <table className="min-w-full text-sm text-left text-gray-500">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">S.No</th>
                                                <th scope="col" className="px-6 py-3">Account Number</th>
                                                <th scope="col" className="px-6 py-3">Name of Depositor</th>
                                                <th scope="col" className="px-6 py-3">Address</th>
                                                <th scope="col" className="px-6 py-3">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {results.length > 0 ? results.map((acc, idx) => (
                                                <tr key={acc.id} className="bg-white border-b hover:bg-gray-50">
                                                    <td className="px-6 py-4">{idx + 1}</td>
                                                    <td className="px-6 py-4 font-bold text-[#003399]">{acc.account_no}</td>
                                                    <td className="px-6 py-4 font-medium text-gray-900">{acc.name}</td>
                                                    <td className="px-6 py-4">{acc.address}</td>
                                                    <td className="px-6 py-4 text-orange-600">{acc.status}</td>
                                                </tr>
                                            )) : (
                                                <tr className="bg-white border-b hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-center text-red-500 font-bold" colSpan="5">
                                                        No records found matching Account Number "{searchQuery}"
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-sm">
                                    <i className="fas fa-info-circle mr-2"></i> Please enter the <strong>Account Number</strong> in the search box above to view details.
                                </div>
                            )}
                        </div>

                        <div className="mb-8 text-sm text-gray-600 leading-relaxed text-justify">
                            <p className="mb-4"><strong>The Depositor Education and Awareness Fund Scheme (DEAF Scheme) 2014</strong></p>
                            <p className="mb-4">
                                In terms of the instructions issued by the Reserve Bank of India, amounts to the credit of any account in India with any bank which has not been operated upon for a period of ten years or any deposit or any amount remaining unclaimed for more than ten years shall be credited to the Fund, within a period of three months from the expiry of the said period of ten years.
                            </p>
                            <p className="mb-4">
                                The Fund shall be utilized for promotion of depositors’ interest and for such other purposes which may be necessary for the promotion of depositors’ interests as specified by the Reserve Bank of India from time to time.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-light text-gray-700 mb-4 border-b pb-2">Process for Claiming Unclaimed Deposits</h2>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
                                    <li>The depositors/legal heirs can claim the amount after it has been transferred to the DEAF Fund.</li>
                                    <li>Visit your home branch with the original passbook/receipts and KYC documents.</li>
                                    <li>Submit the <strong>Claim Form</strong> duly filled and signed.</li>
                                    <li>Provide valid Identity Proof and Address Proof.</li>
                                    <li>In case of deceased depositors, legal heirs must submit valid legal heirship certificates/succession certificates along with the claim.</li>
                                    <li>The bank will verify the genuineness of the claim and refund the amount with interest (if applicable) after due diligence.</li>
                                </ol>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-light text-gray-700 mb-4 border-b pb-2">Downloads</h2>
                            <a href="/downloads" className="inline-flex items-center gap-2 bg-[#E61111] text-white px-4 py-2 rounded shadow hover:bg-red-700 transition">
                                <i className="fas fa-file-pdf"></i> Download Claim Form
                            </a>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/4 space-y-6">
                        <div className="bg-[#0056b3] text-white overflow-hidden rounded shadow-sm">
                            <a href="/savings-account" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition text-sm font-medium">Savings Accounts</a>
                            <a href="/current-account" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition text-sm font-medium">Current Accounts</a>
                            <a href="/fixed-deposits" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition text-sm font-medium">Fixed Deposits</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DeafAccounts;
