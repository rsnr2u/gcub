import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authFetch } from '../../utils/api';

const AdminNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/news');
            const data = await res.json();
            setNews(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching news:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this news item?')) return;

        try {
            const res = await authFetch(`http://localhost:8080/api/news/delete/${id}`, {
                method: 'POST'
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'News deleted successfully!', type: 'success' });
                fetchNews();
            } else {
                setMessage({ text: 'Error: ' + JSON.stringify(result.messages || result), type: 'error' });
            }
        } catch (err) {
            console.error(err);
            setMessage({ text: 'Network Error: ' + err.message, type: 'error' });
        }
    };

    if (loading) return <div className="p-6 text-center text-gray-500">Loading latest news...</div>;

    return (
        <div className="w-full px-6 py-8">
            <header className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Latest News</h2>

                <Link
                    to="/admin/content/news/create"
                    className="bg-[#003399] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-800 transition flex items-center gap-2 shadow-lg shadow-blue-100"
                >
                    <i className="fas fa-plus"></i> Add New News
                </Link>
            </header>

            {message.text && (
                <div className={`mb-6 p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {message.text}
                </div>
            )}

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Image</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">News Title</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Marquee Status</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {news.length > 0 ? news.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden text-center flex items-center justify-center">
                                        {item.image ? (
                                            <img src={`http://localhost:8080/${item.image}`} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <i className="fas fa-image text-gray-200"></i>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-bold text-gray-800 leading-snug">{item.title}</div>
                                </td>
                                <td className="px-6 py-4 text-center text-center">
                                    {item.is_latest == 1 ? (
                                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm border border-green-100 flex items-center justify-center gap-1.5 mx-auto w-fit">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                            Active
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 bg-gray-50 text-gray-400 rounded-full text-[9px] font-black uppercase tracking-wider border border-gray-100 flex items-center justify-center gap-1.5 mx-auto w-fit">
                                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                                            Inactive
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-[11px] font-medium text-gray-500">
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link to={`/admin/content/news/edit/${item.id}`} className="w-8 h-8 rounded-full bg-blue-50 text-[#003399] hover:bg-[#003399] hover:text-white transition flex items-center justify-center text-xs">
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button onClick={() => handleDelete(item.id)} className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center text-xs">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-gray-400 text-sm italic">
                                    No news items found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminNews;
