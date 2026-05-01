const SubscriptionMethods = ({ data }) => {
    if (!data || !data.items) return null;

    return (
        <div className="bg-[#0b1320] p-8 md:p-12 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl">
            {/* Decoration */}
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition duration-700">
                <i className="fas fa-paper-plane text-8xl -rotate-12 text-blue-400"></i>
            </div>
            
            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-4">
                    <span className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                        <i className="fas fa-satellite-dish text-sm"></i>
                    </span>
                    {data.title || 'How to Subscribe?'}
                </h3>
                <p className="text-blue-200/60 text-sm mb-10 max-w-lg leading-relaxed">
                    {data.description || 'Choose any of these easy methods to switch to paperless banking and receive statements in your inbox.'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.items.map((m, idx) => (
                        <div key={idx} className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition duration-300">
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] block mb-3 opacity-70">Method 0{idx + 1}</span>
                            <p className="font-bold text-base leading-tight">{m}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionMethods;
