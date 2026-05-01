const HighlightCards = ({ data }) => {
    const list = data.cards || data.items || [];
    if (!data || data.enabled === false || list.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 my-8">
            {list.map((card, idx) => (
                <div
                    key={idx}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 border-b-4 border-[#003399] transition hover:shadow-xl group"
                >
                    {card.icon && (
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-500">
                            <i className={`fas ${card.icon} text-2xl ${card.iconColor || 'text-[#003399]'}`}></i>
                        </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{card.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{card.description || card.desc}</p>
                </div>
            ))}
        </div>
    );
};

export default HighlightCards;
