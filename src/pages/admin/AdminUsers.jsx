import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authFetch } from '../../utils/api';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/users`);
            const data = await res.json();
            setUsers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        try {
            const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/roles`);
            const data = await res.json();
            setRoles(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching roles:', err);
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/users/toggle-status/${id}`, { method: 'POST' });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: `User ${currentStatus ? 'deactivated' : 'activated'} successfully!`, type: 'success' });
                fetchUsers();
            } else {
                setMessage({ text: result.messages || 'Error toggling status', type: 'error' });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/users/delete/${id}`, { method: 'POST' });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'User deleted successfully!', type: 'success' });
                fetchUsers();
            } else {
                setMessage({ text: result.messages || 'Error deleting user', type: 'error' });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Never';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading users...</div>;

    return (
        <div className="font-inter">
            <header className="px-8 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">User Management</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Manage Admin Users</p>
                </div>
                <Link to="/admin/users/new" className="bg-[#003399] hover:bg-black text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all">
                    <i className="fas fa-plus-circle mr-2"></i> Add User
                </Link>
            </header>

            <div className="px-8 py-6 space-y-6">
                {message.text && (
                    <div className={`p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <i className="fas fa-info-circle mr-2"></i> {message.text}
                    </div>
                )}

                <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr className="border-b-2 border-gray-200">
                                    <th className="text-left py-3 px-4 text-xs font-bold text-[#003399] uppercase tracking-wider">Name</th>
                                    <th className="text-left py-3 px-4 text-xs font-bold text-[#003399] uppercase tracking-wider">Email</th>
                                    <th className="text-left py-3 px-4 text-xs font-bold text-[#003399] uppercase tracking-wider">Role</th>
                                    <th className="text-left py-3 px-4 text-xs font-bold text-[#003399] uppercase tracking-wider">Status</th>
                                    <th className="text-left py-3 px-4 text-xs font-bold text-[#003399] uppercase tracking-wider">Last Login</th>
                                    <th className="text-right py-3 px-4 text-xs font-bold text-[#003399] uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{user.name}</td>
                                        <td className="py-3 px-4 text-sm text-gray-700">{user.email}</td>
                                        <td className="py-3 px-4">
                                            <span className="inline-block px-2 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700">
                                                {user.role_name}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => handleToggleStatus(user.id, user.is_active)}
                                                className={`inline-block px-2 py-1 text-xs font-bold rounded-full ${user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                                            >
                                                {user.is_active ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-500">{formatDate(user.last_login)}</td>
                                        <td className="py-3 px-4 text-right">
                                            <Link to={`/admin/users/edit/${user.id}`} className="text-gray-400 hover:text-[#003399] transition mr-3">
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button onClick={() => handleDelete(user.id)} className="text-gray-400 hover:text-red-500 transition">
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
