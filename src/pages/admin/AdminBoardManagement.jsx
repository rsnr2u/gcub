import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminBoardManagement = ({ isEmbedded = false }) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/board-management');
            const data = await response.json();
            if (Array.isArray(data)) {
                setMembers(data);
            } else {
                setMembers([]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching members:', error);
            setMembers([]);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this member?')) return;
        try {
            const response = await fetch(`http://localhost:8080/api/board-management/delete/${id}`, {
                method: 'POST'
            });
            const data = await response.json();
            if (data.status === 'success') {
                setMessage({ type: 'success', text: 'Member removed successfully.' });
                fetchMembers();
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading Members...</div>;

    // Use isEmbedded to control outer wrapper styles, but always show the main header style as requested.
    const containerClasses = isEmbedded
        ? "font-inter"
        : "font-inter min-h-screen";

    const headerContent = (
        <header className="flex px-8 py-2 justify-between items-center">
            <div>
                <h2 className="text-xl font-bold text-gray-800">Board of Management</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Manage Board Members</p>
            </div>
            <Link
                to="/admin/board-management/new"
                className="bg-[#003399] hover:bg-black text-white px-8 py-2.5 rounded-lg font-bold text-[11px] uppercase tracking-widest transition-all flex items-center gap-2"
            >
                <i className="fas fa-plus-circle"></i> Add New Member
            </Link>
        </header>
    );

    return (
        <div className={containerClasses}>
            {headerContent}

            <div className="px-8 py-8">
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
                                    <th className="px-8 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Profile</th>
                                    <th className="px-8 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Name & Designation</th>
                                    <th className="px-8 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Tagline</th>
                                    <th className="px-8 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Order</th>
                                    <th className="px-8 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest text-center">Status</th>
                                    <th className="px-8 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {members.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-20 text-center text-gray-400 uppercase text-xs font-bold tracking-widest">
                                            No members found
                                        </td>
                                    </tr>
                                ) : (
                                    members.map((member) => (
                                        <tr key={member.id} className="hover:bg-gray-50/50 transition group">
                                            <td className="px-8 py-4">
                                                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 bg-gray-50">
                                                    {member.image_path ? (
                                                        <img src={`http://localhost:8080/${member.image_path}`} alt={member.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                            <i className="fas fa-user"></i>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <h3 className="text-sm font-bold text-gray-900">{member.name}</h3>
                                                <p className="text-xs text-gray-500 font-medium mt-0.5">{member.designation}</p>
                                            </td>
                                            <td className="px-8 py-4 service-desc max-w-xs">
                                                <p className="text-xs text-gray-500 truncate">{member.tagline || '-'}</p>
                                            </td>
                                            <td className="px-8 py-4">
                                                <span className="text-xs font-mono font-bold text-gray-600">{member.display_order}</span>
                                            </td>
                                            <td className="px-8 py-4 text-center">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${member.status === 'active' ? 'bg-green-50 text-green-700' :
                                                    member.status === 'inactive' ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {member.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        to={`/admin/board-management/edit/${member.id}`}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-[#003399] hover:text-white transition-all shadow-sm"
                                                    >
                                                        <i className="fas fa-edit text-[10px]"></i>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(member.id)}
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

export default AdminBoardManagement;
