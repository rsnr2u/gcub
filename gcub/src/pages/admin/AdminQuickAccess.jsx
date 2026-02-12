import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminQuickAccess = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [draggedItem, setDraggedItem] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/quick-access?admin=true');
            const data = await res.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching items:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const res = await fetch(`http://localhost:8080/api/quick-access/toggle-status/${id}`, {
                method: 'POST'
            });
            const result = await res.json();

            if (result.status === 'success') {
                setMessage({ text: 'Status updated successfully!', type: 'success' });
                fetchItems();
            }
        } catch (err) {
            setMessage({ text: 'Error updating status', type: 'error' });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        try {
            const res = await fetch(`http://localhost:8080/api/quick-access/delete/${id}`, {
                method: 'POST'
            });
            const result = await res.json();

            if (result.status === 'success') {
                setMessage({ text: 'Item deleted successfully!', type: 'success' });
                fetchItems();
            }
        } catch (err) {
            setMessage({ text: 'Error deleting item', type: 'error' });
        }
    };

    const handleDragStart = (e, item) => {
        setDraggedItem(item);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = async (e, targetItem) => {
        e.preventDefault();

        if (!draggedItem || draggedItem.id === targetItem.id) return;

        const newItems = [...items];
        const draggedIndex = newItems.findIndex(item => item.id === draggedItem.id);
        const targetIndex = newItems.findIndex(item => item.id === targetItem.id);

        // Remove dragged item and insert at target position
        newItems.splice(draggedIndex, 1);
        newItems.splice(targetIndex, 0, draggedItem);

        // Update sort_order for all items
        const updatedItems = newItems.map((item, index) => ({
            id: item.id,
            sort_order: index + 1
        }));

        setItems(newItems);

        // Save new order to backend
        try {
            const res = await fetch('http://localhost:8080/api/quick-access/reorder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: updatedItems })
            });
            const result = await res.json();

            if (result.status === 'success') {
                setMessage({ text: 'Order updated successfully!', type: 'success' });
                fetchItems();
            }
        } catch (err) {
            setMessage({ text: 'Error updating order', type: 'error' });
        }

        setDraggedItem(null);
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading...</div>;

    return (
        <div className="font-inter">
            <header className="px-8 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Quick Access Items</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                        Manage Homepage Quick Access Icons
                    </p>
                </div>
                <Link
                    to="/admin/content/quick-access/new"
                    className="bg-[#003399] hover:bg-black text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
                >
                    <i className="fas fa-plus-circle mr-2"></i> Add New
                </Link>
            </header>

            <div className="px-8 py-6">
                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <i className="fas fa-info-circle mr-2"></i> {message.text}
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Order</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Icon Preview</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Icon Class</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Link</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {items.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, item)}
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDrop(e, item)}
                                        className="hover:bg-gray-50 cursor-move transition"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <i className="fas fa-grip-vertical text-gray-400"></i>
                                                <span className="text-sm font-bold text-gray-700">{item.sort_order}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                                                <i className={`${item.icon} text-xl text-[#003399]`}></i>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">{item.title}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">{item.icon}</code>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-blue-600">{item.link}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleToggleStatus(item.id, item.is_active)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition ${item.is_active
                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {item.is_active ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex gap-3">
                                                <Link
                                                    to={`/admin/content/quick-access/edit/${item.id}`}
                                                    className="text-[#003399] hover:text-black transition"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-500 hover:text-red-700 transition"
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg text-xs text-blue-700">
                    <i className="fas fa-info-circle mr-2"></i>
                    <strong>Tip:</strong> Drag and drop rows to reorder items. Only active items will appear on the homepage.
                </div>
            </div>
        </div>
    );
};

export default AdminQuickAccess;
