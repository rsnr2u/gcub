import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL, apiFetch } from '../../utils/api';


const AdminEditQuickAccess = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        title: '',
        icon: '',
        link: '',
        is_active: 1
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    // Comprehensive icon library
    const iconLibrary = [
        { icon: 'fas fa-laptop-code', label: 'Net Banking' },
        { icon: 'fas fa-coins', label: 'Gold Loan' },
        { icon: 'fas fa-house-chimney', label: 'Housing Loan' },
        { icon: 'fas fa-graduation-cap', label: 'Education Loan' },
        { icon: 'fas fa-vault', label: 'Safe Lockers' },
        { icon: 'fas fa-piggy-bank', label: 'Fixed Deposit' },
        { icon: 'fas fa-clock', label: 'Recurring Deposit' },
        { icon: 'fas fa-bolt', label: 'IMPS' },
        { icon: 'fas fa-qrcode', label: 'UPI Payments' },
        { icon: 'fas fa-mobile-alt', label: 'Mobile Banking' },
        { icon: 'fas fa-credit-card', label: 'Credit Card' },
        { icon: 'fas fa-university', label: 'Bank' },
        { icon: 'fas fa-money-bill-wave', label: 'Cash' },
        { icon: 'fas fa-exchange-alt', label: 'Transfer' },
        { icon: 'fas fa-chart-line', label: 'Investment' },
        { icon: 'fas fa-shield-alt', label: 'Insurance' },
        { icon: 'fas fa-calculator', label: 'Calculator' },
        { icon: 'fas fa-percentage', label: 'Interest Rate' },
        { icon: 'fas fa-file-invoice-dollar', label: 'Bill Payment' },
        { icon: 'fas fa-wallet', label: 'Wallet' },
        { icon: 'fas fa-hand-holding-usd', label: 'Loan' },
        { icon: 'fas fa-landmark', label: 'Government' },
        { icon: 'fas fa-car', label: 'Vehicle Loan' },
        { icon: 'fas fa-home', label: 'Home' },
        { icon: 'fas fa-briefcase', label: 'Business' },
        { icon: 'fas fa-user-tie', label: 'Professional' },
        { icon: 'fas fa-headset', label: 'Support' },
        { icon: 'fas fa-phone', label: 'Phone' },
        { icon: 'fas fa-envelope', label: 'Email' },
        { icon: 'fas fa-map-marker-alt', label: 'Location' },
        { icon: 'fas fa-calendar-alt', label: 'Calendar' },
        { icon: 'fas fa-download', label: 'Download' },
        { icon: 'fas fa-upload', label: 'Upload' },
        { icon: 'fas fa-file-pdf', label: 'PDF' },
        { icon: 'fas fa-print', label: 'Print' },
        { icon: 'fas fa-search', label: 'Search' },
        { icon: 'fas fa-bell', label: 'Notification' },
        { icon: 'fas fa-cog', label: 'Settings' },
        { icon: 'fas fa-lock', label: 'Security' },
        { icon: 'fas fa-key', label: 'Password' },
        { icon: 'fas fa-user', label: 'User' },
        { icon: 'fas fa-users', label: 'Users' },
        { icon: 'fas fa-star', label: 'Favorite' },
        { icon: 'fas fa-heart', label: 'Like' },
        { icon: 'fas fa-share-alt', label: 'Share' },
        { icon: 'fas fa-globe', label: 'Website' },
        { icon: 'fas fa-shopping-cart', label: 'Shopping' },
        { icon: 'fas fa-gift', label: 'Gift' },
    ];

    useEffect(() => {
        if (isEdit) {
            fetchItem();
        }
    }, [id]);

    const fetchItem = async () => {
        setLoading(true);
        try {
            const res = await apiFetch(`/quick-access/show/${id}`);
            const data = await res.json();
            setFormData({
                title: data.title || '',
                icon: data.icon || '',
                link: data.link || '',
                is_active: data.is_active || 1
            });
        } catch (err) {
            console.error('Error fetching item:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEdit
                ? `/quick-access/update/${id}`
                : `${BASE_URL}/api/quick-access/create`;

            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (result.status === 'success' || result.id) {
                setMessage({ text: `Item ${isEdit ? 'updated' : 'created'} successfully!`, type: 'success' });
                setTimeout(() => navigate('/admin/content/quick-access'), 1500);
            } else {
                setMessage({ text: 'Error: ' + JSON.stringify(result.messages || result), type: 'error' });
            }
        } catch (err) {
            setMessage({ text: 'Error saving item', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleIconSelect = (icon) => {
        setFormData({ ...formData, icon });
    };

    if (loading && isEdit) return <div className="p-8 text-center text-gray-500 font-inter">Loading...</div>;

    return (
        <div className="font-inter">
            <header className="px-8">
                <h2 className="text-xl font-bold text-gray-800">
                    {isEdit ? 'Edit Quick Access Item' : 'Add New Quick Access Item'}
                </h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                    {isEdit ? 'Update item details' : 'Create a new quick access icon'}
                </p>
            </header>

            <div className="px-8 py-6">
                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <i className="fas fa-info-circle mr-2"></i> {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Title */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g., Net Banking, Gold Loan"
                                        required
                                    />
                                </div>

                                {/* Icon */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                                        Icon Class <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50"
                                            value={formData.icon}
                                            onChange={e => setFormData({ ...formData, icon: e.target.value })}
                                            placeholder="e.g., fas fa-laptop-code"
                                            required
                                        />
                                        <div className="w-16 h-12 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                                            {formData.icon && <i className={`${formData.icon} text-2xl text-[#003399]`}></i>}
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Use Font Awesome classes or click an icon from the library →
                                    </p>
                                </div>

                                {/* Link */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                                        Link/URL <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50"
                                        value={formData.link}
                                        onChange={e => setFormData({ ...formData, link: e.target.value })}
                                        placeholder="e.g., /net-banking or https://example.com"
                                        required
                                    />
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Status</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="is_active"
                                                value="1"
                                                checked={formData.is_active === 1}
                                                onChange={() => setFormData({ ...formData, is_active: 1 })}
                                                className="w-4 h-4 text-[#003399]"
                                            />
                                            <span className="text-sm font-medium text-gray-700">Active</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="is_active"
                                                value="0"
                                                checked={formData.is_active === 0}
                                                onChange={() => setFormData({ ...formData, is_active: 0 })}
                                                className="w-4 h-4 text-[#003399]"
                                            />
                                            <span className="text-sm font-medium text-gray-700">Inactive</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-[#003399] hover:bg-black text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-50"
                                    >
                                        {loading ? 'Saving...' : (isEdit ? 'Update Item' : 'Create Item')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/admin/content/quick-access')}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right: Icon Library */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
                            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <i className="fas fa-icons text-[#003399]"></i>
                                Icon Library
                            </h3>
                            <p className="text-xs text-gray-500 mb-4">Click any icon to use it</p>

                            <div className="max-h-[600px] overflow-y-auto pr-2 space-y-1">
                                {iconLibrary.map((item, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleIconSelect(item.icon)}
                                        className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition text-left group ${formData.icon === item.icon ? 'bg-blue-100 border-2 border-[#003399]' : 'border border-transparent'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${formData.icon === item.icon ? 'bg-[#003399]' : 'bg-blue-50 group-hover:bg-blue-100'
                                            }`}>
                                            <i className={`${item.icon} text-lg ${formData.icon === item.icon ? 'text-white' : 'text-[#003399]'
                                                }`}></i>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className={`text-xs font-bold truncate ${formData.icon === item.icon ? 'text-[#003399]' : 'text-gray-700'
                                                }`}>
                                                {item.label}
                                            </div>
                                            <code className="text-[10px] text-gray-500 truncate block">{item.icon}</code>
                                        </div>
                                        {formData.icon === item.icon && (
                                            <i className="fas fa-check-circle text-[#003399]"></i>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <a
                                    href="https://fontawesome.com/icons"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                                >
                                    <i className="fas fa-external-link-alt"></i>
                                    Browse more icons at FontAwesome
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminEditQuickAccess;
