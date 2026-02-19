import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch, BASE_URL } from '../../../utils/api';


const GlobalSettings = () => {
    const [settings, setSettings] = useState({
        site_name: '',
        domain_name: '',
        contact_email: '',
        contact_phone: '',
        toll_free: '',
        address: '',
        maintenance_mode: 'off'
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
            // Filter only relevant settings for this page
            setSettings({
                site_name: data.site_name || '',
                domain_name: data.domain_name || '',
                contact_email: data.contact_email || '',
                contact_phone: data.contact_phone || '',
                toll_free: data.toll_free || '',
                address: data.address || '',
                maintenance_mode: data.maintenance_mode || 'off'
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
                setMessage({ type: 'success', text: 'Global settings updated successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to update settings.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred while saving.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading Settings...</div>;

    return (
        <div className="bg-gray-100 font-inter -m-2">
            <header className="w-full bg-transparent flex px-8 justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/admin/dashboard" className="text-gray-500 hover:text-[#003399] transition">
                        <i className="fas fa-arrow-left text-xl"></i>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Global Settings</h2>
                        <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mt-1">Core Institutional Identity</p>
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
                                <span className="w-1.5 h-8 bg-[#003399] rounded-full"></span>
                                Institutional Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="md:col-span-2">
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Site / Institution Name</label>
                                    <input type="text" name="site_name" value={settings.site_name} onChange={handleChange} className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#003399] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium" required />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Domain Name</label>
                                    <input
                                        type="url"
                                        name="domain_name"
                                        value={settings.domain_name}
                                        onChange={handleChange}
                                        placeholder="https://guntururban.bank.in"
                                        className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#003399] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium font-mono text-blue-600"
                                    />
                                    <p className="text-xs text-gray-500 mt-2 px-1">Primary URL used for SEO and Sitemap</p>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Primary Support Email</label>
                                    <input type="email" name="contact_email" value={settings.contact_email} onChange={handleChange} className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#003399] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium font-mono" required />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Toll-Free Helpline</label>
                                    <input type="text" name="toll_free" value={settings.toll_free} onChange={handleChange} className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#003399] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-[#003399]" />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Contact Phone</label>
                                    <input type="text" name="contact_phone" value={settings.contact_phone} onChange={handleChange} className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#003399] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-gray-700" />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Maintenance Mode</label>
                                    <div className="relative">
                                        <select
                                            name="maintenance_mode"
                                            value={settings.maintenance_mode}
                                            onChange={handleChange}
                                            className={`w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#003399] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-black uppercase tracking-widest cursor-pointer appearance-none ${settings.maintenance_mode === 'on' ? 'text-amber-600' : 'text-green-600'}`}
                                        >
                                            <option value="off">🟢 System Live</option>
                                            <option value="on">🟠 Under Maintenance</option>
                                        </select>
                                        <i className="fas fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"></i>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Office Address</label>
                                <textarea name="address" value={settings.address} onChange={handleChange} rows="4" className="w-full px-5 py-4 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#003399] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium leading-relaxed text-gray-700" placeholder="Full registered address..."></textarea>
                            </div>
                        </div>

                        <div className="pt-12 pb-4 flex flex-col items-center border-t border-gray-100 gap-6">
                            <button
                                type="submit"
                                disabled={saving}
                                className="group relative bg-[#003399] hover:bg-blue-800 text-white px-16 py-5 rounded-[2rem] font-bold text-xl transition-all shadow-2xl shadow-blue-200/50 disabled:opacity-50 flex items-center gap-4 transform hover:scale-105 active:scale-95 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                                {saving ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save text-2xl"></i>}
                                <span>Update Global Settings</span>
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

export default GlobalSettings;
