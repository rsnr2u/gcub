import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { authFetch } from '../../utils/api';

const AdminEditNews = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        is_latest: 1
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
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/news/show/${id}`);
            const data = await res.json();
            if (data) {
                setFormData({
                    title: data.title || '',
                    content: data.content || '',
                    is_latest: parseInt(data.is_latest) || 0
                });
                if (data.image) {
                    setImagePreview(`${import.meta.env.VITE_BASE_URL}/${data.image}`);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: '', type: '' });

        const url = isEdit
            ? `${import.meta.env.VITE_API_BASE_URL}/news/update/${id}`
            : `${import.meta.env.VITE_API_BASE_URL}/news/create`;

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('is_latest', formData.is_latest);

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
                setMessage({ text: `News ${isEdit ? 'updated' : 'created'} successfully! Redirecting...`, type: 'success' });
                setTimeout(() => navigate('/admin/content/news'), 1000);
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
                    <Link to="/admin/content/news" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#003399] transition border border-gray-100">
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-800">{isEdit ? 'Edit News' : 'Add New News'}</h2>
                </header>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        {message.text}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-8">
                    <div>
                        <label className={labelStyle}>News Title</label>
                        <input
                            type="text"
                            className={inputStyle}
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                            placeholder="Enter news title"
                        />
                    </div>

                    <div>
                        <label className={labelStyle}>Content (Rich Text)</label>
                        <div className="bg-white">
                            <ReactQuill
                                theme="snow"
                                value={formData.content}
                                onChange={content => setFormData({ ...formData, content })}
                                modules={modules}
                                className="h-64 mb-16"
                                placeholder="Write the news content here..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelStyle}>News Image</label>
                        <div className="flex items-center gap-4">
                            <label className="bg-[#003399] text-white px-4 py-2 rounded-lg font-bold text-xs uppercase cursor-pointer hover:bg-blue-800 transition">
                                Browse...
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                            <span className="text-xs text-gray-400 font-medium">{imageFile ? imageFile.name : 'No file selected.'}</span>
                        </div>
                        {imagePreview && (
                            <div className="mt-6 flex justify-center">
                                <img src={imagePreview} alt="Preview" className="w-full max-w-md h-64 object-cover rounded-xl border border-gray-100 shadow-sm" />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                        <input
                            type="checkbox"
                            id="is_latest"
                            checked={formData.is_latest === 1}
                            onChange={e => setFormData({ ...formData, is_latest: e.target.checked ? 1 : 0 })}
                            className="w-4 h-4 text-[#003399] border-gray-300 rounded focus:ring-[#003399]"
                        />
                        <label htmlFor="is_latest" className="text-sm font-bold text-gray-700">Display as Latest News (Marquee)</label>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={saving} className="w-full bg-[#003399] hover:bg-blue-800 text-white py-4 rounded-lg font-bold text-sm uppercase tracking-widest transition-all shadow-lg shadow-blue-900/10">
                            {saving ? 'Processing...' : (isEdit ? 'Update News' : 'Create News')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditNews;
