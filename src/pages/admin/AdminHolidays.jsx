import { useState, useEffect } from 'react';

const AdminHolidays = () => {
    const [noteText, setNoteText] = useState('');
    const [holidays, setHolidays] = useState([]);
    const [editingHoliday, setEditingHoliday] = useState(null);
    const [newHoliday, setNewHoliday] = useState({ holiday_date: '', day_name: '', occasion: '' });
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchContent();
        fetchHolidays();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/holidays-content');
            const data = await res.json();
            if (data) {
                setNoteText(data.note_text || '');
            }
        } catch (err) {
            console.error('Error fetching content:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchHolidays = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/holidays');
            const data = await res.json();
            setHolidays(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching holidays:', err);
        }
    };

    const handleNoteSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: '', type: '' });

        try {
            const res = await fetch('http://localhost:8080/api/holidays-content/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ note_text: noteText })
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'Note updated successfully!', type: 'success' });
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

    const getDayFromDate = (dateString) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateString);
        return days[date.getDay()];
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        return date.toLocaleDateString('en-US', options).replace(',', '');
    };

    const handleAddHoliday = async () => {
        const dayName = getDayFromDate(newHoliday.holiday_date);
        try {
            const res = await fetch('http://localhost:8080/api/holidays/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newHoliday, day_name: dayName })
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'Holiday added successfully!', type: 'success' });
                setNewHoliday({ holiday_date: '', day_name: '', occasion: '' });
                setShowAddForm(false);
                fetchHolidays();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateHoliday = async (id) => {
        const dayName = getDayFromDate(editingHoliday.holiday_date);
        try {
            const res = await fetch(`http://localhost:8080/api/holidays/update/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...editingHoliday, day_name: dayName })
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'Holiday updated successfully!', type: 'success' });
                setEditingHoliday(null);
                fetchHolidays();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteHoliday = async (id) => {
        if (!window.confirm('Are you sure you want to delete this holiday?')) return;
        try {
            const res = await fetch(`http://localhost:8080/api/holidays/delete/${id}`, { method: 'POST' });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'Holiday deleted successfully!', type: 'success' });
                fetchHolidays();
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
                <h2 className="text-xl font-bold text-gray-800">Holidays</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Manage Bank Holidays</p>
            </header>

            <div className="px-8 py-6 space-y-6">
                {message.text && (
                    <div className={`p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <i className="fas fa-info-circle mr-2"></i> {message.text}
                    </div>
                )}

                {/* Holidays Table */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Holiday List</h3>
                        <button onClick={() => setShowAddForm(!showAddForm)} className="bg-[#003399] hover:bg-black text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all">
                            <i className="fas fa-plus-circle mr-2"></i> Add Holiday
                        </button>
                    </div>

                    {/* Add New Holiday Form */}
                    {showAddForm && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className={labelStyle}>Date</label>
                                    <input type="date" className={inputStyle} value={newHoliday.holiday_date} onChange={e => setNewHoliday({ ...newHoliday, holiday_date: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Occasion</label>
                                    <input type="text" placeholder="e.g., Republic Day" className={inputStyle} value={newHoliday.occasion} onChange={e => setNewHoliday({ ...newHoliday, occasion: e.target.value })} />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={handleAddHoliday} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold text-xs">Save</button>
                                <button onClick={() => setShowAddForm(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-bold text-xs">Cancel</button>
                            </div>
                        </div>
                    )}

                    {/* Holidays Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="text-left py-3 px-4 text-xs font-bold text-[#003399] uppercase tracking-wider">Date</th>
                                    <th className="text-left py-3 px-4 text-xs font-bold text-[#003399] uppercase tracking-wider">Day</th>
                                    <th className="text-left py-3 px-4 text-xs font-bold text-[#003399] uppercase tracking-wider">Occasion</th>
                                    <th className="text-right py-3 px-4 text-xs font-bold text-[#003399] uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {holidays.map(holiday => (
                                    <tr key={holiday.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        {editingHoliday?.id === holiday.id ? (
                                            <>
                                                <td className="py-3 px-4">
                                                    <input type="date" className="bg-white border border-gray-200 rounded px-3 py-2 text-sm w-full" value={editingHoliday.holiday_date} onChange={e => setEditingHoliday({ ...editingHoliday, holiday_date: e.target.value })} />
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-500">{getDayFromDate(editingHoliday.holiday_date)}</td>
                                                <td className="py-3 px-4">
                                                    <input type="text" className="bg-white border border-gray-200 rounded px-3 py-2 text-sm w-full" value={editingHoliday.occasion} onChange={e => setEditingHoliday({ ...editingHoliday, occasion: e.target.value })} />
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <button onClick={() => handleUpdateHoliday(holiday.id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold mr-2">Save</button>
                                                    <button onClick={() => setEditingHoliday(null)} className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold">Cancel</button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="py-3 px-4 text-sm font-medium text-gray-900">{formatDate(holiday.holiday_date)}</td>
                                                <td className="py-3 px-4 text-sm text-gray-500">{holiday.day_name}</td>
                                                <td className="py-3 px-4 text-sm text-gray-700">{holiday.occasion}</td>
                                                <td className="py-3 px-4 text-right">
                                                    <button onClick={() => setEditingHoliday(holiday)} className="text-gray-400 hover:text-[#003399] transition mr-3"><i className="fas fa-edit"></i></button>
                                                    <button onClick={() => handleDeleteHoliday(holiday.id)} className="text-gray-400 hover:text-red-500 transition"><i className="fas fa-trash-alt"></i></button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Note Section */}
                <form onSubmit={handleNoteSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Note</h3>

                    <div>
                        <label className={labelStyle}>Note Text</label>
                        <textarea className={inputStyle} rows="2" value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="2nd and 4th Saturdays are Bank Holidays. All Sundays are holidays."></textarea>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={saving} className="w-full bg-[#003399] hover:bg-black text-white py-4 rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-900/10">
                            {saving ? 'Updating...' : 'Update Note'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminHolidays;
