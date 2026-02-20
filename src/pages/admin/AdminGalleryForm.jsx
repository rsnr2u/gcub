import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { authFetch } from '../../utils/api';
import Swal from 'sweetalert2';

const AdminGalleryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        images: [] // changed from image: null
    });
    const [imagePreviews, setImagePreviews] = useState([]); // changed from imagePreview: null
    const [existingImages, setExistingImages] = useState([]); // added for edit mode
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEditMode);

    useEffect(() => {
        if (isEditMode) {
            const fetchItem = async () => {
                try {
                    const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/gallery/show/${id}`);
                    const data = await res.json();
                    setFormData({
                        title: data.title,
                        description: data.description || '',
                        images: []
                    });
                    setExistingImages(data.images || []);
                } catch (err) {
                    console.error('Error fetching item:', err);
                    Swal.fire('Error', 'Failed to fetch gallery item details', 'error');
                } finally {
                    setInitialLoading(false);
                }
            };
            fetchItem();
        }
    }, [id, isEditMode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const validFiles = files.filter(file => {
                if (file.size > 2 * 1024 * 1024) {
                    Swal.fire('Error', `Image ${file.name} is too large (> 2MB)`, 'error');
                    return false;
                }
                return true;
            });

            setFormData(prev => ({ ...prev, images: [...prev.images, ...validFiles] }));

            const newPreviews = validFiles.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeNewImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = async (imageId) => {
        const result = await Swal.fire({
            title: 'Delete this photo?',
            text: "This will permanently remove the photo from the gallery.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/gallery/delete-image/${imageId}`, {
                    method: 'POST'
                });
                if (res.ok) {
                    setExistingImages(prev => prev.filter(img => img.id !== imageId));
                    Swal.fire('Deleted!', 'Photo has been removed.', 'success');
                }
            } catch (err) {
                console.error('Error deleting image:', err);
                Swal.fire('Error', 'Failed to delete photo', 'error');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title) {
            Swal.fire('Warning', 'Title is required', 'warning');
            return;
        }

        if (!isEditMode && formData.images.length === 0) {
            Swal.fire('Warning', 'At least one image is required', 'warning');
            return;
        }

        setLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);

        formData.images.forEach(image => {
            data.append('images[]', image);
        });

        try {
            const url = isEditMode
                ? `${import.meta.env.VITE_API_BASE_URL}/gallery/update/${id}`
                : `${import.meta.env.VITE_API_BASE_URL}/gallery/create`;

            const res = await authFetch(url, {
                method: 'POST',
                body: data
            });

            const result = await res.json();

            if (res.ok) {
                Swal.fire('Success', isEditMode ? 'Gallery post updated' : 'Gallery post created', 'success');
                navigate('/admin/content/gallery');
            } else {
                Swal.fire('Error', result.message || 'Something went wrong', 'error');
            }
        } catch (err) {
            console.error('Submit error:', err);
            Swal.fire('Error', 'Failed to save gallery item', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/admin/content/gallery" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
                    <i className="fas fa-arrow-left"></i>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{isEditMode ? 'Edit' : 'Add New'} Gallery Post</h1>
                    <p className="text-sm text-gray-500">Upload multiple photos for this gallery entry</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <form onSubmit={handleSubmit} className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Details */}
                        <div className="lg:col-span-1 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Post Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Annual General Meeting 2024"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter details about these photos..."
                                    rows="6"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#003399] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                                {isEditMode ? 'Update Post' : 'Post to Gallery'}
                            </button>
                        </div>

                        {/* Right Column: Multi-Image Upload */}
                        <div className="lg:col-span-2 space-y-6">
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                Photos {isEditMode ? '(Add More)' : '*'}
                            </label>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {/* Upload Button */}
                                <div className="relative aspect-square rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition flex flex-col items-center justify-center cursor-pointer overflow-hidden">
                                    <i className="fas fa-plus text-2xl text-gray-400"></i>
                                    <span className="text-xs text-gray-500 mt-2">Add Photos</span>
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                    />
                                </div>

                                {/* Existing Images Previews */}
                                {existingImages.map((img) => (
                                    <div key={img.id} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-100 shadow-sm">
                                        <img
                                            src={`${import.meta.env.VITE_BASE_URL}/${img.image}`}
                                            alt="Existing"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => removeExistingImage(img.id)}
                                                className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition"
                                            >
                                                <i className="fas fa-trash-alt text-xs"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* New Image Previews */}
                                {imagePreviews.map((preview, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group border border-blue-100 shadow-sm animate-fadeIn">
                                        <img
                                            src={preview}
                                            alt="New Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] px-1.5 rounded-full font-bold">NEW</div>
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => removeNewImage(idx)}
                                                className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition"
                                            >
                                                <i className="fas fa-times text-xs"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                                <i className="fas fa-info-circle text-blue-500 mt-1"></i>
                                <div className="text-xs text-blue-700">
                                    <p className="font-bold mb-1">Upload Tips:</p>
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li>You can select multiple files at once.</li>
                                        <li>Recommended size: Less than 2MB per image.</li>
                                        <li>Formats: JPG, PNG, WEBP.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminGalleryForm;
