import { useState, useEffect } from 'react';

const InterestRates = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/interest-rates`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setTables(data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching interest rates:', error);
                setLoading(false);
            }
        };

        fetchRates();
    }, []);

    // Helper for Tailwind colors to avoid dynamic class purging
    const getAccentColors = (color) => {
        if (color === 'red') {
            return {
                text: 'text-[#E61111]',
                bg: 'bg-red-50',
                icon: 'fa-hand-holding-usd',
                headerBg: 'bg-red-50 text-[#E61111]'
            };
        }
        return {
            text: 'text-[#003399]',
            bg: 'bg-blue-50',
            icon: 'fa-piggy-bank',
            headerBg: 'bg-blue-50 text-[#003399]'
        };
    };

    return (
        <div className="interest-rates-page">
            {/* Hero Section */}
            <section className="bg-[#003399] py-12 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl font-bold mb-2">Interest Rates</h1>
                    <p className="text-blue-200">Competitive rates for your savings and loans.</p>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 bg-gray-50 min-h-[50vh]">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-5xl mx-auto space-y-12">
                        {loading ? (
                            <div className="text-center py-12 text-gray-500">Loading interest rates...</div>
                        ) : tables.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">No interest rates available.</div>
                        ) : (
                            tables.map((table, index) => {
                                const colors = getAccentColors(table.accent_color);
                                return (
                                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                                            <h3 className={`${colors.text} font-bold text-lg flex items-center gap-2`}>
                                                <i className={`fas ${colors.icon}`}></i> {table.title}
                                            </h3>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left">
                                                <thead className={`${colors.headerBg} font-bold uppercase text-xs`}>
                                                    <tr>
                                                        {Array.isArray(table.columns) && table.columns.map((col, colIdx) => (
                                                            <th key={colIdx} className="px-6 py-4">{col}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100 text-gray-600">
                                                    {Array.isArray(table.rows) && table.rows.map((row, rowIdx) => (
                                                        <tr key={rowIdx} className="hover:bg-gray-50">
                                                            {Array.isArray(row) && row.map((val, valIdx) => (
                                                                <td key={valIdx} className="px-6 py-4">{val}</td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                );
                            })
                        )}

                        {!loading && tables.length > 0 && (
                            <div className="text-center">
                                <p className="text-xs text-gray-400">Rates are subject to change at the sole discretion of the bank. Please contact your nearest branch for the latest rates.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InterestRates;
