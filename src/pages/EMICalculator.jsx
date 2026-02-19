import { useState, useEffect } from 'react';

const EMICalculator = () => {
    const [amount, setAmount] = useState(100000);
    const [rate, setRate] = useState(10.5);
    const [tenure, setTenure] = useState(1);
    const [results, setResults] = useState({
        monthlyEmi: 0,
        totalInterest: 0,
        totalPayment: 0
    });

    const calculateEMI = () => {
        const P = parseFloat(amount);
        const r = parseFloat(rate) / 12 / 100; // Monthly interest rate
        const n = parseFloat(tenure) * 12; // Months

        if (P && r && n) {
            // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
            const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const totalPayment = emi * n;
            const totalInterest = totalPayment - P;

            setResults({
                monthlyEmi: Math.round(emi),
                totalInterest: Math.round(totalInterest),
                totalPayment: Math.round(totalPayment)
            });
        }
    };

    useEffect(() => {
        calculateEMI();
    }, []);

    const formatCurrency = (val) => {
        return "₹ " + val.toLocaleString('en-IN');
    };

    return (
        <div className="emi-calculator-page">
            {/* Hero Section */}
            <section className="bg-[#003399] py-12 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl font-bold mb-2">EMI Calculator</h1>
                    <p className="text-blue-200">Plan your loans effectively with our easy-to-use calculator.</p>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col md:flex-row">

                        {/* Inputs */}
                        <div className="p-8 md:w-1/2 border-r border-gray-100">
                            <h3 className="text-[#003399] font-bold text-xl mb-6">Loan Details</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Loan Amount (₹)</label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E61111] focus:ring-1 focus:ring-[#E61111] transition"
                                        placeholder="e.g. 100000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Interest Rate (% p.a)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={rate}
                                        onChange={(e) => setRate(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E61111] focus:ring-1 focus:ring-[#E61111] transition"
                                        placeholder="e.g. 10.5"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Tenure (Years)</label>
                                    <input
                                        type="number"
                                        value={tenure}
                                        onChange={(e) => setTenure(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E61111] focus:ring-1 focus:ring-[#E61111] transition"
                                        placeholder="e.g. 1"
                                    />
                                </div>
                                <button
                                    onClick={calculateEMI}
                                    className="w-full bg-[#E61111] text-white font-bold py-3 rounded-lg hover:bg-red-700 transition shadow-md mt-4"
                                >
                                    Calculate EMI
                                </button>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="p-8 md:w-1/2 bg-blue-50 flex flex-col justify-center items-center text-center">
                            <h3 className="text-gray-500 font-bold mb-8 uppercase tracking-widest text-xs">Your Monthly Payment</h3>
                            <div className="relative mb-8">
                                <div className="text-5xl font-bold text-[#003399]">{formatCurrency(results.monthlyEmi)}</div>
                                <div className="text-sm text-gray-400 mt-2">per month</div>
                            </div>

                            <div className="w-full space-y-4 border-t border-blue-100 pt-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Total Interest Payable</span>
                                    <span className="font-bold text-gray-800">{formatCurrency(results.totalInterest)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Total Payment (Principal + Interest)</span>
                                    <span className="font-bold text-gray-800">{formatCurrency(results.totalPayment)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto mt-8 text-center">
                        <p className="text-xs text-gray-400">Note: The results displayed are indicative and may vary based on actual bank policies and date of disbursement.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EMICalculator;
