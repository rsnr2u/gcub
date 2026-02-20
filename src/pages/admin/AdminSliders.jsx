import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authFetch } from '../../utils/api';

const AdminSliders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/sliders`);
            const result = await res.json();
            setData(Array.isArray(result) ? result : []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this slider?')) return;
        try {
            const response = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/sliders/delete/${id}`, { method: 'POST' });
            if ((await response.json()).status === 'success') {
                setMessage({ type: 'success', text: 'Slider deleted successfully.' });
                fetchData();
            }
        } catch (error) { console.error(error); }
    };

    const toggleActive = async (id, currentStatus) => {
        try {
            const formData = new FormData();
            formData.append('is_active', currentStatus ? 0 : 1);

            const response = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/sliders/update/${id}`, {
                method: 'POST',
                body: formData
            });
            if ((await response.json()).status === 'success') {
                fetchData();
            }
        } catch (error) { console.error(error); }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading Sliders...</div>;

    return (
        <div className="font-inter">
            <header className="flex px-8 justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Sliders Management</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Manage Homepage Sliders</p>
                </div>
                <Link to="/admin/content/sliders/new" className="bg-[#003399] hover:bg-black text-white px-6 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all shadow-sm">
                    <i className="fas fa-plus-circle mr-2"></i> Add New Slider
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
                        <div className="p-8 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">No sliders found</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                        <th className="px-6 py-4 font-bold">Image</th>
                                        <th className="px-6 py-4 font-bold">Category</th>
                                        <th className="px-6 py-4 font-bold">Title</th>
                                        <th className="px-6 py-4 font-bold">Button</th>
                                        <th className="px-6 py-4 font-bold">Order</th>
                                        <th className="px-6 py-4 font-bold">Status</th>
                                        <th className="px-6 py-4 font-bold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {data.map(item => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition text-sm text-gray-700">
                                            <td className="px-6 py-4">
                                                {item.image_path ? (
                                                    <img src={`${import.meta.env.VITE_BASE_URL}/${item.image_path}`} alt={item.title} className="w-20 h-12 object-cover rounded" />
                                                ) : (
                                                    <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">No Image</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{item.category}</td>
                                            <td className="px-6 py-4 font-bold text-gray-900">{item.title}</td>
                                            <td className="px-6 py-4 text-gray-500">{item.button_name || '-'}</td>
                                            <td className="px-6 py-4 text-gray-500">{item.display_order}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => toggleActive(item.id, item.is_active)}
                                                    className={`px-3 py-1 rounded-full text-xs font-bold ${item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                                                >
                                                    {item.is_active ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link to={`/admin/content/sliders/edit/${item.id}`} className="text-gray-300 hover:text-[#003399] transition">
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

export default AdminSliders;
