import { Link } from 'react-router-dom';

const SidebarPromo = ({ data }) => {
    if (!data || data.enabled === false) return null;

    const { title, subtitle, image, description, buttonLabel, buttonLink } = data;

    const getImageUrl = (img) => {
        if (!img) return '';
        if (img.startsWith('http')) return img;
        if (img.startsWith('assets/uploads/')) return `${import.meta.env.VITE_BASE_URL}/${img}`;
        // If it's a random name (like 12345_abc.png), it's likely an upload in the backend images folder
        if (img.includes('_') && (img.endsWith('.png') || img.endsWith('.jpg') || img.endsWith('.jpeg') || img.endsWith('.webp'))) {
            return `${import.meta.env.VITE_BASE_URL}/assets/uploads/images/${img}`;
        }
        return `/assets/images/${img}`;
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 overflow-hidden group">
            {image && (
                <div className="mb-4 rounded-lg overflow-hidden h-40 bg-gray-100">
                    <img 
                        src={getImageUrl(image)} 
                        alt={title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
            )}
            {subtitle && (
                <h4 className="font-bold text-[#E61111] mb-2 uppercase text-[10px] tracking-[0.2em]">
                    {subtitle}
                </h4>
            )}
            {title && <h3 className="font-bold text-[#003399] mb-3 text-lg">{title}</h3>}
            {description && (
                <p className="text-sm text-gray-500 italic leading-relaxed mb-6">
                    "{description}"
                </p>
            )}
            {buttonLabel && (
                <Link 
                    to={buttonLink || '/branch-locator'} 
                    className="block w-full bg-[#E61111] text-white text-center py-3 rounded-lg hover:bg-red-700 transition font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg"
                >
                    {buttonLabel}
                </Link>
            )}
        </div>
    );
};

export default SidebarPromo;
