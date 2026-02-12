const SafeLockers = () => {
    return (
        <div className="safe-lockers-page">
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-light text-gray-700 mb-6 font-outfit">Safe Deposit Lockers</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-3/4">
                        <div className="mb-6 rounded-lg overflow-hidden shadow-sm h-64 bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center text-white">
                            <div className="text-center p-8">
                                <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <h2 className="text-3xl font-bold">Secure Your Valuables</h2>
                                <p className="text-gray-300 mt-2">State-of-the-art Safe Deposit Lockers</p>
                            </div>
                        </div>

                        <div className="mb-8 text-sm text-gray-600 leading-relaxed text-justify">
                            <p className="mb-4">
                                Our Safe Deposit Vaults offer you high security for your jewellery and important documents. Enjoy peace of mind knowing your valuables are protected by state-of-the-art security systems. We offer lockers in various sizes to suit your specific requirements.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-light text-gray-700 mb-4 border-b pb-2">Features and Benefits</h2>
                            <ul className="space-y-4">
                                <FeatureBenefit text="Available in Small, Medium, and Large sizes." />
                                <FeatureBenefit text="Competitive rental charges." />
                                <FeatureBenefit text="Extended banking hours for accessing lockers." />
                                <FeatureBenefit text="Nomination facility available." />
                            </ul>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-light text-gray-800 mb-6 pb-2 border-b border-gray-200">Requirements</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DocCard
                                    title="KYC Documents"
                                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                                    items={['Photo ID Proof', 'Address Proof', 'Passport Size Photos (2)']}
                                    theme="blue"
                                />
                                <DocCard
                                    title="Security Limit"
                                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                                    content="A Fixed Deposit is required as security for the locker. The amount depends on the size of the locker chosen."
                                    theme="green"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/4 space-y-6">
                        <div className="bg-[#0056b3] text-white overflow-hidden rounded shadow-sm">
                            <a href="#" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition text-sm font-medium">Locker Rent Tariff</a>
                        </div>
                        <div className="bg-gray-100 border border-gray-200 rounded overflow-hidden">
                            <div className="bg-[#0056b3] text-white px-4 py-2 text-sm font-bold">Locker Availability</div>
                            <a href="/contact" className="block p-4 text-sm text-gray-700 hover:text-[#003399] hover:bg-gray-50 transition">Contact Branch</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const FeatureBenefit = ({ text }) => (
    <li className="bg-gray-50 p-4 border-l-4 border-[#003399] shadow-sm text-sm text-gray-700 flex justify-between items-center group cursor-pointer hover:bg-white transition">
        <span>{text}</span>
        <span className="text-[#003399] group-hover:translate-x-1 transition-transform">▶</span>
    </li>
);

const DocCard = ({ title, icon, items, content, theme }) => (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-full ${theme === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'} flex items-center justify-center`}>
                {icon}
            </div>
            <h3 className="font-bold text-gray-800">{title}</h3>
        </div>
        {items ? (
            <ul className={`text-sm text-gray-600 space-y-2 list-disc list-inside marker:${theme === 'blue' ? 'text-blue-500' : 'text-green-500'}`}>
                {items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
        ) : (
            <div className="text-sm text-gray-600">{content}</div>
        )}
    </div>
);

export default SafeLockers;
