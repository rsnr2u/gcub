import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StatisticsSettings = () => {
    const [settings, setSettings] = useState({
        stats_title: '',
        stats_subtitle: '',
        stats_item1_icon: '',
        stats_item1_value: '',
        stats_item1_label: '',
        stats_item2_icon: '',
        stats_item2_value: '',
        stats_item2_label: '',
        stats_item3_icon: '',
        stats_item3_value: '',
        stats_item3_label: '',
        stats_item4_icon: '',
        stats_item4_value: '',
        stats_item4_label: ''
    });

    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/settings');
            const data = await response.json();
            setSettings({
                stats_title: data.stats_title || '',
                stats_subtitle: data.stats_subtitle || '',
                stats_item1_icon: data.stats_item1_icon || '',
                stats_item1_value: data.stats_item1_value || '',
                stats_item1_label: data.stats_item1_label || '',
                stats_item2_icon: data.stats_item2_icon || '',
                stats_item2_value: data.stats_item2_value || '',
                stats_item2_label: data.stats_item2_label || '',
                stats_item3_icon: data.stats_item3_icon || '',
                stats_item3_value: data.stats_item3_value || '',
                stats_item3_label: data.stats_item3_label || '',
                stats_item4_icon: data.stats_item4_icon || '',
                stats_item4_value: data.stats_item4_value || '',
                stats_item4_label: data.stats_item4_label || ''
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
            const response = await fetch('http://localhost:8080/api/admin/settings/update', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.status === 'success') {
                setMessage({ type: 'success', text: 'Statistics settings updated successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to update settings.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred while saving.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading Statistics...</div>;

    const StatInputGroup = ({ num, label }) => (
        <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center font-bold text-xs">{num}</span>
                <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider">{label}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 tracking-widest px-1">FontAwesome Icon</label>
                    <div className="relative">
                        <i className={`fas ${settings[`stats_item${num}_icon`]} absolute left-4 top-1/2 -translate-y-1/2 text-purple-500`}></i>
                        <input
                            type="text"
                            name={`stats_item${num}_icon`}
                            value={settings[`stats_item${num}_icon`]}
                            onChange={handleChange}
                            className="w-full pl-11 pr-5 py-2.5 bg-white border border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-50 outline-none transition-all font-medium text-sm"
                            placeholder="e.g., fa-mobile-alt"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 tracking-widest px-1">Stat Value</label>
                    <input
                        type="text"
                        name={`stats_item${num}_value`}
                        value={settings[`stats_item${num}_value`]}
                        onChange={handleChange}
                        className="w-full px-5 py-2.5 bg-white border border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-50 outline-none transition-all font-bold text-sm"
                        placeholder="e.g., 80M+"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1.5 tracking-widest px-1">Stat Label</label>
                    <input
                        type="text"
                        name={`stats_item${num}_label`}
                        value={settings[`stats_item${num}_label`]}
                        onChange={handleChange}
                        className="w-full px-5 py-2.5 bg-white border border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-50 outline-none transition-all font-medium text-sm"
                        placeholder="e.g., UPI Txns"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-100 font-inter -m-2">
            <header className="w-full bg-transparent flex px-8 justify-between items-center py-4">
                <div className="flex items-center gap-4">
                    <Link to="/admin/dashboard" className="text-gray-500 hover:text-purple-600 transition">
                        <i className="fas fa-arrow-left text-xl"></i>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Home Statistics</h2>
                        <p className="text-xs text-gray-500 uppercase tracking-[0.2em] font-semibold mt-1">Manage Public Trust Indicators</p>
                    </div>
                </div>
            </header>

            <div className="p-8">
                {message.text && (
                    <div className={`p-5 mb-8 rounded-3xl text-sm font-medium shadow-sm border-2 animate-in fade-in slide-in-from-top-4 duration-500 ${message.type === 'success' ? 'bg-green-50 text-green-800 border-green-100' : 'bg-red-50 text-red-800 border-red-100'}`}>
                        <div className="flex items-center gap-3">
                            <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-lg`}></i>
                            {message.text}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-10 space-y-10">
                    <div className="space-y-8">
                        <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl tracking-tight">
                            <span className="w-1.5 h-8 bg-purple-600 rounded-full"></span>
                            Section Content
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Main Heading</label>
                                <input
                                    type="text"
                                    name="stats_title"
                                    value={settings.stats_title}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-50 outline-none transition-all font-bold text-lg"
                                    placeholder="e.g., Trusted by Millions"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Sub-heading / Description</label>
                                <input
                                    type="text"
                                    name="stats_subtitle"
                                    value={settings.stats_subtitle}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-50 outline-none transition-all font-medium text-gray-600 h-full"
                                    placeholder="e.g., Processing transactions securely..."
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl tracking-tight mb-8">
                                <span className="w-1.5 h-8 bg-purple-600 rounded-full"></span>
                                Statistics Grid (4 Items)
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <StatInputGroup num={1} label="First Statistic" />
                                <StatInputGroup num={2} label="Second Statistic" />
                                <StatInputGroup num={3} label="Third Statistic" />
                                <StatInputGroup num={4} label="Fourth Statistic" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 flex border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-5 rounded-3xl font-bold text-lg flex items-center gap-4 transition shadow-xl shadow-purple-100 transform active:scale-95 disabled:opacity-70"
                        >
                            {saving ? (
                                <>
                                    <i className="fas fa-spinner fa-spin text-2xl"></i>
                                    <span>Syncing...</span>
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-sync-alt text-2xl"></i>
                                    <span>Update Statistics</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StatisticsSettings;
