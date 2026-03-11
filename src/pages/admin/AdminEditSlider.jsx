import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

const AdminEditSlider = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        category: '',
        title: '',
        description: '',
        button_name: '',
        button_link: '',
        display_order: 0,
        is_active: 1
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
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/sliders/show/${id}`);
            const data = await res.json();
            if (data) {
                setFormData({
                    category: data.category,
                    title: data.title,
                    description: data.description || '',
                    button_name: data.button_name || '',
                    button_link: data.button_link || '',
                    display_order: data.display_order || 0,
                    is_active: data.is_active !== undefined ? parseInt(data.is_active) : 1
                });
                if (data.image_path) {
                    setImagePreview(`${import.meta.env.VITE_BASE_URL}/${data.image_path}`);
                }
            }
        } catch (err) { console.error('Error fetching details:', err); }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: '', type: '' });

        const url = isEdit
            ? `${import.meta.env.VITE_API_BASE_URL}/sliders/update/${id}`
            : `${import.meta.env.VITE_API_BASE_URL}/sliders/create`;

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        if (imageFile) {
            formDataToSend.append('image', imageFile);
        }

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: formDataToSend
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: `Slider ${isEdit ? 'updated' : 'created'} successfully! Redirecting...`, type: 'success' });
                setTimeout(() => navigate('/admin/content/sliders'), 1500);
            } else {
                setMessage({ text: 'Error: ' + JSON.stringify(result.messages || result), type: 'error' });
            }
        } catch (err) {
            console.error(err);
            setMessage({ text: 'Network Error: ' + err.message, type: 'error' });
        } finally { setSaving(false); }
    };

    const inputStyle = "w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50";
    const labelStyle = "block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 px-0.5";

    return (
        <div className="font-inter min-h-screen bg-gray-50/50">
            <header className="max-w-4xl mx-auto flex px-8 py-8 items-center gap-4">
                <Link to="/admin/content/sliders" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#003399] transition">
                    <i className="fas fa-arrow-left"></i>
                </Link>
                <h2 className="text-xl font-bold text-gray-800">{isEdit ? 'Edit Slider' : 'Add New Slider'}</h2>
            </header>

            <div className="max-w-4xl mx-auto px-8 pb-20">
                {message.text && (
                    <div className={`p-4 mb-6 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message.text}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className={labelStyle}>Category</label>
                            <input
                                type="text"
                                className={inputStyle}
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                required
                                placeholder="e.g., Promotional, Informational"
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>Display Order</label>
                            <input
                                type="number"
                                className={inputStyle}
                                value={formData.display_order}
                                onChange={e => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelStyle}>Title</label>
                        <input
                            type="text"
                            className={inputStyle}
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                            placeholder="Enter slider title"
                        />
                    </div>

                    <div>
                        <label className={labelStyle}>Small Description</label>
                        <textarea
                            className={inputStyle}
                            rows="4"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Enter a brief description..."
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className={labelStyle}>Button Name</label>
                            <input
                                type="text"
                                className={inputStyle}
                                value={formData.button_name}
                                onChange={e => setFormData({ ...formData, button_name: e.target.value })}
                                placeholder="e.g., Learn More, Get Started"
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>Button Link</label>
                            <input
                                type="url"
                                className={inputStyle}
                                value={formData.button_link}
                                onChange={e => setFormData({ ...formData, button_link: e.target.value })}
                                placeholder="https://example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelStyle}>Slider Image</label>
                        <p className="text-[10px] text-gray-400 mb-2 italic">Recommended resolution: 1920x600 px (Width x Height) for best display on all devices.</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#003399] file:text-white hover:file:bg-black cursor-pointer"
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <img src={imagePreview} alt="Preview" className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200" />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={formData.is_active === 1}
                            onChange={e => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })}
                            className="w-4 h-4 text-[#003399] border-gray-300 rounded focus:ring-2 focus:ring-blue-50"
                        />
                        <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Active (Display this slider on the website)</label>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={saving} className="w-full bg-[#003399] hover:bg-black text-white py-4 rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-900/10">
                            {saving ? 'Saving...' : (isEdit ? 'Update Slider' : 'Create Slider')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditSlider;
