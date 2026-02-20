import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const GalleryDetail = () => {
    const { id } = useParams();
    const [galleryPost, setGalleryPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    useEffect(() => {
        const fetchGalleryDetail = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/gallery/show/${id}`);
                const data = await res.json();
                setGalleryPost(data);
            } catch (err) {
                console.error('Error fetching gallery detail:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchGalleryDetail();
        window.scrollTo(0, 0);
    }, [id]);

    const openLightbox = (index) => {
        setSelectedImageIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImageIndex(null);
        document.body.style.overflow = 'auto';
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev + 1) % galleryPost.images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev - 1 + galleryPost.images.length) % galleryPost.images.length);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium animate-pulse">Loading Collection...</p>
                </div>
            </div>
        );
    }

    if (!galleryPost) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <i className="fas fa-exclamation-circle text-6xl text-gray-200 mb-4"></i>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Collection Not Found</h2>
                <Link to="/gallery" className="text-blue-600 font-bold hover:underline">Back to Gallery</Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            <Helmet>
                <title>{galleryPost.title} | Photo Gallery | GCUB</title>
                <meta name="description" content={galleryPost.description} />
            </Helmet>

            {/* Premium Header/Cover */}
            <section className="bg-[#002b5c] py-10 md:py-16 text-white">
                <div className="flex flex-col items-center justify-center text-center px-4">
                    <Link to="/gallery" className="flex items-center gap-2 text-white/80 hover:text-white transition group bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                        <i className="fas fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
                        <span className="text-sm font-bold uppercase tracking-wider">Back to Gallery</span>
                    </Link>
                    <h1 className="text-2xl md:text-4xl font-black text-white mb-4 animate-fadeInUp">
                        {galleryPost.title}
                    </h1>
                </div>
            </section>

            {/* Content Section */}
            <div className="container mx-auto px-4">
                <div className="bg-white p-8 md:p-14 mb-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-10 border-b border-gray-100">
                            <div>
                                <p className="text-xs text-blue-600 font-black uppercase tracking-widest mb-2">Event Date</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {new Date(galleryPost.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <div className="px-5 py-2.5 bg-blue-50 text-blue-700 rounded-full font-bold text-sm flex items-center gap-2 border border-blue-100">
                                    <i className="fas fa-images"></i>
                                    {galleryPost.images?.length || 0} Photos
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-16">
                            <p>{galleryPost.description || "No description provided for this collection."}</p>
                        </div>

                        {/* Image Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                            {galleryPost.images?.map((img, index) => (
                                <div
                                    key={img.id}
                                    className="group relative aspect-square rounded-2xl md:rounded-[2rem] overflow-hidden cursor-zoom-in shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fadeInUp"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                    onClick={() => openLightbox(index)}
                                >
                                    <img
                                        src={`http://localhost:8080/${img.image}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        alt={`Gallery ${index}`}
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                                        <i className="fas fa-expand text-white"></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImageIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-fadeIn"
                    onClick={closeLightbox}
                >
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-lg"></div>

                    {/* Navigation */}
                    {galleryPost.images?.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-[110] border border-white/10"
                            >
                                <i className="fas fa-chevron-left text-xl md:text-2xl"></i>
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-[110] border border-white/10"
                            >
                                <i className="fas fa-chevron-right text-xl md:text-2xl"></i>
                            </button>
                        </>
                    )}

                    <button
                        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white text-2xl hover:text-yellow-400 hover:rotate-90 transition-all duration-300 z-[115] bg-white/10 rounded-full border border-white/10"
                        onClick={closeLightbox}
                    >
                        <i className="fas fa-times"></i>
                    </button>

                    <div
                        className="relative max-w-7xl w-full max-h-full flex items-center justify-center z-[105] animate-scaleIn"
                        onClick={e => e.stopPropagation()}
                    >
                        <img
                            src={`http://localhost:8080/${galleryPost.images[selectedImageIndex]?.image}`}
                            alt="Lightbox"
                            className="max-w-full max-h-[85vh] md:max-h-[90vh] object-contain rounded-xl shadow-2xl"
                        />

                        {/* Counter */}
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest border border-white/10">
                            {selectedImageIndex + 1} / {galleryPost.images.length}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryDetail;
