import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authFetch } from '../../utils/api';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/products`);
            const data = await response.json();
            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                setProducts([]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/products/delete/${id}`, { method: 'POST' });
            const data = await response.json();
            if (data.status === 'success') {
                setMessage({ type: 'success', text: 'Product deleted successfully!' });
                fetchProducts();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const groupedProducts = products.reduce((acc, product) => {
        if (!acc[product.category]) acc[product.category] = [];
        acc[product.category].push(product);
        return acc;
    }, {});

    const categoryColors = {
        'Deposits': '#003399',
        'Loans': '#E61111'
    };

    const categoryBgColors = {
        'Deposits': 'bg-blue-50',
        'Loans': 'bg-red-50'
    };

    if (loading) return <div className="p-6 text-center text-gray-500">Loading products...</div>;

    return (
        <div className="w-full px-6 py-8">
            <header className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Banking Products</h2>

                <Link
                    to="/admin/products/new"
                    className="bg-[#003399] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-800 transition flex items-center gap-2 shadow-lg shadow-blue-100"
                >
                    <i className="fas fa-plus"></i> Add New Product
                </Link>
            </header>

            {message.text && (
                <div className={`mb-6 p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {message.text}
                </div>
            )}

            {Object.keys(categoryColors).map(category => (
                <div key={category} className="mb-10">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-6">
                        <h3 className="text-lg font-bold" style={{ color: categoryColors[category] }}>{category}</h3>
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">{groupedProducts[category]?.length || 0} Items</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedProducts[category]?.map(product => (
                            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition group overflow-hidden relative">
                                <div className="p-5 flex items-center gap-4">
                                    {product.icon_type === 'img' ? (
                                        <img
                                            src={`/assets/images/icons/${product.icon_value}`}
                                            alt={product.name}
                                            className="w-16 h-16 rounded-lg object-cover bg-gray-50 p-1 border border-gray-100"
                                            onError={(e) => {
                                                if (e.target.src.includes('/icons/')) {
                                                    e.target.src = e.target.src.replace('/icons/', '/cards/');
                                                } else {
                                                    e.target.src = '/assets/images/gcublogo.png';
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div className={`w-16 h-16 rounded-lg ${categoryBgColors[category] || 'bg-gray-100'} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`} style={{ color: categoryColors[category] }}>
                                            <i className={product.icon_value}></i>
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-gray-800 truncate group-hover:text-[#003399] transition">{product.name}</h4>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold mt-1">Status: <span className={product.status === 'active' ? 'text-green-500' : 'text-red-500'}>{product.status}</span></p>
                                    </div>
                                </div>

                                {/* Overlay Actions */}
                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link to={`/admin/products/edit/${product.id}`} className="w-8 h-8 rounded-full bg-blue-50 text-[#003399] hover:bg-[#003399] hover:text-white transition flex items-center justify-center text-xs">
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                    <button onClick={() => handleDelete(product.id)} className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center text-xs">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {(!groupedProducts[category] || groupedProducts[category].length === 0) && (
                            <div className="col-span-full py-8 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                No {category.toLowerCase()} items found.
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminProducts;
