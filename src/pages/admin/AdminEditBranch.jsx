import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const AdminEditBranch = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        name: '',
        region: '',
        ifsc: '',
        micr: '',
        contact: '',
        email: '',
        address: '',
        google_maps_link: '',
        status: 'active'
    });

    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (isEdit) {
            fetchBranch();
        }
    }, [id]);

    const fetchBranch = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/branches/show/${id}`);
            const data = await response.json();
            if (data) {
                setFormData(data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching branch:', error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        const url = isEdit
            ? `${import.meta.env.VITE_API_BASE_URL}/branches/update/${id}`
            : `${import.meta.env.VITE_API_BASE_URL}/branches/create`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString()
            });
            const data = await response.json();
            if (data.status === 'success') {
                setMessage({ type: 'success', text: `Branch preserved successfully.` });
                setTimeout(() => navigate('/admin/branches'), 1200);
            } else {
                setMessage({ type: 'error', text: 'Error saving branch.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Connection failure.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading Details...</div>;

    const labelStyle = "block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2.5 px-0.5";
    const inputStyle = "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-base font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50";

    return (
        <div className="font-inter min-h-screen">
            <header className="max-w-4xl mx-auto flex px-8 py-2 justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/admin/branches" className="text-gray-400 hover:text-[#003399] transition">
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{isEdit ? 'Edit Branch' : 'New Branch'}</h2>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Management Protocol</p>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-8 pb-20">
                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl text-xs font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <i className="fas fa-info-circle mr-2"></i> {message.text}
                    </div>
                )}

                <form id="branch-form" onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm p-10 space-y-8">
                    {/* Branch Name */}
                    <div className="space-y-2">
                        <label className={labelStyle}>Branch Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={inputStyle}
                        />
                    </div>

                    {/* Region */}
                    <div className="space-y-2">
                        <label className={labelStyle}>District / Region Line</label>
                        <input
                            type="text"
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            className={inputStyle}
                        />
                        <p className="text-[10px] text-gray-400 font-medium px-0.5 mt-2">Appears below the branch name in uppercase.</p>
                    </div>

                    {/* IFSC & MICR */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className={labelStyle}>IFSC Code</label>
                            <input
                                type="text"
                                name="ifsc"
                                value={formData.ifsc}
                                onChange={handleChange}
                                className={`${inputStyle} uppercase`}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className={labelStyle}>MICR Code</label>
                            <input
                                type="text"
                                name="micr"
                                value={formData.micr}
                                onChange={handleChange}
                                className={inputStyle}
                            />
                        </div>
                    </div>

                    {/* Contact & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className={labelStyle}>Contact Number</label>
                            <input
                                type="text"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                className={inputStyle}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className={labelStyle}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={inputStyle}
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <label className={labelStyle}>Full Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            className={`${inputStyle} resize-none`}
                        ></textarea>
                    </div>

                    {/* Google Maps Link */}
                    <div className="space-y-2">
                        <label className={labelStyle}>Google Maps Link</label>
                        <div className="flex border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-50 focus-within:border-[#003399] transition-all">
                            <div className="bg-gray-50 px-4 flex items-center border-r border-gray-100 text-gray-500">
                                <i className="fas fa-map-marked-alt text-sm"></i>
                            </div>
                            <input
                                type="url"
                                name="google_maps_link"
                                value={formData.google_maps_link}
                                onChange={handleChange}
                                className="flex-1 px-4 py-2.5 text-sm font-medium text-blue-600 outline-none truncate"
                                placeholder="https://maps.google.com/..."
                            />
                        </div>
                    </div>

                    {/* Head Office Toggle */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div>
                            <label className="text-sm font-bold text-gray-800">Set as Head Office</label>
                            <p className="text-[10px] text-gray-500 font-medium mt-0.5">This branch will be pinned to the top of the list.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="is_head_office"
                                checked={formData.is_head_office == 1}
                                onChange={(e) => setFormData(prev => ({ ...prev, is_head_office: e.target.checked ? 1 : 0 }))}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#003399]"></div>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-[#003399] hover:bg-black text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-3"
                        >
                            {saving ? <i className="fas fa-spinner animate-spin"></i> : <i className="fas fa-check-circle"></i>}
                            {saving ? 'Processing...' : 'Save Branch Protocol'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditBranch;
