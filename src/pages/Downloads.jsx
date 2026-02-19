const Downloads = () => {
    return (
        <div className="downloads-page">
            {/* Hero Section */}
            <section className="relative bg-[#002b5c] text-white py-20">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Downloads</h1>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">Access and download essential bank forms, applications, and documents.</p>
                </div>
            </section>

            {/* Downloads Grid */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6">

                    {/* Category: Account Opening */}
                    <DownloadCategory title="Account Opening Forms" icon="fas fa-user-plus" borderColor="border-[#E61111]" items={[
                        { title: 'Savings Account Form', sub: 'For Individual & Joint Accounts' },
                        { title: 'Current Account Form', sub: 'For Business & Proprietorship' },
                        { title: 'Fixed Deposit Form', sub: 'Term Deposit Application' }
                    ]} />

                    {/* Category: Loans */}
                    <DownloadCategory title="Loan Applications" icon="fas fa-hand-holding-usd" borderColor="border-yellow-400" items={[
                        { title: 'Gold Loan Application', sub: 'Quick processing form' },
                        { title: 'Housing Loan App', sub: 'For Home Purchase/Construction' },
                        { title: 'Personal Loan App', sub: 'Salary/Business based' }
                    ]} />

                    {/* Category: Services & Others */}
                    <DownloadCategory title="Services & Requests" icon="fas fa-cogs" borderColor="border-gray-400" items={[
                        { title: 'KYC Update Form', sub: 'Customer Identification Update' },
                        { title: 'RTGS/NEFT Form', sub: 'Fund Transfer Application' },
                        { title: 'Nomination Form', sub: 'DA-1 Nomination Registration' }
                    ]} />

                </div>
            </section>
        </div>
    );
};

const DownloadCategory = ({ title, icon, borderColor, items }) => (
    <div className="mb-16">
        <h2 className={`text-2xl font-bold text-[#003399] mb-8 border-l-4 ${borderColor} pl-4 flex items-center gap-2`}>
            <i className={`${icon} text-gray-400 text-lg`}></i> {title}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
            {items.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition border border-gray-100 flex items-start gap-4">
                    <div className="text-red-500 text-3xl"><i className="fas fa-file-pdf"></i></div>
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                        <p className="text-xs text-gray-500 mb-3">{item.sub}</p>
                        <a href="#" className="inline-flex items-center text-sm font-medium text-[#003399] hover:underline">
                            Download <i className="fas fa-download ml-2 text-xs"></i>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default Downloads;
