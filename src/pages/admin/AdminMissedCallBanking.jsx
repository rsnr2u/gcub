import { useState, useEffect } from 'react';
import { apiFetch, BASE_URL } from '../../utils/api';


const AdminMissedCallBanking = () => {
    const [content, setContent] = useState({
        header_title: '',
        header_description: '',
        note_text: ''
    });
    const [services, setServices] = useState([]);
    const [editingService, setEditingService] = useState(null);
    const [newService, setNewService] = useState({ title: '', description: '', phone_number: '', display_order: 0 });
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchContent();
        fetchServices();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await apiFetch('/missed-call-banking-content');
            const data = await res.json();
            if (data) {
                setContent({
                    header_title: data.header_title || '',
                    header_description: data.header_description || '',
                    note_text: data.note_text || ''
                });
            }
        } catch (err) {
            console.error('Error fetching content:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchServices = async () => {
        try {
            const res = await apiFetch('/missed-call-banking-services');
            const data = await res.json();
            setServices(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching services:', err);
        }
    };

    const handleContentSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: '', type: '' });

        try {
            const res = await fetch(`${BASE_URL}/api/missed-call-banking-content/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content)
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'Content updated successfully!', type: 'success' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setMessage({ text: 'Error: ' + JSON.stringify(result.messages || result), type: 'error' });
            }
        } catch (err) {
            setMessage({ text: 'Network Error: ' + err.message, type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const handleAddService = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/missed-call-banking-services/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newService)
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'Service added successfully!', type: 'success' });
                setNewService({ title: '', description: '', phone_number: '', display_order: 0 });
                setShowAddForm(false);
                fetchServices();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateService = async (id) => {
        try {
            const res = await apiFetch(`/missed-call-banking-services/update/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingService)
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'Service updated successfully!', type: 'success' });
                setEditingService(null);
                fetchServices();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteService = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;
        try {
            const res = await apiFetch(`/missed-call-banking-services/delete/${id}`, { method: 'POST' });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'Service deleted successfully!', type: 'success' });
                fetchServices();
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
                <h2 className="text-xl font-bold text-gray-800">Missed Call Banking</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Manage Missed Call Banking Content</p>
            </header>

            <div className="px-8 py-6 space-y-6">
                {message.text && (
                    <div className={`p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <i className="fas fa-info-circle mr-2"></i> {message.text}
                    </div>
                )}

                {/* Header Content Form */}
                <form onSubmit={handleContentSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Header Content</h3>

                    <div>
                        <label className={labelStyle}>Header Title</label>
                        <input type="text" className={inputStyle} value={content.header_title} onChange={e => setContent({ ...content, header_title: e.target.value })} required placeholder="How it works?" />
                    </div>

                    <div>
                        <label className={labelStyle}>Header Description</label>
                        <textarea className={inputStyle} rows="3" value={content.header_description} onChange={e => setContent({ ...content, header_description: e.target.value })} required placeholder="Describe how the service works..."></textarea>
                    </div>

                    <div>
                        <label className={labelStyle}>Note / Disclaimer</label>
                        <textarea className={inputStyle} rows="2" value={content.note_text} onChange={e => setContent({ ...content, note_text: e.target.value })} placeholder="Note: Regular SMS charges may apply..."></textarea>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={saving} className="w-full bg-[#003399] hover:bg-black text-white py-4 rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-900/10">
                            {saving ? 'Updating...' : 'Update Content'}
                        </button>
                    </div>
                </form>

                {/* Services Management */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Services</h3>
                        <button onClick={() => setShowAddForm(!showAddForm)} className="bg-[#003399] hover:bg-black text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all">
                            <i className="fas fa-plus-circle mr-2"></i> Add Service
                        </button>
                    </div>

                    {/* Add New Service Form */}
                    {showAddForm && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <input type="text" placeholder="Title (e.g., Balance Inquiry)" className={inputStyle} value={newService.title} onChange={e => setNewService({ ...newService, title: e.target.value })} />
                                <input type="text" placeholder="Phone Number" className={inputStyle} value={newService.phone_number} onChange={e => setNewService({ ...newService, phone_number: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <input type="text" placeholder="Description" className={inputStyle} value={newService.description} onChange={e => setNewService({ ...newService, description: e.target.value })} />
                                <input type="number" placeholder="Display Order" className={inputStyle} value={newService.display_order} onChange={e => setNewService({ ...newService, display_order: parseInt(e.target.value) })} />
                            </div>
                            <div className="flex gap-2">
                                <button onClick={handleAddService} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold text-xs">Save</button>
                                <button onClick={() => setShowAddForm(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-bold text-xs">Cancel</button>
                            </div>
                        </div>
                    )}

                    {/* Services List */}
                    <div className="space-y-3">
                        {services.map(service => (
                            <div key={service.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                {editingService?.id === service.id ? (
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <input type="text" className={inputStyle} value={editingService.title} onChange={e => setEditingService({ ...editingService, title: e.target.value })} placeholder="Title" />
                                            <input type="text" className={inputStyle} value={editingService.phone_number} onChange={e => setEditingService({ ...editingService, phone_number: e.target.value })} placeholder="Phone" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input type="text" className={inputStyle} value={editingService.description} onChange={e => setEditingService({ ...editingService, description: e.target.value })} placeholder="Description" />
                                            <input type="number" className={inputStyle} value={editingService.display_order} onChange={e => setEditingService({ ...editingService, display_order: parseInt(e.target.value) })} placeholder="Order" />
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleUpdateService(service.id)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-xs font-bold">Save</button>
                                            <button onClick={() => setEditingService(null)} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-xs font-bold">Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1">
                                            <div className="text-sm font-bold text-gray-900">{service.title}</div>
                                            <div className="text-xs text-gray-500 mt-1">{service.description}</div>
                                        </div>
                                        <div className="text-lg font-bold text-red-600">{service.phone_number}</div>
                                        <div className="text-sm text-gray-500">Order: {service.display_order}</div>
                                        <button onClick={() => setEditingService(service)} className="text-gray-400 hover:text-[#003399] transition"><i className="fas fa-edit"></i></button>
                                        <button onClick={() => handleDeleteService(service.id)} className="text-gray-400 hover:text-red-500 transition"><i className="fas fa-trash-alt"></i></button>
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

export default AdminMissedCallBanking;
