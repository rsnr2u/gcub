import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { authFetch } from '../../utils/api';
import Swal from 'sweetalert2';

const RenderToggle = ({ data, sectionKey, onChange }) => (
    <label className="flex items-center cursor-pointer">
        <input 
            type="checkbox" 
            className="sr-only peer"
            checked={data.section_visibility_json?.[sectionKey] !== false}
            onChange={(e) => onChange('section_visibility_json', sectionKey, e.target.checked)}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#003399]"></div>
    </label>
);

const SectionHeader = ({ color, title, sectionKey, data, onChange }) => (
    <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-50">
        <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl tracking-tight uppercase">
            <span className={`w-1.5 h-8 ${color} rounded-full`}></span>
            {title}
        </h3>
        {sectionKey && <RenderToggle data={data} sectionKey={sectionKey} onChange={onChange} />}
    </div>
);

const AdminEditStructuredService = () => {
    const { slug: urlSlug } = useParams();
    const slug = urlSlug === 'rupay' ? 'rupay-cards' : urlSlug;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState({});
    const [uploadingImage, setUploadingImage] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const fetchData = useCallback(async () => {
        if (!slug) return;
        setLoading(true);
        try {
            const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/service-content/${slug}`);
            if (res.ok) {
                const result = await res.json();
                
                // Robust Data Normalization for Structured Editor
                const normalized = { ...result };
                
                // 1. Sidebar Links: Convert legacy object format {"url": "label"} to array [{label, url}]
                if (normalized.sidebar_links_json && !Array.isArray(normalized.sidebar_links_json)) {
                    normalized.sidebar_links_json = Object.entries(normalized.sidebar_links_json).map(([url, label]) => ({ 
                        label: String(label), 
                        url: String(url) 
                    }));
                }

                // 2. Features: Ensure it's an array
                if (normalized.features_json && !Array.isArray(normalized.features_json)) {
                    normalized.features_json = [];
                }

                // 3. Txn Limits: Ensure it's an array
                if (normalized.txn_limits_json && !Array.isArray(normalized.txn_limits_json)) {
                    normalized.txn_limits_json = [];
                }

                // 4. RuPay Specifics: Ensure arrays
                if (normalized.card_types_json && !Array.isArray(normalized.card_types_json)) {
                    normalized.card_types_json = [];
                }
                if (normalized.safety_tips_json && !Array.isArray(normalized.safety_tips_json)) {
                    normalized.safety_tips_json = [];
                }

                // 5. UPI Specifics: Ensure arrays
                if (normalized.benefits_json && !Array.isArray(normalized.benefits_json)) {
                    normalized.benefits_json = [];
                }
                if (normalized.registration_steps_json && !Array.isArray(normalized.registration_steps_json)) {
                    normalized.registration_steps_json = [];
                }

                // 6. Common JSON Arrays
                if (normalized.highlights_json && !Array.isArray(normalized.highlights_json)) {
                    normalized.highlights_json = [];
                }
                if (normalized.sidebar_tips_json && !Array.isArray(normalized.sidebar_tips_json)) {
                    normalized.sidebar_tips_json = [];
                }

                // 6. Ensure nested objects are not null for the controlled inputs
                if (normalized.assistance_box_json === null || typeof normalized.assistance_box_json !== 'object') normalized.assistance_box_json = {};
                if (normalized.downloads_box_json === null || typeof normalized.downloads_box_json !== 'object') normalized.downloads_box_json = {};
                if (normalized.helpbox_json === null || typeof normalized.helpbox_json !== 'object') normalized.helpbox_json = {};
                if (normalized.sidebar_promo_json === null || typeof normalized.sidebar_promo_json !== 'object') normalized.sidebar_promo_json = {};

                // 7. NEFT/RTGS Specifics
                if (normalized.comparison_json && !Array.isArray(normalized.comparison_json)) {
                    normalized.comparison_json = [];
                }
                if (normalized.req_info_json && !Array.isArray(normalized.req_info_json)) {
                    normalized.req_info_json = [];
                }

                setData(normalized);
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
            if (key !== null) {
                // If key is provided, ensure we are updating an object
                const currentItem = (typeof updatedArray[index] === 'object' && updatedArray[index] !== null) 
                    ? updatedArray[index] 
                    : {};
                updatedArray[index] = { ...currentItem, [key]: value };
            } else {
                // Otherwise update as primitive
                updatedArray[index] = value;
            }
            return { ...prev, [field]: updatedArray };
        });
    };

    const handleNestedJsonChange = (field, subKey, value) => {
        setData(prev => ({
            ...prev,
            [field]: { ...(prev[field] || {}), [subKey]: value }
        }));
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

    const handleImageUpload = async (e, fieldPath) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingImage(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/media/upload`, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.status === 'success') {
                if (fieldPath === 'sidebar_promo_json.image') {
                    handleNestedJsonChange('sidebar_promo_json', 'image', result.file_name);
                }
            } else {
                setMessage({ text: 'Upload failed: ' + result.message, type: 'error' });
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setMessage({ text: 'Upload error occurred', type: 'error' });
        } finally {
            setUploadingImage(false);
        }
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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003399]"></div>
                <span className="ml-4 text-gray-500 font-medium">Loading Service Configuration...</span>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 font-inter -m-2">
            <header className="w-full bg-transparent flex px-8 py-4 justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/admin/content/services" className="text-gray-500 hover:text-[#003399] transition">
                        <i className="fas fa-arrow-left text-xl"></i>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Structured Service Editor</h2>
                        <p className="text-xs text-gray-500">Editing: <span className="font-bold text-[#003399] uppercase">{slug?.replace(/-/g, ' ')}</span></p>
                    </div>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-[#003399] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                >
                    {saving ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-cloud-upload-alt mr-2"></i>}
                    Save Changes
                </button>
            </header>

            <div className="p-8">
                {message.text && (
                    <div className={`mb-6 p-4 rounded-2xl text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                        <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                        {message.text}
                    </div>
                )}
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-10 space-y-16">
                    
                    {/* SEO Section */}
                    <section>
                        <SectionHeader color="bg-blue-600" title="Search Engine Optimization" data={data} onChange={handleNestedJsonChange} />
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
                            <div className="md:col-span-2 space-y-6">
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase mb-2 tracking-widest">Page Title (Meta)</label>
                                    <input 
                                        className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:border-[#003399] outline-none transition-all font-medium"
                                        value={data.meta_title || ''}
                                        onChange={(e) => handleInputChange('meta_title', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase mb-2 tracking-widest">Keywords</label>
                                    <input 
                                        className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:border-[#003399] outline-none transition-all font-medium"
                                        value={data.meta_keywords || ''}
                                        onChange={(e) => handleInputChange('meta_keywords', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-[11px] font-black text-gray-400 uppercase mb-2 tracking-widest">Meta Description</label>
                                <textarea 
                                    className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:border-[#003399] outline-none transition-all font-medium h-full min-h-[120px]"
                                    value={data.meta_description || ''}
                                    onChange={(e) => handleInputChange('meta_description', e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Hero Section */}
                    <section>
                        <SectionHeader color="bg-indigo-600" title="Hero Banner Section" sectionKey="hero" data={data} onChange={handleNestedJsonChange} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[11px] font-black text-gray-400 uppercase mb-2 tracking-widest">Hero Title</label>
                                <input 
                                    className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:border-indigo-500 outline-none transition-all font-bold text-gray-800"
                                    value={data.hero_title || ''}
                                    onChange={(e) => handleInputChange('hero_title', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-black text-gray-400 uppercase mb-2 tracking-widest">Breadcrumb Text</label>
                                <input 
                                    className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:border-indigo-500 outline-none transition-all font-medium"
                                    value={data.hero_breadcrumb_text || ''}
                                    onChange={(e) => handleInputChange('hero_breadcrumb_text', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[11px] font-black text-gray-400 uppercase mb-2 tracking-widest">Hero Sub-Description</label>
                                <textarea 
                                    className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:border-indigo-500 outline-none transition-all font-medium h-24"
                                    value={data.hero_description || ''}
                                    onChange={(e) => handleInputChange('hero_description', e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Intro Section */}
                    <section>
                        <SectionHeader color="bg-teal-600" title="Intro Narrative Section" sectionKey="intro" data={data} onChange={handleNestedJsonChange} />
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase mb-2 tracking-widest">Intro Section Title</label>
                                    <input 
                                        className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:border-teal-500 outline-none transition-all font-bold"
                                        value={data.intro_title || ''}
                                        onChange={(e) => handleInputChange('intro_title', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase mb-2 tracking-widest">Intro Main Heading</label>
                                    <input 
                                        className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:border-teal-500 outline-none transition-all font-bold"
                                        value={data.intro_heading || ''}
                                        onChange={(e) => handleInputChange('intro_heading', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] font-black text-gray-400 uppercase mb-2 tracking-widest">Narrative Description</label>
                                <textarea 
                                    className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-teal-500 outline-none transition-all font-medium h-48 leading-relaxed"
                                    value={data.intro_description || ''}
                                    onChange={(e) => handleInputChange('intro_description', e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Toll Free Specific Helpline Section */}
                    {slug === 'toll-free-banking' && (
                        <section className="animate-in fade-in slide-in-from-bottom-4">
                            <SectionHeader color="bg-[#E61111]" title="Helpline & Dynamic Content Configuration" data={data} onChange={handleNestedJsonChange} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div className="p-6 bg-red-50/20 border-2 border-red-100 rounded-[2rem]">
                                        <label className="block text-[11px] font-black text-gray-400 uppercase mb-3 tracking-widest">Primary Helpline Number</label>
                                        <input 
                                            className="w-full px-5 py-4 bg-white border-2 border-red-100 rounded-2xl focus:border-[#E61111] outline-none transition-all font-black text-2xl text-[#003399]"
                                            value={data.helpline_number || ''}
                                            onChange={(e) => handleInputChange('helpline_number', e.target.value)}
                                            placeholder="e.g. 1800 425 8873"
                                        />
                                    </div>

                                    {/* Balance Enquiry Editor */}
                                    <div className="p-8 bg-blue-50/30 rounded-[2rem] border border-blue-100 space-y-6">
                                        <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-wallet"></i>
                                            Balance Enquiry Card
                                        </h4>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Card Title</label>
                                                <input 
                                                    className="w-full px-4 py-3 bg-white border-2 border-blue-50 rounded-xl focus:border-blue-500 outline-none font-bold"
                                                    value={data.balance_enquiry_json?.title || ''}
                                                    onChange={(e) => handleNestedJsonChange('balance_enquiry_json', 'title', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Description</label>
                                                <textarea 
                                                    className="w-full px-4 py-3 bg-white border-2 border-blue-50 rounded-xl focus:border-blue-500 outline-none text-xs h-20"
                                                    value={data.balance_enquiry_json?.description || ''}
                                                    onChange={(e) => handleNestedJsonChange('balance_enquiry_json', 'description', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Phone Number</label>
                                                <input 
                                                    className="w-full px-4 py-3 bg-white border-2 border-blue-50 rounded-xl focus:border-blue-500 outline-none font-black text-[#003399]"
                                                    value={data.balance_enquiry_json?.phone || ''}
                                                    onChange={(e) => handleNestedJsonChange('balance_enquiry_json', 'phone', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Any Branch Banking Specific Sections */}
                    {slug === 'any-branch-banking' && (
                        <section className="animate-in fade-in slide-in-from-bottom-4">
                            <SectionHeader color="bg-amber-600" title="Any Branch Banking Configuration" data={data} onChange={handleNestedJsonChange} />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-6">
                                        <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-exclamation-circle"></i>
                                            Structured Guidelines List
                                        </h4>
                                        <div className="space-y-6">
                                            {(data.guidelines_json || []).map((item, idx) => (
                                                <div key={idx} className="p-5 bg-white/5 border border-white/10 rounded-2xl relative group">
                                                    <button onClick={() => removeJsonItem('guidelines_json', idx)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm z-10"><i className="fas fa-times text-[10px]"></i></button>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="block text-[9px] font-black text-slate-500 uppercase mb-1">Guideline Heading</label>
                                                            <input 
                                                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-amber-500 outline-none font-bold text-sm text-amber-100"
                                                                value={item.title || ''}
                                                                onChange={(e) => handleJsonChange('guidelines_json', idx, 'title', e.target.value)}
                                                                placeholder="e.g. Self Withdrawal"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[9px] font-black text-slate-500 uppercase mb-1">Description</label>
                                                            <textarea 
                                                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-amber-500 outline-none text-xs text-slate-400 h-16"
                                                                value={item.desc || ''}
                                                                onChange={(e) => handleJsonChange('guidelines_json', idx, 'desc', e.target.value)}
                                                                placeholder="Enter detail description..."
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button 
                                                onClick={() => addJsonItem('guidelines_json', {title: '', desc: ''})}
                                                className="w-full py-3 border-2 border-dashed border-white/10 rounded-2xl text-gray-500 text-[10px] font-black uppercase hover:border-amber-500/50 hover:text-amber-400 transition"
                                            >
                                                + Add Structured Guideline
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-6">
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">3-Column Transaction Table</h4>
                                        <div className="space-y-4">
                                            {(data.txn_table_json || []).map((row, idx) => (
                                                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 relative group shadow-sm">
                                                    <button onClick={() => removeJsonItem('txn_table_json', idx)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm z-10"><i className="fas fa-times text-[10px]"></i></button>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div>
                                                            <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">Transaction Type</label>
                                                            <input 
                                                                className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-black text-blue-900"
                                                                value={row.type || ''}
                                                                onChange={(e) => handleJsonChange('txn_table_json', idx, 'type', e.target.value)}
                                                                placeholder="e.g. Cash Deposit"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">Home Branch</label>
                                                                <input 
                                                                    className="w-full px-3 py-2 bg-green-50/50 border border-green-100 rounded-lg text-xs font-bold text-green-700"
                                                                    value={row.home || ''}
                                                                    onChange={(e) => handleJsonChange('txn_table_json', idx, 'home', e.target.value)}
                                                                    placeholder="e.g. Free"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">Non-Home Branch</label>
                                                                <input 
                                                                    className="w-full px-3 py-2 bg-blue-50/50 border border-blue-100 rounded-lg text-xs font-bold text-blue-700"
                                                                    value={row.non_home || ''}
                                                                    onChange={(e) => handleJsonChange('txn_table_json', idx, 'non_home', e.target.value)}
                                                                    placeholder="e.g. Limits apply"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button 
                                                onClick={() => addJsonItem('txn_table_json', {type: '', home: '', non_home: ''})}
                                                className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 text-[10px] font-black uppercase hover:border-blue-300 hover:text-blue-500 transition"
                                            >
                                                + Add Table Row
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="p-8 bg-blue-900 rounded-[2.5rem] text-white space-y-4 shadow-xl">
                                            <h4 className="text-xs font-black text-blue-300 uppercase tracking-widest">Sidebar Locator & Support</h4>
                                            <div>
                                                <label className="block text-[10px] font-black text-blue-700 uppercase mb-2">Locator Sidebar Text</label>
                                                <textarea 
                                                    className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-blue-400 transition text-sm h-20"
                                                    value={data.sidebar_locator_text || ''}
                                                    onChange={(e) => handleInputChange('sidebar_locator_text', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-blue-700 uppercase mb-2">Sidebar Phone/Action</label>
                                                <input 
                                                    className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-blue-400 transition font-black text-sm text-blue-200 uppercase tracking-widest"
                                                    value={data.sidebar_phone || ''}
                                                    onChange={(e) => handleInputChange('sidebar_phone', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* APBS Service Specific Section */}
                    {slug === 'apbs-service' && (
                        <section className="animate-in fade-in slide-in-from-bottom-4">
                            <SectionHeader color="bg-emerald-600" title="APBS Service Configuration" data={data} onChange={handleNestedJsonChange} />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-check-circle"></i>
                                            For Beneficiaries
                                        </h4>
                                        <div className="space-y-3">
                                            {(data.beneficiary_benefits_json || []).map((item, idx) => (
                                                <div key={idx} className="flex gap-2 group">
                                                    <input 
                                                        className="flex-1 px-4 py-2 bg-white border-2 border-gray-100 rounded-xl focus:border-emerald-500 outline-none font-medium text-sm"
                                                        value={item}
                                                        onChange={(e) => handleJsonChange('beneficiary_benefits_json', idx, null, e.target.value)}
                                                    />
                                                    <button onClick={() => removeJsonItem('beneficiary_benefits_json', idx)} className="text-gray-300 hover:text-red-500 transition px-2"><i className="fas fa-trash-alt"></i></button>
                                                </div>
                                            ))}
                                            <button 
                                                onClick={() => addJsonItem('beneficiary_benefits_json', '')}
                                                className="w-full py-2 bg-emerald-50/50 border-2 border-dashed border-emerald-100 rounded-xl text-emerald-400 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-600 transition"
                                            >
                                                + Add Benefit Item
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-blue-50/30 rounded-[2.5rem] border border-blue-100 space-y-6">
                                        <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-bullseye"></i>
                                            Key Objectives
                                        </h4>
                                        <div className="space-y-3">
                                            {(data.objectives_json || []).map((item, idx) => (
                                                <div key={idx} className="flex gap-2 group">
                                                    <input 
                                                        className="flex-1 px-4 py-2 bg-white border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none font-medium text-sm"
                                                        value={item}
                                                        onChange={(e) => handleJsonChange('objectives_json', idx, null, e.target.value)}
                                                    />
                                                    <button onClick={() => removeJsonItem('objectives_json', idx)} className="text-gray-300 hover:text-red-500 transition px-2"><i className="fas fa-trash-alt"></i></button>
                                                </div>
                                            ))}
                                            <button 
                                                onClick={() => addJsonItem('objectives_json', '')}
                                                className="w-full py-2 bg-blue-50/50 border-2 border-dashed border-blue-100 rounded-xl text-blue-400 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition"
                                            >
                                                + Add Objective Item
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100 space-y-6">
                                        <h4 className="text-xs font-black text-amber-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <i className="fas fa-link"></i>
                                            Linking Steps
                                        </h4>
                                        <div className="space-y-3">
                                            {(data.linking_steps_json || []).map((item, idx) => (
                                                <div key={idx} className="flex gap-2 group">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-white font-black text-[10px] shrink-0">
                                                        {idx + 1}
                                                    </div>
                                                    <input 
                                                        className="flex-1 px-4 py-2 bg-white border-2 border-amber-100 rounded-xl focus:border-amber-500 outline-none font-bold text-xs"
                                                        value={item}
                                                        onChange={(e) => handleJsonChange('linking_steps_json', idx, null, e.target.value)}
                                                    />
                                                    <button onClick={() => removeJsonItem('linking_steps_json', idx)} className="text-amber-200 hover:text-red-500 transition px-2"><i className="fas fa-trash-alt"></i></button>
                                                </div>
                                            ))}
                                            <button 
                                                onClick={() => addJsonItem('linking_steps_json', '')}
                                                className="w-full py-2 bg-amber-50/50 border-2 border-dashed border-amber-200 rounded-xl text-amber-400 text-[10px] font-black uppercase tracking-widest hover:bg-amber-100 transition"
                                            >
                                                + Add Step
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-4 shadow-xl">
                                            <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                                                <i className="fas fa-satellite-dish"></i>
                                                Sidebar DBT Information
                                            </h4>
                                            <div>
                                                <label className="block text-[9px] font-black text-slate-500 uppercase mb-2">DBT Description</label>
                                                <textarea 
                                                    className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-blue-500 transition text-sm h-24"
                                                    value={data.sidebar_dbt_text || ''}
                                                    onChange={(e) => handleInputChange('sidebar_dbt_text', e.target.value)}
                                                />
                                            </div>

                                            <div className="space-y-4 mt-6">
                                                <label className="block text-[9px] font-black text-slate-500 uppercase mb-2 tracking-widest">Sidebar Benefit Items (with Icons)</label>
                                                {(data.sidebar_benefits_json || []).map((item, idx) => (
                                                    <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5 relative group">
                                                        <button onClick={() => removeJsonItem('sidebar_benefits_json', idx)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm z-10"><i className="fas fa-times text-[10px]"></i></button>
                                                        <div className="flex gap-3">
                                                            <div className="w-20">
                                                                <label className="block text-[8px] font-black text-slate-500 uppercase mb-1">Icon</label>
                                                                <input 
                                                                    className="w-full px-2 py-1.5 bg-white/10 border border-white/10 rounded text-[10px] font-mono text-blue-300"
                                                                    value={item.icon || ''}
                                                                    onChange={(e) => handleJsonChange('sidebar_benefits_json', idx, 'icon', e.target.value)}
                                                                    placeholder="e.g. university"
                                                                />
                                                            </div>
                                                            <div className="flex-1">
                                                                <label className="block text-[8px] font-black text-slate-500 uppercase mb-1">Benefit Title</label>
                                                                <input 
                                                                    className="w-full px-2 py-1.5 bg-white/10 border border-white/10 rounded text-[10px] font-bold"
                                                                    value={item.title || ''}
                                                                    onChange={(e) => handleJsonChange('sidebar_benefits_json', idx, 'title', e.target.value)}
                                                                    placeholder="e.g. LPG Subsidy"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button 
                                                    onClick={() => addJsonItem('sidebar_benefits_json', {icon: 'university', title: ''})}
                                                    className="w-full py-2 bg-white/5 border border-dashed border-white/10 rounded-xl text-white/30 text-[10px] font-black uppercase hover:bg-white/10 transition"
                                                >
                                                    + Add Sidebar Benefit Item
                                                </button>
                                            </div>

                                            <div className="pt-4 border-t border-white/5">
                                                <label className="block text-[9px] font-black text-slate-500 uppercase mb-2">UIDAI Status URL</label>
                                                <input 
                                                    className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-blue-500 transition font-mono text-xs text-blue-300"
                                                    value={data.sidebar_status_url || ''}
                                                    onChange={(e) => handleInputChange('sidebar_status_url', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* NACH Service Configuration */}
                    {slug === 'nach-service' && (
                        <section className="animate-in fade-in slide-in-from-bottom-4">
                            <SectionHeader color="bg-blue-600" title="NACH Service Configuration" data={data} onChange={handleNestedJsonChange} />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-8 bg-green-50/50 rounded-[2.5rem] border border-green-100 space-y-4">
                                            <h4 className="text-[10px] font-black text-green-700 uppercase tracking-widest flex items-center gap-2">
                                                <i className="fas fa-arrow-down"></i>
                                                NACH Credit Items
                                            </h4>
                                            <div className="space-y-2">
                                                {(data.nach_credit_json || []).map((item, idx) => (
                                                    <div key={idx} className="flex gap-2 group">
                                                        <input 
                                                            className="flex-1 px-3 py-1.5 bg-white border border-green-100 rounded-lg text-xs font-bold"
                                                            value={item}
                                                            onChange={(e) => handleJsonChange('nach_credit_json', idx, null, e.target.value)}
                                                        />
                                                        <button onClick={() => removeJsonItem('nach_credit_json', idx)} className="text-green-200 hover:text-red-500 transition px-1"><i className="fas fa-times"></i></button>
                                                    </div>
                                                ))}
                                                <button onClick={() => addJsonItem('nach_credit_json', '')} className="w-full py-2 bg-white/50 border border-dashed border-green-200 rounded-lg text-green-400 text-[9px] font-black uppercase hover:bg-green-50 transition">+ Add Item</button>
                                            </div>
                                        </div>
                                        <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100 space-y-4">
                                            <h4 className="text-[10px] font-black text-blue-700 uppercase tracking-widest flex items-center gap-2">
                                                <i className="fas fa-arrow-up"></i>
                                                NACH Debit Items
                                            </h4>
                                            <div className="space-y-2">
                                                {(data.nach_debit_json || []).map((item, idx) => (
                                                    <div key={idx} className="flex gap-2 group">
                                                        <input 
                                                            className="flex-1 px-3 py-1.5 bg-white border border-blue-100 rounded-lg text-xs font-bold"
                                                            value={item}
                                                            onChange={(e) => handleJsonChange('nach_debit_json', idx, null, e.target.value)}
                                                        />
                                                        <button onClick={() => removeJsonItem('nach_debit_json', idx)} className="text-blue-200 hover:text-red-500 transition px-1"><i className="fas fa-times"></i></button>
                                                    </div>
                                                ))}
                                                <button onClick={() => addJsonItem('nach_debit_json', '')} className="w-full py-2 bg-white/50 border border-dashed border-blue-200 rounded-lg text-blue-400 text-[9px] font-black uppercase hover:bg-blue-50 transition">+ Add Item</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-6">
                                        <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-question-circle"></i>
                                            Why Use NACH? (Structured Cards)
                                        </h4>
                                        <div className="grid grid-cols-1 gap-4">
                                            {(data.why_use_nach_json || []).map((item, idx) => (
                                                <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-2xl relative group">
                                                    <button onClick={() => removeJsonItem('why_use_nach_json', idx)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm z-10"><i className="fas fa-times text-[10px]"></i></button>
                                                    <div className="space-y-3">
                                                        <input 
                                                            className="w-full px-3 py-1.5 bg-white/10 border border-white/10 rounded-lg text-xs font-black text-blue-300"
                                                            value={item.title || ''}
                                                            onChange={(e) => handleJsonChange('why_use_nach_json', idx, 'title', e.target.value)}
                                                            placeholder="Card Title (e.g. Reliable)"
                                                        />
                                                        <textarea 
                                                            className="w-full px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] text-slate-400 h-16"
                                                            value={item.desc || ''}
                                                            onChange={(e) => handleJsonChange('why_use_nach_json', idx, 'desc', e.target.value)}
                                                            placeholder="Card Description..."
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            <button 
                                                onClick={() => addJsonItem('why_use_nach_json', {title: '', desc: ''})}
                                                className="w-full py-3 border-2 border-dashed border-white/10 rounded-2xl text-blue-500/50 text-[10px] font-black uppercase hover:border-blue-500 hover:text-blue-500 transition"
                                            >
                                                + Add Reason Card
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 space-y-6">
                                        <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-id-card"></i>
                                            Sidebar Mandate Management
                                        </h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-[9px] font-black text-slate-400 uppercase mb-2 tracking-widest">Main Mandate Text</label>
                                                <textarea 
                                                    className="w-full px-4 py-3 bg-white border border-blue-100 rounded-xl text-xs font-medium h-20"
                                                    value={data.sidebar_mandate_text || ''}
                                                    onChange={(e) => handleInputChange('sidebar_mandate_text', e.target.value)}
                                                />
                                            </div>
                                            <div className="p-6 bg-white rounded-2xl border border-blue-100 space-y-4 shadow-sm">
                                                <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Mandate Form Download Card</h5>
                                                <div className="space-y-3">
                                                    <input 
                                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-black"
                                                        value={data.mandate_form_json?.title || ''}
                                                        onChange={(e) => handleNestedJsonChange('mandate_form_json', 'title', e.target.value)}
                                                        placeholder="Card Title (e.g. DOWNLOAD THE FORM)"
                                                    />
                                                    <textarea 
                                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] h-16"
                                                        value={data.mandate_form_json?.desc || ''}
                                                        onChange={(e) => handleNestedJsonChange('mandate_form_json', 'desc', e.target.value)}
                                                        placeholder="Card Description..."
                                                    />
                                                    <input 
                                                        className="w-full px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg text-[10px] font-mono text-blue-600"
                                                        value={data.mandate_form_json?.url || ''}
                                                        onChange={(e) => handleNestedJsonChange('mandate_form_json', 'url', e.target.value)}
                                                        placeholder="Download URL"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-tasks"></i>
                                            MMS Service Sidebar
                                        </h4>
                                        <textarea 
                                            className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-medium h-32 leading-relaxed"
                                            value={data.sidebar_mms_text || ''}
                                            onChange={(e) => handleInputChange('sidebar_mms_text', e.target.value)}
                                            placeholder="Enter MMS service details..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* NEFT/RTGS Service Configuration */}
                    {slug === 'neft-rtgs' && (
                        <section className="animate-in fade-in slide-in-from-bottom-4">
                            <SectionHeader color="bg-blue-900" title="NEFT / RTGS Service Configuration" data={data} onChange={handleNestedJsonChange} />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    {/* NEFT & RTGS Info */}
                                    <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 space-y-6">
                                        <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-university"></i>
                                            NEFT (National Electronic Funds Transfer)
                                        </h4>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">NEFT Description</label>
                                            <textarea 
                                                className="w-full px-5 py-3 bg-white border-2 border-gray-100 rounded-2xl focus:border-blue-900 outline-none text-sm h-32 leading-relaxed"
                                                value={data.neft_info || ''}
                                                onChange={(e) => handleInputChange('neft_info', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-blue-500 uppercase mb-2">NEFT Note Box (Blue)</label>
                                            <input 
                                                className="w-full px-5 py-3 bg-blue-50/50 border-2 border-blue-100 rounded-2xl focus:border-blue-900 outline-none text-xs font-medium"
                                                value={data.neft_note || ''}
                                                onChange={(e) => handleInputChange('neft_note', e.target.value)}
                                                placeholder="e.g. Note: NEFT transactions are settled in batches."
                                            />
                                        </div>
                                    </div>

                                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-bolt"></i>
                                            RTGS (Real Time Gross Settlement)
                                        </h4>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">RTGS Description</label>
                                            <textarea 
                                                className="w-full px-5 py-3 bg-white border-2 border-gray-100 rounded-2xl focus:border-blue-900 outline-none text-sm h-32 leading-relaxed"
                                                value={data.rtgs_info || ''}
                                                onChange={(e) => handleInputChange('rtgs_info', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-red-500 uppercase mb-2">RTGS Note Box (Red)</label>
                                            <input 
                                                className="w-full px-5 py-3 bg-red-50/50 border-2 border-red-100 rounded-2xl focus:border-red-900 outline-none text-xs font-medium"
                                                value={data.rtgs_note || ''}
                                                onChange={(e) => handleInputChange('rtgs_note', e.target.value)}
                                                placeholder="e.g. Minimum Limit: RTGS is ₹ 2,00,000"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    {/* Comparison Table */}
                                    <div className="p-8 bg-blue-900 rounded-[2.5rem] text-white space-y-6 shadow-xl">
                                        <h4 className="text-xs font-black text-blue-300 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-columns"></i>
                                            Comparison Table
                                        </h4>
                                        <div className="space-y-4">
                                            {(data.comparison_json || []).map((row, idx) => (
                                                <div key={idx} className="bg-white/5 p-5 rounded-2xl border border-white/10 relative group">
                                                    <button onClick={() => removeJsonItem('comparison_json', idx)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm z-10"><i className="fas fa-times text-[10px]"></i></button>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div>
                                                            <label className="block text-[9px] font-black text-blue-400 uppercase mb-1">Feature</label>
                                                            <input className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-xs font-black text-white" value={row.feature || ''} onChange={(e) => handleJsonChange('comparison_json', idx, 'feature', e.target.value)} />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-[9px] font-black text-blue-400 uppercase mb-1">NEFT Value</label>
                                                                <input className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-xs" value={row.neft || ''} onChange={(e) => handleJsonChange('comparison_json', idx, 'neft', e.target.value)} />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[9px] font-black text-blue-400 uppercase mb-1">RTGS Value</label>
                                                                <input className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-xs" value={row.rtgs || ''} onChange={(e) => handleJsonChange('comparison_json', idx, 'rtgs', e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button onClick={() => addJsonItem('comparison_json', {feature: '', neft: '', rtgs: ''})} className="w-full py-3 border-2 border-dashed border-white/10 rounded-2xl text-blue-400 text-[10px] font-black uppercase hover:border-blue-400 transition">+ Add Comparison Row</button>
                                        </div>
                                    </div>

                                    {/* Information Required */}
                                    <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-6">
                                        <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest">Information Required Section</h4>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Section description</label>
                                            <textarea 
                                                className="w-full px-5 py-3 bg-white border border-gray-200 rounded-2xl text-xs h-20"
                                                value={data.req_info_description || ''}
                                                onChange={(e) => handleInputChange('req_info_description', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="block text-[10px] font-black text-gray-400 uppercase">Required Items List</label>
                                            {(data.req_info_json || []).map((item, idx) => (
                                                <div key={idx} className="flex gap-2 group">
                                                    <input 
                                                        className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold"
                                                        value={item}
                                                        onChange={(e) => handleJsonChange('req_info_json', idx, null, e.target.value)}
                                                    />
                                                    <button onClick={() => removeJsonItem('req_info_json', idx)} className="text-gray-300 hover:text-red-500 transition px-1"><i className="fas fa-trash-alt"></i></button>
                                                </div>
                                            ))}
                                            <button onClick={() => addJsonItem('req_info_json', '')} className="w-full py-2 bg-white border-2 border-dashed border-gray-200 rounded-xl text-[10px] font-black uppercase text-gray-400 hover:text-blue-500 transition">+ Add Item</button>
                                        </div>
                                    </div>

                                    {/* Sidebar Extras */}
                                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-6">
                                        <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-search-location"></i>
                                            Sidebar & Related Services
                                        </h4>
                                        <div>
                                            <label className="block text-[9px] font-black text-slate-500 uppercase mb-2">IFSC Finder Text</label>
                                            <input 
                                                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-sm italic text-blue-200"
                                                value={data.sidebar_ifsc_text || ''}
                                                onChange={(e) => handleInputChange('sidebar_ifsc_text', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-3 pt-4 border-t border-white/5">
                                            <label className="block text-[9px] font-black text-slate-500 uppercase">Related Services Links</label>
                                            {(data.sidebar_links_json || []).map((link, idx) => (
                                                <div key={idx} className="flex gap-2 group">
                                                    <input className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold" value={link.label || ''} onChange={(e) => handleJsonChange('sidebar_links_json', idx, 'label', e.target.value)} />
                                                    <input className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono" value={link.url || ''} onChange={(e) => handleJsonChange('sidebar_links_json', idx, 'url', e.target.value)} />
                                                    <button onClick={() => removeJsonItem('sidebar_links_json', idx)} className="text-slate-500 hover:text-red-500 transition px-1"><i className="fas fa-trash-alt"></i></button>
                                                </div>
                                            ))}
                                            <button onClick={() => addJsonItem('sidebar_links_json', {label: '', url: ''})} className="w-full py-2 bg-white/5 border-2 border-dashed border-white/10 rounded-xl text-[10px] font-black uppercase text-slate-600 hover:text-blue-400 transition">+ Add Related Service</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* IMPS Service Configuration */}
                    {slug === 'imps' && (
                        <section className="animate-in fade-in slide-in-from-bottom-4">
                            <SectionHeader color="bg-blue-800" title="IMPS Service Configuration" data={data} onChange={handleNestedJsonChange} />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                                        <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-layer-group"></i>
                                            Key Features (Structured Cards)
                                        </h4>
                                        <div className="space-y-4">
                                            {(data.features_json || []).map((feature, idx) => (
                                                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 relative group shadow-sm">
                                                    <button onClick={() => removeJsonItem('features_json', idx)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm z-10"><i className="fas fa-times text-[10px]"></i></button>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div className="flex gap-4">
                                                            <div className="w-20">
                                                                <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">Icon</label>
                                                                <input className="w-full px-2 py-1.5 bg-gray-50 border border-gray-100 rounded text-[10px] font-mono" value={feature.icon || ''} onChange={(e) => handleJsonChange('features_json', idx, 'icon', e.target.value)} placeholder="e.g. flash" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">Feature Title</label>
                                                                <input className="w-full px-2 py-1.5 bg-gray-50 border border-gray-100 rounded text-[10px] font-bold" value={feature.title || ''} onChange={(e) => handleJsonChange('features_json', idx, 'title', e.target.value)} placeholder="e.g. Instant Transfer" />
                                                            </div>
                                                        </div>
                                                        <textarea className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] h-16" value={feature.desc || ''} onChange={(e) => handleJsonChange('features_json', idx, 'desc', e.target.value)} placeholder="Feature Description..." />
                                                    </div>
                                                </div>
                                            ))}
                                            <button onClick={() => addJsonItem('features_json', {icon: 'bolt', title: '', desc: ''})} className="w-full py-3 border-2 border-dashed border-blue-200 rounded-2xl text-blue-500 text-[10px] font-black uppercase hover:bg-blue-50 transition">+ Add Feature Card</button>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-6">
                                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-table"></i>
                                            Transaction Limits Table
                                        </h4>
                                        <div className="space-y-4">
                                            {(data.txn_limits_json || []).map((row, idx) => (
                                                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 relative group shadow-sm">
                                                    <button onClick={() => removeJsonItem('txn_limits_json', idx)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm z-10"><i className="fas fa-times text-[10px]"></i></button>
                                                    <div className="grid grid-cols-3 gap-3">
                                                        <div>
                                                            <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">Channel</label>
                                                            <input className="w-full px-2 py-1.5 bg-gray-50 border border-gray-100 rounded text-[10px] font-bold" value={row.channel || ''} onChange={(e) => handleJsonChange('txn_limits_json', idx, 'channel', e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">Per Txn Limit</label>
                                                            <input className="w-full px-2 py-1.5 bg-gray-50 border border-gray-100 rounded text-[10px]" value={row.per_txn || ''} onChange={(e) => handleJsonChange('txn_limits_json', idx, 'per_txn', e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">Daily Limit</label>
                                                            <input className="w-full px-2 py-1.5 bg-gray-50 border border-gray-100 rounded text-[10px]" value={row.daily || ''} onChange={(e) => handleJsonChange('txn_limits_json', idx, 'daily', e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button onClick={() => addJsonItem('txn_limits_json', {channel: '', per_txn: '', daily: ''})} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 text-[10px] font-black uppercase hover:border-blue-500 hover:text-blue-500 transition">+ Add Limit Row</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-link"></i>
                                            Related Services Links
                                        </h4>
                                        <div className="space-y-3">
                                            {(data.sidebar_links_json || []).map((link, idx) => (
                                                <div key={idx} className="flex gap-2 group">
                                                    <input className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold" value={link.label || ''} onChange={(e) => handleJsonChange('sidebar_links_json', idx, 'label', e.target.value)} placeholder="Link Label" />
                                                    <input className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-mono" value={link.url || ''} onChange={(e) => handleJsonChange('sidebar_links_json', idx, 'url', e.target.value)} placeholder="URL/Path" />
                                                    <button onClick={() => removeJsonItem('sidebar_links_json', idx)} className="text-gray-300 hover:text-red-500 transition px-1"><i className="fas fa-trash-alt"></i></button>
                                                </div>
                                            ))}
                                            <button onClick={() => addJsonItem('sidebar_links_json', {label: '', url: ''})} className="w-full py-2 bg-white border-2 border-dashed border-slate-200 rounded-xl text-[10px] font-black uppercase text-gray-400 hover:text-blue-500 hover:border-blue-300 transition">+ Add Link</button>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-blue-900 rounded-[2.5rem] text-white space-y-6 shadow-xl">
                                        <h4 className="text-[10px] font-black text-blue-300 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-headset"></i>
                                            Assistance Box Management
                                        </h4>
                                        <div className="space-y-4">
                                            <input className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-xl text-xs font-bold" value={data.assistance_box_json?.title || ''} onChange={(e) => handleNestedJsonChange('assistance_box_json', 'title', e.target.value)} placeholder="Box Title (e.g. Need Assistance?)" />
                                            <textarea className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-xl text-xs h-20" value={data.assistance_box_json?.desc || ''} onChange={(e) => handleNestedJsonChange('assistance_box_json', 'desc', e.target.value)} placeholder="Assistance Description..." />
                                            <div className="grid grid-cols-2 gap-4">
                                                <input className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-xl text-[10px] font-black" value={data.assistance_box_json?.btn_text || ''} onChange={(e) => handleNestedJsonChange('assistance_box_json', 'btn_text', e.target.value)} placeholder="Button Text" />
                                                <input className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-xl text-[10px] font-mono" value={data.assistance_box_json?.btn_url || ''} onChange={(e) => handleNestedJsonChange('assistance_box_json', 'btn_url', e.target.value)} placeholder="Button URL" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-slate-100 rounded-[2.5rem] space-y-6">
                                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-file-pdf"></i>
                                            Download Forms Box
                                        </h4>
                                        <div className="space-y-4">
                                            <input className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold" value={data.downloads_box_json?.title || ''} onChange={(e) => handleNestedJsonChange('downloads_box_json', 'title', e.target.value)} placeholder="Box Title (e.g. Download Forms)" />
                                            <textarea className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs h-16" value={data.downloads_box_json?.desc || ''} onChange={(e) => handleNestedJsonChange('downloads_box_json', 'desc', e.target.value)} placeholder="Download Description..." />
                                            <div className="grid grid-cols-2 gap-4">
                                                <input className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black" value={data.downloads_box_json?.link_text || ''} onChange={(e) => handleNestedJsonChange('downloads_box_json', 'link_text', e.target.value)} placeholder="Link Text" />
                                                <input className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-mono" value={data.downloads_box_json?.link_url || ''} onChange={(e) => handleNestedJsonChange('downloads_box_json', 'link_url', e.target.value)} placeholder="Link URL" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* UPI Service Configuration */}
                    {slug === 'upi' && (
                        <section className="animate-in fade-in slide-in-from-bottom-4">
                            <SectionHeader color="bg-blue-900" title="UPI Service Configuration" data={data} onChange={handleNestedJsonChange} />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                                        <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-gift"></i>
                                            UPI Benefits (Icon Cards)
                                        </h4>
                                        <div className="space-y-4">
                                            {(data.benefits_json || []).map((benefit, idx) => (
                                                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 relative group shadow-sm">
                                                    <button onClick={() => removeJsonItem('benefits_json', idx)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm z-10"><i className="fas fa-times text-[10px]"></i></button>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div className="flex gap-4">
                                                            <div className="w-20">
                                                                <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">Icon</label>
                                                                <input className="w-full px-2 py-1.5 bg-gray-50 border border-gray-100 rounded text-[10px] font-mono" value={benefit.icon || ''} onChange={(e) => handleJsonChange('benefits_json', idx, 'icon', e.target.value)} placeholder="e.g. flash" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">Benefit Title</label>
                                                                <input className="w-full px-2 py-1.5 bg-gray-50 border border-gray-100 rounded text-[10px] font-bold" value={benefit.title || ''} onChange={(e) => handleJsonChange('benefits_json', idx, 'title', e.target.value)} placeholder="e.g. Fast Payments" />
                                                            </div>
                                                        </div>
                                                        <textarea className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] h-16" value={benefit.desc || ''} onChange={(e) => handleJsonChange('benefits_json', idx, 'desc', e.target.value)} placeholder="Benefit Description..." />
                                                    </div>
                                                </div>
                                            ))}
                                            <button onClick={() => addJsonItem('benefits_json', {icon: 'bolt', title: '', desc: ''})} className="w-full py-3 border-2 border-dashed border-blue-200 rounded-2xl text-blue-500 text-[10px] font-black uppercase hover:bg-blue-50 transition">+ Add Benefit Card</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="p-8 bg-blue-50/30 rounded-[2.5rem] border border-blue-100 space-y-6">
                                        <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-list-ol"></i>
                                            Registration Steps
                                        </h4>
                                        <div className="space-y-3">
                                            {(data.registration_steps_json || []).map((step, idx) => (
                                                <div key={idx} className="flex gap-2 group">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-black text-[10px] shrink-0">
                                                        {idx + 1}
                                                    </div>
                                                    <input 
                                                        className="flex-1 px-4 py-2 bg-white border-2 border-blue-100 rounded-xl focus:border-blue-500 outline-none font-bold text-xs"
                                                        value={step}
                                                        onChange={(e) => handleJsonChange('registration_steps_json', idx, null, e.target.value)}
                                                    />
                                                    <button onClick={() => removeJsonItem('registration_steps_json', idx)} className="text-blue-200 hover:text-red-500 transition px-2"><i className="fas fa-trash-alt"></i></button>
                                                </div>
                                            ))}
                                            <button 
                                                onClick={() => addJsonItem('registration_steps_json', '')}
                                                className="w-full py-2 bg-blue-50/50 border-2 border-dashed border-blue-100 rounded-xl text-blue-400 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition"
                                            >
                                                + Add Step
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* RuPay Service Configuration */}
                    {slug === 'rupay-cards' && (
                        <section className="animate-in fade-in slide-in-from-bottom-4">
                            <SectionHeader color="bg-orange-500" title="RuPay Card Configuration" data={data} onChange={handleNestedJsonChange} />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                                        <h4 className="text-xs font-black text-orange-600 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-credit-card"></i>
                                            RuPay Card Types
                                        </h4>
                                        <div className="space-y-6">
                                            {(data.card_types_json || []).map((card, idx) => (
                                                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 relative group shadow-sm">
                                                    <button onClick={() => removeJsonItem('card_types_json', idx)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm z-10"><i className="fas fa-times text-[10px]"></i></button>
                                                    <div className="space-y-4">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">Card Title</label>
                                                                <input className="w-full px-2 py-1.5 bg-gray-50 border border-gray-100 rounded text-[10px] font-bold" value={card.title || ''} onChange={(e) => handleJsonChange('card_types_json', idx, 'title', e.target.value)} />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">Border Color Class</label>
                                                                <input className="w-full px-2 py-1.5 bg-gray-50 border border-gray-100 rounded text-[10px] font-mono" value={card.border_color || ''} onChange={(e) => handleJsonChange('card_types_json', idx, 'border_color', e.target.value)} placeholder="orange-500" />
                                                            </div>
                                                        </div>
                                                        <textarea className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] h-12" value={card.desc || ''} onChange={(e) => handleJsonChange('card_types_json', idx, 'desc', e.target.value)} placeholder="Short Description..." />
                                                        
                                                        <div className="space-y-2">
                                                            <label className="block text-[8px] font-black text-slate-400 uppercase">Benefits List</label>
                                                            {(card.benefits || []).map((benefit, bIdx) => (
                                                                <div key={bIdx} className="flex gap-2">
                                                                    <input className="flex-1 px-2 py-1 bg-white border border-slate-100 rounded text-[10px]" value={benefit} onChange={(e) => {
                                                                        const newBenefits = [...card.benefits];
                                                                        newBenefits[bIdx] = e.target.value;
                                                                        handleJsonChange('card_types_json', idx, 'benefits', newBenefits);
                                                                    }} />
                                                                    <button onClick={() => {
                                                                        const newBenefits = card.benefits.filter((_, i) => i !== bIdx);
                                                                        handleJsonChange('card_types_json', idx, 'benefits', newBenefits);
                                                                    }} className="text-red-300 hover:text-red-500"><i className="fas fa-minus-circle"></i></button>
                                                                </div>
                                                            ))}
                                                            <button onClick={() => {
                                                                const newBenefits = [...(card.benefits || []), ''];
                                                                handleJsonChange('card_types_json', idx, 'benefits', newBenefits);
                                                            }} className="text-[9px] font-bold text-blue-500">+ Add Benefit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button onClick={() => addJsonItem('card_types_json', {title: '', desc: '', border_color: 'orange-500', benefits: []})} className="w-full py-3 border-2 border-dashed border-orange-200 rounded-2xl text-orange-500 text-[10px] font-black uppercase hover:bg-orange-50 transition">+ Add Card Type</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                                        <h4 className="text-xs font-black text-red-600 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-shield-alt"></i>
                                            Safety Tips
                                        </h4>
                                        <div className="space-y-4">
                                            {(data.safety_tips_json || []).map((tip, idx) => (
                                                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 relative group shadow-sm">
                                                    <button onClick={() => removeJsonItem('safety_tips_json', idx)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm z-10"><i className="fas fa-times text-[10px]"></i></button>
                                                    <div className="flex gap-4">
                                                        <div className="w-16">
                                                            <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">Icon</label>
                                                            <input className="w-full px-2 py-1.5 bg-gray-50 border border-gray-100 rounded text-[10px] font-mono" value={tip.icon || ''} onChange={(e) => handleJsonChange('safety_tips_json', idx, 'icon', e.target.value)} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">Tip Title</label>
                                                            <input className="w-full px-2 py-1.5 bg-gray-50 border border-gray-100 rounded text-[10px] font-bold" value={tip.title || ''} onChange={(e) => handleJsonChange('safety_tips_json', idx, 'title', e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <textarea className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] h-12 mt-3" value={tip.desc || ''} onChange={(e) => handleJsonChange('safety_tips_json', idx, 'desc', e.target.value)} />
                                                </div>
                                            ))}
                                            <button onClick={() => addJsonItem('safety_tips_json', {icon: 'shield-alt', title: '', desc: ''})} className="w-full py-3 border-2 border-dashed border-red-200 rounded-2xl text-red-500 text-[10px] font-black uppercase hover:bg-red-50 transition">+ Add Safety Tip</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                    {/* NEFT/RTGS Service Configuration */}
                    {slug === 'neft-rtgs' && (
                        <section className="animate-in fade-in slide-in-from-bottom-4">
                            <SectionHeader color="bg-blue-800" title="NEFT / RTGS Configuration" data={data} onChange={handleNestedJsonChange} />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100 space-y-6">
                                        <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-info-circle"></i>
                                            NEFT Content
                                        </h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">NEFT Description</label>
                                                <textarea 
                                                    className="w-full px-5 py-3 bg-white border-2 border-blue-100 rounded-2xl focus:border-blue-500 outline-none transition-all font-medium h-32 leading-relaxed"
                                                    value={data.neft_info || ''}
                                                    onChange={(e) => handleInputChange('neft_info', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">NEFT Note Box</label>
                                                <textarea 
                                                    className="w-full px-5 py-3 bg-white border-2 border-blue-100 rounded-2xl focus:border-blue-500 outline-none transition-all font-bold italic h-20"
                                                    value={data.neft_note || ''}
                                                    onChange={(e) => handleInputChange('neft_note', e.target.value)}
                                                    placeholder="e.g. Note: NEFT transactions are settled in batches."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-red-50/30 rounded-[2.5rem] border border-red-100 space-y-6">
                                        <h4 className="text-xs font-black text-red-900 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-info-circle"></i>
                                            RTGS Content
                                        </h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">RTGS Description</label>
                                                <textarea 
                                                    className="w-full px-5 py-3 bg-white border-2 border-red-100 rounded-2xl focus:border-red-500 outline-none transition-all font-medium h-32 leading-relaxed"
                                                    value={data.rtgs_info || ''}
                                                    onChange={(e) => handleInputChange('rtgs_info', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">RTGS Note / Limit Box</label>
                                                <textarea 
                                                    className="w-full px-5 py-3 bg-white border-2 border-red-100 rounded-2xl focus:border-red-500 outline-none transition-all font-bold italic h-20"
                                                    value={data.rtgs_note || ''}
                                                    onChange={(e) => handleInputChange('rtgs_note', e.target.value)}
                                                    placeholder="e.g. Minimum Limit: The minimum amount to be remitted through RTGS is ₹ 2,00,000."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                                        <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-table"></i>
                                            Comparison Table
                                        </h4>
                                        <div className="space-y-4">
                                            {(data.comparison_json || []).map((row, idx) => (
                                                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 relative group shadow-sm">
                                                    <button onClick={() => removeJsonItem('comparison_json', idx)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm z-10"><i className="fas fa-times text-[10px]"></i></button>
                                                    <div className="grid grid-cols-1 gap-3">
                                                        <div>
                                                            <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">Feature Name</label>
                                                            <input className="w-full px-2 py-1.5 bg-gray-50 border border-gray-100 rounded text-[10px] font-bold" value={row.feature || ''} onChange={(e) => handleJsonChange('comparison_json', idx, 'feature', e.target.value)} />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div>
                                                                <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">NEFT Value</label>
                                                                <input className="w-full px-2 py-1.5 bg-gray-50 border border-gray-100 rounded text-[10px]" value={row.neft || ''} onChange={(e) => handleJsonChange('comparison_json', idx, 'neft', e.target.value)} />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">RTGS Value</label>
                                                                <input className="w-full px-2 py-1.5 bg-gray-50 border border-gray-100 rounded text-[10px]" value={row.rtgs || ''} onChange={(e) => handleJsonChange('comparison_json', idx, 'rtgs', e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button onClick={() => addJsonItem('comparison_json', {feature: '', neft: '', rtgs: ''})} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 text-[10px] font-black uppercase hover:border-blue-500 hover:text-blue-500 transition">+ Add Comparison Row</button>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100 space-y-6">
                                        <h4 className="text-xs font-black text-amber-900 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-list-ul"></i>
                                            Information Required
                                        </h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Description Text</label>
                                                <textarea 
                                                    className="w-full px-5 py-3 bg-white border border-amber-100 rounded-xl text-xs font-medium h-20"
                                                    value={data.req_info_description || ''}
                                                    onChange={(e) => handleInputChange('req_info_description', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Requirement Items</label>
                                                {(data.req_info_json || []).map((item, idx) => (
                                                    <div key={idx} className="flex gap-2 group">
                                                        <input className="flex-1 px-3 py-2 bg-white border border-amber-100 rounded-xl text-[10px] font-bold" value={item || ''} onChange={(e) => handleJsonChange('req_info_json', idx, null, e.target.value)} />
                                                        <button onClick={() => removeJsonItem('req_info_json', idx)} className="text-gray-300 hover:text-red-500 transition px-1"><i className="fas fa-trash-alt"></i></button>
                                                    </div>
                                                ))}
                                                <button onClick={() => addJsonItem('req_info_json', '')} className="w-full py-2 bg-white border-2 border-dashed border-amber-200 rounded-xl text-[10px] font-black uppercase text-gray-400 hover:text-amber-500 hover:border-amber-300 transition">+ Add Requirement Item</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-[#001529] rounded-[2.5rem] text-white space-y-6">
                                        <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-search"></i>
                                            Sidebar & IFSC Finder
                                        </h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-[9px] font-black text-slate-500 uppercase mb-2">IFSC Finder Description</label>
                                                <textarea 
                                                    className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-blue-500 transition text-sm h-20"
                                                    value={data.sidebar_ifsc_text || ''}
                                                    onChange={(e) => handleInputChange('sidebar_ifsc_text', e.target.value)}
                                                />
                                            </div>
                                            <div className="pt-4 border-t border-white/5">
                                                <label className="block text-[9px] font-black text-slate-500 uppercase mb-2 tracking-widest">Sidebar Links (Related Services)</label>
                                                {(data.sidebar_links_json || []).map((link, idx) => (
                                                    <div key={idx} className="flex gap-2 mb-2">
                                                        <input className="flex-1 px-3 py-2 bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold text-white" value={link.label || ''} onChange={(e) => handleJsonChange('sidebar_links_json', idx, 'label', e.target.value)} placeholder="Label" />
                                                        <input className="flex-1 px-3 py-2 bg-white/10 border border-white/10 rounded-xl text-[10px] font-mono text-blue-300" value={link.url || ''} onChange={(e) => handleJsonChange('sidebar_links_json', idx, 'url', e.target.value)} placeholder="URL" />
                                                        <button onClick={() => removeJsonItem('sidebar_links_json', idx)} className="text-gray-500 hover:text-red-500 transition px-1"><i className="fas fa-trash-alt"></i></button>
                                                    </div>
                                                ))}
                                                <button onClick={() => addJsonItem('sidebar_links_json', {label: '', url: ''})} className="w-full py-2 bg-white/5 border-2 border-dashed border-white/10 rounded-xl text-[10px] font-black uppercase text-gray-500 hover:text-white transition">+ Add Sidebar Link</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Net Banking Configuration */}
                    {slug === 'net-banking' && (
                        <section className="animate-in fade-in slide-in-from-bottom-4">
                            <SectionHeader color="bg-blue-600" title="Net Banking Configuration" data={data} onChange={handleNestedJsonChange} />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100 space-y-6">
                                        <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-file-signature"></i>
                                            Registration Info
                                        </h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Registration Information Text</label>
                                                <textarea 
                                                    className="w-full px-5 py-3 bg-white border-2 border-blue-100 rounded-2xl focus:border-blue-500 outline-none transition-all font-medium h-24"
                                                    value={data.registration_info || ''}
                                                    onChange={(e) => handleInputChange('registration_info', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-8 bg-red-50/30 rounded-[2.5rem] border border-red-100 space-y-6">
                                        <h4 className="text-xs font-black text-red-900 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-shield-alt"></i>
                                            Security Tips
                                        </h4>
                                        <div className="space-y-4">
                                            {(data.security_tips_json || []).map((tip, idx) => (
                                                <div key={idx} className="flex gap-2 group">
                                                    <input 
                                                        className="flex-1 px-4 py-3 bg-white border-2 border-red-100 rounded-xl text-xs font-bold"
                                                        value={tip || ''}
                                                        onChange={(e) => handleJsonChange('security_tips_json', idx, null, e.target.value)}
                                                    />
                                                    <button onClick={() => removeJsonItem('security_tips_json', idx)} className="text-red-200 hover:text-red-500 transition px-2"><i className="fas fa-trash-alt"></i></button>
                                                </div>
                                            ))}
                                            <button onClick={() => addJsonItem('security_tips_json', '')} className="w-full py-3 bg-white/50 border border-dashed border-red-200 rounded-xl text-[10px] font-black uppercase text-red-400 hover:bg-red-50 transition">+ Add Security Tip</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-6 shadow-xl">
                                        <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-link"></i>
                                            Sidebar Login Links
                                        </h4>
                                        <div className="space-y-4">
                                            {(data.sidebar_login_links_json || []).map((link, idx) => (
                                                <div key={idx} className="flex gap-2 group">
                                                    <input 
                                                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-blue-500 transition text-sm font-bold text-white"
                                                        value={link || ''}
                                                        onChange={(e) => handleJsonChange('sidebar_login_links_json', idx, null, e.target.value)}
                                                    />
                                                    <button onClick={() => removeJsonItem('sidebar_login_links_json', idx)} className="text-gray-500 hover:text-red-500 transition px-2"><i className="fas fa-trash-alt"></i></button>
                                                </div>
                                            ))}
                                            <button onClick={() => addJsonItem('sidebar_login_links_json', '')} className="w-full py-3 bg-white/5 border-2 border-dashed border-white/10 rounded-xl text-[10px] font-black uppercase text-gray-500 hover:text-white transition">+ Add Login Link</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}


                    {/* Highlights Grid */}
                    <section>
                        <SectionHeader color="bg-amber-500" title="Highlight Feature Cards" sectionKey="highlights" data={data} onChange={handleNestedJsonChange} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {(data.highlights_json || []).map((card, idx) => (
                                <div key={idx} className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 relative group transition-all hover:bg-white hover:shadow-lg">
                                    <button 
                                        type="button" 
                                        onClick={() => removeJsonItem('highlights_json', idx)}
                                        className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                    <div className="flex gap-4 mb-4">
                                        <div className="w-16">
                                            <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">Icon</label>
                                            <input 
                                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono"
                                                value={card.icon || ''}
                                                onChange={(e) => handleJsonChange('highlights_json', idx, 'icon', e.target.value)}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">Card Title</label>
                                            <input 
                                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold"
                                                value={card.title || ''}
                                                onChange={(e) => handleJsonChange('highlights_json', idx, 'title', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <textarea 
                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium h-20"
                                        placeholder="Description..."
                                        value={card.description || ''}
                                        onChange={(e) => handleJsonChange('highlights_json', idx, 'description', e.target.value)}
                                    />
                                </div>
                            ))}
                            <button 
                                type="button"
                                onClick={() => addJsonItem('highlights_json', {icon: 'fa-star', title: 'New Card', description: ''})}
                                className="border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center py-10 hover:border-amber-500 hover:bg-amber-50 transition group"
                            >
                                <i className="fas fa-plus-circle text-3xl text-gray-200 group-hover:text-amber-500 mb-2"></i>
                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest group-hover:text-amber-600">Add Highlight Card</span>
                            </button>
                        </div>
                    </section>

                    {/* Features & Tips Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <section>
                            <SectionHeader color="bg-rose-500" title="Key Features List" sectionKey="features" data={data} onChange={handleNestedJsonChange} />
                            <div className="space-y-4">
                                {(data.features_json || data.key_features_json || []).map((item, idx) => {
                                    const isString = typeof item === 'string';
                                    const field = data.features_json ? 'features_json' : 'key_features_json';
                                    return (
                                        <div key={idx} className="flex gap-2 group">
                                            <div className="flex-1 bg-gray-50 rounded-2xl p-4 border border-gray-100 group-hover:bg-white group-hover:shadow-md transition-all">
                                                {isString ? (
                                                    <input 
                                                        className="w-full bg-transparent font-bold text-sm text-gray-800 outline-none"
                                                        placeholder="Feature item..."
                                                        value={item}
                                                        onChange={(e) => handleJsonChange(field, idx, null, e.target.value)}
                                                    />
                                                ) : (
                                                    <>
                                                        <input 
                                                            className="w-full bg-transparent font-bold text-sm text-gray-800 outline-none mb-1"
                                                            placeholder="Feature Title"
                                                            value={item.title || ''}
                                                            onChange={(e) => handleJsonChange(field, idx, 'title', e.target.value)}
                                                        />
                                                        <input 
                                                            className="w-full bg-transparent text-xs text-gray-500 outline-none"
                                                            placeholder="Feature Detail"
                                                            value={item.desc || ''}
                                                            onChange={(e) => handleJsonChange(field, idx, 'desc', e.target.value)}
                                                        />
                                                    </>
                                                )}
                                            </div>
                                            <button onClick={() => removeJsonItem(field, idx)} className="text-gray-200 hover:text-red-500 transition px-2">
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    );
                                })}
                                <button 
                                    onClick={() => {
                                        const field = data.features_json ? 'features_json' : 'key_features_json';
                                        const defaultValue = data.features_json ? "" : {title: '', desc: ''};
                                        addJsonItem(field, defaultValue);
                                    }}
                                    className="w-full py-4 bg-gray-50 border-2 border-dashed border-gray-100 rounded-2xl text-xs font-black uppercase text-gray-400 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 transition"
                                >
                                    + Add Feature Item
                                </button>
                            </div>
                        </section>

                        <section>
                            <SectionHeader color="bg-orange-500" title="Quick Tips Sidebar" sectionKey="tips" data={data} onChange={handleNestedJsonChange} />
                            <div className="space-y-4">
                                {(data.sidebar_tips_json || []).map((tip, idx) => (
                                    <div key={idx} className="flex gap-2 group">
                                        <div className="flex-1 bg-gray-50 rounded-2xl p-4 border border-gray-100 group-hover:bg-white group-hover:shadow-md transition-all">
                                            <textarea 
                                                className="w-full bg-transparent text-sm font-medium text-gray-700 outline-none h-16"
                                                placeholder="Enter tip text..."
                                                value={tip}
                                                onChange={(e) => handleJsonChange('sidebar_tips_json', idx, null, e.target.value)}
                                            />
                                        </div>
                                        <button onClick={() => removeJsonItem('sidebar_tips_json', idx)} className="text-gray-200 hover:text-red-500 transition px-2">
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    onClick={() => addJsonItem('sidebar_tips_json', "")}
                                    className="w-full py-4 bg-gray-50 border-2 border-dashed border-gray-100 rounded-2xl text-xs font-black uppercase text-gray-400 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition"
                                >
                                    + Add Quick Tip
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Lower Grid: Help Box & Sidebar Promo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <section>
                            <SectionHeader color="bg-blue-900" title="Sidebar Help Box" sectionKey="help" data={data} onChange={handleNestedJsonChange} />
                            <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Help Title</label>
                                    <input 
                                        className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:border-blue-900 outline-none transition-all font-bold"
                                        value={data.helpbox_json?.title || ''}
                                        onChange={(e) => handleNestedJsonChange('helpbox_json', 'title', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Description</label>
                                    <textarea 
                                        className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:border-blue-900 outline-none transition-all text-sm h-24"
                                        value={data.helpbox_json?.description || ''}
                                        onChange={(e) => handleNestedJsonChange('helpbox_json', 'description', e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Phone</label>
                                        <input 
                                            className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:border-blue-900 outline-none text-sm font-mono"
                                            value={data.helpbox_json?.phone || ''}
                                            onChange={(e) => handleNestedJsonChange('helpbox_json', 'phone', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Action</label>
                                        <select 
                                            className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:border-blue-900 outline-none text-sm font-bold appearance-none cursor-pointer"
                                            value={data.helpbox_json?.action || 'call'}
                                            onChange={(e) => handleNestedJsonChange('helpbox_json', 'action', e.target.value)}
                                        >
                                            <option value="call">Call Phone</option>
                                            <option value="whatsapp">WhatsApp</option>
                                            <option value="link">Custom Link</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <SectionHeader color="bg-red-600" title="Sidebar Promo Card" sectionKey="promo" data={data} onChange={handleNestedJsonChange} />
                            <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Promo Title</label>
                                    <input 
                                        className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:border-red-600 outline-none transition-all font-bold"
                                        value={data.sidebar_promo_json?.title || ''}
                                        onChange={(e) => handleNestedJsonChange('sidebar_promo_json', 'title', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Promo Subtitle (Red)</label>
                                    <input 
                                        className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:border-red-600 outline-none transition-all text-xs font-black uppercase tracking-widest text-red-600"
                                        value={data.sidebar_promo_json?.subtitle || ''}
                                        onChange={(e) => handleNestedJsonChange('sidebar_promo_json', 'subtitle', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Image Selection</label>
                                    <div className="flex items-center gap-4 p-4 bg-white border-2 border-gray-200 rounded-2xl">
                                        {data.sidebar_promo_json?.image && (
                                            <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                                                <img 
                                                    src={data.sidebar_promo_json.image.startsWith('http') ? data.sidebar_promo_json.image : `/assets/images/${data.sidebar_promo_json.image}`} 
                                                    className="w-full h-full object-cover"
                                                    alt="Preview"
                                                    onError={(e) => { e.target.src = '/assets/images/gcublogo.png'; }}
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 space-y-2">
                                            <label className="block w-full px-4 py-2 bg-blue-50 text-[#003399] rounded-xl text-center text-xs font-bold cursor-pointer hover:bg-blue-100 transition border border-blue-100">
                                                <input 
                                                    type="file" 
                                                    className="hidden" 
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(e, 'sidebar_promo_json.image')}
                                                    disabled={uploadingImage}
                                                />
                                                {uploadingImage ? 'Uploading...' : 'Choose File'}
                                            </label>
                                            <input 
                                                className="w-full px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-mono outline-none"
                                                placeholder="Or type filename..."
                                                value={data.sidebar_promo_json?.image || ''}
                                                onChange={(e) => handleNestedJsonChange('sidebar_promo_json', 'image', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Description</label>
                                    <textarea 
                                        className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:border-red-600 outline-none transition-all text-sm h-24"
                                        value={data.sidebar_promo_json?.description || ''}
                                        onChange={(e) => handleNestedJsonChange('sidebar_promo_json', 'description', e.target.value)}
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminEditStructuredService;
