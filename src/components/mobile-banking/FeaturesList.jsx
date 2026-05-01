const FeaturesList = ({ data }) => {
    if (!data || data.enabled === false || !data.items) return null;

    const title = data.title !== undefined ? data.title : "Key Features";
    const icon = data.icon || "fa-list-check";

    return (
        <div className="features-list-container mb-8">
            {title && (
                <h3 className={`text-xl font-bold mb-6 flex items-center gap-3 ${title.toLowerCase().includes('emergency') ? 'text-[#E61111]' : 'text-[#003399]'}`}>
                    <i className={`fas ${icon} ${title.toLowerCase().includes('emergency') ? 'text-[#E61111]' : 'text-[#E61111]'}`}></i>
                    {title}
                </h3>
            )}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.items.map((item, idx) => {
                    const isString = typeof item === 'string';
                    const title = isString ? item : item.title;
                    const desc = isString ? null : item.desc;
                    const icon = isString ? 'fa-circle-check' : (item.icon || 'fa-check-circle');

                    return (
                        <li key={idx} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-blue-200 transition group">
                            <div className="">
                                <i className={`fas ${icon} text-[#003399] group-hover:text-[#E61111] transition-colors text-sm`}></i>
                            </div>
                            <div className="">
                                <span className="font-bold text-gray-800 block text-sm mb-0.5">{title}</span>
                                {desc && <p className="text-[12px] text-gray-500 leading-relaxed">{desc}</p>}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default FeaturesList;
