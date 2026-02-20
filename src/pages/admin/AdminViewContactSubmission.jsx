import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdminViewContactSubmission = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [adminNotes, setAdminNotes] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        fetchSubmission();
    }, [id]);

    const fetchSubmission = async () => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8080/api/contact-submissions/show/${id}`);
            const data = await res.json();
            setSubmission(data);
            setAdminNotes(data.admin_notes || '');
            setSelectedStatus(data.status);
        } catch (err) {
            console.error('Error fetching submission:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/contact-submissions/update-status/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: selectedStatus })
            });
            const result = await res.json();

            if (result.status === 'success') {
                setMessage({ text: 'Status updated successfully!', type: 'success' });
                fetchSubmission();
            }
        } catch (err) {
            setMessage({ text: 'Error updating status', type: 'error' });
        }
    };

    const handleNotesUpdate = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/contact-submissions/update-notes/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ admin_notes: adminNotes })
            });
            const result = await res.json();

            if (result.status === 'success') {
                setMessage({ text: 'Notes updated successfully!', type: 'success' });
                fetchSubmission();
            }
        } catch (err) {
            setMessage({ text: 'Error updating notes', type: 'error' });
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
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading...</div>;
    if (!submission) return <div className="p-8 text-center text-gray-500 font-inter">Submission not found</div>;

    return (
        <div className="font-inter">
            <header className="px-8 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Contact Submission Details</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                        View and manage submission
                    </p>
                </div>
                <button
                    onClick={() => navigate('/admin/contact-submissions')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
                >
                    <i className="fas fa-arrow-left mr-2"></i> Back to List
                </button>
            </header>

            <div className="px-8 py-6">
                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <i className="fas fa-info-circle mr-2"></i> {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Submission Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Main Info Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">{submission.full_name}</h3>
                                    <p className="text-sm text-gray-500">Submitted on {formatDate(submission.submitted_at)}</p>
                                </div>
                                {getStatusBadge(submission.status)}
                            </div>

                            <div className="space-y-4">
                                {/* Request Type */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Request Type</label>
                                    <p className="text-sm text-gray-900 font-medium">{submission.request_type}</p>
                                </div>

                                {/* Contact Info */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Email</label>
                                        <a href={`mailto:${submission.email}`} className="text-sm text-blue-600 hover:underline flex items-center gap-2">
                                            <i className="fas fa-envelope"></i> {submission.email}
                                        </a>
                                    </div>
                                    {submission.phone && (
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Phone</label>
                                            <a href={`tel:${submission.phone}`} className="text-sm text-blue-600 hover:underline flex items-center gap-2">
                                                <i className="fas fa-phone"></i> {submission.phone}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Subject */}
                                {submission.subject && (
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Subject</label>
                                        <p className="text-sm text-gray-900 font-medium">{submission.subject}</p>
                                    </div>
                                )}

                                {/* Message */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Message</label>
                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{submission.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Admin Notes */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <i className="fas fa-sticky-note text-[#003399]"></i>
                                Admin Notes
                            </h3>
                            <textarea
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50 resize-none"
                                rows="6"
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                placeholder="Add internal notes about this submission..."
                            />
                            <button
                                onClick={handleNotesUpdate}
                                className="mt-4 bg-[#003399] hover:bg-black text-white px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
                            >
                                <i className="fas fa-save mr-2"></i> Save Notes
                            </button>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
                            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <i className="fas fa-cog text-[#003399]"></i>
                                Actions
                            </h3>

                            {/* Update Status */}
                            <div className="mb-6">
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Update Status</label>
                                <select
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:border-[#003399] outline-none transition-all mb-3"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                >
                                    <option value="new">New</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="resolved">Resolved</option>
                                </select>
                                <button
                                    onClick={handleStatusUpdate}
                                    disabled={selectedStatus === submission.status}
                                    className="w-full bg-[#003399] hover:bg-black text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <i className="fas fa-check mr-2"></i> Update Status
                                </button>
                            </div>

                            {/* Quick Actions */}
                            <div className="space-y-2 pt-4 border-t border-gray-100">
                                <a
                                    href={`mailto:${submission.email}`}
                                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition text-sm font-medium"
                                >
                                    <i className="fas fa-envelope"></i>
                                    Send Email
                                </a>
                                {submission.phone && (
                                    <a
                                        href={`tel:${submission.phone}`}
                                        className="w-full flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition text-sm font-medium"
                                    >
                                        <i className="fas fa-phone"></i>
                                        Call Customer
                                    </a>
                                )}
                            </div>

                            {/* Metadata */}
                            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-2">
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-calendar text-gray-400"></i>
                                    <span>Submitted: {formatDate(submission.submitted_at)}</span>
                                </div>
                                {submission.updated_at && (
                                    <div className="flex items-center gap-2">
                                        <i className="fas fa-clock text-gray-400"></i>
                                        <span>Updated: {formatDate(submission.updated_at)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminViewContactSubmission;
