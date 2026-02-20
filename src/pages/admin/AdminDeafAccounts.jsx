import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDeafAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/deaf-accounts`);
            const data = await res.json();
            setAccounts(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching accounts:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this account list?')) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/deaf-accounts/delete/${id}`, { method: 'POST' });
            if ((await response.json()).status === 'success') {
                setMessage({ type: 'success', text: 'Deleted successfully.' });
                fetchAccounts();
            }
        } catch (error) { console.error(error); }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading Data...</div>;

    return (
        <div className="font-inter">
            {/* Header */}
            <header className="flex px-8 justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">DEAF Accounts</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Manage Unclaimed Accounts</p>
                </div>
                <Link to="/admin/disclosures/deaf-accounts/new" className="bg-[#003399] hover:bg-black text-white px-6 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all shadow-sm">
                    <i className="fas fa-plus-circle mr-2"></i> Add New List
                </Link>
            </header>

            <div className="px-8 py-4 space-y-6">
                {message.text && (
                    <div className={`p-4 rounded-xl text-xs font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <i className="fas fa-info-circle mr-2"></i> {message.text}
                    </div>
                )}

                <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                    {accounts.length === 0 ? (
                        <div className="p-8 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">No records found</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                        <th className="px-6 py-4 font-bold">Full Name</th>
                                        <th className="px-6 py-4 font-bold">Account No</th>
                                        <th className="px-6 py-4 font-bold">URN</th>
                                        <th className="px-6 py-4 font-bold">Type</th>
                                        <th className="px-6 py-4 font-bold">Branch</th>
                                        <th className="px-6 py-4 font-bold">Status</th>
                                        <th className="px-6 py-4 font-bold text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {accounts.map(item => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition text-sm text-gray-700">
                                            <td className="px-6 py-4 font-bold text-gray-900">{item.full_name}</td>
                                            <td className="px-6 py-4">{item.account_number}</td>
                                            <td className="px-6 py-4 text-xs font-mono bg-gray-50 px-2 py-1 rounded inline-block mt-2">{item.urn_number}</td>
                                            <td className="px-6 py-4">{item.account_type}</td>
                                            <td className="px-6 py-4">{item.branch_name}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide 
                                                    ${item.status === 'Active (Remove from DEAF)' ? 'bg-green-100 text-green-700' :
                                                        item.status === 'Transferred to DEAF' ? 'bg-red-100 text-red-700' :
                                                            'bg-yellow-100 text-yellow-700'}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link to={`/admin/disclosures/deaf-accounts/edit/${item.id}`} className="text-gray-300 hover:text-[#003399] transition">
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <button onClick={() => handleDelete(item.id)} className="text-gray-300 hover:text-red-500 transition">
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDeafAccounts;
