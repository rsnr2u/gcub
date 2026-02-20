import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Gallery = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/gallery`);
                const data = await res.json();
                setGalleryItems(data);
            } catch (err) {
                console.error('Error fetching gallery:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <Helmet>
                <title>Photo Gallery | The Co-operative Guntur Urban Bank</title>
                <meta name="description" content="View our photo gallery showcasing events, achievements and branch activities of The Co-operative Guntur Urban Bank." />
            </Helmet>

            {/* Hero Section */}
            <section className="bg-[#002b5c] py-12 md:py-20 text-white">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="/assets/images/pattern.png"
                        alt="Pattern"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 animate-fadeInUp">
                        Photo Gallery
                    </h1>
                    <div className="w-24 h-1 bg-yellow-400 mb-6 animate-stretch"></div>
                    <p className="text-blue-100 max-w-2xl text-lg animate-fadeInUp delay-100">
                        Capturing the moments that define our commitment to excellence and community service.
                    </p>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="aspect-[4/3] bg-gray-100 animate-pulse rounded-3xl"></div>
                            ))}
                        </div>
                    ) : galleryItems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {galleryItems.map((item, index) => (
                                <Link
                                    key={item.id}
                                    to={`/gallery/${item.id}`}
                                    className="group relative block animate-fadeInUp"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                                        <img
                                            src={`${import.meta.env.VITE_BASE_URL}/${item.image}`}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Image Count Badge */}
                                        {item.images?.length > 1 && (
                                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-2 z-10 border border-white/10">
                                                <i className="fas fa-images"></i>
                                                <span>{item.images.length} Photos</span>
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                            <h3 className="text-white font-bold text-xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-300 text-sm line-clamp-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                                            <i className="fas fa-arrow-right text-white"></i>
                                        </div>
                                    </div>
                                    <div className="mt-4 px-2">
                                        <div className="flex items-start justify-between gap-4">
                                            <h4 className="font-bold text-gray-800 text-lg group-hover:text-[#003399] transition-colors line-clamp-1">
                                                {item.title}
                                            </h4>
                                            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-wider h-fit mt-1">
                                                View
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-sm mt-1">
                                            {new Date(item.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <i className="fas fa-images text-6xl text-gray-200 mb-4"></i>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">No photos yet</h3>
                            <p className="text-gray-500">Check back later for updates to our gallery.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Gallery;
