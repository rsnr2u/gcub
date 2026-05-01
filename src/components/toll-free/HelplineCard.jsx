const HelplineCard = ({ number, title, subtitle }) => {
    if (!number) return null;

    return (
        <div className="bg-slate-50 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 text-center mb-12 relative overflow-hidden group hover:bg-white transition duration-500">
            {/* Background Decoration */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100/30 rounded-full blur-3xl group-hover:bg-blue-200/40 transition duration-500"></div>
            
            <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white text-[#003399] rounded-2xl mb-6 shadow-xl shadow-blue-900/5 group-hover:scale-110 transition duration-500">
                    <i className="fas fa-phone-volume text-3xl"></i>
                </div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">
                    {title || 'Our Dedicated Helpline'}
                </h3>
                <a 
                    href={`tel:${number}`} 
                    className="text-4xl md:text-5xl font-black text-[#003399] block mb-4 hover:text-[#E61111] transition duration-300 tracking-tight"
                >
                    {number}
                </a>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest opacity-70">
                    {subtitle || 'Available 24x7 | 365 Days a Year'}
                </p>
            </div>
        </div>
    );
};

export default HelplineCard;
