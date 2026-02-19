import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Editor from 'react-simple-wysiwyg';
import { BASE_URL, apiFetch } from '../../utils/api';


const AdminEditOmbudsman = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        if (isEdit) fetchDetails();
    }, [id]);

    const fetchDetails = async () => {
        try {
            const res = await apiFetch(`/ombudsman/show/${id}`);
            const data = await res.json();
            if (data) {
                setFormData({
                    title: data.title,
                    description: data.description
                });
            }
        } catch (err) { console.error('Error fetching details:', err); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: '', type: '' });

        const url = isEdit
            ? `/ombudsman/update/${id}`
            : `${BASE_URL}/api/ombudsman/create`;

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: `Record ${isEdit ? 'updated' : 'saved'} successfully! Redirecting...`, type: 'success' });
                setTimeout(() => navigate('/admin/disclosures/ombudsman'), 1500);
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
        <div className="font-inter bg-gray-50/50">
            <header className="max-w-7xl mx-auto flex px-8 py-8 items-center gap-4">
                <Link to="/admin/disclosures/ombudsman" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#003399] transition"><i className="fas fa-arrow-left"></i></Link>
                <h2 className="text-xl font-bold text-gray-800">{isEdit ? 'Edit Ombudsman Disclosure' : 'Add New Ombudsman Disclosure'}</h2>
            </header>

            <div className="max-w-7xl mx-auto px-8 pb-20">
                {message.text && (
                    <div className={`p-4 mb-6 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message.text}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6">
                    <div>
                        <label className={labelStyle}>Title</label>
                        <input type="text" className={inputStyle} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required placeholder="Enter title" />
                    </div>
                    <div>
                        <label className={labelStyle}>Description (HTML Editor)</label>
                        <div className="bg-white">
                            <Editor
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                containerProps={{ style: { height: '300px' } }}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={saving} className="w-full bg-[#003399] hover:bg-black text-white py-4 rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-900/10">
                            {saving ? 'Saving...' : (isEdit ? 'Update Record' : 'Save Record')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditOmbudsman;
