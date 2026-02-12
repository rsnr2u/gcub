import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const AdminEditFinancialIndicator = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        parameter: '',
        value_prev_year: '',
        value_curr_year: '',
        year_prev: "Mar '23",
        year_curr: "Mar '24",
        growth_percentage: '',
        is_positive_growth: true
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isEdit) fetchIndicator();
    }, [id]);

    const fetchIndicator = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/financial-indicators/show/${id}`);
            const data = await res.json();
            if (data) setFormData({ ...data, is_positive_growth: data.is_positive_growth === '1' || data.is_positive_growth === true });
        } catch (error) { console.error(error); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const url = isEdit
            ? `http://localhost:8080/api/financial-indicators/update/${id}`
            : 'http://localhost:8080/api/financial-indicators/create';

        try {
            // Using JSON for simplicity here as no files involved
            const formBody = new URLSearchParams();
            Object.keys(formData).forEach(key => formBody.append(key, formData[key]));

            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formBody.toString()
            });

            const data = await res.json();
            if (data.status === 'success') {
                navigate('/admin/annual-reports');
            } else {
                console.error(data);
                alert('Error saving indicator: ' + (JSON.stringify(data.messages) || JSON.stringify(data)));
            }
        } catch (err) { console.error(err); } finally { setSaving(false); }
    };

    const inputStyle = "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-base font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50";
    const labelStyle = "block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2.5 px-0.5";

    return (
        <div className="font-inter min-h-screen">
            <header className="max-w-2xl mx-auto flex px-8 py-6 items-center gap-4">
                <Link to="/admin/annual-reports" className="text-gray-400 hover:text-[#003399] transition"><i className="fas fa-arrow-left"></i></Link>
                <h2 className="text-xl font-bold text-gray-800">{isEdit ? 'Edit Indicator' : 'Add Financial Indicator'}</h2>
            </header>

            <div className="max-w-2xl mx-auto px-8 pb-20">
                <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6">
                    <div>
                        <label className={labelStyle}>Parameter Name</label>
                        <input type="text" className={inputStyle} value={formData.parameter} onChange={e => setFormData({ ...formData, parameter: e.target.value })} required placeholder="Total Deposits" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div>
                                <label className={labelStyle}>Previous Year Label</label>
                                <input type="text" className={inputStyle} value={formData.year_prev} onChange={e => setFormData({ ...formData, year_prev: e.target.value })} required placeholder="Mar '23" />
                            </div>
                            <div>
                                <label className={labelStyle}>Previous Year Value</label>
                                <input type="text" className={inputStyle} value={formData.value_prev_year} onChange={e => setFormData({ ...formData, value_prev_year: e.target.value })} required placeholder="₹540.25 Cr" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className={labelStyle}>Current Year Label</label>
                                <input type="text" className={inputStyle} value={formData.year_curr} onChange={e => setFormData({ ...formData, year_curr: e.target.value })} required placeholder="Mar '24" />
                            </div>
                            <div>
                                <label className={labelStyle}>Current Year Value</label>
                                <input type="text" className={inputStyle} value={formData.value_curr_year} onChange={e => setFormData({ ...formData, value_curr_year: e.target.value })} required placeholder="₹606.10 Cr" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelStyle}>Growth %</label>
                            <input type="text" className={inputStyle} value={formData.growth_percentage} onChange={e => setFormData({ ...formData, growth_percentage: e.target.value })} required placeholder="12.2%" />
                        </div>
                        <div>
                            <label className={labelStyle}>Growth Direction</label>
                            <select className={inputStyle} value={formData.is_positive_growth} onChange={e => setFormData({ ...formData, is_positive_growth: e.target.value === 'true' })}>
                                <option value="true">Positive (Green)</option>
                                <option value="false">Negative (Red)</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" disabled={saving} className="w-full bg-[#003399] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest mt-4">
                        {saving ? 'Saving...' : 'Save Indicator'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminEditFinancialIndicator;
