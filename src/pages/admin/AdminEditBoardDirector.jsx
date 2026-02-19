import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BASE_URL, apiFetch } from '../../utils/api';


const AdminEditBoardDirector = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        tagline: '',
        bio: '',
        display_order: 0,
        status: 'draft',
        image: null
    });
    const [previewImage, setPreviewImage] = useState(null);

    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (isEdit) {
            fetchDirector();
        }
    }, [id]);

    const fetchDirector = async () => {
        try {
            const response = await apiFetch(`/board-directors/show/${id}`);
            const data = await response.json();
            if (data) {
                setFormData({
                    ...data,
                    image: null
                });
                if (data.image_path) {
                    setPreviewImage(`${BASE_URL}/${data.image_path}`);
                }
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching director:', error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            setFormData(prev => ({ ...prev, image: file }));
            setPreviewImage(URL.createObjectURL(file));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null) {
                data.append(key, formData[key]);
            }
        });

        const url = isEdit
            ? `/board-directors/update/${id}`
            : `${BASE_URL}/api/board-directors/create`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            if (result.status === 'success') {
                setMessage({ type: 'success', text: `Director saved successfully.` });
                setTimeout(() => navigate('/admin/board-directors'), 1200);
            } else {
                setMessage({ type: 'error', text: 'Error saving director.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Connection failure.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading Details...</div>;

    const labelStyle = "block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2.5 px-0.5";
    const inputStyle = "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-base font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50";

    return (
        <div className="font-inter min-h-screen">
            <header className="max-w-4xl mx-auto flex px-8 py-2 justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/admin/board-directors" className="text-gray-400 hover:text-[#003399] transition">
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{isEdit ? 'Edit Director' : 'New Director'}</h2>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Board Profile Management</p>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-8 pb-20">
                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl text-xs font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <i className="fas fa-info-circle mr-2"></i> {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm p-10 space-y-8">
                    {/* Image Upload */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
                        <label className={labelStyle}>Profile Photo</label>
                        <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md mb-4 group cursor-pointer">
                            {previewImage ? (
                                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400"><i className="fas fa-user text-3xl"></i></div>
                            )}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                <i className="fas fa-camera text-white"></i>
                            </div>
                            <input type="file" name="image" onChange={handleChange} className="absolute inset-0 opacity-0 cursor-pointer" title="Change Photo" />
                        </div>
                        <p className="text-[10px] text-gray-400">Recommended: Square Aspect Ratio</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className={labelStyle}>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={inputStyle}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className={labelStyle}>Designation</label>
                            <input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                required
                                className={inputStyle}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className={labelStyle}>Tagline (Optional)</label>
                        <input
                            type="text"
                            name="tagline"
                            value={formData.tagline || ''}
                            onChange={handleChange}
                            placeholder="e.g. Visionary Leader"
                            className={inputStyle}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className={labelStyle}>Profile Bio (Optional)</label>
                        <textarea
                            name="bio"
                            value={formData.bio || ''}
                            onChange={handleChange}
                            rows="4"
                            className={`${inputStyle} resize-none`}
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className={labelStyle}>Display Order</label>
                            <input
                                type="number"
                                name="display_order"
                                value={formData.display_order}
                                onChange={handleChange}
                                className={inputStyle}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className={labelStyle}>Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className={inputStyle}
                            >
                                <option value="draft">Draft</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-[#003399] hover:bg-black text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-3"
                        >
                            {saving ? <i className="fas fa-spinner animate-spin"></i> : <i className="fas fa-check-circle"></i>}
                            {saving ? 'Processing...' : 'Save Director Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditBoardDirector;
