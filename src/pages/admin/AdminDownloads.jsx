import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminDownloads = () => {
    const [downloads, setDownloads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const location = useLocation();

    const categories = ['Account Opening Forms', 'Loan Applications', 'Services & Requests', 'Other'];

    const categoryThemes = {
        'Account Opening Forms': { bar: 'bg-[#003399]', text: 'text-[#003399]' },
        'Loan Applications': { bar: 'bg-[#E61111]', text: 'text-[#E61111]' },
        'Services & Requests': { bar: 'bg-gray-600', text: 'text-gray-600' },
        'Other': { bar: 'bg-gray-400', text: 'text-gray-400' }
    };

    useEffect(() => {
        fetchDownloads();

        if (location.state?.message) {
            setMessage({ type: 'success', text: location.state.message });
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const fetchDownloads = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/downloads`);
            const data = await response.json();
            if (Array.isArray(data)) {
                setDownloads(data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching downloads:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this resource?')) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/downloads/delete/${id}`, { method: 'POST' });
            const data = await response.json();
            if (data.status === 'success') {
                setMessage({ type: 'success', text: 'Resource deleted successfully!' });
                fetchDownloads();
            }
        } catch (error) {
            console.error('Error deleting download:', error);
        }
    };

    const groupedDownloads = downloads.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    if (loading) return <div className="p-6 text-center text-gray-500">Loading document repository...</div>;

    return (
        <div className="w-full px-6 py-8">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Downloadable Resources & Forms</h2>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mt-1">Institutional Document Repository</p>
                </div>
                <Link
                    to="/admin/downloads/new"
                    className="bg-[#003399] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-800 transition flex items-center gap-2 shadow-lg shadow-blue-100"
                >
                    <i className="fas fa-plus"></i> Add New Resource
                </Link>
            </header>

            {message.text && (
                <div className={`mb-8 p-4 rounded-lg text-sm border-2 ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                    <div className="flex items-center gap-2">
                        <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                        {message.text}
                    </div>
                </div>
            )}

            <div className="space-y-12">
                {categories.map(category => {
                    const items = groupedDownloads[category] || [];
                    const theme = categoryThemes[category] || categoryThemes['Other'];

                    return (
                        <div key={category} className="mb-10">
                            <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-6">
                                <h3 className={`text-lg font-bold ${theme.text}`}>{category}</h3>
                                <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">{items.length} Assets</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {items.map(item => (
                                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition group overflow-hidden relative">
                                        <div className="p-5 flex items-start gap-4">
                                            <div className="w-14 h-14 rounded-lg bg-red-50 text-red-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform flex-shrink-0">
                                                <i className="fas fa-file-pdf"></i>
                                            </div>
                                            <div className="flex-1 min-w-0 pr-12">
                                                <h4 className="font-bold text-gray-800 truncate group-hover:text-[#003399] transition">{item.title}</h4>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 line-clamp-1">
                                                    Effective: {item.effective_date ? new Date(item.effective_date).toLocaleDateString() : 'Active'}
                                                </p>
                                                <div className="mt-4 flex items-center gap-3">
                                                    <a
                                                        href={item.file_path ? `${(import.meta.env.VITE_API_URL || `${import.meta.env.VITE_BASE_URL}`).replace(/\/$/, '')}/${item.file_path.replace(/^\//, '')}` : '#'}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[10px] font-bold text-[#003399] border border-blue-100 px-3 py-1 rounded-md hover:bg-[#003399] hover:text-white transition"
                                                    >
                                                        DOWNLOAD PDF
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Overlay Actions - Matching Products Pattern */}
                                        <div className="absolute top-2 right-2 flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link to={`/admin/downloads/edit/${item.id}`} className="w-8 h-8 rounded-full bg-blue-50 text-[#003399] hover:bg-[#003399] hover:text-white transition flex items-center justify-center text-xs shadow-sm">
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button onClick={() => handleDelete(item.id)} className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center text-xs shadow-sm">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {items.length === 0 && (
                                    <div className="col-span-full py-8 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                        No documents found in this category.
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminDownloads;
