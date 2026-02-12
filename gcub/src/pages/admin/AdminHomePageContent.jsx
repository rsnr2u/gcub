import { useState, useEffect } from 'react';

const AdminHomePageContent = () => {
    const [formData, setFormData] = useState({
        section_title: '',
        main_heading: '',
        description: '',
        cta_button_text: '',
        cta_button_link: ''
    });
    const [stats, setStats] = useState([]);
    const [editingStat, setEditingStat] = useState(null);
    const [newStat, setNewStat] = useState({ label: '', value: '', display_order: 0 });
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchContent();
        fetchStats();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/homepage-content');
            const data = await res.json();
            if (data) {
                setFormData({
                    section_title: data.section_title || '',
                    main_heading: data.main_heading || '',
                    description: data.description || '',
                    cta_button_text: data.cta_button_text || '',
                    cta_button_link: data.cta_button_link || ''
                });
            }
        } catch (err) {
            console.error('Error fetching content:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/homepage-stats');
            const data = await res.json();
            setStats(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching stats:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: '', type: '' });

        const formDataToSubmit = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSubmit.append(key, formData[key]);
        });

        try {
            const res = await fetch('http://localhost:8080/api/homepage-content/update', {
                method: 'POST',
                body: formDataToSubmit
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'Content updated successfully!', type: 'success' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setMessage({ text: 'Error: ' + JSON.stringify(result.messages || result), type: 'error' });
            }
        } catch (err) {
            console.error(err);
            setMessage({ text: 'Network Error: ' + err.message, type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const handleAddStat = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/homepage-stats/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStat)
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'Statistic added successfully!', type: 'success' });
                setNewStat({ label: '', value: '', display_order: 0 });
                setShowAddForm(false);
                fetchStats();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateStat = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/api/homepage-stats/update/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingStat)
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'Statistic updated successfully!', type: 'success' });
                setEditingStat(null);
                fetchStats();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteStat = async (id) => {
        if (!window.confirm('Are you sure you want to delete this statistic?')) return;
        try {
            const res = await fetch(`http://localhost:8080/api/homepage-stats/delete/${id}`, { method: 'POST' });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'Statistic deleted successfully!', type: 'success' });
                fetchStats();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const inputStyle = "w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50";
    const labelStyle = "block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 px-0.5";

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading content...</div>;

    return (
        <div className="font-inter">
            <header className="px-8">
                <h2 className="text-xl font-bold text-gray-800">Home Page Content</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Manage Homepage Hero Section</p>
            </header>

            <div className="px-8 py-6 space-y-6">
                {message.text && (
                    <div className={`p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <i className="fas fa-info-circle mr-2"></i> {message.text}
                    </div>
                )}

                {/* Main Content Form */}
                <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6">
                    <div>
                        <label className={labelStyle}>Section Title</label>
                        <input type="text" className={inputStyle} value={formData.section_title} onChange={e => setFormData({ ...formData, section_title: e.target.value })} required placeholder="e.g., OUR LEGACY" />
                    </div>

                    <div>
                        <label className={labelStyle}>Main Heading</label>
                        <input type="text" className={inputStyle} value={formData.main_heading} onChange={e => setFormData({ ...formData, main_heading: e.target.value })} required placeholder="Welcome to The Guntur Co-operative Urban Bank Ltd." />
                    </div>

                    <div>
                        <label className={labelStyle}>Description</label>
                        <textarea className={inputStyle} rows="5" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required placeholder="Enter the main description paragraph..."></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className={labelStyle}>CTA Button Text</label>
                            <input type="text" className={inputStyle} value={formData.cta_button_text} onChange={e => setFormData({ ...formData, cta_button_text: e.target.value })} placeholder="e.g., Read Our Story" />
                        </div>
                        <div>
                            <label className={labelStyle}>CTA Button Link</label>
                            <input type="text" className={inputStyle} value={formData.cta_button_link} onChange={e => setFormData({ ...formData, cta_button_link: e.target.value })} placeholder="/about-us" />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={saving} className="w-full bg-[#003399] hover:bg-black text-white py-4 rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-900/10">
                            {saving ? 'Updating...' : 'Update Content'}
                        </button>
                    </div>
                </form>

                {/* Statistics Management */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Statistics Cards</h3>
                        <button onClick={() => setShowAddForm(!showAddForm)} className="bg-[#003399] hover:bg-black text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all">
                            <i className="fas fa-plus-circle mr-2"></i> Add Statistic
                        </button>
                    </div>

                    {/* Add New Stat Form */}
                    {showAddForm && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <input type="text" placeholder="Label (e.g., YEARS)" className={inputStyle} value={newStat.label} onChange={e => setNewStat({ ...newStat, label: e.target.value })} />
                                <input type="text" placeholder="Value (e.g., 75+)" className={inputStyle} value={newStat.value} onChange={e => setNewStat({ ...newStat, value: e.target.value })} />
                                <input type="number" placeholder="Order" className={inputStyle} value={newStat.display_order} onChange={e => setNewStat({ ...newStat, display_order: parseInt(e.target.value) })} />
                            </div>
                            <div className="flex gap-2">
                                <button onClick={handleAddStat} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold text-xs">Save</button>
                                <button onClick={() => setShowAddForm(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-bold text-xs">Cancel</button>
                            </div>
                        </div>
                    )}

                    {/* Stats List */}
                    <div className="space-y-3">
                        {stats.map(stat => (
                            <div key={stat.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                {editingStat?.id === stat.id ? (
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50 w-1/3"
                                            value={editingStat.label}
                                            onChange={e => setEditingStat({ ...editingStat, label: e.target.value })}
                                            placeholder="Label"
                                        />
                                        <input
                                            type="text"
                                            className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50 w-1/3"
                                            value={editingStat.value}
                                            onChange={e => setEditingStat({ ...editingStat, value: e.target.value })}
                                            placeholder="Value"
                                        />
                                        <input
                                            type="number"
                                            className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50 w-24"
                                            value={editingStat.display_order}
                                            onChange={e => setEditingStat({ ...editingStat, display_order: parseInt(e.target.value) })}
                                            placeholder="Order"
                                        />
                                        <div className="flex gap-2 ml-auto">
                                            <button onClick={() => handleUpdateStat(stat.id)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap">Save</button>
                                            <button onClick={() => setEditingStat(null)} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap">Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1">
                                            <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                                            <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                                        </div>
                                        <div className="text-sm text-gray-500">Order: {stat.display_order}</div>
                                        <button onClick={() => setEditingStat(stat)} className="text-gray-400 hover:text-[#003399] transition"><i className="fas fa-edit"></i></button>
                                        <button onClick={() => handleDeleteStat(stat.id)} className="text-gray-400 hover:text-red-500 transition"><i className="fas fa-trash-alt"></i></button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePageContent;
