import { useState, useEffect } from 'react';
import { apiFetch, BASE_URL } from '../../utils/api';


const AdminDICGCCertificate = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        file_path: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await apiFetch('/dicgc');
            const data = await res.json();
            if (data) {
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    file_path: data.file_path || ''
                });
            }
        } catch (error) {
            console.error('Error fetching DICGC data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        const uploadData = new FormData();
        uploadData.append('title', formData.title);
        uploadData.append('description', formData.description);
        if (selectedFile) {
            uploadData.append('file', selectedFile);
        }

        try {
            const res = await fetch(`${BASE_URL}/api/dicgc/update`, {
                method: 'POST',
                body: uploadData
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage('DICGC Certificate updated successfully!');
                // Update local state with new file path if returned or fetch again
                if (result.data) {
                    setFormData(prev => ({
                        ...prev,
                        ...result.data
                    }));
                }
                setSelectedFile(null); // Reset file input
            } else {
                setMessage('Error updating record.');
            }
        } catch (err) {
            console.error(err);
            setMessage('Error connecting to server.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Content...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex gap-4 items-start">
                <div className="text-[#003399] mt-1"><i className="fas fa-certificate text-lg"></i></div>
                <div>
                    <h4 className="text-sm font-bold text-[#003399]">DICGC Certificate Manager</h4>
                    <p className="text-xs text-blue-800 mt-1">Manage the DICGC Certificate details here. This single record will be displayed on the public website.</p>
                </div>
            </div>

            {message && (
                <div className={`p-4 rounded-lg text-sm font-bold ${message.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2.5 px-0.5">Certificate Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-base font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50"
                        placeholder="e.g. DICGC Registration Certificate"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2.5 px-0.5">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50 resize-none leading-relaxed"
                        placeholder="Enter description..."
                    ></textarea>
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2.5 px-0.5">Upload Certificate (Image/PDF)</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*,.pdf"
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-xs file:font-semibold
                                file:bg-blue-50 file:text-[#003399]
                                hover:file:bg-blue-100 placeholder-gray-400"
                        />
                    </div>
                    {formData.file_path && (
                        <div className="mt-2 text-xs text-gray-500 px-1">
                            Current File: <a href={`${BASE_URL}/${formData.file_path}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold">View Uploaded Certificate</a>
                        </div>
                    )}
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-[#003399] hover:bg-black text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-100 transition transform hover:-translate-y-0.5 disabled:opacity-70"
                    >
                        {saving ? 'Updating...' : 'Update Certificate'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminDICGCCertificate;
