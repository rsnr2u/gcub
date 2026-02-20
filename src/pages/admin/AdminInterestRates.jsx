import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminInterestRates = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/interest-rates`);
            const data = await response.json();
            if (Array.isArray(data)) {
                setTables(data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching interest rates:', error);
            setLoading(false);
        }
    };

    const handleAddTable = () => {
        const newTable = {
            id: null,
            title: 'New Yield Category',
            accent_color: 'blue',
            columns: ['TENURE', 'GENERAL %', 'SENIOR %'],
            rows: [['', '', '']],
            isNew: true
        };
        setTables([...tables, newTable]);
    };

    const handleTableChange = (index, field, value) => {
        const updatedTables = [...tables];
        updatedTables[index][field] = value;
        setTables(updatedTables);
    };

    const handleAddColumn = (tableIndex) => {
        const updatedTables = [...tables];
        updatedTables[tableIndex].columns.push('New Column');
        updatedTables[tableIndex].rows = updatedTables[tableIndex].rows.map(row => [...row, '']);
        setTables(updatedTables);
    };

    const handleRemoveColumn = (tableIndex, colIndex) => {
        if (tables[tableIndex].columns.length <= 1) return;
        const updatedTables = [...tables];
        updatedTables[tableIndex].columns.splice(colIndex, 1);
        updatedTables[tableIndex].rows = updatedTables[tableIndex].rows.map(row => {
            const newRow = [...row];
            newRow.splice(colIndex, 1);
            return newRow;
        });
        setTables(updatedTables);
    };

    const handleColumnLabelChange = (tableIndex, colIndex, value) => {
        const updatedTables = [...tables];
        updatedTables[tableIndex].columns[colIndex] = value;
        setTables(updatedTables);
    };

    const handleAddRow = (tableIndex) => {
        const updatedTables = [...tables];
        const newRow = new Array(updatedTables[tableIndex].columns.length).fill('');
        updatedTables[tableIndex].rows.push(newRow);
        setTables(updatedTables);
    };

    const handleRemoveRow = (tableIndex, rowIndex) => {
        const updatedTables = [...tables];
        updatedTables[tableIndex].rows.splice(rowIndex, 1);
        setTables(updatedTables);
    };

    const handleRowValueChange = (tableIndex, rowIndex, colIndex, value) => {
        const updatedTables = [...tables];
        updatedTables[tableIndex].rows[rowIndex][colIndex] = value;
        setTables(updatedTables);
    };

    const handleSaveTable = async (index) => {
        const table = tables[index];
        setSaving(true);
        setMessage({ type: '', text: '' });

        const formData = new FormData();
        formData.append('title', table.title);
        formData.append('accent_color', table.accent_color);
        formData.append('columns', JSON.stringify(table.columns));
        formData.append('rows', JSON.stringify(table.rows));

        const url = table.id
            ? `${import.meta.env.VITE_API_BASE_URL}/interest-rates/update/${table.id}`
            : `${import.meta.env.VITE_API_BASE_URL}/interest-rates/create`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.status === 'success') {
                setMessage({ type: 'success', text: 'Institutional data synchronized successfully!' });
                fetchTables();
            } else {
                setMessage({ type: 'error', text: 'Synchronization protocol failure.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An unexpected terminal error occurred.' });
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteTable = async (id, index) => {
        if (!window.confirm('Delete this whole table and its data?')) return;

        if (!id) {
            const updatedTables = [...tables];
            updatedTables.splice(index, 1);
            setTables(updatedTables);
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/interest-rates/delete/${id}`, {
                method: 'POST'
            });
            const data = await response.json();
            if (data.status === 'success') {
                setMessage({ type: 'success', text: 'Table purged from repository.' });
                fetchTables();
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Synchronizing Rate Repositories...</div>;

    const themeColors = {
        blue: {
            primary: '#003399',
            ring: 'ring-blue-50',
            bg: 'bg-blue-50',
            border: 'border-blue-100',
            text: 'text-[#003399]'
        },
        red: {
            primary: '#E61111',
            ring: 'ring-red-50',
            bg: 'bg-red-50',
            border: 'border-red-100',
            text: 'text-[#E61111]'
        }
    };

    return (
        <div className="bg-gray-100 font-inter -m-2 min-h-screen">
            <header className="w-full bg-transparent flex px-8 py-4 justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/admin/dashboard" className="text-gray-500 hover:text-[#003399] transition">
                        <i className="fas fa-arrow-left text-xl"></i>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Interest Rates Protocol</h2>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-[0.2em] mt-1">Institutional Yield & Prime Rates</p>
                    </div>
                </div>
                <button
                    onClick={handleAddTable}
                    className="bg-[#003399] hover:bg-black text-white px-8 py-3 rounded-2xl font-bold text-[11px] uppercase tracking-[0.15em] transition-all shadow-xl shadow-blue-100 flex items-center gap-3 transform active:scale-95"
                >
                    <i className="fas fa-plus-circle"></i> Create New Rate Table
                </button>
            </header>

            <div className="px-8 pb-20 space-y-12 mt-6">
                {message.text && (
                    <div className={`p-5 rounded-3xl text-sm font-medium shadow-sm transition-all animate-in fade-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-green-50 text-green-800 border-2 border-green-200' : 'bg-red-50 text-red-800 border-2 border-red-200'}`}>
                        <div className="flex items-center gap-3">
                            <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-lg`}></i>
                            {message.text}
                        </div>
                    </div>
                )}

                {tables.map((table, tableIdx) => {
                    const theme = themeColors[table.accent_color] || themeColors.blue;

                    return (
                        <div key={tableIdx} className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Accent Bar */}
                            <div className={`h-1.5 w-full ${table.accent_color === 'blue' ? 'bg-[#003399]' : 'bg-[#E61111]'}`}></div>

                            <div className="p-10 space-y-10">
                                {/* Header Controls */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                    <div className="flex-1 w-full max-w-2xl flex items-center gap-6">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-inner border ${theme.bg} ${theme.text} ${theme.border}`}>
                                            <i className={`fas ${table.accent_color === 'blue' ? 'fa-piggy-bank' : 'fa-hand-holding-usd'}`}></i>
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Editable Table Heading / Category</label>
                                            <input
                                                type="text"
                                                value={table.title}
                                                onChange={(e) => handleTableChange(tableIdx, 'title', e.target.value)}
                                                className={`w-full bg-white border-1 border-gray-400 rounded-2xl px-5 py-2.5 font-bold text-gray-900 focus:border-${table.accent_color === 'blue' ? '[#003399]' : '[#E61111]'} focus:ring-4 ${theme.ring} outline-none transition-all text-lg`}
                                                placeholder="e.g. Fixed Deposit Rates"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 bg-gray-50/50 p-2 rounded-3xl border border-gray-100">
                                        <div className="flex gap-2 px-2 border-r border-gray-200 mr-2">
                                            <button
                                                onClick={() => handleTableChange(tableIdx, 'accent_color', 'blue')}
                                                className={`w-8 h-8 rounded-full transition-all border-2 ${table.accent_color === 'blue' ? 'bg-[#003399] border-blue-200 scale-110 shadow-lg shadow-blue-100' : 'bg-blue-100 border-transparent'}`}
                                            ></button>
                                            <button
                                                onClick={() => handleTableChange(tableIdx, 'accent_color', 'red')}
                                                className={`w-8 h-8 rounded-full transition-all border-2 ${table.accent_color === 'red' ? 'bg-[#E61111] border-red-200 scale-110 shadow-lg shadow-red-100' : 'bg-red-100 border-transparent'}`}
                                            ></button>
                                        </div>
                                        <button
                                            onClick={() => handleSaveTable(tableIdx)}
                                            disabled={saving}
                                            className={`px-6 py-2.5 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all text-white flex items-center gap-3 active:scale-95 ${table.accent_color === 'blue' ? 'bg-[#003399] hover:bg-black' : 'bg-[#E61111] hover:bg-black'}`}
                                        >
                                            <i className="fas fa-sync-alt"></i> {saving ? 'Syncing...' : 'Sync Data'}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTable(table.id, tableIdx)}
                                            className="w-10 h-10 rounded-2xl bg-white text-gray-400 hover:bg-red-500 hover:text-white transition-all shadow-sm flex items-center justify-center text-sm"
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Dynamic Table Builder */}
                                <div className="rounded-[2rem] border border-gray-200 shadow-inner bg-gray-50/40 p-4 overflow-x-auto">
                                    <table className="w-full border-separate border-spacing-y-3">
                                        <thead>
                                            <tr>
                                                {table.columns.map((col, colIdx) => (
                                                    <th key={colIdx} className="px-3 pb-4">
                                                        <div className="relative group/col">
                                                            <div className="bg-white/80 rounded-2xl border border-gray-200 p-1 flex items-center">
                                                                <input
                                                                    type="text"
                                                                    value={col}
                                                                    onChange={(e) => handleColumnLabelChange(tableIdx, colIdx, e.target.value)}
                                                                    className="w-full bg-transparent px-3 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center outline-none focus:text-gray-900"
                                                                    placeholder="HEADING"
                                                                />
                                                                <button
                                                                    onClick={() => handleRemoveColumn(tableIdx, colIdx)}
                                                                    className="w-6 h-6 rounded-lg bg-red-50 text-red-500 opacity-0 group-hover/col:opacity-100 transition-all hover:bg-red-500 hover:text-white flex items-center justify-center text-[10px] mr-1"
                                                                >
                                                                    <i className="fas fa-times"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </th>
                                                ))}
                                                <th className="w-16 pb-4">
                                                    <button
                                                        onClick={() => handleAddColumn(tableIdx)}
                                                        className="w-8 h-8 rounded-xl bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-all flex items-center justify-center text-xs ml-2"
                                                        title="Add Column"
                                                    >
                                                        <i className="fas fa-plus"></i>
                                                    </button>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {table.rows.map((row, rowIdx) => (
                                                <tr key={rowIdx} className="group/row">
                                                    {row.map((val, valIdx) => (
                                                        <td key={valIdx} className="px-3">
                                                            <input
                                                                type="text"
                                                                value={val}
                                                                onChange={(e) => handleRowValueChange(tableIdx, rowIdx, valIdx, e.target.value)}
                                                                className={`w-full px-5 py-3 bg-white border-2 border-gray-100 rounded-2xl text-sm font-bold text-gray-800 shadow-sm focus:border-${table.accent_color === 'blue' ? '[#003399]' : '[#E61111]'} focus:ring-4 ${theme.ring} outline-none transition-all text-center group-hover/row:border-gray-200`}
                                                                placeholder="..."
                                                            />
                                                        </td>
                                                    ))}
                                                    <td className="w-16 px-3">
                                                        <button
                                                            onClick={() => handleRemoveRow(tableIdx, rowIdx)}
                                                            className="w-10 h-10 rounded-2xl bg-white text-gray-300 hover:bg-red-50 hover:text-red-500 border border-gray-100 hover:border-red-100 transition-all opacity-0 group-hover/row:opacity-100 shadow-sm flex items-center justify-center ml-2"
                                                        >
                                                            <i className="fas fa-trash-alt text-xs"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Add Row Button */}
                                    <div className="mt-6 flex justify-center">
                                        <button
                                            onClick={() => handleAddRow(tableIdx)}
                                            className={`px-10 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 border-2 ${table.accent_color === 'blue' ? 'border-blue-50 text-[#003399] hover:bg-blue-50' : 'border-red-50 text-[#E61111] hover:bg-red-50'} active:scale-95`}
                                        >
                                            <i className="fas fa-plus"></i> Add New Data Row
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {tables.length === 0 && (
                    <div className="py-32 text-center space-y-6 bg-white rounded-[3rem] border-4 border-dashed border-gray-100 max-w-4xl mx-auto shadow-inner mt-12 grayscale opacity-50">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-200">
                            <i className="fas fa-table-list text-4xl"></i>
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-bold text-gray-400 text-xl">Repository Void Detected</h3>
                            <p className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">No interest rate structures currently provisioned</p>
                        </div>
                        <button
                            onClick={handleAddTable}
                            className="bg-gray-100 text-gray-400 px-8 py-3 rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-all"
                        >
                            Initialize Repository
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                .focus\\:border-\\[\\#003399\\]:focus { border-color: #003399 !important; }
                .focus\\:border-\\[\\#E61111\\]:focus { border-color: #E61111 !important; }
            `}</style>
        </div>
    );
};

export default AdminInterestRates;
