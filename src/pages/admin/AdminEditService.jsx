import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { authFetch } from '../../utils/api';

const AdminEditService = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        status: 'active',
        meta_title: '',
        meta_description: '',
        meta_keywords: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        if (isEdit) fetchDetails();
    }, [id]);

    const fetchDetails = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/services/show/${id}`);
            const data = await res.json();
            if (data) {
                setFormData({
                    title: data.title || '',
                    slug: data.slug || '',
                    excerpt: data.excerpt || '',
                    content: data.content || '',
                    status: data.status || 'active',
                    meta_title: data.meta_title || '',
                    meta_description: data.meta_description || '',
                    meta_keywords: data.meta_keywords || ''
                });
                if (data.image_path) {
                    setImagePreview(`${import.meta.env.VITE_BASE_URL}/${data.image_path}`);
                }
            }
        } catch (err) {
            console.error('Error fetching details:', err);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: isEdit ? prev.slug : generateSlug(title)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: '', type: '' });

        const url = isEdit
            ? `${import.meta.env.VITE_API_BASE_URL}/services/update/${id}`
            : `${import.meta.env.VITE_API_BASE_URL}/services/create`;

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        if (imageFile) {
            formDataToSend.append('image', imageFile);
        }

        try {
            const res = await authFetch(url, {
                method: 'POST',
                body: formDataToSend
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: `Service ${isEdit ? 'updated' : 'created'} successfully! Redirecting...`, type: 'success' });
                setTimeout(() => navigate('/admin/content/services'), 1000);
            } else {
                setMessage({ text: 'Error: ' + JSON.stringify(result.messages || result), type: 'error' });
            }
        } catch (err) {
            console.error(err);
            setMessage({ text: 'Network Error: ' + err.message, type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const inputStyle = "w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 focus:border-[#003399] outline-none transition-all";
    const labelStyle = "block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-0.5";

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    };

    return (
        <div className="w-full px-6 py-4 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                <header className="flex items-center gap-4 mb-8">
                    <Link to="/admin/content/services" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#003399] transition border border-gray-100">
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-800">{isEdit ? 'Edit Service' : 'Add New Service'}</h2>
                </header>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        {message.text}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelStyle}>Service Title</label>
                            <input
                                type="text"
                                className={inputStyle}
                                value={formData.title}
                                onChange={handleTitleChange}
                                required
                                placeholder="Enter service title"
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>Slug (URL Key)</label>
                            <input
                                type="text"
                                className={inputStyle}
                                value={formData.slug}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                required
                                placeholder="service-url-slug"
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelStyle}>Short Excerpt</label>
                        <textarea
                            className={inputStyle}
                            value={formData.excerpt}
                            onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                            placeholder="Brief summary of the service"
                            rows="2"
                        />
                    </div>

                    <div>
                        <label className={labelStyle}>Service Content (Rich Text)</label>
                        <div className="bg-white">
                            <ReactQuill
                                theme="snow"
                                value={formData.content}
                                onChange={content => setFormData({ ...formData, content })}
                                modules={modules}
                                className="h-64 mb-16"
                                placeholder="Write the full service details here..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelStyle}>Service Image</label>
                        <div className="flex items-center gap-4">
                            <label className="bg-[#003399] text-white px-4 py-2 rounded-lg font-bold text-xs uppercase cursor-pointer hover:bg-blue-800 transition">
                                Browse...
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                            <span className="text-xs text-gray-400 font-medium">{imageFile ? imageFile.name : 'No file selected.'}</span>
                        </div>
                        {imagePreview && (
                            <div className="mt-6">
                                <img src={imagePreview} alt="Preview" className="w-full max-w-md h-48 object-cover rounded-xl border border-gray-100 shadow-sm" />
                            </div>
                        )}
                    </div>

                    <div className="border-t border-gray-100 pt-8 mt-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">SEO Settings (Optional)</h3>
                        <div className="space-y-6">
                            <div>
                                <label className={labelStyle}>Meta Title</label>
                                <input
                                    type="text"
                                    className={inputStyle}
                                    value={formData.meta_title}
                                    onChange={e => setFormData({ ...formData, meta_title: e.target.value })}
                                    placeholder="Enter meta title"
                                />
                            </div>
                            <div>
                                <label className={labelStyle}>Meta Description</label>
                                <textarea
                                    className={inputStyle}
                                    value={formData.meta_description}
                                    onChange={e => setFormData({ ...formData, meta_description: e.target.value })}
                                    placeholder="Enter meta description"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className={labelStyle}>Meta Keywords (Comma separated)</label>
                                <input
                                    type="text"
                                    className={inputStyle}
                                    value={formData.meta_keywords}
                                    onChange={e => setFormData({ ...formData, meta_keywords: e.target.value })}
                                    placeholder="banking, service, local"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                        <select
                            value={formData.status}
                            onChange={e => setFormData({ ...formData, status: e.target.value })}
                            className={inputStyle}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <label className={labelStyle}>Status</label>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={saving} className="w-full bg-[#003399] hover:bg-blue-800 text-white py-4 rounded-lg font-bold text-sm uppercase tracking-widest transition-all shadow-lg shadow-blue-900/10">
                            {saving ? 'Processing...' : (isEdit ? 'Update Service' : 'Create Service')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditService;
