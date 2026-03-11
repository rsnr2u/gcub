import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import SchemaOrg, { createBreadcrumbSchema } from '../components/SchemaOrg';

const Management = () => {
    const [management, setManagement] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const apiBaseUrl = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_BASE_URL}`;
            try {
                const response = await fetch(`${apiBaseUrl}/api/board-management`);
                const data = await response.json();

                const sampleManagement = [
                    { name: "Sri CEO Name", designation: "Chief Executive Officer", bio: "Leading the bank's executive operations.", status: "active" },
                    { name: "Sri Member Name", designation: "General Manager", bio: "Overseeing day-to-day administrative and banking operations.", status: "active" },
                    { name: "Sri Member Name", designation: "Dy. General Manager", bio: "Supporting the management team with expertise in credit management.", status: "active" }
                ];

                setManagement(Array.isArray(data) && data.length > 0
                    ? data.filter(m => m.status !== 'inactive')
                    : sampleManagement);
            } catch (error) {
                console.error('Error fetching management data:', error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, []);

    // Sorting is handled by the API (display_order), but we ensure active status
    const members = management.filter(m => m.status !== 'inactive');

    return (
        <div className="management-page bg-[#fcfcfc] min-h-screen">
            <SEO
                title="Board of Management Team"
                description="The Guntur Co-operative Urban Bank Ltd. Executive Management Team."
            />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'About Us', url: '/about' },
                { name: 'Management Team', url: '/management' }
            ])} />

            {/* Professional Header Section */}
            <section className="relative bg-[#001a37] text-white py-10">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="text-[#E61111] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Executive Excellence</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">Board of Management</h1>
                        <div className="h-1.5 w-16 bg-white mx-auto mb-4"></div>
                        <p className="text-white text-lg md:text-xl leading-relaxed font-light">
                            Our executive leadership is committed to operational excellence,
                            innovation, and upholding the highest standards of co-operative banking.
                        </p>
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-6 py-10">
                {loading ? (
                    <div className="text-center py-10">
                        <div className="inline-block w-8 h-8 border-2 border-[#003399] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto">
                        {/* Management Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {members.map((member, idx) => (
                                <CorporateCard
                                    key={member.id || idx}
                                    member={member}
                                    isCEO={member.designation.toLowerCase().includes('ceo') || member.designation.toLowerCase().includes('chief executive officer')}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Professional Footer Strip */}
            <div className="bg-[#001a37] py-16 text-white text-center">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        <div className="space-y-3">
                            <h4 className="font-bold text-lg uppercase tracking-widest text-[#E61111]">Integrity</h4>
                            <p className="text-blue-100 text-sm font-light leading-relaxed">Upholding the highest standards of transparency in co-operative banking.</p>
                        </div>
                        <div className="space-y-3 md:border-x border-white/10 px-8">
                            <h4 className="font-bold text-lg uppercase tracking-widest text-[#E61111]">Excellence</h4>
                            <p className="text-blue-100 text-sm font-light leading-relaxed">Dedicated to delivering superior service and member satisfaction.</p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-bold text-lg uppercase tracking-widest text-[#E61111]">Trust</h4>
                            <p className="text-blue-100 text-sm font-light leading-relaxed">Building lifelong relationships centered on mutual respect and growth.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CorporateCard = ({ member, isCEO }) => {
    const borderColor = isCEO ? 'border-[#003399]' : 'border-gray-200';
    const nameColor = isCEO ? 'text-[#003399]' : 'text-gray-800';
    const apiBaseUrl = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_BASE_URL}`;

    return (
        <div className={`bg-white border ${borderColor} rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group`}>
            {/* Image Section - Fixed Aspect Ratio */}
            <div className="aspect-[4/5] overflow-hidden bg-gray-50 relative">
                <img
                    src={member.image_path ? `${apiBaseUrl}/${member.image_path}` : "/assets/images/management/default.png"}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => e.target.src = "/assets/images/management/default.png"}
                />

                {/* Designation Overlay/Badge */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
                    <span className="text-white font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-90 drop-shadow-md">
                        {member.designation}
                    </span>
                </div>
            </div>

            {/* Content Section - Minimal */}
            <div className="p-5 text-center">
                <div className="h-0.5 w-8 bg-gray-100 mx-auto mb-4"></div>
                <h3 className={`text-base md:text-lg font-bold ${nameColor} tracking-tight leading-snug mb-1`}>
                    {member.name}
                </h3>
                {member.tagline && (
                    <p className="text-[11px] md:text-xs text-gray-500 font-medium italic leading-tight">
                        "{member.tagline}"
                    </p>
                )}
            </div>
        </div>
    );
};

export default Management;
