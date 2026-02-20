import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminAwards = () => {
    const [awards, setAwards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchAwards();
    }, []);

    const fetchAwards = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/awards');
            const data = await res.json();
            console.log('Awards Data:', data); // Debugging
            setAwards(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching awards:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this award?')) return;
        try {
            const response = await fetch(`http://localhost:8080/api/awards/delete/${id}`, { method: 'POST' });
            if ((await response.json()).status === 'success') {
                setMessage({ type: 'success', text: 'Award deleted.' });
                fetchAwards();
            }
        } catch (error) { console.error(error); }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading Data...</div>;

    return (
        <div className="font-inter">
            {/* Header */}
            <header className="flex px-8 justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Awards & Recognitions</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Manage Awards</p>
                </div>
                <Link to="/admin/awards/new" className="bg-[#003399] hover:bg-black text-white px-6 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all shadow-sm">
                    <i className="fas fa-plus-circle mr-2"></i> Add Award
                </Link>
            </header>

            <div className="px-8 py-4 space-y-6">
                {message.text && (
                    <div className={`p-4 rounded-xl text-xs font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <i className="fas fa-info-circle mr-2"></i> {message.text}
                    </div>
                )}

                <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                    {awards.length === 0 ? (
                        <div className="p-8 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">No awards found</div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {awards.map(item => (
                                <div key={item.id} className="p-6 flex items-start justify-between hover:bg-gray-50 transition">
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                                            {item.image_path ? (
                                                <img src={`/${item.image_path}`} alt={item.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <i className="fas fa-trophy text-gray-400"></i>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
                                            <p className="text-xs text-gray-500 mt-1 max-w-2xl">{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Link to={`/admin/awards/edit/${item.id}`} className="text-gray-300 hover:text-[#003399] p-2 transition">
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button onClick={() => handleDelete(item.id)} className="text-gray-300 hover:text-red-500 p-2 transition">
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminAwards;
