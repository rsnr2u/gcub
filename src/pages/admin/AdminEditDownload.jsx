import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const AdminEditDownload = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id;
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Account Opening Forms',
        effective_date: '',
        status: 'active'
    });
    const [selectedFile, setSelectedFile] = useState(null);

    const categories = ['Account Opening Forms', 'Loan Applications', 'Services & Requests', 'Other'];

    useEffect(() => {
        if (id) {
            fetchDownloadData();
        }
    }, [id]);

    const fetchDownloadData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/downloads/show/${id}`);
            const data = await response.json();
            if (data) {
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    category: data.category || 'Account Opening Forms',
                    effective_date: data.effective_date || '',
                    status: data.status || 'active'
                });
            }
        } catch (error) {
            console.error('Error fetching download:', error);
            setMessage({ type: 'error', text: 'Failed to load record data.' });
        } finally {
            setFetching(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const uploadData = new FormData();
        uploadData.append('title', formData.title);
        uploadData.append('description', formData.description);
        uploadData.append('category', formData.category);
        uploadData.append('effective_date', formData.effective_date);
        uploadData.append('status', formData.status);
        if (selectedFile) {
            uploadData.append('download_file', selectedFile);
        }

        const url = id
            ? `http://localhost:8080/api/downloads/update/${id}`
            : 'http://localhost:8080/api/downloads/create';

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: uploadData
            });
            const data = await response.json();

            if (data.status === 'success') {
                setMessage({ type: 'success', text: `Resource ${id ? 'updated' : 'provisioned'} successfully!` });
                setTimeout(() => navigate('/admin/downloads'), 1500);
            } else {
                setMessage({ type: 'error', text: data.message || 'Action failed' });
                setLoading(false);
            }
        } catch (error) {
            console.error('Error saving download:', error);
            setMessage({ type: 'error', text: 'Network request failed.' });
            setLoading(false);
        }
    };

    if (fetching) return <div className="p-10 text-center font-black text-gray-300 uppercase tracking-widest animate-pulse">Synchronizing Asset Metadata...</div>;

    return (
        <div className="bg-gray-100 font-inter -m-2">
            <header className="w-full bg-transparent flex px-8 justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/admin/downloads" className="text-gray-500 hover:text-[#003399] transition">
                        <i className="fas fa-arrow-left text-xl"></i>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {isNew ? 'Provision New Asset' : 'Modify Institutional Record'}
                        </h2>
                        <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mt-1">Institutional Document Protocol</p>
                    </div>
                </div>
            </header>

            <div className="p-8">
                <form onSubmit={handleSubmit} className="w-full space-y-8">
                    {message.text && (
                        <div className={`p-5 rounded-2xl text-sm font-medium shadow-sm transition-all animate-in fade-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-green-50 text-green-800 border-2 border-green-200' : 'bg-red-50 text-red-800 border-2 border-red-200'}`}>
                            <div className="flex items-center gap-3">
                                <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-lg`}></i>
                                {message.text}
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-10 space-y-12">
                        {/* File Upload Section */}
                        <div className="space-y-8 pb-10 border-b border-gray-100">
                            <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl tracking-tight">
                                <span className="w-1.5 h-8 bg-amber-500 rounded-full"></span>
                                Document Asset
                            </h3>
                            <div className="max-w-xl">
                                <label className="block text-[11px] font-black text-gray-500 uppercase mb-3 tracking-widest px-1">Source File (PDF)</label>
                                <div className="relative group">
                                    <div className="w-full h-48 rounded-[2rem] border-2 border-dashed border-gray-200 group-hover:border-[#003399]/30 transition-all flex flex-col items-center justify-center bg-gray-50/50">
                                        <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-gray-300 group-hover:text-[#003399] transition-colors mb-4 border border-gray-100">
                                            <i className="fas fa-file-pdf text-3xl"></i>
                                        </div>
                                        <p className="text-sm font-bold text-gray-700">Drag & drop PDF here</p>
                                        <p className="text-[10px] font-bold text-gray-400 mt-1">Max file size: 10MB</p>
                                        <button type="button" className="mt-4 px-6 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black text-gray-900 uppercase tracking-widest hover:border-gray-900 transition-all shadow-sm">Browse Files</button>
                                    </div>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        required={isNew}
                                    />
                                    {selectedFile && (
                                        <div className="absolute inset-x-4 bottom-4 bg-white/90 backdrop-blur rounded-xl p-3 border border-blue-100 flex items-center justify-between shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <i className="fas fa-check-circle text-green-500"></i>
                                                <span className="text-xs font-bold text-gray-700 truncate max-w-[200px]">{selectedFile.name}</span>
                                            </div>
                                            <button type="button" onClick={() => setSelectedFile(null)} className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Metadata Details */}
                        <div className="space-y-8">
                            <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl tracking-tight">
                                <span className="w-1.5 h-8 bg-[#003399] rounded-full"></span>
                                Primary Metadata
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="md:col-span-2">
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Form Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#003399] focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder-gray-300 font-medium"
                                        placeholder="e.g. Savings Account Application Form"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Bank Category</label>
                                    <div className="relative">
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#003399] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-gray-700 cursor-pointer appearance-none"
                                        >
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                        <i className="fas fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"></i>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Effective Date</label>
                                    <input
                                        type="date"
                                        name="effective_date"
                                        value={formData.effective_date}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#003399] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-gray-700"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Description / Subtitle</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full px-5 py-4 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#003399] focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder-gray-300 font-medium leading-relaxed"
                                    placeholder="e.g. For Individual & Joint Accounts"
                                ></textarea>
                                <p className="text-[10px] text-gray-400 font-bold mt-2 ml-1 italic">* This text appears directly below the title on the website repository.</p>
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-12 pb-4 flex flex-col items-center border-t border-gray-100 gap-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative bg-[#003399] hover:bg-blue-800 text-white px-16 py-5 rounded-[2rem] font-black text-xl transition-all shadow-2xl shadow-blue-200/50 disabled:opacity-50 flex items-center gap-4 transform hover:scale-105 active:scale-95 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                                {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-cloud-upload-alt text-2xl"></i>}
                                <span>{isNew ? 'Provision Asset Now' : 'Save & Publish Updates'}</span>
                            </button>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Visual confirmation will appear above after saving</p>
                        </div>
                    </div>
                </form>

                <style>{`
                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                    .animate-shimmer {
                        animation: shimmer 1.5s infinite;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default AdminEditDownload;
