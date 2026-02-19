import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { BASE_URL, apiFetch } from '../../utils/api';


const AdminEditAnnualReport = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({ title: '', description: '', year: '', file: null });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isEdit) fetchReport();
    }, [id]);

    const fetchReport = async () => {
        try {
            const res = await apiFetch(`/annual-reports/show/${id}`);
            const data = await res.json();
            if (data) setFormData({ ...data, file: null }); // Don't set file input
        } catch (error) { console.error('Error fetching report:', error); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // File is required only for create, optional for update
        if (!isEdit && !formData.file) return alert("Please select a file");

        setSaving(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('year', formData.year);
        if (formData.file) {
            data.append('file', formData.file);
        }

        const url = isEdit
            ? `/annual-reports/update/${id}`
            : `${BASE_URL}/api/annual-reports/create`;

        try {
            const res = await fetch(url, { method: 'POST', body: data });
            const result = await res.json();
            if (result.status === 'success') {
                navigate('/admin/annual-reports');
            } else {
                console.error(result);
                alert('Error saving report: ' + JSON.stringify(result.messages || result));
            }
        } catch (err) { console.error(err); } finally { setSaving(false); }
    };

    const inputStyle = "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-base font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50";
    const labelStyle = "block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2.5 px-0.5";

    return (
        <div className="font-inter min-h-screen">
            <header className="max-w-2xl mx-auto flex px-8 py-6 items-center gap-4">
                <Link to="/admin/annual-reports" className="text-gray-400 hover:text-[#003399] transition"><i className="fas fa-arrow-left"></i></Link>
                <h2 className="text-xl font-bold text-gray-800">{isEdit ? 'Edit Annual Report' : 'Add Annual Report'}</h2>
            </header>

            <div className="max-w-2xl mx-auto px-8 pb-20">
                <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6">
                    <div>
                        <label className={labelStyle}>Report Title</label>
                        <input type="text" className={inputStyle} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required placeholder="Annual Report 2023-24" />
                    </div>
                    <div>
                        <label className={labelStyle}>Description (Subtitle)</label>
                        <input type="text" className={inputStyle} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="76th Annual General Body Meeting Report" />
                    </div>
                    <div>
                        <label className={labelStyle}>Financial Year</label>
                        <input type="text" className={inputStyle} value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} placeholder="2023-24" />
                    </div>
                    <div>
                        <label className={labelStyle}>{isEdit ? 'Update PDF (Optional)' : 'Upload PDF'}</label>
                        <input type="file" accept=".pdf" className={inputStyle} onChange={e => setFormData({ ...formData, file: e.target.files[0] })} required={!isEdit} />
                        {isEdit && <p className="text-xs text-gray-400 mt-1">Leave empty to keep existing file.</p>}
                    </div>
                    <button type="submit" disabled={saving} className="w-full bg-[#003399] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest mt-4">
                        {saving ? 'Saving...' : 'Upload Report'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminEditAnnualReport;
