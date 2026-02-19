const NetBanking = () => {
    return (
        <div className="net-banking-page">
            <section className="relative bg-[#002b5c] text-white py-20">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Internet Banking</h1>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">Banking at your fingertips. Anywhere, Anytime.</p>
                </div>
            </section>

            <main className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-3/4">
                        <h2 className="text-3xl font-bold text-[#003399] mb-6">Overview</h2>
                        <p className="text-gray-600 leading-relaxed mb-8 text-justify">
                            Our <strong>Internet Banking</strong> service provides you with a convenient way to manage your finances from the comfort of your home or office. It is a secure, fast, and easy way to access your bank account 24/7.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#003399] pl-4">Key Features</h3>
                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-10 text-gray-700">
                            <FeatureItem text="Account Summary & Statement" />
                            <FeatureItem text="Fund Transfer (Internal & External)" />
                            <FeatureItem text="Bill Payments" />
                            <FeatureItem text="Request Cheque Book" />
                            <FeatureItem text="Stop Cheque Payment" />
                            <FeatureItem text="TDS Enquiry" />
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 mb-10">
                            <h3 className="text-xl font-bold text-[#003399] mb-4">How to Register?</h3>
                            <p className="text-gray-600 mb-4">Visit your home branch to submit the Internet Banking application form. You will receive your User ID and Password via post/email.</p>
                            <a href="/downloads" className="inline-flex items-center text-white bg-[#003399] px-6 py-3 rounded hover:bg-blue-800 transition font-medium">
                                <i className="fas fa-download mr-2"></i> Download Application Form
                            </a>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#003399] pl-4">Security Tips</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li>Always check the URL starts with <strong>https://</strong></li>
                            <li>Do not access net banking from public computers (cyber cafes).</li>
                            <li>Change your password regularly.</li>
                            <li>Enable SMS alerts for all transactions.</li>
                        </ul>
                    </div>

                    <div className="lg:w-1/4 space-y-8">
                        <div className="bg-[#003399] text-white p-6 rounded-xl shadow-lg text-center">
                            <i className="fas fa-lock text-4xl mb-3 opacity-80"></i>
                            <h4 className="font-bold text-xl mb-4">Already Registered?</h4>
                            <a href="#" className="block w-full bg-white text-[#003399] px-4 py-3 rounded font-bold hover:bg-gray-100 transition mb-3">Retail Login</a>
                            <a href="#" className="block w-full bg-transparent border border-white text-white px-4 py-3 rounded font-bold hover:bg-blue-800 transition">Corporate Login</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const FeatureItem = ({ text }) => (
    <div className="flex items-start gap-3">
        <i className="fas fa-check text-green-500 mt-1"></i>
        <span>{text}</span>
    </div>
);

export default NetBanking;
