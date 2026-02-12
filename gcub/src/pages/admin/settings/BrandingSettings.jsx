import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BrandingSettings = () => {
    const [settings, setSettings] = useState({
        site_logo: '',
        site_favicon: '',
        site_dark_logo: ''
    });
    const [previews, setPreviews] = useState({
        site_logo: '',
        site_favicon: '',
        site_dark_logo: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState({ key: '' });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/settings');
            const data = await response.json();
            setSettings({
                site_logo: data.site_logo || '',
                site_favicon: data.site_favicon || '',
                site_dark_logo: data.site_dark_logo || ''
            });
            setPreviews({
                site_logo: data.site_logo?.startsWith('/') ? `http://localhost:8080${data.site_logo}` : data.site_logo,
                site_favicon: data.site_favicon?.startsWith('/') ? `http://localhost:8080${data.site_favicon}` : data.site_favicon,
                site_dark_logo: data.site_dark_logo?.startsWith('/') ? `http://localhost:8080${data.site_dark_logo}` : data.site_dark_logo
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching settings:', error);
            setLoading(false);
        }
    };

    const handleFileChange = async (e, key) => {
        const file = e.target.files[0];
        if (!file) return;

        setSaving({ key });
        const formData = new FormData();
        formData.append(key, file);

        try {
            const response = await fetch('http://localhost:8080/api/admin/settings/update', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.status === 'success') {
                const newPath = data.data[key];
                setSettings(prev => ({ ...prev, [key]: newPath }));
                setPreviews(prev => ({ ...prev, [key]: `http://localhost:8080${newPath}` }));
                setMessage({ type: 'success', text: `${key.replace('site_', '').replace('_', ' ')} updated successfully!` });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to upload asset.' });
        } finally {
            setSaving({ key: '' });
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading Assets...</div>;

    return (
        <div className="bg-gray-100 font-inter -m-2">
            <header className="w-full bg-transparent flex px-8 justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/admin/dashboard" className="text-gray-500 hover:text-[#003399] transition">
                        <i className="fas fa-arrow-left text-xl"></i>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Branding & Visual Identity</h2>
                        <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mt-1">Official Assets & Design System</p>
                    </div>
                </div>
            </header>

            <div className="p-8">
                {message.text && (
                    <div className={`p-5 mb-8 rounded-2xl text-sm font-medium shadow-sm transition-all ${message.type === 'success' ? 'bg-green-50 text-green-800 border-2 border-green-200' : 'bg-red-50 text-red-800 border-2 border-red-200'}`}>
                        <div className="flex items-center gap-3">
                            <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-lg`}></i>
                            {message.text}
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-10 space-y-12">
                    <div className="space-y-8">
                        <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl tracking-tight">
                            <span className="w-1.5 h-8 bg-amber-500 rounded-full"></span>
                            Brand Asset Management
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Main Logo Card */}
                            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 group hover:border-[#003399] transition-all cursor-pointer relative overflow-hidden">
                                <input type="file" onChange={(e) => handleFileChange(e, 'site_logo')} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-400 group-hover:scale-105 transition overflow-hidden">
                                    {previews.site_logo ? <img src={previews.site_logo} className="w-full h-full object-contain p-2" alt="Logo" /> : <i className="fas fa-image text-3xl"></i>}
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-gray-800 text-sm">Main Institution Logo</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">PNG, SVG (Transparent)</p>
                                </div>
                                <div className={`mt-2 text-[10px] font-black uppercase tracking-widest bg-[#003399] text-white px-4 py-2 rounded-full shadow-lg ${saving.key === 'site_logo' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition`}>
                                    {saving.key === 'site_logo' ? 'Uploading...' : 'Upload New'}
                                </div>
                            </div>

                            {/* Favicon Card */}
                            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 group hover:border-[#003399] transition-all cursor-pointer relative overflow-hidden">
                                <input type="file" onChange={(e) => handleFileChange(e, 'site_favicon')} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-400 group-hover:scale-105 transition overflow-hidden">
                                    {previews.site_favicon ? <img src={previews.site_favicon} className="w-full h-full object-contain p-4" alt="Favicon" /> : <i className="fas fa-link text-2xl"></i>}
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-gray-800 text-sm">Site Favicon</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">ICO, PNG (32x32)</p>
                                </div>
                                <div className={`mt-2 text-[10px] font-black uppercase tracking-widest bg-[#003399] text-white px-4 py-2 rounded-full shadow-lg ${saving.key === 'site_favicon' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition`}>
                                    {saving.key === 'site_favicon' ? 'Uploading...' : 'Upload New'}
                                </div>
                            </div>

                            {/* Footer Logo Card */}
                            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 group hover:border-[#003399] transition-all cursor-pointer relative overflow-hidden">
                                <input type="file" onChange={(e) => handleFileChange(e, 'site_dark_logo')} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                <div className="w-20 h-20 bg-[#0b1320] rounded-2xl shadow-sm flex items-center justify-center text-gray-400 group-hover:scale-105 transition overflow-hidden">
                                    {previews.site_dark_logo ? <img src={previews.site_dark_logo} className="w-full h-full object-contain p-2" alt="Dark Logo" /> : <i className="fas fa-signature text-3xl"></i>}
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-gray-800 text-sm">Dark Theme Logo</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">For Dark Backgrounds</p>
                                </div>
                                <div className={`mt-2 text-[10px] font-black uppercase tracking-widest bg-[#003399] text-white px-4 py-2 rounded-full shadow-lg ${saving.key === 'site_dark_logo' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition`}>
                                    {saving.key === 'site_dark_logo' ? 'Uploading...' : 'Upload New'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4">
                        <i className="fas fa-info-circle text-blue-500 mt-0.5"></i>
                        <div className="space-y-1">
                            <p className="text-xs text-blue-700 font-bold">Design Consistency</p>
                            <p className="text-[11px] text-blue-600 leading-relaxed font-medium">These assets define the bank's digital footprint. Ensure all uploads meet high-resolution professional standards for a premium customer experience.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandingSettings;
