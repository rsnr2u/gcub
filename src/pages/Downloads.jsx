import { useState, useEffect } from 'react';

const Downloads = () => {
    const [downloads, setDownloads] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = [
        { title: 'Account Opening Forms', icon: 'fas fa-user-plus', color: 'border-[#E61111]' },
        { title: 'Loan Applications', icon: 'fas fa-hand-holding-usd', color: 'border-yellow-400' },
        { title: 'Services & Requests', icon: 'fas fa-cogs', color: 'border-gray-400' },
        { title: 'Other', icon: 'fas fa-folder-open', color: 'border-blue-400' }
    ];

    useEffect(() => {
        fetchDownloads();
    }, []);

    const fetchDownloads = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/downloads`);
            const data = await response.json();
            if (Array.isArray(data)) {
                setDownloads(data);
            }
        } catch (error) {
            console.error('Error fetching downloads:', error);
        } finally {
            setLoading(false);
        }
    };

    const groupedDownloads = downloads.reduce((acc, item) => {
        const cat = item.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
    }, {});

    return (
        <div className="downloads-page">
            {/* Hero Section */}
            <section className="relative bg-[#002b5c] text-white py-20">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Downloads</h1>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">Access and download essential bank forms, applications, and documents.</p>
                </div>
            </section>

            {/* Downloads Grid */}
            <section className="py-16 bg-gray-50 min-h-[400px]">
                <div className="container mx-auto px-4 md:px-6">
                    {loading ? (
                        <div className="text-center py-20 text-gray-500">Loading document repository...</div>
                    ) : (
                        categories.map((cat) => {
                            const items = groupedDownloads[cat.title] || [];
                            if (items.length === 0) return null;
                            return (
                                <DownloadCategory
                                    key={cat.title}
                                    title={cat.title}
                                    icon={cat.icon}
                                    borderColor={cat.color}
                                    items={items}
                                />
                            );
                        })
                    )}
                </div>
            </section>
        </div>
    );
};

const DownloadCategory = ({ title, icon, borderColor, items }) => (
    <div className="mb-16">
        <h2 className={`text-2xl font-bold text-[#003399] mb-8 border-l-4 ${borderColor} pl-4 flex items-center gap-2`}>
            <i className={`${icon} text-gray-400 text-lg`}></i> {title}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
            {items.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition border border-gray-100 flex items-start gap-4 h-full">
                    <div className="text-red-500 text-3xl flex-shrink-0"><i className="fas fa-file-pdf"></i></div>
                    <div className="flex-1 flex flex-col">
                        <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                        <p className="text-xs text-gray-500 mb-3 flex-1">{item.description}</p>
                        <a
                            href={item.file_path ? `${(import.meta.env.VITE_API_URL || `${import.meta.env.VITE_BASE_URL}`).replace(/\/$/, '')}/${item.file_path.replace(/^\//, '')}` : '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium text-[#003399] hover:underline"
                        >
                            Download <i className="fas fa-download ml-2 text-xs"></i>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default Downloads;
