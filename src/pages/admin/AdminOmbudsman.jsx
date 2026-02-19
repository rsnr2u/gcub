import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../utils/api';


const AdminOmbudsman = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await apiFetch('/ombudsman');
            const result = await res.json();
            setData(Array.isArray(result) ? result : []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            const response = await apiFetch(`/ombudsman/delete/${id}`, { method: 'POST' });
            if ((await response.json()).status === 'success') {
                setMessage({ type: 'success', text: 'Deleted successfully.' });
                fetchData();
            }
        } catch (error) { console.error(error); }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading Data...</div>;

    return (
        <div className="font-inter">
            <header className="flex px-8 justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Ombudsman</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Manage Ombudsman Disclosures</p>
                </div>
                <Link to="/admin/disclosures/ombudsman/new" className="bg-[#003399] hover:bg-black text-white px-6 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all shadow-sm">
                    <i className="fas fa-plus-circle mr-2"></i> Add New
                </Link>
            </header>

            <div className="px-8 py-4 space-y-6">
                {message.text && (
                    <div className={`p-4 rounded-xl text-xs font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <i className="fas fa-info-circle mr-2"></i> {message.text}
                    </div>
                )}

                <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                    {data.length === 0 ? (
                        <div className="p-8 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">No records found</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                        <th className="px-6 py-4 font-bold">Title</th>
                                        <th className="px-6 py-4 font-bold">Description</th>
                                        <th className="px-6 py-4 font-bold text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {data.map(item => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition text-sm text-gray-700">
                                            <td className="px-6 py-4 font-bold text-gray-900">{item.title}</td>
                                            <td className="px-6 py-4 text-gray-500 truncate max-w-xs">{item.description}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link to={`/admin/disclosures/ombudsman/edit/${item.id}`} className="text-gray-300 hover:text-[#003399] transition">
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

export default AdminOmbudsman;
