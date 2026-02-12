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
    const [timelineForm, setTimelineForm] = useState({ id: null, year: '', title: '', description: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/bank-about');
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
            const res = await fetch('http://localhost:8080/api/bank-about/metadata/update', {
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
            setTimelineForm({ id: item.id, year: item.year, title: item.title, description: item.description });
        } else {
            setTimelineForm({ id: null, year: '', title: '', description: '' });
        }
        setIsTimelineModalOpen(true);
    };

    const closeTimelineModal = () => {
        setIsTimelineModalOpen(false);
        setTimelineForm({ id: null, year: '', title: '', description: '' });
    };

    const handleTimelineChange = (e) => {
        const { name, value } = e.target;
        setTimelineForm(prev => ({ ...prev, [name]: value }));
    };

    const saveTimelineEntry = async (e) => {
        e.preventDefault();
        const url = timelineForm.id
            ? `http://localhost:8080/api/bank-about/timeline/update/${timelineForm.id}`
            : 'http://localhost:8080/api/bank-about/timeline/create';

        try {
            const formData = new FormData();
            formData.append('year', timelineForm.year);
            formData.append('title', timelineForm.title);
            formData.append('description', timelineForm.description);

            // If updating, API might fail if specific columns aren't passed or if using RawInput fails with FormData.
            // Using JSON for consistency if acceptable or ensure backend handles FormData (which getVar does).
            // Backend uses getVar, so FormData is fine for simple fields. But to be safe and consistent with metadata:

            const res = await fetch(url, {
                method: 'POST',
                body: formData // CodeIgniter getVar() reads from $_POST/FormData automatically
            });

            if (res.ok) {
                alert('Timeline entry saved!');
                closeTimelineModal();
                fetchData(); // Refresh list
            } else {
                alert('Error saving entry');
            }
        } catch (error) {
            console.error(error);
            alert('Error saving entry');
        }
    };

    const deleteTimelineEntry = async (id) => {
        if (!window.confirm('Delete this timeline entry?')) return;
        try {
            await fetch(`http://localhost:8080/api/bank-about/timeline/delete/${id}`, { method: 'POST' });
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
                    {data.timeline.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:border-blue-100 hover:bg-blue-50/30 transition group">
                            <div className="w-24 font-bold text-[#003399]">{item.year}</div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800">{item.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition flex gap-2">
                                <button onClick={() => openTimelineModal(item)} className="text-gray-400 hover:text-[#003399]"><i className="fas fa-edit"></i></button>
                                <button onClick={() => deleteTimelineEntry(item.id)} className="text-gray-400 hover:text-red-600"><i className="fas fa-trash"></i></button>
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
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Year</label>
                                <input name="year" value={timelineForm.year} onChange={handleTimelineChange} className="w-full border border-gray-200 rounded-lg p-2 text-sm" required placeholder="e.g. 1995" />
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
        </div>
    );
};

export default AdminAboutUs;
