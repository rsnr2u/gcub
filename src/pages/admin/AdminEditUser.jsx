import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch, BASE_URL } from '../../utils/api';


const AdminEditUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role_id: '',
        is_active: 1
    });
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchRoles();
        if (isEdit) {
            fetchUser();
        }
    }, [id]);

    const fetchRoles = async () => {
        try {
            const res = await apiFetch('/roles');
            const data = await res.json();
            setRoles(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching roles:', err);
        }
    };

    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await apiFetch(`/users/show/${id}`);
            const data = await res.json();
            if (data) {
                setFormData({
                    name: data.name || '',
                    email: data.email || '',
                    password: '', // Never populate password
                    role_id: data.role_id || '',
                    is_active: data.is_active || 1
                });
            }
        } catch (err) {
            console.error('Error fetching user:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: '', type: '' });

        try {
            const url = isEdit
                ? `/users/update/${id}`
                : `${BASE_URL}/api/users/create`;

            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await res.json();

            if (result.status === 'success') {
                setMessage({ text: `User ${isEdit ? 'updated' : 'created'} successfully!`, type: 'success' });
                setTimeout(() => navigate('/admin/users'), 1500);
            } else {
                setMessage({ text: 'Error: ' + JSON.stringify(result.messages || result), type: 'error' });
            }
        } catch (err) {
            setMessage({ text: 'Network Error: ' + err.message, type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const inputStyle = "w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50";
    const labelStyle = "block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 px-0.5";

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading...</div>;

    return (
        <div className="font-inter mx-auto">
            <header className="px-8">
                <h2 className="text-xl font-bold text-gray-800">{isEdit ? 'Edit User' : 'Add New User'}</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                    {isEdit ? 'Update user information' : 'Create a new admin user'}
                </p>
            </header>

            <div className="px-8 py-6">
                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <i className="fas fa-info-circle mr-2"></i> {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6 max-w-2xl">
                    <div>
                        <label className={labelStyle}>Full Name</label>
                        <input
                            type="text"
                            className={inputStyle}
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                            placeholder="e.g., John Doe"
                        />
                    </div>

                    <div>
                        <label className={labelStyle}>Email Address</label>
                        <input
                            type="email"
                            className={inputStyle}
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required
                            placeholder="e.g., john@gcub.com"
                        />
                    </div>

                    <div>
                        <label className={labelStyle}>
                            Password {isEdit && <span className="text-gray-400 normal-case">(leave blank to keep current)</span>}
                        </label>
                        <input
                            type="password"
                            className={inputStyle}
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            required={!isEdit}
                            placeholder={isEdit ? "Enter new password to change" : "Minimum 6 characters"}
                        />
                    </div>

                    <div>
                        <label className={labelStyle}>Role</label>
                        <select
                            className={inputStyle}
                            value={formData.role_id}
                            onChange={e => setFormData({ ...formData, role_id: e.target.value })}
                            required
                        >
                            <option value="">Select a role</option>
                            {roles.map(role => (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className={labelStyle}>Status</label>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="is_active"
                                    value="1"
                                    checked={formData.is_active == 1}
                                    onChange={e => setFormData({ ...formData, is_active: 1 })}
                                    className="text-[#003399]"
                                />
                                <span className="text-sm font-medium text-green-700">Active</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="is_active"
                                    value="0"
                                    checked={formData.is_active == 0}
                                    onChange={e => setFormData({ ...formData, is_active: 0 })}
                                    className="text-[#003399]"
                                />
                                <span className="text-sm font-medium text-red-700">Inactive</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-[#003399] hover:bg-black text-white py-4 rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-900/10"
                        >
                            {saving ? 'Saving...' : (isEdit ? 'Update User' : 'Create User')}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/users')}
                            className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditUser;
