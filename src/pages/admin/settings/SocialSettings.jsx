import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch, BASE_URL } from '../../../utils/api';


const SocialSettings = () => {
    const [settings, setSettings] = useState({
        seo_facebook_url: '',
        seo_twitter_url: '',
        seo_linkedin_url: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await apiFetch('/admin/settings');
            const data = await response.json();
            setSettings({
                seo_facebook_url: data.seo_facebook_url || '',
                seo_twitter_url: data.seo_twitter_url || '',
                seo_linkedin_url: data.seo_linkedin_url || ''
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
            const response = await fetch(`${BASE_URL}/api/admin/settings/update`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.status === 'success') {
                setMessage({ type: 'success', text: 'Social media links updated successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to update links.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred while saving.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading Social Connectivity...</div>;

    return (
        <div className="bg-gray-100 font-inter -m-2">
            <header className="w-full bg-transparent flex px-8 justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/admin/dashboard" className="text-gray-500 hover:text-[#003399] transition">
                        <i className="fas fa-arrow-left text-xl"></i>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Social Media URLs</h2>
                        <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mt-1">Platform Connectivity Management</p>
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
                                <span className="w-1.5 h-8 bg-blue-500 rounded-full"></span>
                                official Social Channels
                            </h3>

                            <div className="grid grid-cols-1 gap-8">
                                <div className="bg-blue-50/50 border-2 border-dashed border-blue-100 rounded-3xl p-10 space-y-10">
                                    <div className="group">
                                        <label className="block text-[10px] font-black text-blue-700 uppercase mb-3 tracking-widest flex items-center gap-2">
                                            <i className="fab fa-facebook text-xl"></i> Facebook Official Page
                                        </label>
                                        <input
                                            type="url"
                                            name="seo_facebook_url"
                                            value={settings.seo_facebook_url}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 bg-white border border-blue-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-sm font-mono shadow-sm"
                                            placeholder="https://facebook.com/guntururbanbank"
                                        />
                                    </div>

                                    <div className="group">
                                        <label className="block text-[10px] font-black text-blue-400 uppercase mb-3 tracking-widest flex items-center gap-2">
                                            <i className="fab fa-twitter text-xl"></i> Twitter / X Handle
                                        </label>
                                        <input
                                            type="url"
                                            name="seo_twitter_url"
                                            value={settings.seo_twitter_url}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 bg-white border border-blue-100 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-sm font-mono shadow-sm"
                                            placeholder="https://twitter.com/guntururbanbank"
                                        />
                                    </div>

                                    <div className="group">
                                        <label className="block text-[10px] font-black text-[#0077b5] uppercase mb-3 tracking-widest flex items-center gap-2">
                                            <i className="fab fa-linkedin text-xl"></i> LinkedIn Company Profile
                                        </label>
                                        <input
                                            type="url"
                                            name="seo_linkedin_url"
                                            value={settings.seo_linkedin_url}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 bg-white border border-[#cbe1ef] rounded-2xl focus:border-[#0077b5] focus:ring-4 focus:ring-blue-50 outline-none transition-all text-sm font-mono shadow-sm"
                                            placeholder="https://linkedin.com/company/guntururbanbank"
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
                                {saving ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-share-alt text-2xl"></i>}
                                <span>Update Social Links</span>
                            </button>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Links will be reflected in the footer section</p>
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

export default SocialSettings;
