import { useState, useEffect } from 'react';

const AdminAboutUs = () => {
    const [data, setData] = useState({
        metadata: {},
        timeline: [],
        core_values: [],
        network: []
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Modal State
    const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
    const [timelineForm, setTimelineForm] = useState({ id: null, year: '', title: '', description: '', sort_order: 0 });

    // New Modal States
    const [isValueModalOpen, setIsValueModalOpen] = useState(false);
    const [valueForm, setValueForm] = useState({ id: null, title: '', sort_order: 0 });

    const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);
    const [networkForm, setNetworkForm] = useState({ id: null, region_name: '', branch_count: '', sort_order: 0 });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bank-about`);
            const result = await res.json();
            setData(result);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleMetaChange = (key, value) => {
        setData(prev => ({
            ...prev,
            metadata: { ...prev.metadata, [key]: value }
        }));
    };

    const saveMetadata = async () => {
        setSaving(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bank-about/metadata/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data.metadata)
            });
            if (!res.ok) {
                throw new Error(`Server status: ${res.status}`);
            }
            const result = await res.json();
            if (result.status === 'success') {
                alert('Metadata Updated Successfully!');
            } else {
                throw new Error(result.message || 'Unknown error');
            }
        } catch (error) {
            console.error(error);
            alert('Error updating metadata: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    // --- Timeline Handlers ---
    const openTimelineModal = (item = null) => {
        if (item) {
            setTimelineForm({ id: item.id, year: item.year, title: item.title, description: item.description, sort_order: item.sort_order || 0 });
        } else {
            setTimelineForm({ id: null, year: '', title: '', description: '', sort_order: 0 });
        }
        setIsTimelineModalOpen(true);
    };

    const closeTimelineModal = () => {
        setIsTimelineModalOpen(false);
        setTimelineForm({ id: null, year: '', title: '', description: '', sort_order: 0 });
    };

    const handleTimelineChange = (e) => {
        const { name, value } = e.target;
        setTimelineForm(prev => ({ ...prev, [name]: value }));
    };

    const saveTimelineEntry = async (e) => {
        e.preventDefault();
        const url = timelineForm.id
            ? `${import.meta.env.VITE_API_BASE_URL}/bank-about/timeline/update/${timelineForm.id}`
            : `${import.meta.env.VITE_API_BASE_URL}/bank-about/timeline/create`;

        try {
            const bodyData = {
                year: timelineForm.year,
                title: timelineForm.title,
                description: timelineForm.description,
                sort_order: timelineForm.sort_order || 0
            };

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });

            if (res.ok) {
                const result = await res.json();
                if (result.status === 'success') {
                    alert('Timeline entry saved!');
                    closeTimelineModal();
                    fetchData(); // Refresh list
                } else {
                    alert('Error: ' + (result.message || 'Unknown error'));
                }
            } else {
                alert('Server Error: ' + res.status);
            }
        } catch (error) {
            console.error(error);
            alert('Error saving entry: ' + error.message);
        }
    };

    const deleteTimelineEntry = async (id) => {
        if (!window.confirm('Delete this timeline entry?')) return;
        try {
            await fetch(`${import.meta.env.VITE_API_BASE_URL}/bank-about/timeline/delete/${id}`, { method: 'POST' });
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    // --- Core Values Handlers ---
    const openValueModal = (item = null) => {
        if (item) {
            setValueForm({ id: item.id, title: item.title, sort_order: item.sort_order || 0 });
        } else {
            setValueForm({ id: null, title: '', sort_order: 0 });
        }
        setIsValueModalOpen(true);
    };

    const saveValueEntry = async (e) => {
        e.preventDefault();
        const url = valueForm.id
            ? `${import.meta.env.VITE_API_BASE_URL}/bank-about/values/update/${valueForm.id}`
            : `${import.meta.env.VITE_API_BASE_URL}/bank-about/values/create`;

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(valueForm)
            });
            if (res.ok) {
                setIsValueModalOpen(false);
                fetchData();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteValueEntry = async (id) => {
        if (!window.confirm('Delete this core value?')) return;
        try {
            await fetch(`${import.meta.env.VITE_API_BASE_URL}/bank-about/values/delete/${id}`, { method: 'POST' });
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    // --- Network Handlers ---
    const openNetworkModal = (item = null) => {
        if (item) {
            setNetworkForm({ id: item.id, region_name: item.region_name, branch_count: item.branch_count, sort_order: item.sort_order || 0 });
        } else {
            setNetworkForm({ id: null, region_name: '', branch_count: '', sort_order: 0 });
        }
        setIsNetworkModalOpen(true);
    };

    const saveNetworkEntry = async (e) => {
        e.preventDefault();
        const url = networkForm.id
            ? `${import.meta.env.VITE_API_BASE_URL}/bank-about/network/update/${networkForm.id}`
            : `${import.meta.env.VITE_API_BASE_URL}/bank-about/network/create`;

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(networkForm)
            });
            if (res.ok) {
                setIsNetworkModalOpen(false);
                fetchData();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteNetworkEntry = async (id) => {
        if (!window.confirm('Delete this network item?')) return;
        try {
            await fetch(`${import.meta.env.VITE_API_BASE_URL}/bank-about/network/delete/${id}`, { method: 'POST' });
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Content...</div>;

    const InputGroup = ({ label, value, onChange, type = "text" }) => (
        <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
            {type === 'textarea' ? (
                <textarea
                    value={value || ''}
                    onChange={e => onChange(e.target.value)}
                    rows="3"
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 focus:border-[#003399] outline-none transition-all"
                />
            ) : (
                <input
                    type={type}
                    value={value || ''}
                    onChange={e => onChange(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 focus:border-[#003399] outline-none transition-all"
                />
            )}
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-20 relative">
            {/* Legacy Section */}
            <section className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Our Legacy Stats</h3>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">Hero Section Data</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <InputGroup label="Years of Service" value={data.metadata.legacy_years} onChange={(v) => handleMetaChange('legacy_years', v)} />
                    <InputGroup label="Branches" value={data.metadata.legacy_branches} onChange={(v) => handleMetaChange('legacy_branches', v)} />
                    <InputGroup label="Business Volume" value={data.metadata.legacy_volume} onChange={(v) => handleMetaChange('legacy_volume', v)} />
                    <InputGroup label="Customers" value={data.metadata.legacy_customers} onChange={(v) => handleMetaChange('legacy_customers', v)} />
                </div>
                <div className="mt-6 flex justify-end">
                    <button onClick={saveMetadata} className="bg-[#003399] hover:bg-black text-white px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition shadow-sm">
                        {saving ? 'Saving...' : 'Update Legacy Stats'}
                    </button>
                </div>
            </section>

            {/* Welcome Message */}
            <section className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Welcome Message</h3>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">Introduction Content</p>
                    </div>
                </div>
                <div className="space-y-6">
                    <InputGroup label="Title Heading" value={data.metadata.welcome_title} onChange={(v) => handleMetaChange('welcome_title', v)} />
                    <InputGroup label="Content Body" type="textarea" value={data.metadata.welcome_text} onChange={(v) => handleMetaChange('welcome_text', v)} />
                </div>
                <div className="mt-6 flex justify-end">
                    <button onClick={saveMetadata} className="bg-[#003399] hover:bg-black text-white px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition shadow-sm">
                        Update Welcome Content
                    </button>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm flex flex-col">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Our Vision</h3>
                        <InputGroup type="textarea" label="Vision Statement" value={data.metadata.vision_text} onChange={(v) => handleMetaChange('vision_text', v)} />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button onClick={saveMetadata} className="bg-[#003399] hover:bg-black text-white px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition shadow-sm">Update Vision</button>
                    </div>
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm flex flex-col">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Our Mission</h3>
                        <InputGroup type="textarea" label="Mission Statement" value={data.metadata.mission_text} onChange={(v) => handleMetaChange('mission_text', v)} />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button onClick={saveMetadata} className="bg-[#003399] hover:bg-black text-white px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition shadow-sm">Update Mission</button>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Our Journey (Timeline)</h3>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">Historical Milestones</p>
                    </div>
                    <button onClick={() => openTimelineModal()} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition">
                        + Add Entry
                    </button>
                </div>
                <div className="space-y-4">
                    {data.timeline.length === 0 && <p className="text-center text-gray-400 py-4 text-sm">No timeline entries found.</p>}
                    {data.timeline.map((entry) => (
                        <div key={entry.id} className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:border-blue-100 hover:bg-blue-50/30 transition group">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-blue-600 font-bold text-sm w-20">[{entry.sort_order || 0}] {entry.year}</span>
                                    <h4 className="font-bold text-gray-800">{entry.title}</h4>
                                </div>
                                <p className="text-gray-500 text-sm line-clamp-1">{entry.description}</p>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition flex gap-2">
                                <button onClick={() => openTimelineModal(entry)} className="text-gray-400 hover:text-[#003399]"><i className="fas fa-edit"></i></button>
                                <button onClick={() => deleteTimelineEntry(entry.id)} className="text-gray-400 hover:text-red-600"><i className="fas fa-trash"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Core Values Section */}
            <section className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Core Values</h3>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">Corporate Values Management</p>
                    </div>
                    <button onClick={() => openValueModal()} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition">
                        + Add Value
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.core_values.length === 0 && <p className="col-span-2 text-center text-gray-400 py-4 text-sm">No core values found.</p>}
                    {data.core_values.map((val) => (
                        <div key={val.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:border-blue-100 hover:bg-blue-50/30 transition group">
                            <div className="flex items-center gap-3">
                                <span className="bg-blue-50 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">{val.sort_order || 0}</span>
                                <span className="font-bold text-gray-800">{val.title}</span>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition flex gap-2">
                                <button onClick={() => openValueModal(val)} className="text-gray-400 hover:text-[#003399]"><i className="fas fa-edit"></i></button>
                                <button onClick={() => deleteValueEntry(val.id)} className="text-gray-400 hover:text-red-600"><i className="fas fa-trash"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Network Section */}
            <section className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Our Network</h3>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">Regional Branch Summary</p>
                    </div>
                    <button onClick={() => openNetworkModal()} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition">
                        + Add Network Item
                    </button>
                </div>
                <div className="space-y-4">
                    {data.network.length === 0 && <p className="text-center text-gray-400 py-4 text-sm">No network data found.</p>}
                    {data.network.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:border-blue-100 hover:bg-blue-50/30 transition group">
                            <div className="flex-1 grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-[8px] font-bold text-gray-400 uppercase">Region</label>
                                    <span className="font-bold text-gray-800 block">{item.region_name}</span>
                                </div>
                                <div className="text-center border-x border-gray-100">
                                    <label className="block text-[8px] font-bold text-gray-400 uppercase">Count Text</label>
                                    <span className="font-bold text-[#003399] block">{item.branch_count}</span>
                                </div>
                                <div className="text-right">
                                    <label className="block text-[8px] font-bold text-gray-400 uppercase">Sort</label>
                                    <span className="font-bold text-gray-500 block">{item.sort_order || 0}</span>
                                </div>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition flex gap-2 ml-4">
                                <button onClick={() => openNetworkModal(item)} className="text-gray-400 hover:text-[#003399]"><i className="fas fa-edit"></i></button>
                                <button onClick={() => deleteNetworkEntry(item.id)} className="text-gray-400 hover:text-red-600"><i className="fas fa-trash"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Timeline Modal */}
            {isTimelineModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-800">{timelineForm.id ? 'Edit Entry' : 'Add New Entry'}</h3>
                            <button onClick={closeTimelineModal} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times"></i></button>
                        </div>
                        <form onSubmit={saveTimelineEntry} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Year</label>
                                    <input name="year" value={timelineForm.year} onChange={handleTimelineChange} className="w-full border border-gray-200 rounded-lg p-2 text-sm" required placeholder="e.g. 1995" />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Sort Order</label>
                                    <input type="number" name="sort_order" value={timelineForm.sort_order} onChange={handleTimelineChange} className="w-full border border-gray-200 rounded-lg p-2 text-sm" placeholder="0" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Title</label>
                                <input name="title" value={timelineForm.title} onChange={handleTimelineChange} className="w-full border border-gray-200 rounded-lg p-2 text-sm" required placeholder="e.g. First Branch Opened" />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Description</label>
                                <textarea name="description" value={timelineForm.description} onChange={handleTimelineChange} rows="3" className="w-full border border-gray-200 rounded-lg p-2 text-sm" placeholder="Details..." />
                            </div>
                            <div className="flex justify-end pt-2">
                                <button type="submit" className="bg-[#003399] text-white px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest">Save Entry</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Core Value Modal */}
            {isValueModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-800">{valueForm.id ? 'Edit Core Value' : 'Add Core Value'}</h3>
                            <button onClick={() => setIsValueModalOpen(false)} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times"></i></button>
                        </div>
                        <form onSubmit={saveValueEntry} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Title</label>
                                <input name="title" value={valueForm.title} onChange={e => setValueForm({ ...valueForm, title: e.target.value })} className="w-full border border-gray-200 rounded-lg p-2 text-sm" required />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Sort Order</label>
                                <input type="number" name="sort_order" value={valueForm.sort_order} onChange={e => setValueForm({ ...valueForm, sort_order: e.target.value })} className="w-full border border-gray-200 rounded-lg p-2 text-sm" />
                            </div>
                            <div className="flex justify-end pt-2">
                                <button type="submit" className="bg-[#003399] text-white px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest">Save Value</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Network Modal */}
            {isNetworkModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-800">{networkForm.id ? 'Edit Network' : 'Add Network Item'}</h3>
                            <button onClick={() => setIsNetworkModalOpen(false)} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times"></i></button>
                        </div>
                        <form onSubmit={saveNetworkEntry} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Region Name</label>
                                <input name="region_name" value={networkForm.region_name} onChange={e => setNetworkForm({ ...networkForm, region_name: e.target.value })} className="w-full border border-gray-200 rounded-lg p-2 text-sm" required placeholder="e.g. Guntur City" />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Count Text</label>
                                <input name="branch_count" value={networkForm.branch_count} onChange={e => setNetworkForm({ ...networkForm, branch_count: e.target.value })} className="w-full border border-gray-200 rounded-lg p-2 text-sm" required placeholder="e.g. 5 Branches" />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Sort Order</label>
                                <input type="number" name="sort_order" value={networkForm.sort_order} onChange={e => setNetworkForm({ ...networkForm, sort_order: e.target.value })} className="w-full border border-gray-200 rounded-lg p-2 text-sm" />
                            </div>
                            <div className="flex justify-end pt-2">
                                <button type="submit" className="bg-[#003399] text-white px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest">Save Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAboutUs;
