import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import SchemaOrg, { createBreadcrumbSchema } from '../components/SchemaOrg';
import { apiFetch, BASE_URL } from '../utils/api';


const ChairmanDesk = () => {
    const [chairman, setChairman] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChairman = async () => {
            try {
                const response = await apiFetch('/chairman');
                const data = await response.json();

                if (Array.isArray(data) && data.length > 0) {
                    // Take the first active chairman
                    const activeChairman = data.find(c => c.status === 'active') || data[0];
                    setChairman(activeChairman);
                }
            } catch (error) {
                console.error('Error fetching chairman data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChairman();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="chairman-desk-page bg-[#fcfcfc] min-h-screen">
            <SEO
                title="Chairman's Desk - GCUB"
                description="A message from the Chairman of The Guntur Co-operative Urban Bank Ltd."
            />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'About Us', url: '/about' },
                { name: "Chairman's Desk", url: '/chairman-desk' }
            ])} />

            {/* Professional Header Section */}
            <section className="relative bg-[#001a37] text-white py-14">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="text-[#E61111] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Leadership Message</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">Chairman's Desk</h1>
                        <div className="h-1.5 w-16 bg-white mx-auto mb-4"></div>
                        <p className="text-white text-lg md:text-xl leading-relaxed font-light opacity-90">
                            A message from the leadership guiding our institution toward sustainable growth and community prosperity.
                        </p>
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-6 py-16">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block w-8 h-8 border-2 border-[#003399] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : chairman ? (
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-12 items-start">
                            {/* Profile Part */}
                            <div className="w-full lg:w-1/3 sticky top-24">
                                <div className="bg-white border border-gray-100 shadow-sm overflow-hidden p-2 rounded-lg">
                                    <div className="aspect-[4/5] overflow-hidden bg-gray-50 mb-6">
                                        <img
                                            src={chairman.image_path ? `${BASE_URL}/${chairman.image_path}` : "assets/images/management/default.png"}
                                            alt={chairman.name}
                                            className="w-full h-full object-cover object-top"
                                            onError={(e) => e.target.src = "assets/images/management/default.png"}
                                        />
                                    </div>
                                    <div className="text-center pb-6">
                                        <h3 className="text-2xl font-bold text-[#003399] uppercase tracking-tight mb-2">{chairman.name}</h3>
                                        <p className="text-[#E61111] font-bold text-xs uppercase tracking-widest mb-4">{chairman.designation}</p>

                                        {chairman.education && (
                                            <p className="text-gray-500 text-sm font-medium border-t border-gray-50 pt-4 mt-4 px-4">
                                                <i className="fas fa-graduation-cap mr-2"></i> {chairman.education}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Message Part */}
                            <div className="w-full lg:w-2/3">
                                <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm rounded-lg relative">
                                    <i className="fas fa-quote-left text-4xl text-[#003399]/10 absolute top-8 left-8"></i>
                                    <div
                                        className="prose prose-blue max-w-none text-gray-700 leading-relaxed text-lg font-light italic"
                                        dangerouslySetInnerHTML={{ __html: chairman.message }}
                                    >
                                    </div>

                                    <div className="mt-12 flex items-center gap-6 border-t border-gray-50 pt-8">
                                        <div className="w-12 h-[1px] bg-[#E61111]"></div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Signed</p>
                                            <h4 className="font-bold text-[#003399] text-xl">{chairman.name}</h4>
                                        </div>
                                    </div>
                                </div>

                                {/* Growth Metrics if available */}
                                {chairman.achievement_growth && (
                                    <div className="mt-8 bg-[#001a37] text-white p-8 rounded-lg flex flex-col md:flex-row justify-between items-center gap-6">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-[#E61111] mb-1">Growth Indicator</p>
                                            <h5 className="text-xl font-bold">{chairman.achievement_growth}</h5>
                                        </div>
                                        {chairman.achievement_branches > 0 && (
                                            <div className="text-center md:text-right">
                                                <p className="text-xs font-bold uppercase tracking-widest text-[#E61111] mb-1">Institutional Reach</p>
                                                <h5 className="text-xl font-bold">{chairman.achievement_branches} Branches</h5>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest">
                        No Chairman profile found
                    </div>
                )}
            </main>

            {/* Professional Footer Strip */}
            <div className="bg-[#001a37] py-16 text-white text-center">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        <div className="space-y-3">
                            <h4 className="font-bold text-lg uppercase tracking-widest text-red-500">Legacy</h4>
                            <p className="text-blue-100 text-sm font-light leading-relaxed">Pioneering co-operative banking excellence since 1947.</p>
                        </div>
                        <div className="space-y-3 md:border-x border-white/10 px-8">
                            <h4 className="font-bold text-lg uppercase tracking-widest text-red-500">Vision</h4>
                            <p className="text-blue-100 text-sm font-light leading-relaxed">Empowering members through innovative and secure financial solutions.</p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-bold text-lg uppercase tracking-widest text-red-500">Commitment</h4>
                            <p className="text-blue-100 text-sm font-light leading-relaxed">Dedicated to the prosperity of every member we serve.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChairmanDesk;
