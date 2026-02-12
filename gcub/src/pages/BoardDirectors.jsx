import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import SchemaOrg, { createBreadcrumbSchema } from '../components/SchemaOrg';

const BoardDirectors = () => {
    const [directors, setDirectors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDirectors = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/board-directors');
                const data = await response.json();

                // Sample data if API is empty
                const sampleDirectors = [
                    { name: "Sri Bonaboyina Srinivasa Rao", designation: "Chairman", bio: "Guiding GCUB with vision and integrity, ensuring co-operative values meet modern banking innovations while maintaining financial stability for all members.", status: "active" },
                    { name: "Sri Marreddy Basivi Reddy", designation: "Vice Chairman", bio: "Focusing on operational excellence, member-centric growth strategies, and maintaining the bank's legacy of trust and service.", status: "active" },
                    { name: "Sri A. Venkata Ratnam", designation: "Director", bio: "With over 30 years of experience in co-operative banking, focusing on rural development and inclusive financial growth.", status: "active" },
                    { name: "Sri Kakani Rama Rao", designation: "Director", bio: "Expert in community financial planning and institutional governance, bringing decades of wisdom to the board.", status: "active" },
                    { name: "Sri Busireddy Malleswara Reddy", designation: "Director", bio: "Passionate about transparent banking and member empowerment through accessible financial services.", status: "active" },
                    { name: "Sri Eeresam Narendra Babu", designation: "Director", bio: "Driving digital transformation within the co-operative sector to bring modern convenience to our legacy members.", status: "active" },
                    { name: "CA Sri Gabbita Sivaramakrishna Prasad Garu", designation: "Director", bio: "Providing strategic financial oversight and auditing excellence to ensure the highest standards of fiscal responsibility.", status: "active" },
                    { name: "Sri Tattukolla Kesavaiah", designation: "Director", bio: "Dedicated to community welfare and ensuring the co-operative's stability for generations to come.", status: "active" }
                ];

                setDirectors(Array.isArray(data) && data.length > 0
                    ? data.filter(d => d.status !== 'inactive')
                    : sampleDirectors);
            } catch (error) {
                console.error('Error fetching board directors:', error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchDirectors();
        window.scrollTo(0, 0);
    }, []);

    // Robust matching for Chairman and Vice Chairman
    const chairman = directors.find(d => {
        const des = d.designation.toLowerCase();
        return des.includes('chairman') && !des.includes('vice') && !des.includes('co-opted');
    });

    const viceChairman = directors.find(d => {
        const des = d.designation.toLowerCase();
        return des.includes('vice chairman') || (des.includes('vice') && des.includes('chairman'));
    });

    const otherDirectors = directors.filter(d => d !== chairman && d !== viceChairman);

    return (
        <div className="board-directors-page bg-[#fcfcfc] min-h-screen">
            <SEO
                title="Board of Directors - GCUB"
                description="Governing body of The Guntur Co-operative Urban Bank Ltd. dedicated to transparency and excellence."
            />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'About Us', url: '/about' },
                { name: 'Board of Directors', url: '/board-directors' }
            ])} />

            {/* Professional Header Section */}
            <section className="relative bg-[#001a37] text-white py-10">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="text-[#E61111] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Institutional Governance</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">Board of Directors</h1>
                        <div className="h-1.5 w-16 bg-white mx-auto mb-4"></div>
                        <p className="text-white text-lg md:text-xl leading-relaxed font-light">
                            Upholding our co-operative principles through strategic oversight
                            and a steadfast commitment to our members' financial well-being.
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
                        {/* Key Leadership - Full Width Cards */}
                        <div className="grid grid-cols-1 gap-8 mb-12">
                            {chairman && (
                                <CorporateCard
                                    member={chairman}
                                    fullWidth
                                    isChairman
                                />
                            )}
                            {viceChairman && (
                                <CorporateCard
                                    member={viceChairman}
                                    fullWidth
                                    isViceChairman
                                />
                            )}
                        </div>

                        {/* Other Directors - 2 Columns */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {otherDirectors.map((director, idx) => (
                                <CorporateCard key={director.id || idx} member={director} />
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
                            <h4 className="font-bold text-lg uppercase tracking-widest text-red-500">Governance</h4>
                            <p className="text-blue-100 text-sm font-light leading-relaxed">Ensuring transparent and ethical oversight of all bank operations.</p>
                        </div>
                        <div className="space-y-3 md:border-x border-white/10 px-8">
                            <h4 className="font-bold text-lg uppercase tracking-widest text-red-500">Stability</h4>
                            <p className="text-blue-100 text-sm font-light leading-relaxed">Maintaining the financial strength that has defined GCUB for decades.</p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-bold text-lg uppercase tracking-widest text-red-500">Service</h4>
                            <p className="text-blue-100 text-sm font-light leading-relaxed">Our board remains dedicated to the growth of our member community.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CorporateCard = ({ member, fullWidth, isChairman, isViceChairman }) => {
    const headerBg = isChairman ? 'border-t-4 border-t-[#003399]' : isViceChairman ? 'border-t-4 border-t-[#E61111]' : '';
    const nameColor = isChairman ? 'text-[#003399]' : isViceChairman ? 'text-[#E61111]' : 'text-[#003399]';

    return (
        <div className={`bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row ${fullWidth ? 'w-full' : ''} ${headerBg}`}>
            <div className={`aspect-square md:aspect-auto ${fullWidth ? 'md:w-1/4' : 'md:w-2/5'} flex-shrink-0 overflow-hidden bg-[#f8fafc] border-b md:border-b-0 md:border-r border-gray-100`}>
                <img
                    src={member.image_path ? `http://localhost:8080/${member.image_path}` : "/assets/images/management/default.png"}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => e.target.src = "/assets/images/management/default.png"}
                />
            </div>

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

                <div className="mt-8 flex items-center gap-4">
                    <div className="h-[1px] w-8 bg-gray-200"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                </div>
            </div>
        </div>
    );
};

export default BoardDirectors;
