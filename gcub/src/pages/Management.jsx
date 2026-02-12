import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import SchemaOrg, { createBreadcrumbSchema } from '../components/SchemaOrg';

const Management = () => {
    const [management, setManagement] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/board-management');
                const data = await response.json();

                const sampleManagement = [
                    { name: "Sri CEO Name", designation: "Chief Executive Officer", bio: "Leading the bank's executive operations with a focus on sustainable growth, risk management, and digital infrastructure.", status: "active" },
                    { name: "Sri Member Name", designation: "General Manager", bio: "Overseeing day-to-day administrative and banking operations to ensure seamless service delivery across all branches.", status: "active" },
                    { name: "Sri Member Name", designation: "Dy. General Manager", bio: "Supporting the management team with expertise in credit management and institutional planning.", status: "active" }
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

    // Isolate CEO
    const ceo = management.find(m => m.designation.toLowerCase().includes('chief executive officer') || m.designation.toLowerCase().includes('ceo'));
    const staff = management.filter(m => m !== ceo);

    return (
        <div className="management-page bg-[#fcfcfc] min-h-screen">
            <SEO
                title="Management Team - GCUB"
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
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">Management Team</h1>
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
                        {/* CEO Row */}
                        {ceo && (
                            <div className="mb-8">
                                <CorporateCard member={ceo} fullWidth isManagement />
                            </div>
                        )}

                        {/* Staff Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {staff.map((member, idx) => (
                                <CorporateCard key={member.id || idx} member={member} isManagement />
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
                            <h4 className="font-bold text-lg uppercase tracking-widest text-red-500">Integrity</h4>
                            <p className="text-blue-100 text-sm font-light leading-relaxed">Upholding the highest standards of transparency in co-operative banking.</p>
                        </div>
                        <div className="space-y-3 md:border-x border-white/10 px-8">
                            <h4 className="font-bold text-lg uppercase tracking-widest text-red-500">Excellence</h4>
                            <p className="text-blue-100 text-sm font-light leading-relaxed">Dedicated to delivering superior service and member satisfaction.</p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-bold text-lg uppercase tracking-widest text-red-500">Trust</h4>
                            <p className="text-blue-100 text-sm font-light leading-relaxed">Building lifelong relationships centered on mutual respect and growth.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CorporateCard = ({ member, fullWidth, isChairman, isViceChairman, isManagement }) => {
    // Styling based on role
    const headerBg = isChairman ? 'border-t-4 border-t-[#003399]' : isViceChairman ? 'border-t-4 border-t-[#E61111]' : '';
    const nameColor = isChairman ? 'text-[#003399]' : isViceChairman ? 'text-[#E61111]' : 'text-[#003399]';

    return (
        <div className={`bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row ${fullWidth ? 'w-full' : ''} ${headerBg}`}>
            {/* Image Section */}
            <div className={`aspect-square md:aspect-auto ${fullWidth ? 'md:w-1/4' : 'md:w-2/5'} flex-shrink-0 overflow-hidden bg-[#f8fafc] border-b md:border-b-0 md:border-r border-gray-100`}>
                <img
                    src={member.image_path ? `http://localhost:8080/${member.image_path}` : "/assets/images/management/default.png"}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => e.target.src = "/assets/images/management/default.png"}
                />
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-10 flex flex-col justify-center flex-grow">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#E61111] font-bold text-[10px] uppercase tracking-[0.2em]">{member.designation}</span>
                    <div className="h-px bg-gray-100 flex-grow"></div>
                </div>

                <h3 className={`${fullWidth ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold ${nameColor} mb-4 tracking-tight uppercase`}>
                    {member.name}
                </h3>

                {member.bio && (
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed font-normal">
                        {member.bio}
                    </p>
                )}

                {/* Subtle Decorative Element */}
                <div className="mt-8 flex items-center gap-4">
                    <div className="h-[1px] w-8 bg-gray-200"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                </div>
            </div>
        </div>
    );
};

export default Management;
