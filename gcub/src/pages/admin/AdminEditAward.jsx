import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const AdminEditAward = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({ title: '', description: '', image: null });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isEdit) fetchAward();
    }, [id]);

    const fetchAward = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/awards/show/${id}`);
            const data = await res.json();
            if (data) setFormData({ ...data, image: null });
        } catch (error) { console.error('Error fetching award:', error); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Image required for create, optional for update
        if (!isEdit && !formData.image) return alert("Please select an image");

        setSaving(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        if (formData.image) {
            data.append('image', formData.image);
        }

        const url = isEdit
            ? `http://localhost:8080/api/awards/update/${id}`
            : 'http://localhost:8080/api/awards/create';

        try {
            const res = await fetch(url, { method: 'POST', body: data });
            const result = await res.json();
            if (result.status === 'success') {
                navigate('/admin/awards');
            } else {
                console.error(result);
                alert('Error saving award: ' + JSON.stringify(result.messages || result));
            }
        } catch (err) { console.error(err); } finally { setSaving(false); }
    };

    const inputStyle = "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-base font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50";
    const labelStyle = "block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2.5 px-0.5";

    return (
        <div className="font-inter min-h-screen">
            <header className="max-w-2xl mx-auto flex px-8 py-6 items-center gap-4">
                <Link to="/admin/awards" className="text-gray-400 hover:text-[#003399] transition"><i className="fas fa-arrow-left"></i></Link>
                <h2 className="text-xl font-bold text-gray-800">{isEdit ? 'Edit Award' : 'Add Award'}</h2>
            </header>

            <div className="max-w-2xl mx-auto px-8 pb-20">
                <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6">
                    <div>
                        <label className={labelStyle}>Award Title</label>
                        <input type="text" className={inputStyle} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required placeholder="Best Co-operative Bank 2024" />
                    </div>
                    <div>
                        <label className={labelStyle}>Description</label>
                        <textarea rows="4" className={inputStyle} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Awarded by the State Co-operative Federation..." />
                    </div>
                    <div>
                        <label className={labelStyle}>{isEdit ? 'Update Image (Optional)' : 'Upload Image'}</label>
                        {isEdit && formData.image_path && (
                            <div className="mb-3 w-32 h-32 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden">
                                <img src={`/${formData.image_path}`} alt="Current Award" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <input type="file" accept="image/*" className={inputStyle} onChange={e => setFormData({ ...formData, image: e.target.files[0] })} required={!isEdit} />
                        {isEdit && <p className="text-xs text-gray-400 mt-1">Leave empty to keep existing image.</p>}
                    </div>

                    <button type="submit" disabled={saving} className="w-full bg-[#003399] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest mt-4">
                        {saving ? 'Saving...' : 'Save Award'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminEditAward;
