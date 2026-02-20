import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PopupModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState(null);

    useEffect(() => {
        const fetchPopupConfig = async () => {
            try {
                // Check if popup has already been shown in this session
                const hasBeenShown = sessionStorage.getItem('gcub_popup_shown');
                if (hasBeenShown) return;

                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/settings`);
                const settings = await response.json();

                if (settings.popup_enabled === 'on') {
                    const imageUrl = settings.popup_image?.startsWith('/')
                        ? `${import.meta.env.VITE_BASE_URL}${settings.popup_image}`
                        : settings.popup_image;

                    setConfig({
                        title: settings.popup_title || 'Announcement',
                        subtitle: settings.popup_subtitle || '',
                        description: settings.popup_description || '',
                        image: imageUrl || '',
                        ctaText: settings.popup_cta_text || 'Learn More',
                        ctaLink: settings.popup_cta_link || '#'
                    });

                    // Small delay before showing the popup for better UX
                    setTimeout(() => {
                        setIsOpen(true);
                        sessionStorage.setItem('gcub_popup_shown', 'true');
                    }, 1000);
                }
            } catch (error) {
                console.error('Error fetching popup configuration:', error);
            }
        };

        fetchPopupConfig();
    }, []);

    if (!isOpen || !config) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] overflow-hidden max-w-lg w-full shadow-2xl transform animate-in zoom-in-95 duration-300 relative">
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all transform hover:rotate-90"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                {/* Header Image Section */}
                <div className="relative h-64 overflow-hidden group">
                    <img
                        src={config.image}
                        alt={config.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1589758438368-0ad531bd3366?q=80&w=2000&auto=format&fit=crop';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    <div className="absolute bottom-6 left-8 right-8 text-white">
                        <p className="text-yellow-400 font-black uppercase tracking-[0.3em] text-[10px] mb-2 animate-in slide-in-from-bottom-2 duration-500">
                            SPECIAL ANNOUNCEMENT
                        </p>
                        <h2 className="text-3xl font-black tracking-tight leading-tight uppercase animate-in slide-in-from-bottom-4 duration-700">
                            {config.title}
                        </h2>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8 pt-6 space-y-6 text-center">
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">
                            {config.subtitle}
                        </h3>
                        <div className="w-12 h-1 bg-[#E61111] mx-auto rounded-full"></div>
                    </div>

                    <p className="text-gray-600 font-medium leading-relaxed">
                        {config.description}
                    </p>

                    <div className="pt-2">
                        <Link
                            to={config.ctaLink}
                            onClick={() => setIsOpen(false)}
                            className="inline-block bg-[#E61111] hover:bg-red-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-red-200 transform hover:scale-105 active:scale-95"
                        >
                            {config.ctaText}
                        </Link>
                    </div>

                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-2">
                        * Visit our branch for more details
                    </p>
                </div>
            </div>

            {/* Backdrop Click */}
            <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)}></div>
        </div>
    );
};

export default PopupModal;
