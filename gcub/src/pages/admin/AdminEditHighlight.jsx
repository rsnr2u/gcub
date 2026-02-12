import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const AdminEditHighlight = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({ title: '', description: '', is_active: true });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isEdit) fetchHighlight();
    }, [id]);

    const fetchHighlight = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/highlights/show/${id}`);
            const data = await res.json();
            if (data) setFormData({ ...data, is_active: data.is_active === '1' || data.is_active === true });
        } catch (error) { console.error(error); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const url = isEdit
            ? `http://localhost:8080/api/highlights/update/${id}`
            : 'http://localhost:8080/api/highlights/create';

        try {
            const formBody = new URLSearchParams();
            Object.keys(formData).forEach(key => formBody.append(key, formData[key]));

            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formBody.toString()
            });

            const result = await res.json();
            if (result.status === 'success') {
                navigate('/admin/highlights');
            } else {
                console.error(result);
                alert('Error saving highlight: ' + JSON.stringify(result.messages || result));
            }
        } catch (err) { console.error(err); } finally { setSaving(false); }
    };

    const inputStyle = "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-base font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50";
    const labelStyle = "block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2.5 px-0.5";

    return (
        <div className="font-inter min-h-screen">
            <header className="max-w-2xl mx-auto flex px-8 py-6 items-center gap-4">
                <Link to="/admin/highlights" className="text-gray-400 hover:text-[#003399] transition"><i className="fas fa-arrow-left"></i></Link>
                <h2 className="text-xl font-bold text-gray-800">{isEdit ? 'Edit Highlight' : 'Add New Highlight'}</h2>
            </header>

            <div className="max-w-2xl mx-auto px-8 pb-20">
                <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6">
                    <div>
                        <label className={labelStyle}>Title</label>
                        <input type="text" className={inputStyle} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required placeholder="Financial Achievement" />
                    </div>
                    <div>
                        <label className={labelStyle}>Description</label>
                        <textarea rows="4" className={inputStyle} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required placeholder="The bank has crossed ₹5000 Cr business milestone..." />
                    </div>
                    <div>
                        <label className={labelStyle}>Status</label>
                        <select className={inputStyle} value={formData.is_active} onChange={e => setFormData({ ...formData, is_active: e.target.value === 'true' })}>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>

                    <button type="submit" disabled={saving} className="w-full bg-[#003399] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest mt-4">
                        {saving ? 'Saving...' : 'Save Highlight'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminEditHighlight;
