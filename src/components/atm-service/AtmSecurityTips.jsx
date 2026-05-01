const AtmSecurityTips = ({ data }) => {
    if (!data || data.enabled === false || !data.tips) return null;

    return (
        <div className="bg-[#f0f7ff] p-8 rounded-[2rem] border border-blue-100 mt-12 relative overflow-hidden group">
            {/* Background Icon Decoration */}
            <i className="fas fa-shield-alt absolute -right-8 -bottom-8 text-8xl text-blue-100/50 -rotate-12 group-hover:scale-110 transition duration-700"></i>

            <div className="relative z-10">
                <h3 className="text-xl font-bold text-[#003399] mb-2 flex items-center gap-3">
                    <div className="bg-[#003399] text-white w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                        <i className="fas fa-shield-halved text-xs"></i>
                    </div>
                    ATM Security Tips
                </h3>

                <ul className="grid grid-cols-1 md:grid-cols-1">
                    {data.tips.map((tip, idx) => (
                        <li key={idx} className="flex gap-4 items-start p-2">
                            <i className="fas fa-circle-check text-blue-500 mt-1"></i>
                            <span className="text-gray-700 text-sm leading-relaxed font-medium">{tip}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AtmSecurityTips;
