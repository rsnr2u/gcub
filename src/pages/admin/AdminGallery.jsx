import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authFetch } from '../../utils/api';
import Swal from 'sweetalert2';

const AdminGallery = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchGallery = async () => {
        try {
            setLoading(true);
            const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/gallery`);
            const data = await res.json();
            setGalleryItems(data);
        } catch (err) {
            console.error('Error fetching gallery:', err);
            Swal.fire('Error', 'Failed to fetch gallery items', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/gallery/delete/${id}`, {
                    method: 'POST'
                });
                if (res.ok) {
                    Swal.fire('Deleted!', 'Item has been deleted.', 'success');
                    fetchGallery();
                } else {
                    Swal.fire('Error', 'Failed to delete item', 'error');
                }
            } catch (err) {
                console.error('Delete error:', err);
                Swal.fire('Error', 'Something went wrong', 'error');
            }
        }
    };

    const filteredItems = galleryItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Photo Gallery Management</h1>
                    <p className="text-gray-500 text-sm">Upload and manage photos for the organization gallery</p>
                </div>
                <Link
                    to="/admin/content/gallery/create"
                    className="bg-[#003399] text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition flex items-center gap-2"
                >
                    <i className="fas fa-plus"></i> Add New Photo
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="text"
                            placeholder="Search photos by title or description..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                        Total Items: {filteredItems.length}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Preview</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                            Loading gallery items...
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredItems.length > 0 ? (
                                filteredItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition duration-300">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100 relative">
                                                    {item.image ? (
                                                        <>
                                                            <img
                                                                src={`${import.meta.env.VITE_BASE_URL}/${item.image}`}
                                                                alt={item.title}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                                                            />
                                                            {item.images?.length > 1 && (
                                                                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] px-1 font-bold">
                                                                    +{item.images.length - 1}
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            <i className="fas fa-image"></i>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="max-w-xs md:max-w-md">
                                                    <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{item.title}</h3>
                                                    <p className="text-xs text-gray-500 line-clamp-1">{item.description || 'No description'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {item.images?.length || 0} Photos
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs text-gray-500">
                                                {new Date(item.created_at).toLocaleDateString('en-IN', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    to={`/admin/content/gallery/edit/${item.id}`}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                    title="Edit Post"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                    title="Delete Post"
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <i className="fas fa-images text-4xl text-gray-200"></i>
                                            <p>No gallery items found matching your search.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminGallery;
