import { useState, useEffect } from 'react';
import { apiFetch, BASE_URL } from '../../utils/api';


const AdminChairman = ({ isEmbedded = false }) => {
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        education: '',
        tenure_start: '',
        experience: '',
        message: '',
        achievement_branches: '',
        achievement_growth: '',
        status: 'draft',
        display_order: 0,
        image: null
    });
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await apiFetch('/chairman');
            const data = await res.json();

            // Logic: If data exists, take the first one (most recent usually due to sorting, or just the single one expected)
            // Ideally backend filters for 'active' but here we just take the first record to edit.
            if (Array.isArray(data) && data.length > 0) {
                const profile = data[0];
                setEditingId(profile.id);
                setFormData({
                    name: profile.name,
                    designation: profile.designation,
                    education: profile.education || '',
                    tenure_start: profile.tenure_start || '',
                    experience: profile.experience || '',
                    message: profile.message || '',
                    achievement_branches: profile.achievement_branches,
                    achievement_growth: profile.achievement_growth || '',
                    status: profile.status,
                    display_order: profile.display_order,
                    image: null
                });
                setPreviewImage(profile.image_path ? `${BASE_URL}/${profile.image_path}` : null);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            setFormData(prev => ({ ...prev, image: file }));
            setPreviewImage(URL.createObjectURL(file));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null) {
                data.append(key, formData[key]);
            }
        });

        const url = editingId
            ? `/chairman/update/${editingId}`
            : `${BASE_URL}/api/chairman/create`;

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: data
            });
            const result = await res.json();
            if (result.status === 'success') {
                alert('Chairman Profile updated successfully!');
                // Re-fetch to ensure sync (or just update local state if we want to be faster)
                fetchProfile();
            } else {
                alert('Error saving profile');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Content...</div>;

    const InputGroup = ({ label, name, type = "text", value, onChange, placeholder, required = false }) => (
        <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{label} {required && <span className="text-red-500">*</span>}</label>
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    value={value || ''}
                    onChange={onChange}
                    rows="5"
                    placeholder={placeholder}
                    required={required}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 focus:border-[#003399] outline-none transition-all"
                />
            ) : type === 'select' ? (
                <div className="relative">
                    <select
                        name={name}
                        value={value}
                        onChange={onChange}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 focus:border-[#003399] outline-none transition-all appearance-none"
                    >
                        <option value="draft">Draft</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
                    </div>
                </div>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={type !== 'file' ? value || '' : undefined}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 focus:border-[#003399] outline-none transition-all ${type === 'file' ? 'p-1' : ''}`}
                />
            )}
        </div>
    );

    return (
        <div className={isEmbedded ? "max-w-6xl mx-auto space-y-8" : "max-w-6xl mx-auto space-y-12 pb-20 px-6 py-8"}>
            {!isEmbedded && (
                <header className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Chairman's Desk Management</h2>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mt-1">Manage Profile & Message</p>
                    </div>
                </header>
            )}

            {/* Single Form Section */}
            <section className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Profile Details & Message</h3>
                        <p className="text-xs text-gray-400 mt-1">Update the information for the current Chairman.</p>
                    </div>
                    {editingId && (
                        <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase rounded-full border border-green-100">
                            Editing Current Profile
                        </span>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Left Column: Photo & Stats */}
                        <div className="md:col-span-4 space-y-6">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Profile Photo</label>
                                <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md mb-4 group cursor-pointer">
                                    {previewImage ? (
                                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400"><i className="fas fa-user text-4xl"></i></div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                        <i className="fas fa-camera text-white"></i>
                                    </div>
                                    <input type="file" name="image" onChange={handleChange} className="absolute inset-0 opacity-0 cursor-pointer" title="Change Photo" />
                                </div>
                                <p className="text-[10px] text-gray-400">Click to upload new photo</p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-4">
                                <h4 className="text-xs font-bold text-gray-800 uppercase border-b border-gray-200 pb-2">Key Achievements</h4>
                                <InputGroup label="New Branches Opened" name="achievement_branches" type="number" value={formData.achievement_branches} onChange={handleChange} />
                                <InputGroup label="Business Growth" name="achievement_growth" value={formData.achievement_growth} onChange={handleChange} placeholder="e.g. 500 Cr" />
                            </div>

                            <InputGroup label="Profile Status" name="status" type="select" value={formData.status} onChange={handleChange} />
                            <InputGroup label="Display Order" name="display_order" type="number" value={formData.display_order} onChange={handleChange} />
                        </div>

                        {/* Right Column: Details & Message */}
                        <div className="md:col-span-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Chairman Name" name="name" value={formData.name} onChange={handleChange} required />
                                <InputGroup label="Designation" name="designation" value={formData.designation} onChange={handleChange} required />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Education" name="education" value={formData.education} onChange={handleChange} />
                                <InputGroup label="Tenure Start Date" name="tenure_start" type="date" value={formData.tenure_start} onChange={handleChange} />
                            </div>

                            <InputGroup label="Experience / Background" name="experience" type="textarea" value={formData.experience} onChange={handleChange} placeholder="Brief business background..." />

                            <div className="pt-2">
                                <InputGroup label="Chairman's Message" name="message" type="textarea" value={formData.message} onChange={handleChange} placeholder="Message from the desk..." />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-gray-100">
                        <button type="submit" className="bg-[#003399] hover:bg-black text-white px-8 py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-100 transition transform hover:-translate-y-0.5 w-full md:w-auto">
                            {editingId ? 'Update Chairman Profile' : 'Save Profile'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AdminChairman;
