import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminBranches = () => {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/branches`);
            const data = await response.json();
            console.log('Branches API Response:', data);
            if (Array.isArray(data)) {
                setBranches(data);
            } else {
                console.error('API did not return an array:', data);
                setBranches([]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching branches:', error);
            setBranches([]);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this branch repository node?')) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/branches/delete/${id}`, {
                method: 'POST'
            });
            const data = await response.json();
            if (data.status === 'success') {
                setMessage({ type: 'success', text: 'Node safely purged from network.' });
                fetchBranches();
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Syncing Repository...</div>;

    return (
        <div className="font-inter min-h-screen">
            <header className="flex px-8 py-6 justify-between items-center mb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Branch Network</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Physical Connectivity Nodes</p>
                </div>
                <Link
                    to="/admin/branches/new"
                    className="bg-[#003399] hover:bg-black text-white px-8 py-2.5 rounded-lg font-bold text-[11px] uppercase tracking-widest transition-all flex items-center gap-2"
                >
                    <i className="fas fa-plus-circle"></i> Add New Branch
                </Link>
            </header>

            <div className="px-8 pb-12">
                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl text-xs font-bold transition-all ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <i className="fas fa-info-circle mr-2"></i> {message.text}
                    </div>
                )}

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-8 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Branch Name</th>
                                    <th className="px-8 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Location</th>
                                    <th className="px-8 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">IFSC / MICR</th>
                                    <th className="px-8 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Contact</th>
                                    <th className="px-8 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {branches.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center text-gray-400 uppercase text-xs font-bold tracking-widest">
                                            No connectivity nodes registered
                                        </td>
                                    </tr>
                                ) : (
                                    branches.map((branch) => (
                                        <tr key={branch.id} className="hover:bg-gray-50/50 transition group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#003399] text-sm">
                                                        <i className="fas fa-building"></i>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-base font-bold text-gray-900">{branch.name}</h3>
                                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">{branch.region}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="max-w-[280px]">
                                                    <p className="text-sm text-gray-500 font-medium leading-relaxed">{branch.address}</p>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="space-y-1">
                                                    <div className="text-xs font-bold text-gray-700">
                                                        <span className="text-gray-400">IFSC:</span> {branch.ifsc}
                                                    </div>
                                                    <div className="text-xs font-bold text-gray-700">
                                                        <span className="text-gray-400">MICR:</span> {branch.micr}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="space-y-1">
                                                    <div className="text-sm font-bold text-gray-800">{branch.contact}</div>
                                                    <div className="text-xs font-medium text-[#003399]">{branch.email}</div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        to={`/admin/branches/edit/${branch.id}`}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-[#003399] hover:text-white transition-all shadow-sm"
                                                    >
                                                        <i className="fas fa-edit text-[10px]"></i>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(branch.id)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                    >
                                                        <i className="fas fa-trash-alt text-[10px]"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBranches;
