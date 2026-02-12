import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PopupSettings = () => {
    const [settings, setSettings] = useState({
        popup_enabled: 'off',
        popup_title: '',
        popup_subtitle: '',
        popup_description: '',
        popup_image: '',
        popup_cta_text: '',
        popup_cta_link: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/settings');
            const data = await response.json();
            setSettings({
                popup_enabled: data.popup_enabled || 'off',
                popup_title: data.popup_title || '',
                popup_subtitle: data.popup_subtitle || '',
                popup_description: data.popup_description || '',
                popup_image: data.popup_image || '',
                popup_cta_text: data.popup_cta_text || '',
                popup_cta_link: data.popup_cta_link || ''
            });
            if (data.popup_image) {
                setImagePreview(data.popup_image.startsWith('/') ? `http://localhost:8080${data.popup_image}` : data.popup_image);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching settings:', error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings({ ...settings, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        const formData = new FormData();
        Object.keys(settings).forEach(key => {
            if (key !== 'popup_image') {
                formData.append(key, settings[key]);
            }
        });

        if (imageFile) {
            formData.append('popup_image', imageFile);
        }

        try {
            const response = await fetch('http://localhost:8080/api/admin/settings/update', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.status === 'success') {
                setMessage({ type: 'success', text: 'Popup announcement settings updated successfully!' });
                if (data.data && data.data.popup_image) {
                    setSettings(prev => ({ ...prev, popup_image: data.data.popup_image }));
                    setImagePreview(`http://localhost:8080${data.data.popup_image}`);
                    setImageFile(null);
                }
            } else {
                setMessage({ type: 'error', text: 'Failed to update settings.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred while saving.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading Content Management...</div>;

    return (
        <div className="bg-gray-100 font-inter -m-2">
            <header className="w-full bg-transparent flex px-8 justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/admin/dashboard" className="text-gray-500 hover:text-[#003399] transition">
                        <i className="fas fa-arrow-left text-xl"></i>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Popup Announcement</h2>
                        <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mt-1">Session-Based Engagement Modal</p>
                    </div>
                </div>
            </header>

            <div className="p-8">
                <form onSubmit={handleSubmit} className="w-full space-y-8">
                    {message.text && (
                        <div className={`p-5 rounded-2xl text-sm font-medium shadow-sm transition-all animate-in fade-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-green-50 text-green-800 border-2 border-green-200' : 'bg-red-50 text-red-800 border-2 border-red-200'}`}>
                            <div className="flex items-center gap-3">
                                <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-lg`}></i>
                                {message.text}
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-10 space-y-12">
                        <div className="space-y-8">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                                <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl tracking-tight">
                                    <span className="w-1.5 h-8 bg-purple-500 rounded-full"></span>
                                    Modal Configuration
                                </h3>
                                <div className="flex items-center gap-4">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${settings.popup_enabled === 'on' ? 'text-green-600' : 'text-gray-400'}`}>
                                        {settings.popup_enabled === 'on' ? '🔴 Live on Site' : '⚪ Disabled'}
                                    </span>
                                    <div className="relative inline-block w-14 h-7 group">
                                        <input
                                            type="checkbox"
                                            name="popup_enabled"
                                            checked={settings.popup_enabled === 'on'}
                                            onChange={(e) => setSettings({ ...settings, popup_enabled: e.target.checked ? 'on' : 'off' })}
                                            className="opacity-0 w-0 h-0"
                                            id="popup_toggle"
                                        />
                                        <label
                                            htmlFor="popup_toggle"
                                            className={`absolute cursor-pointer inset-0 rounded-full transition-all duration-300 ${settings.popup_enabled === 'on' ? 'bg-green-500' : 'bg-gray-200'}`}
                                        >
                                            <span className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-all duration-300 transform ${settings.popup_enabled === 'on' ? 'translate-x-7 shadow-lg' : 'translate-x-0'}`}></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="md:col-span-2">
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Main Header Title</label>
                                    <input
                                        type="text"
                                        name="popup_title"
                                        value={settings.popup_title}
                                        onChange={handleChange}
                                        className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-50 outline-none transition-all font-black text-purple-700 uppercase"
                                        placeholder="e.g., GOLD RATES"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Secondary Promotion Title</label>
                                    <input
                                        type="text"
                                        name="popup_subtitle"
                                        value={settings.popup_subtitle}
                                        onChange={handleChange}
                                        className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-50 outline-none transition-all font-bold text-gray-800"
                                        placeholder="e.g., Gold Loan Festival"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Description / Offer Details</label>
                                    <textarea
                                        name="popup_description"
                                        value={settings.popup_description}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-5 py-4 bg-white border-1 border-gray-400 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-50 outline-none transition-all font-medium leading-relaxed text-gray-700"
                                        placeholder="Enter the offer or announcement details..."
                                    ></textarea>
                                </div>

                                <div className="md:col-span-2 space-y-4">
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Institutional Graphic / Banner</label>

                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        {/* Preview Area */}
                                        <div className="w-full md:w-64 h-48 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 overflow-hidden group relative flex items-center justify-center shadow-inner">
                                            {imagePreview ? (
                                                <>
                                                    <img src={imagePreview} alt="Popup Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <i className="fas fa-search-plus text-white text-2xl"></i>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center p-6">
                                                    <i className="fas fa-image text-4xl text-gray-300 mb-3 block"></i>
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No Image selected</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Upload Controls */}
                                        <div className="flex-1 space-y-4 w-full">
                                            <div className="bg-white border-2 border-dashed border-gray-200 hover:border-purple-400 rounded-3xl p-8 transition-all group relative cursor-pointer overflow-hidden">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                                        <i className="fas fa-cloud-upload-alt text-xl"></i>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-800 text-sm">Upload New Asset</p>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Recommended: 800x600 PNG/JPG</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {settings.popup_image && (
                                                <div className="flex items-center gap-2 px-2">
                                                    <i className="fas fa-link text-[10px] text-blue-500"></i>
                                                    <p className="text-[10px] font-mono text-gray-400 truncate max-w-xs">{settings.popup_image}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">CTA Button Text</label>
                                    <input
                                        type="text"
                                        name="popup_cta_text"
                                        value={settings.popup_cta_text}
                                        onChange={handleChange}
                                        className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-50 outline-none transition-all font-bold text-[#E61111]"
                                        placeholder="e.g., View Rates & Apply"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">CTA Redirect Link</label>
                                    <input
                                        type="text"
                                        name="popup_cta_link"
                                        value={settings.popup_cta_link}
                                        onChange={handleChange}
                                        className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-50 outline-none transition-all font-medium font-mono text-blue-600"
                                        placeholder="e.g., /gold-loans"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-100">
                            <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 flex items-start gap-4 shadow-sm">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm shrink-0 border border-amber-50">
                                    <i className="fas fa-clock text-xl"></i>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-amber-900 text-sm">Session-Based Display Protocol</h4>
                                    <p className="text-xs font-medium text-amber-700 leading-relaxed">
                                        The popup is designed to show **only once per browsing session** to prevent intrusive user experiences. It will reapppear only if the user closes the tab and revisits the site.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-12 pb-4 flex flex-col items-center border-t border-gray-100 gap-6">
                            <button
                                type="submit"
                                disabled={saving}
                                className="group relative bg-[#003399] hover:bg-blue-800 text-white px-16 py-5 rounded-[2rem] font-bold text-xl transition-all shadow-2xl shadow-blue-200/50 disabled:opacity-50 flex items-center gap-4 transform hover:scale-105 active:scale-95 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                                {saving ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic text-2xl"></i>}
                                <span>Update Popup Strategy</span>
                            </button>
                        </div>
                    </div>
                </form>

                <style>{`
                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                    .animate-shimmer {
                        animation: shimmer 1.5s infinite;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default PopupSettings;
