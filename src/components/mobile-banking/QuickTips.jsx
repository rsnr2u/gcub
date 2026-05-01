const QuickTips = ({ data }) => {
    if (!data || data.enabled === false || !data.tips) return null;

    return (
        <div className="bg-[#002b5c] text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <i className="fas fa-lightbulb text-6xl"></i>
            </div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-3 flex items-center gap-2">
                Quick Tips
            </h3>
            <ul className="space-y-4 relative z-10">
                {data.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                        <span className="w-6 h-6 rounded-full bg-yellow-400 text-blue-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-1">
                            {idx + 1}
                        </span>
                        <p className="text-sm font-medium text-blue-50 leading-relaxed">{tip}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuickTips;
