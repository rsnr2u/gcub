import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SchemaOrg, { createFinancialProductSchema, createBreadcrumbSchema } from '../components/SchemaOrg';
import { apiFetch } from '../utils/api';


const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [others, setOthers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch specific product by slug
                const prodResponse = await apiFetch(`/products/show/${slug}`);
                if (!prodResponse.ok) {
                    setProduct(null);
                    return;
                }
                const currentProduct = await prodResponse.json();
                setProduct(currentProduct);

                // Fetch all products for sidebar
                const allResponse = await apiFetch('/products');
                if (allResponse.ok) {
                    const allData = await allResponse.json();
                    if (Array.isArray(allData)) {
                        const sameCategory = allData.filter(p => p && p.category === currentProduct.category && p.slug !== slug && p.status === 'active');
                        setOthers(sameCategory);
                    }
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#003399] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium animate-pulse">Loading amazing content...</p>
            </div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h2>
            <p className="text-gray-600 mb-8">The product or service you are looking for might have been moved or is currently unavailable.</p>
            <Link to="/" className="bg-[#003399] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition shadow-lg">Back to Home</Link>
        </div>
    );

    const getList = (data) => {
        if (!data) return [];
        try {
            if (data.startsWith('[') || data.startsWith('{')) {
                const parsed = JSON.parse(data);
                return Array.isArray(parsed) ? parsed : [];
            }
        } catch (e) { }
        return data.split('\n').filter(f => f.trim() !== '').map(f => f.startsWith('- ') ? f.substring(2) : f);
    };

    const featuresList = getList(product.features);
    const facilitiesList = getList(product.eligibility); // Repurposed eligibility field

    const getDocumentsList = (data) => {
        if (!data) return [];
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) && parsed.length > 0 ? parsed : [];
        } catch (e) {
            return data.trim() !== '' ? [data] : [];
        }
    };
    const documentsList = getDocumentsList(product.documents);


    return (
        <div className="bg-white min-h-screen">
            {/* Dynamic SEO Meta Tags */}
            <SEO
                title={`${product.name} - GCUB | ${product.category}`}
                description={product.long_description || product.description || `Explore ${product.name} at GCUB. ${product.hero_description || 'Comprehensive banking solutions tailored for you.'}`}
                keywords={`GCUB ${product.name}, ${product.category} Guntur, ${product.name} Interest Rate, Banking ${product.category}`}
                url={`/product/${product.slug}`}
            />

            {/* Schema.org Structured Data */}
            <SchemaOrg schema={createFinancialProductSchema({
                name: product.name,
                description: product.description,
                slug: product.slug,
                category: product.category,
                features: product.features || 'Contact bank for details'
            })} />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: product.category, url: '/' },
                { name: product.name, url: `/product/${product.slug}` }
            ])} />

            {/* Hero Section */}
            <div className="relative bg-[#002b5c] py-8 md:py-16 overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-6 relative z-10 text-white">
                    <div className="max-w-3xl">
                        <nav className="flex gap-2 text-xs font-bold uppercase tracking-widest text-blue-200">
                            <Link to="/" className="hover:text-white transition">Home</Link>
                            <span>/</span>
                            <span className="text-white opacity-60">{product.category}</span>
                        </nav>
                        <h1 className="text-3xl md:text-4xl font-black mb-2 drop-shadow-xl tracking-tight">{product.name}</h1>
                        <p className="text-md md:text-lg text-blue-50 font-medium drop-shadow-md opacity-95">
                            {product.hero_description || product.description || "Experience the next generation of banking with our tailored solutions."}
                        </p>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-6 py-12 md:py-20">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Main Content */}
                    <div className="w-full lg:w-2/3">
                        {/* Banner Image */}
                        <div className="mb-8 rounded-lg overflow-hidden shadow-sm border border-gray-100">
                            <img
                                src={`assets/images/banner/${product.image_path || 'default_banner.jpg'}`}
                                alt={product.name}
                                className="w-full h-auto object-cover max-h-[400px]"
                                onError={(e) => e.target.src = 'assets/images/savings_account/banner.png'}
                            />
                        </div>


                        {/* Introduction */}
                        <div className="text-sm text-gray-600 mb-10 leading-relaxed text-justify">
                            <p>
                                {product.long_description || product.description}
                            </p>
                        </div>

                        {/* Features */}
                        {featuresList.length > 0 && (
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-[#333] mb-4">Features & Benefits</h2>
                                <ul className="space-y-4">
                                    {featuresList.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-4 text-gray-700 bg-blue-50/50 p-4 rounded-lg border-l-4 border-[#003399]">
                                            <span className="font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Facilities */}
                        {facilitiesList.length > 0 && (
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-[#333] mb-4">Our Facilities</h2>
                                <ul className="space-y-4">
                                    {facilitiesList.map((facility, idx) => (
                                        <li key={idx} className="flex items-start gap-4 text-gray-700 bg-blue-50/50 p-4 rounded-lg border-l-4 border-[#003399]">
                                            <span>{facility}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Documents Required */}
                        {documentsList.length > 0 && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold text-[#333] mb-4">Documents Required</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {documentsList.map((doc, idx) => {
                                        const colors = [
                                            { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'text-blue-500', icon: 'fa-building' },
                                            { bg: 'bg-green-50', text: 'text-green-600', dot: 'text-green-500', icon: 'fa-users' },
                                            { bg: 'bg-purple-50', text: 'text-purple-600', dot: 'text-purple-500', icon: 'fa-university' },
                                            { bg: 'bg-orange-50', text: 'text-orange-600', dot: 'text-orange-500', icon: 'fa-users-cog' }
                                        ];
                                        const color = colors[idx % colors.length];

                                        if (typeof doc === 'string') {
                                            return (
                                                <div key={idx} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 p-8 hover:shadow-lg transition duration-300">
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <div className={`w-12 h-12 rounded-xl ${color.bg} flex items-center justify-center ${color.text} text-xl shadow-sm`}>
                                                            <i className={`fas ${color.icon}`}></i>
                                                        </div>
                                                        <h3 className="font-bold text-gray-800 text-lg">Details</h3>
                                                    </div>
                                                    <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                                        {doc}
                                                    </div>
                                                </div>
                                            );
                                        }

                                        return (
                                            <div key={idx} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 p-8 hover:shadow-lg transition duration-300">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className={`w-12 h-12 rounded-xl ${color.bg} flex items-center justify-center ${color.text} text-xl shadow-sm`}>
                                                        <i className={`fas ${doc.icon || color.icon}`}></i>
                                                    </div>
                                                    <h3 className="font-bold text-gray-800 text-lg">{doc.title}</h3>
                                                </div>
                                                <ul className="space-y-3">
                                                    {doc.items.map((item, iIdx) => (
                                                        <li key={iIdx} className="flex items-start gap-3 group">
                                                            <span className={`${color.dot} mt-1.5 text-[8px] transform group-hover:scale-125 transition-transform`}>●</span>
                                                            <span className="text-sm text-gray-600 font-medium leading-tight group-hover:text-gray-900 transition-colors">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}



                        {/* Terms & Conditions */}
                        {product.terms_content && product.terms_content.trim() !== '' && (
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-[#333] mb-4">{product.terms_heading || 'Terms & Conditions'}</h2>
                                <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                                        {product.terms_content}
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-1/3">
                        <div className="sticky top-24 space-y-8">
                            {/* CTA Card */}
                            <div className="bg-[#003399] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                                <h3 className="text-2xl font-bold mb-4 relative z-10">Start Your Journey</h3>
                                <p className="text-blue-100 mb-8 relative z-10 font-light">Open an account today and experience banking services tailored for your lifestyle.</p>
                                <button className="w-full bg-white text-[#003399] font-bold py-4 rounded-xl hover:bg-blue-50 transition shadow-lg relative z-10 uppercase tracking-widest text-sm">Apply Now</button>
                            </div>

                            {/* Explore More */}
                            {others.length > 0 && (
                                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-4">Other {product.category}</h3>
                                    <div className="space-y-4">
                                        {others.map((other, idx) => (
                                            <Link
                                                key={idx}
                                                to={`/product/${other.slug}`}
                                                className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#003399] transition hover:shadow-md group"
                                            >
                                                <span className="text-gray-700 font-semibold group-hover:text-[#003399] transition">{other.name}</span>
                                                <i className="fas fa-chevron-right text-gray-300 group-hover:text-[#003399] transition transform group-hover:translate-x-1"></i>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Help Desk */}
                            <div className="p-8 rounded-3xl border-2 border-dashed border-gray-200 text-center">
                                <div className="w-16 h-16 bg-red-100 text-[#E61111] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                                    <i className="fas fa-phone-alt"></i>
                                </div>
                                <h4 className="font-bold text-gray-800 mb-2">Need Assistance?</h4>
                                <p className="text-gray-500 text-sm mb-6">Our banking experts are here to help you choose the right product.</p>
                                <div className="text-2xl font-bold text-[#E61111]">1800 425 8873</div>
                                <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-widest">Toll Free Number</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductDetail;
