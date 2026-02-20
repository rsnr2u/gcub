import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authFetch } from '../../../utils/api';

const SEOSettings = () => {
    const [settings, setSettings] = useState({
        seo_site_title: '',
        seo_meta_description: '',
        seo_meta_keywords: '',
        seo_og_image: '',
        seo_twitter_handle: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await authFetch('http://localhost:8080/api/admin/settings');
            const data = await response.json();
            setSettings({
                seo_site_title: data.seo_site_title || '',
                seo_meta_description: data.seo_meta_description || '',
                seo_meta_keywords: data.seo_meta_keywords || '',
                seo_og_image: data.seo_og_image || '',
                seo_twitter_handle: data.seo_twitter_handle || ''
            });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        const formData = new FormData();
        Object.keys(settings).forEach(key => {
            formData.append(key, settings[key]);
        });

        try {
            const response = await authFetch('http://localhost:8080/api/admin/settings/update', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.status === 'success') {
                setMessage({ type: 'success', text: 'SEO settings updated successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to update settings.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred while saving.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading SEO Configuration...</div>;

    return (
        <div className="bg-gray-100 font-inter -m-2">
            <header className="w-full bg-transparent flex px-8 justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/admin/dashboard" className="text-gray-500 hover:text-[#003399] transition">
                        <i className="fas fa-arrow-left text-xl"></i>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Search Engine Optimization</h2>
                        <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mt-1">SEO & Social Meta Configuration</p>
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
                            <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl tracking-tight">
                                <span className="w-1.5 h-8 bg-green-500 rounded-full"></span>
                                Search Results Appearance
                            </h3>

                            <div className="grid grid-cols-1 gap-8">
                                <div>
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">
                                        SEO Site Title
                                        <span className="ml-2 text-green-600 normal-case font-medium">(Main browser title)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="seo_site_title"
                                        value={settings.seo_site_title}
                                        onChange={handleChange}
                                        className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none transition-all font-medium"
                                        placeholder="The Guntur Co-Operative Urban Bank Limited - GCUB"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">
                                        Meta Description
                                        <span className="ml-2 text-green-600 normal-case font-medium">(150-160 characters)</span>
                                    </label>
                                    <textarea
                                        name="seo_meta_description"
                                        value={settings.seo_meta_description}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-5 py-4 bg-white border-1 border-gray-400 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none transition-all font-medium leading-relaxed text-gray-700"
                                        placeholder="GCUB - A premier co-operative bank in Andhra Pradesh since 1947..."
                                    ></textarea>
                                    <p className="text-[10px] text-gray-400 mt-1.5 px-1">
                                        {settings.seo_meta_description.length} characters
                                        {settings.seo_meta_description.length > 160 && <span className="text-amber-500 ml-2">⚠ Too long</span>}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Meta Keywords</label>
                                    <input
                                        type="text"
                                        name="seo_meta_keywords"
                                        value={settings.seo_meta_keywords}
                                        onChange={handleChange}
                                        className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none transition-all font-medium"
                                        placeholder="GCUB, Guntur Bank, Savings Account, Fixed Deposits, Gold Loans"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                    <div>
                                        <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Social Share Image Path</label>
                                        <input
                                            type="text"
                                            name="seo_og_image"
                                            value={settings.seo_og_image}
                                            onChange={handleChange}
                                            className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none transition-all font-medium font-mono text-sm"
                                            placeholder="/assets/images/gcublogo.png"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Twitter Username</label>
                                        <input
                                            type="text"
                                            name="seo_twitter_handle"
                                            value={settings.seo_twitter_handle}
                                            onChange={handleChange}
                                            className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none transition-all font-medium font-mono"
                                            placeholder="@gcub"
                                        />
                                    </div>
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
                                {saving ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-search text-2xl"></i>}
                                <span>Update SEO Settings</span>
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

export default SEOSettings;
