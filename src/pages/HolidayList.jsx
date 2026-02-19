const HolidayList = () => {
    const holidays = [
        { date: 'Jan 26, 2026', day: 'Monday', occasion: 'Republic Day' },
        { date: 'Mar 25, 2026', day: 'Wednesday', occasion: 'Holi' },
        { date: 'Apr 14, 2026', day: 'Tuesday', occasion: 'Dr. Ambedkar Jayanti' },
        { date: 'Aug 15, 2026', day: 'Saturday', occasion: 'Independence Day' },
        { date: 'Oct 02, 2026', day: 'Friday', occasion: 'Gandhi Jayanti' },
        { date: 'Dec 25, 2026', day: 'Friday', occasion: 'Christmas' },
    ];

    return (
        <div className="holiday-list-page">
            {/* Hero Section */}
            <section className="bg-[#003399] py-12 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl font-bold mb-2">Bank Holidays 2026</h1>
                    <p className="text-blue-200">List of holidays observed by the bank.</p>
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">

                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100 text-[#003399] uppercase text-xs font-bold border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Day</th>
                                    <th className="px-6 py-4">Occasion</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-gray-600 text-sm">
                                {holidays.map((holiday, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-bold">{holiday.date}</td>
                                        <td className="px-6 py-4">{holiday.day}</td>
                                        <td className="px-6 py-4">{holiday.occasion}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="p-6 bg-red-50 text-red-800 text-sm">
                            <strong>Note:</strong> 2nd and 4th Saturdays are Bank Holidays. All Sundays are holidays.
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HolidayList;
