import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authFetch } from '../../utils/api';

const AdminContactSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [counts, setCounts] = useState({ new: 0, in_progress: 0, resolved: 0, total: 0 });
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchSubmissions();
    }, [filter]);

    // Filter submissions based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredSubmissions(submissions);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = submissions.filter(sub =>
                sub.full_name.toLowerCase().includes(query) ||
                sub.email.toLowerCase().includes(query) ||
                (sub.subject && sub.subject.toLowerCase().includes(query)) ||
                sub.message.toLowerCase().includes(query) ||
                sub.request_type.toLowerCase().includes(query)
            );
            setFilteredSubmissions(filtered);
        }
    }, [searchQuery, submissions]);

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const url = filter === 'all'
                ? `${import.meta.env.VITE_API_BASE_URL}/contact-submissions`
                : `${import.meta.env.VITE_API_BASE_URL}/contact-submissions?status=${filter}`;

            console.log('Fetching from URL:', url);
            const res = await authFetch(url);
            console.log('Response status:', res.status);
            const data = await res.json();
            console.log('Received data:', data);
            console.log('Submissions:', data.submissions);
            console.log('Counts:', data.counts);
            setSubmissions(data.submissions || []);
            setFilteredSubmissions(data.submissions || []);
            setCounts(data.counts || { new: 0, in_progress: 0, resolved: 0, total: 0 });
        } catch (err) {
            console.error('Error fetching submissions:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this submission?')) return;

        try {
            const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/contact-submissions/delete/${id}`, {
                method: 'POST'
            });
            const result = await res.json();

            if (result.status === 'success') {
                setMessage({ text: 'Submission deleted successfully!', type: 'success' });
                fetchSubmissions();
            }
        } catch (err) {
            setMessage({ text: 'Error deleting submission', type: 'error' });
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            'new': 'bg-blue-100 text-blue-700',
            'in_progress': 'bg-yellow-100 text-yellow-700',
            'resolved': 'bg-green-100 text-green-700'
        };
        const labels = {
            'new': 'New',
            'in_progress': 'In Progress',
            'resolved': 'Resolved'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${badges[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading...</div>;

    return (
        <div className="font-inter">
            <header className="px-8 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Contact Form Submissions</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                        Manage customer inquiries and messages
                    </p>
                </div>
            </header>

            <div className="px-8 py-6">
                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <i className="fas fa-info-circle mr-2"></i> {message.text}
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{counts.total}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                <i className="fas fa-inbox text-xl text-gray-600"></i>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-blue-600 uppercase font-bold tracking-wider">New</p>
                                <p className="text-2xl font-bold text-blue-700 mt-1">{counts.new}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <i className="fas fa-envelope text-xl text-blue-600"></i>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-yellow-600 uppercase font-bold tracking-wider">In Progress</p>
                                <p className="text-2xl font-bold text-yellow-700 mt-1">{counts.in_progress}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                <i className="fas fa-hourglass-half text-xl text-yellow-600"></i>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-green-600 uppercase font-bold tracking-wider">Resolved</p>
                                <p className="text-2xl font-bold text-green-700 mt-1">{counts.resolved}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                <i className="fas fa-check-circle text-xl text-green-600"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
                        <div className="flex gap-2">
                            {['all', 'new', 'in_progress', 'resolved'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${filter === f
                                        ? 'bg-[#003399] text-white'
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {f === 'all' ? 'All' : f === 'in_progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="relative flex-1 md:max-w-md">
                            <input
                                type="text"
                                placeholder="Search by name, email, subject, or message..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003399] focus:ring-2 focus:ring-blue-50 transition"
                            />
                            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submissions Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Request Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Subject</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredSubmissions.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                            <i className="fas fa-inbox text-4xl text-gray-300 mb-3 block"></i>
                                            {searchQuery ? `No submissions found matching "${searchQuery}"` : 'No submissions found'}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredSubmissions.map((sub) => (
                                        <tr key={sub.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{formatDate(sub.submitted_at)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-gray-900">{sub.full_name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <a href={`mailto:${sub.email}`} className="text-sm text-blue-600 hover:underline">
                                                    {sub.email}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-700">{sub.request_type}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-700 max-w-xs truncate">
                                                    {sub.subject || 'No subject'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(sub.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-3">
                                                    <Link
                                                        to={`/admin/contact-submissions/view/${sub.id}`}
                                                        className="text-[#003399] hover:text-black transition"
                                                        title="View Details"
                                                    >
                                                        <i className="fas fa-eye"></i>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(sub.id)}
                                                        className="text-red-500 hover:text-red-700 transition"
                                                        title="Delete"
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
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

export default AdminContactSubmissions;
