import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BASE_URL, apiFetch } from '../../utils/api';


const AdminEditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id || id === 'new';

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        category: 'Deposits',
        description: '',
        icon_type: 'img',
        icon_value: '',
        hero_description: '',
        long_description: '',
        features: [], // Store as array
        facilities: [], // Replaces eligibility, store as array
        documents: [], // Store as array, stringify on save
        image_path: '',
        terms_heading: '',
        terms_content: '',
        status: 'active'
    });
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [iconFile, setIconFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);

    useEffect(() => {
        if (!isNew) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await apiFetch(`/products/show/${id}`);
            const product = await response.json();

            if (product && !product.error) {
                let parsedDocs = [];
                try {
                    parsedDocs = product.documents ? JSON.parse(product.documents) : [];
                    if (!Array.isArray(parsedDocs)) parsedDocs = [];
                } catch (e) {
                    console.error('Error parsing documents JSON:', e);
                }

                let parsedFeatures = [];
                try {
                    parsedFeatures = product.features ? (product.features.startsWith('[') ? JSON.parse(product.features) : product.features.split('\n').filter(f => f.trim() !== '').map(f => f.startsWith('- ') ? f.substring(2) : f)) : [];
                } catch (e) {
                    parsedFeatures = product.features ? product.features.split('\n').filter(f => f.trim() !== '') : [];
                }

                let parsedFacilities = [];
                try {
                    // Repurpose eligibility column for facilities
                    const rawFacilities = product.eligibility || '';
                    parsedFacilities = rawFacilities ? (rawFacilities.startsWith('[') ? JSON.parse(rawFacilities) : rawFacilities.split('\n').filter(f => f.trim() !== '').map(f => f.startsWith('- ') ? f.substring(2) : f)) : [];
                } catch (e) {
                    parsedFacilities = product.eligibility ? product.eligibility.split('\n').filter(f => f.trim() !== '') : [];
                }

                setFormData({
                    name: product.name || '',
                    slug: product.slug || '',
                    category: product.category || 'Deposits',
                    description: product.description || '',
                    icon_type: product.icon_type || 'img',
                    icon_value: product.icon_value || '',
                    hero_description: product.hero_description || '',
                    long_description: product.long_description || '',
                    features: parsedFeatures,
                    facilities: parsedFacilities,
                    documents: parsedDocs,
                    image_path: product.image_path || '',
                    terms_heading: product.terms_heading || '',
                    terms_content: product.terms_content || '',
                    status: product.status || 'active'
                });
            } else {
                setMessage({ type: 'error', text: 'Product not found.' });
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product:', error);
            setMessage({ type: 'error', text: 'Failed to load product details.' });
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addDocCard = () => {
        const newCard = { title: 'New Category', icon: 'fas fa-file-alt', items: [''] };
        setFormData({ ...formData, documents: [...formData.documents, newCard] });
    };

    const removeDocCard = (index) => {
        const newDocs = formData.documents.filter((_, i) => i !== index);
        setFormData({ ...formData, documents: newDocs });
    };

    const updateDocCard = (index, field, value) => {
        const newDocs = [...formData.documents];
        newDocs[index][field] = value;
        setFormData({ ...formData, documents: newDocs });
    };

    const addDocItem = (cardIndex) => {
        const newDocs = [...formData.documents];
        newDocs[cardIndex].items.push('');
        setFormData({ ...formData, documents: newDocs });
    };

    const removeDocItem = (cardIndex, itemIndex) => {
        const newDocs = [...formData.documents];
        newDocs[cardIndex].items = newDocs[cardIndex].items.filter((_, i) => i !== itemIndex);
        setFormData({ ...formData, documents: newDocs });
    };

    const updateDocItem = (cardIndex, itemIndex, value) => {
        const newDocs = [...formData.documents];
        newDocs[cardIndex].items[itemIndex] = value;
        setFormData({ ...formData, documents: newDocs });
    };

    // Features Management
    const addFeature = () => setFormData({ ...formData, features: [...formData.features, ''] });
    const removeFeature = (idx) => setFormData({ ...formData, features: formData.features.filter((_, i) => i !== idx) });
    const updateFeature = (idx, val) => {
        const newFeatures = [...formData.features];
        newFeatures[idx] = val;
        setFormData({ ...formData, features: newFeatures });
    };

    // Facilities Management
    const addFacility = () => setFormData({ ...formData, facilities: [...formData.facilities, ''] });
    const removeFacility = (idx) => setFormData({ ...formData, facilities: formData.facilities.filter((_, i) => i !== idx) });
    const updateFacility = (idx, val) => {
        const newFacilities = [...formData.facilities];
        newFacilities[idx] = val;
        setFormData({ ...formData, facilities: newFacilities });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        const url = isNew
            ? `${BASE_URL}/api/products/create`
            : `/products/update/${id}`;

        const postData = new FormData();
        Object.keys(formData).forEach(key => {
            if (['documents', 'features', 'facilities'].includes(key)) {
                // Map facilities back to eligibility column
                const apiKey = key === 'facilities' ? 'eligibility' : key;
                postData.append(apiKey, JSON.stringify(formData[key]));
            } else {
                postData.append(key, formData[key]);
            }
        });

        if (iconFile) postData.append('icon_file', iconFile);
        if (bannerFile) postData.append('image_file', bannerFile);

        try {
            const response = await fetch(url, { method: 'POST', body: postData });
            const data = await response.json();
            if (data.status === 'success') {
                setMessage({ type: 'success', text: `Product ${isNew ? 'created' : 'updated'} successfully!` });
                setTimeout(() => navigate('/admin/products'), 1500);
            } else {
                setMessage({ type: 'error', text: 'Operation failed.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading content...</div>;

    return (
        <div className="bg-gray-100 font-inter -m-2">
            <header className="w-full bg-transparent flex px-8 justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/admin/products" className="text-gray-500 hover:text-[#003399] transition">
                        <i className="fas fa-arrow-left text-xl"></i>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{isNew ? 'Create New Product' : 'Edit Product Content'}</h2>
                        {!isNew && (
                            <p className="text-xs text-gray-500">Editing: <span className="font-bold text-[#003399]">{formData.name}</span></p>
                        )}
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
                        {/* Basic Info & Icon */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-10 border-b border-gray-100 relative">
                            <div className="md:col-span-2 space-y-8">
                                <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl tracking-tight">
                                    <span className="w-1.5 h-8 bg-[#003399] rounded-full"></span>
                                    Primary Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Product Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={(e) => {
                                            const val = e.target.value;
                                            const update = { name: val };
                                            if (isNew && (!formData.slug || formData.slug === val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''))) {
                                                update.slug = val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                                            }
                                            setFormData({ ...formData, ...update });
                                        }} className="w-full px-5 py-2 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#003399] focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder-gray-300 font-medium" placeholder="e.g. Savings Plus" required />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">URL Slug</label>
                                        <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} className="w-full px-5 py-2 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#003399] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-mono text-sm text-[#003399]" placeholder="slug-path" required />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Bank Category</label>
                                        <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-5 py-2 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#003399] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-gray-700 cursor-pointer appearance-none">
                                            <option value="Deposits">🏦 Deposits</option>
                                            <option value="Loans">💰 Loans</option>

                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Short Preview Text</label>
                                    <input type="text" name="description" value={formData.description} onChange={handleInputChange} className="w-full px-5 py-2 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#003399] focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder-gray-300" placeholder="A one-line pitch for this product..." />
                                </div>
                            </div>
                            <div className="space-y-8 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                                <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl tracking-tight">
                                    <span className="w-1.5 h-8 bg-amber-500 rounded-full"></span>
                                    Listing Icon
                                </h3>
                                <div className="space-y-5">
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 px-1 tracking-wider">Type</label>
                                            <select name="icon_type" value={formData.icon_type} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-50 shadow-sm cursor-pointer font-bold">
                                                <option value="font">Icon (FA)</option>
                                                <option value="img">Custom Image</option>
                                            </select>
                                        </div>
                                        <div className="w-24">
                                            <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 px-1 tracking-wider">Visibility</label>
                                            <select name="status" value={formData.status} onChange={handleInputChange} className={`w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all shadow-sm cursor-pointer font-black uppercase tracking-widest ${formData.status === 'active' ? 'text-green-600' : 'text-red-500'}`}>
                                                <option value="active">Active</option>
                                                <option value="inactive">Hidden</option>
                                            </select>
                                        </div>
                                    </div>
                                    {formData.icon_type === 'img' ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                                {formData.icon_value && !iconFile && (
                                                    <div className="w-14 h-14 rounded-xl border border-gray-100 bg-gray-50 p-2 overflow-hidden flex-shrink-0 shadow-inner">
                                                        <img
                                                            src={`assets/images/icons/${formData.icon_value}`}
                                                            className="w-full h-full object-contain"
                                                            alt="Current"
                                                            onError={(e) => {
                                                                if (e.target.src.includes('/icons/')) {
                                                                    e.target.src = e.target.src.replace('/icons/', '/cards/');
                                                                } else {
                                                                    e.target.src = 'assets/images/gcublogo.png';
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                {iconFile && (
                                                    <div className="w-14 h-14 rounded-xl border-2 border-blue-200 bg-blue-50 p-2 overflow-hidden flex-shrink-0 relative group shadow-sm">
                                                        <img src={URL.createObjectURL(iconFile)} className="w-full h-full object-contain" alt="Preview" />
                                                        <button onClick={() => setIconFile(null)} className="absolute inset-0 bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-xl">
                                                            <i className="fas fa-trash-alt text-sm"></i>
                                                        </button>
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <label className="block w-full border-2 border-dashed border-gray-200 rounded-2xl p-3 text-center cursor-pointer hover:border-[#003399] hover:bg-blue-50 hover:border-solid transition-all group">
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={(e) => setIconFile(e.target.files[0])}
                                                        />
                                                        <span className="text-[10px] font-black text-gray-400 uppercase group-hover:text-[#003399] tracking-tighter">
                                                            {iconFile ? iconFile.name : (formData.icon_value ? 'Change Image' : 'Click to Upload')}
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            <input type="text" name="icon_value" value={formData.icon_value} onChange={handleInputChange} className="w-full px-5 py-2 bg-white border-1 border-gray-400 rounded-2xl text-[11px] font-mono text-gray-400 focus:text-gray-900 transition-colors" placeholder="Filename fallback..." />
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-[#003399] text-2xl shadow-inner border border-blue-100">
                                                    <i className={formData.icon_value || 'fas fa-question'}></i>
                                                </div>
                                                <div className="flex-1">
                                                    <input type="text" name="icon_value" value={formData.icon_value} onChange={handleInputChange} className="w-full px-5 py-2 bg-white border-1 border-gray-400 rounded-2xl text-sm focus:border-blue-500 outline-none transition-all font-mono" placeholder="fas fa-landmark" />
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-gray-400 italic px-1">* Use FontAwesome class names (e.g. fas fa-piggy-bank)</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Hero & Description */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start py-4">
                            <div className="md:col-span-2 space-y-8">
                                <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl tracking-tight">
                                    <span className="w-1.5 h-8 bg-purple-500 rounded-full"></span>
                                    Marketing Text
                                </h3>
                                <div>
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-3 tracking-widest px-1">Hero Description <span className="text-gray-300">(Top of Page)</span></label>
                                    <textarea name="hero_description" value={formData.hero_description} onChange={handleInputChange} rows="4" className="w-full px-5 py-4 bg-white border-1 border-gray-400 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-50 ring-inset outline-none transition-all leading-relaxed font-medium" placeholder="Catchy slogan for the hero banner..."></textarea>
                                </div>
                            </div>
                            <div className="md:col-span-3 space-y-8">
                                <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl tracking-tight invisible md:visible">
                                    <span className="w-1.5 h-8 bg-indigo-500 rounded-full"></span>
                                    Main Description
                                </h3>
                                <div>
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-3 tracking-widest px-1">Detailed Content <span className="text-gray-300">(Post-Banner Paragraph)</span></label>
                                    <textarea name="long_description" value={formData.long_description} onChange={handleInputChange} rows="8" className="w-full px-5 py-4 bg-white border-1 border-gray-400 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all leading-relaxed text-gray-700" placeholder="Full introduction and details about this banking product..."></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Terms & Conditions Section */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start py-4 pt-10 border-t border-gray-100">
                            <div className="md:col-span-2 space-y-8">
                                <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl tracking-tight">
                                    <span className="w-1.5 h-8 bg-red-500 rounded-full"></span>
                                    Terms & Conditions
                                </h3>
                                <div>
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-3 tracking-widest px-1">Section Heading <span className="text-gray-300">(Optional)</span></label>
                                    <input type="text" name="terms_heading" value={formData.terms_heading} onChange={handleInputChange} className="w-full px-5 py-2 bg-white border-1 border-gray-400 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all font-medium" placeholder="e.g. Terms & Conditions or Important Notes" />
                                </div>
                            </div>
                            <div className="md:col-span-3 space-y-8">
                                <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl tracking-tight invisible md:visible">
                                    <span className="w-1.5 h-8 bg-red-400 rounded-full"></span>
                                    Terms Content
                                </h3>
                                <div>
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-3 tracking-widest px-1">Detailed Terms <span className="text-gray-300">(Supports multi-line text)</span></label>
                                    <textarea name="terms_content" value={formData.terms_content} onChange={handleInputChange} rows="6" className="w-full px-5 py-4 bg-white border-1 border-gray-400 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all leading-relaxed text-gray-700" placeholder="List your terms, conditions, or any other important fine print here..."></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12 pt-10 border-t border-gray-100">
                            <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl tracking-tight">
                                <span className="w-1.5 h-8 bg-[#003399] rounded-full"></span>
                                Product Features & Facilities
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Key Features Section */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center p-2 rounded-2xl border border-gray-100 shadow-sm">
                                        <label className="text-[11px] font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-star text-amber-500"></i> High-Level Features
                                        </label>
                                        <button type="button" onClick={addFeature} className="bg-[#003399] text-white w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#003399] transition shadow-lg shadow-amber-100 transform hover:scale-110 active:scale-95">
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {formData.features.map((feature, idx) => (
                                            <div key={idx} className="flex gap-3 group animate-in slide-in-from-right-4 duration-300">
                                                <div className="flex-1 relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-amber-300 font-bold">{idx + 1}</span>
                                                    <input
                                                        type="text"
                                                        value={feature}
                                                        onChange={(e) => updateFeature(idx, e.target.value)}
                                                        className="w-full pl-10 pr-4 py-2 bg-white border-2 border-gray-400 rounded-2xl text-sm font-medium focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all shadow-sm"
                                                        placeholder="Add an awesome feature..."
                                                    />
                                                </div>
                                                <button type="button" onClick={() => removeFeature(idx)} className="text-gray-200 hover:text-red-500 transition-colors px-1">
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        ))}
                                        {formData.features.length === 0 && (
                                            <div onClick={addFeature} className="cursor-pointer text-center py-8 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100 hover:border-amber-300 hover:bg-amber-50/30 transition-all group">
                                                <i className="fas fa-plus-circle text-2xl text-gray-200 group-hover:text-amber-400 mb-2 transition-colors"></i>
                                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest group-hover:text-amber-600">Click to add Features</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Our Facilities Section */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center p-2 rounded-2xl border border-gray-100 shadow-sm">
                                        <label className="text-[11px] font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-award text-green-500"></i> Value Facilities
                                        </label>
                                        <button type="button" onClick={addFacility} className="bg-[#003399] text-white w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#003399] transition shadow-lg shadow-green-100 transform hover:scale-110 active:scale-95">
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {formData.facilities.map((facility, idx) => (
                                            <div key={idx} className="flex gap-3 group animate-in slide-in-from-right-4 duration-300">
                                                <div className="flex-1 relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-green-300 font-extrabold">{idx + 1}</span>
                                                    <input
                                                        type="text"
                                                        value={facility}
                                                        onChange={(e) => updateFacility(idx, e.target.value)}
                                                        className="w-full pl-10 pr-4 py-2 bg-white border-2 border-gray-400 rounded-2xl text-sm font-medium focus:border-green-400 focus:ring-4 focus:ring-green-50 outline-none transition-all shadow-sm"
                                                        placeholder="Add a core facility..."
                                                    />
                                                </div>
                                                <button type="button" onClick={() => removeFacility(idx)} className="text-gray-200 hover:text-red-500 transition-colors px-1">
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        ))}
                                        {formData.facilities.length === 0 && (
                                            <div onClick={addFacility} className="cursor-pointer text-center py-8 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100 hover:border-green-300 hover:bg-green-50/30 transition-all group">
                                                <i className="fas fa-plus-circle text-2xl text-gray-200 group-hover:text-green-400 mb-2 transition-colors"></i>
                                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest group-hover:text-green-600">Click to add Facilities</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Document Requirement Cards */}
                        <div className="space-y-6 pt-8 border-t border-gray-100">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
                                    <i className="fas fa-id-card text-blue-600"></i> Documents Required (Multi-Card Builder)
                                </h3>
                                <button
                                    type="button"
                                    onClick={addDocCard}
                                    className="bg-blue-50 text-[#003399] px-4 py-2 rounded-lg font-bold text-xs hover:bg-[#003399] hover:text-white transition flex items-center gap-2"
                                >
                                    <i className="fas fa-plus"></i> Add Category Card
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {formData.documents.map((card, cIdx) => (
                                    <div key={cIdx} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 relative group hover:border-blue-300 transition-colors shadow-sm">
                                        <button
                                            type="button"
                                            onClick={() => removeDocCard(cIdx)}
                                            className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition"
                                        >
                                            <i className="fas fa-times-circle text-lg"></i>
                                        </button>

                                        <div className="grid grid-cols-3 gap-6 mb-6">
                                            <div className="col-span-2">
                                                <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Grouping Title</label>
                                                <input
                                                    type="text"
                                                    value={card.title}
                                                    onChange={(e) => updateDocCard(cIdx, 'title', e.target.value)}
                                                    className="w-full px-5 py-2 bg-white border-2 border-gray-400 rounded-2xl text-sm font-bold focus:border-[#003399] outline-none shadow-sm transition-all"
                                                    placeholder="e.g. Personal KYC"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Icon (FA)</label>
                                                <input
                                                    type="text"
                                                    value={card.icon}
                                                    onChange={(e) => updateDocCard(cIdx, 'icon', e.target.value)}
                                                    className="w-full px-5 py-2 bg-white border-2 border-gray-400 rounded-2xl text-sm font-mono focus:border-[#003399] outline-none shadow-sm transition-all"
                                                    placeholder="fas fa-key"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest px-1">Checklist Items</label>
                                            {card.items.map((item, iIdx) => (
                                                <div key={iIdx} className="flex gap-2 items-center animate-in slide-in-from-left-2 duration-200">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#003399] opacity-30"></div>
                                                    <input
                                                        type="text"
                                                        value={item}
                                                        onChange={(e) => updateDocItem(cIdx, iIdx, e.target.value)}
                                                        className="flex-1 px-5 py-2 bg-white border-2 border-gray-400 rounded-xl text-xs font-medium focus:border-blue-400 outline-none shadow-sm"
                                                        placeholder="Add requirement..."
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeDocItem(cIdx, iIdx)}
                                                        className="text-gray-200 hover:text-red-500 transition-colors p-1"
                                                    >
                                                        <i className="fas fa-minus-circle text-base"></i>
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => addDocItem(cIdx)}
                                                className="w-full bg-white border border-dashed border-blue-200 text-[#003399] py-3 rounded-xl text-[11px] font-black uppercase tracking-wider hover:bg-blue-50 hover:border-blue-400 transition-all flex items-center justify-center gap-2 mt-4"
                                            >
                                                <i className="fas fa-plus"></i> New Requirement
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {formData.documents.length === 0 && (
                                <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                                    <i className="fas fa-folder-open text-3xl text-gray-300 mb-3"></i>
                                    <p className="text-sm text-gray-400 font-medium">No document cards added for this product.</p>
                                    <button type="button" onClick={addDocCard} className="text-[#003399] text-xs font-bold underline mt-2">Create first card</button>
                                </div>
                            )}
                        </div>

                        {/* Banner Image */}
                        <div className="pt-8 border-t border-gray-100">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg mb-6">
                                <i className="fas fa-image text-amber-500"></i> Main Banner Image
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
                                <div className="border border-gray-200 rounded-2xl p-2 bg-gray-50 flex items-center justify-center min-h-[200px] overflow-hidden relative group">
                                    {(bannerFile || formData.image_path) ? (
                                        <div className="relative w-full">
                                            <img
                                                src={bannerFile ? URL.createObjectURL(bannerFile) : `assets/images/banner/${formData.image_path}`}
                                                className="w-full h-auto rounded-xl shadow-sm"
                                                onError={(e) => e.target.src = 'assets/images/placeholder_banner.jpg'}
                                            />
                                            {bannerFile && (
                                                <button onClick={() => setBannerFile(null)} className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg">
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <i className="fas fa-cloud-upload-alt text-4xl text-gray-300 mb-2"></i>
                                            <p className="text-xs text-gray-400 font-medium">No Image Assigned</p>
                                        </div>
                                    )}
                                </div>
                                <div className="md:col-span-3 space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Upload Banner Image</label>
                                        <div className="flex gap-2">
                                            <label className="flex-1 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#003399] hover:bg-blue-50 transition group">
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => setBannerFile(e.target.files[0])}
                                                />
                                                <i className="fas fa-image text-4xl text-gray-300 group-hover:text-[#003399] mb-3 block"></i>
                                                <span className="text-sm font-bold text-gray-500 block">
                                                    {bannerFile ? bannerFile.name : 'Click to select or drag and drop a new banner image'}
                                                </span>
                                                <span className="text-[10px] text-gray-400 mt-1 block tracking-wider uppercase">Recommended size: 1920x600px</span>
                                            </label>
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Current Filename / Manual override</label>
                                            <input type="text" name="image_path" value={formData.image_path} onChange={handleInputChange} className="w-full px-5 py-2 bg-white border border-gray-100 rounded-2xl text-xs focus:ring-1 focus:ring-gray-300 outline-none" placeholder="e.g. savings_banner.jpg" />
                                        </div>
                                    </div>
                                    <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-center gap-3">
                                        <i className="fas fa-info-circle text-red-500"></i>
                                        <p className="text-xs text-red-700 leading-relaxed font-medium">After updating, these changes will immediately reflect on the public banking website's product details page. <strong>Always preview before publishing.</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-12 pb-4 flex flex-col items-center border-t border-gray-100 gap-6">
                            <button
                                type="submit"
                                disabled={saving}
                                className="group relative bg-[#003399] hover:bg-blue-800 text-white px-16 py-5 rounded-[2rem] font-black text-xl transition-all shadow-2xl shadow-blue-200/50 disabled:opacity-50 flex items-center gap-4 transform hover:scale-105 active:scale-95 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                                {saving ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-cloud-upload-alt text-2xl"></i>}
                                <span>{isNew ? 'Publish Content Now' : 'Save & Publish Updates'}</span>
                            </button>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Visual confirmation will appear above after saving</p>
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
            </div >
        </div >
    );
};

export default AdminEditProduct;
