const DownloadApp = ({ data }) => {
    if (!data || data.enabled === false) return null;

    return (
        <div className="mt-20 bg-white rounded-xl shadow-lg border-t-4 border-[#E61111] overflow-hidden">
            <div className="flex flex-col md:flex-row items-stretch">
                <div className="flex-1 p-8 md:p-12">
                    <span className="text-[#E61111] font-bold text-xs tracking-[0.2em] uppercase mb-2 block">Mobile Banking</span>
                    <h2 className="text-3xl font-bold text-[#003399] mb-4 leading-tight">{data.title || 'Download Our App Now'}</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">{data.description}</p>
                    
                    {data.showButtons !== false && (
                        <div className="flex flex-wrap gap-4">
                            {data.playLink && (
                                <a 
                                    target='_blank' 
                                    rel="noopener noreferrer" 
                                    href={data.playLink} 
                                    className="flex items-center gap-3 px-6 py-2.5 bg-[#003399] text-white rounded hover:bg-blue-800 transition shadow-md"
                                >
                                    <i className="fab fa-google-play text-xl"></i>
                                    <div className="text-left">
                                        <div className="text-[10px] uppercase font-bold leading-none opacity-80">Get it on</div>
                                        <div className="text-base leading-none font-bold">Google Play</div>
                                    </div>
                                </a>
                            )}
                            {data.appLink && (
                                <a 
                                    target='_blank' 
                                    rel="noopener noreferrer" 
                                    href={data.appLink} 
                                    className="flex items-center gap-3 px-6 py-2.5 bg-gray-900 text-white rounded hover:bg-black transition shadow-md"
                                >
                                    <i className="fab fa-apple text-xl"></i>
                                    <div className="text-left">
                                        <div className="text-[10px] uppercase font-bold leading-none opacity-80">Download on the</div>
                                        <div className="text-base leading-none font-bold">App Store</div>
                                    </div>
                                </a>
                            )}
                        </div>
                    )}
                </div>
                <div className="md:w-64 bg-blue-50 flex items-center justify-center p-8 border-l border-gray-100">
                    {data.mobileImage ? (
                        <img src={data.mobileImage} alt="App Preview" className="max-w-full h-auto" />
                    ) : (
                        <i className="fas fa-mobile-screen-button text-[120px] text-[#003399] opacity-10"></i>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DownloadApp;
