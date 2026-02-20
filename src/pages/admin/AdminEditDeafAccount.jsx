import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

const AdminEditDeafAccount = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        full_name: '',
        account_number: '',
        urn_number: '',
        account_type: 'Savings Account',
        branch_name: '',
        status: 'Identified for DEAF',
        remarks: ''
    });
    const [branches, setBranches] = useState([]);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchBranches();
        if (isEdit) fetchAccountDetails();
    }, [id]);

    const fetchBranches = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/branches`);
            const data = await res.json();
            setBranches(Array.isArray(data) ? data : []);
        } catch (err) { console.error('Error fetching branches:', err); }
    };

    const fetchAccountDetails = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/deaf-accounts/show/${id}`);
            const data = await res.json();
            if (data) {
                setFormData({
                    full_name: data.full_name,
                    account_number: data.account_number,
                    urn_number: data.urn_number,
                    account_type: data.account_type,
                    branch_name: data.branch_name,
                    status: data.status,
                    remarks: data.remarks
                });
            }
        } catch (err) { console.error('Error fetching details:', err); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: '', type: '' });

        const url = isEdit
            ? `${import.meta.env.VITE_API_BASE_URL}/deaf-accounts/update/${id}`
            : `${import.meta.env.VITE_API_BASE_URL}/deaf-accounts/create`;

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: `Record ${isEdit ? 'updated' : 'saved'} successfully! Redirecting...`, type: 'success' });
                setTimeout(() => navigate('/admin/disclosures/deaf-accounts'), 1500);
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
            <header className="max-w-3xl mx-auto flex px-8 py-8 items-center gap-4">
                <Link to="/admin/disclosures/deaf-accounts" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#003399] transition"><i className="fas fa-arrow-left"></i></Link>
                <h2 className="text-xl font-bold text-gray-800">{isEdit ? 'Edit DEAF Account' : 'Add DEAF Account List'}</h2>
            </header>

            <div className="max-w-3xl mx-auto px-8 pb-20">
                {message.text && (
                    <div className={`p-4 mb-6 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message.text}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className={labelStyle}>Full Name</label>
                            <input type="text" className={inputStyle} value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })} required placeholder="Enter customer full name" />
                        </div>
                        <div>
                            <label className={labelStyle}>Account Number</label>
                            <input type="text" className={inputStyle} value={formData.account_number} onChange={e => setFormData({ ...formData, account_number: e.target.value })} required placeholder="XXXXXXXXXXXX" />
                        </div>
                        <div>
                            <label className={labelStyle}>URN Number</label>
                            <input type="text" className={inputStyle} value={formData.urn_number} onChange={e => setFormData({ ...formData, urn_number: e.target.value })} required placeholder="URN-XXXX-XXXX" />
                        </div>
                        <div>
                            <label className={labelStyle}>Account Type</label>
                            <select className={inputStyle} value={formData.account_type} onChange={e => setFormData({ ...formData, account_type: e.target.value })}>
                                <option>Savings Account</option>
                                <option>Current Account</option>
                                <option>Fixed Deposit</option>
                                <option>Recurring Deposit</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelStyle}>Branch Name</label>
                            <select className={inputStyle} value={formData.branch_name} onChange={e => setFormData({ ...formData, branch_name: e.target.value })} required>
                                <option value="">Select Branch</option>
                                {branches.map(branch => (
                                    <option key={branch.id} value={branch.name}>{branch.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className={labelStyle}>Status</label>
                            <select className={inputStyle} value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                <option>Identified for DEAF</option>
                                <option>Transferred to DEAF</option>
                                <option>Active (Remove from DEAF)</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className={labelStyle}>Remarks</label>
                            <textarea className={inputStyle} rows="4" value={formData.remarks} onChange={e => setFormData({ ...formData, remarks: e.target.value })} placeholder="Any additional notes..."></textarea>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={saving} className="w-full bg-[#003399] hover:bg-black text-white py-4 rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-900/10">
                            {saving ? 'Saving...' : (isEdit ? 'Update Account Record' : 'Save Account Record')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditDeafAccount;
