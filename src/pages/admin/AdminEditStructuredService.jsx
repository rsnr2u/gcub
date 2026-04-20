import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authFetch } from '../../utils/api';
import Swal from 'sweetalert2';

const AdminEditStructuredService = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState({});

    const fetchData = useCallback(async () => {
        if (!slug) return;
        setLoading(true);
        try {
            const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/service-content/${slug}`);
            if (res.ok) {
                const result = await res.json();
                setData(result || {});
            } else {
                Swal.fire('Error', 'Failed to fetch service data', 'error');
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            Swal.fire('Error', 'Error loading data', 'error');
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleInputChange = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const handleJsonChange = (field, index, key, value) => {
        setData(prev => {
            const updatedArray = [...(prev[field] || [])];
            if (key !== null && typeof updatedArray[index] === 'object' && updatedArray[index] !== null) {
                updatedArray[index] = { ...updatedArray[index], [key]: value };
            } else {
                updatedArray[index] = value;
            }
            return { ...prev, [field]: updatedArray };
        });
    };

    const addJsonItem = (field, defaultValue = "") => {
        setData(prev => ({ 
            ...prev, 
            [field]: [...(prev[field] || []), defaultValue] 
        }));
    };

    const removeJsonItem = (field, index) => {
        setData(prev => ({ 
            ...prev, 
            [field]: (prev[field] || []).filter((_, i) => i !== index) 
        }));
    };

    const handleSave = async (e) => {
        if (e) e.preventDefault();
        setSaving(true);
        try {
            const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/service-content/${slug}`, {
                method: 'PUT',
                body: JSON.stringify(data)
            });
            if (res.ok) {
                Swal.fire('Success', 'Service updated successfully', 'success');
            } else {
                Swal.fire('Error', 'Failed to update service', 'error');
            }
        } catch (err) {
            console.error('Save error:', err);
            Swal.fire('Error', 'Error saving data', 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
                <span className="ml-4 text-gray-500 font-medium">Loading Service Configuration...</span>
            </div>
        );
    }

    const renderField = (key, label) => {
        if (!key || key.endsWith('_json')) return null;
        if (['id', 'slug', 'updated_at', 'created_at'].includes(key)) return null;

        const value = data[key] || '';
        const fieldLabel = label || key.replace(/_/g, ' ');

        return (
            <div key={key} className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-1 capitalize">
                    {fieldLabel}
                </label>
                {value.length > 100 ? (
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32 text-sm"
                        value={value}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                    />
                ) : (
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                        value={value}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                    />
                )}
            </div>
        );
    };

    const renderJsonList = (key, label) => {
        const items = data[key];
        if (!items || !Array.isArray(items)) return null;
        
        const sectionLabel = label || key.replace(/_json/g, '').replace(/_/g, ' ');

        return (
            <div key={key} className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-blue-900 uppercase tracking-wider text-xs">{sectionLabel}</h3>
                    <button 
                        type="button" 
                        onClick={() => addJsonItem(key)} 
                        className="text-[10px] bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 font-bold uppercase tracking-tight"
                    >
                        Add Item
                    </button>
                </div>
                <div className="space-y-3">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-start">
                            {item !== null && typeof item === 'object' ? (
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {Object.keys(item).map(k => (
                                        <div key={k} className="flex flex-col">
                                            <span className="text-[9px] text-gray-400 uppercase font-black px-1">{k}</span>
                                            <input
                                                placeholder={k}
                                                className="p-2 border border-gray-200 rounded text-xs w-full focus:border-blue-400 outline-none"
                                                value={item[k] || ''}
                                                onChange={(e) => handleJsonChange(key, idx, k, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <input
                                    className="flex-1 p-2 border border-gray-200 rounded text-xs focus:border-blue-400 outline-none"
                                    value={item || ''}
                                    onChange={(e) => handleJsonChange(key, idx, null, e.target.value)}
                                />
                            )}
                            <button 
                                type="button" 
                                onClick={() => removeJsonItem(key, idx)} 
                                className="text-red-400 hover:text-red-600 p-2 transition-colors"
                                title="Remove Item"
                            >
                                <i className="fas fa-trash-alt text-sm"></i>
                            </button>
                        </div>
                    ))}
                    {items.length === 0 && (
                        <p className="text-xs text-gray-400 italic text-center py-2">No items added yet.</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                        Editing: <span className="text-blue-600">{slug ? slug.replace(/-/g, ' ') : ''}</span>
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">Structured Content Management System</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="px-5 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 font-bold text-sm transition-all"
                    >
                        Back
                    </button>
                    <button 
                        onClick={handleSave} 
                        disabled={saving} 
                        className="px-8 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 font-black text-sm transition-all shadow-lg shadow-blue-100"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <section className="p-8 bg-white rounded-[32px] shadow-sm border border-slate-100">
                        <h2 className="text-md font-black text-slate-800 mb-6 uppercase tracking-widest flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
                                <i className="fas fa-search"></i>
                            </span>
                            Search Engine Optimization
                        </h2>
                        {renderField('meta_title', 'Page Title (SEO)')}
                        {renderField('meta_description', 'Meta Description')}
                        {renderField('meta_keywords', 'Keywords')}
                    </section>

                    <section className="p-8 bg-white rounded-[32px] shadow-sm border border-slate-100">
                        <h2 className="text-md font-black text-slate-800 mb-6 uppercase tracking-widest flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
                                <i className="fas fa-heading"></i>
                            </span>
                            Hero & Introduction
                        </h2>
                        {renderField('hero_title')}
                        {renderField('hero_description')}
                        {renderField('intro_title')}
                        {renderField('intro_description')}
                        {renderField('intro_desc_1', 'Intro Paragraph 1')}
                        {renderField('intro_desc_2', 'Intro Paragraph 2')}
                    </section>
                    
                    <section className="p-8 bg-white rounded-[32px] shadow-sm border border-slate-100">
                        <h2 className="text-md font-black text-slate-800 mb-6 uppercase tracking-widest flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
                                <i className="fas fa-list-check"></i>
                            </span>
                            Key Service Details
                        </h2>
                        {renderField('feature_1_title')}
                        {renderField('feature_1_desc')}
                        {renderField('feature_2_title')}
                        {renderField('feature_2_desc')}
                        {renderField('eligibility_text')}
                        {renderField('neft_info')}
                        {renderField('rtgs_info')}
                        {renderField('registration_info')}
                    </section>
                </div>

                <div className="space-y-8">
                    <section className="p-8 bg-white rounded-[32px] shadow-sm border border-slate-100">
                        <h2 className="text-md font-black text-slate-800 mb-6 uppercase tracking-widest flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center text-xs">
                                <i className="fas fa-columns"></i>
                            </span>
                            Sidebar & Contact Info
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                            {renderField('play_store_url')}
                            {renderField('app_store_url')}
                            {renderField('helpdesk_phone')}
                            {renderField('helpline_number')}
                            {renderField('sidebar_locator_link')}
                            {renderField('sidebar_emergency_phone')}
                            {renderField('sidebar_balance_enquiry')}
                            {renderField('sidebar_card_blocking')}
                            {renderField('sidebar_download_url')}
                            {renderField('sidebar_support_phone')}
                            {renderField('sidebar_phone')}
                            {renderField('sidebar_status_url')}
                        </div>
                        {renderField('sidebar_note')}
                        {renderField('sidebar_locator_text')}
                        {renderField('sidebar_dbt_text')}
                        {renderField('sidebar_mandate_text')}
                        {renderField('sidebar_mms_text')}
                        {renderField('sidebar_assistance_text')}
                        {renderField('sidebar_download_text')}
                        {renderField('sidebar_lost_card_text')}
                        {renderField('sidebar_ifsc_text')}
                    </section>

                    <section className="p-8 bg-white rounded-[32px] shadow-sm border border-slate-100">
                        <h2 className="text-md font-black text-slate-800 mb-6 uppercase tracking-widest flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
                                <i className="fas fa-database"></i>
                            </span>
                            Dynamic Lists (JSON)
                        </h2>
                        {Object.keys(data)
                            .filter(k => k.endsWith('_json'))
                            .map(k => renderJsonList(k))}
                        {Object.keys(data).filter(k => k.endsWith('_json')).length === 0 && (
                            <p className="text-sm text-gray-400 text-center py-4 italic">No dynamic lists found for this service.</p>
                        )}
                    </section>
                </div>
            </form>
        </div>
    );
};

export default AdminEditStructuredService;
