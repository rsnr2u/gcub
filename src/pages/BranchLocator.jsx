import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import SchemaOrg, { createBreadcrumbSchema } from '../components/SchemaOrg';

const BranchLocator = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/branches`);
                const data = await response.json();

                if (Array.isArray(data)) {
                    setBranches(data.filter(b => b.status === 'active'));
                }
            } catch (error) {
                console.error('Error fetching branches:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBranches();
        window.scrollTo(0, 0);
    }, []);

    const filteredBranches = branches.filter(branch => {
        const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (branch.region && branch.region.toLowerCase().includes(searchTerm.toLowerCase())) ||
            branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            branch.ifsc.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = selectedRegion ? branch.region === selectedRegion : true;
        return matchesSearch && matchesRegion;
    });

    const regions = [...new Set(branches.map(b => b.region).filter(Boolean))].sort();

    const groupedBranches = filteredBranches.reduce((acc, branch) => {
        const region = branch.region || 'Other Regions';
        if (!acc[region]) acc[region] = [];
        acc[region].push(branch);
        return acc;
    }, {});

    return (
        <div className="branch-locator-page bg-[#fcfcfc] min-h-screen">
            <SEO
                title="Branch Network - GCUB"
                description="Locate The Guntur Co-operative Urban Bank Ltd. branches across the region."
            />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Branch Network', url: '/branch-locator' }
            ])} />

            {/* Hero Section */}
            <section className="relative bg-[#001a37] text-white pt-20 pb-32">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <span className="text-[#E61111] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Institutional Reach</span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Branch Network</h1>
                    <div className="h-1.5 w-16 bg-white mx-auto mb-6"></div>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto opacity-90">
                        Providing reliable banking services across our strategically located branches. We are here to serve you.
                    </p>
                </div>
            </section>

            {/* Floating Search Bar */}
            <div className="relative z-20 -mt-16 mb-12">
                <div className="container mx-auto px-6">
                    <div className="bg-white p-6 rounded-xl shadow-xl max-w-5xl mx-auto border-t-4 border-[#E61111]">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="flex-1 w-full">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Find a Branch</label>
                                <div className="relative">
                                    <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"></i>
                                    <input
                                        type="text"
                                        placeholder="Search by Branch Name, Region, or Address..."
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-700 focus:outline-none focus:border-[#003399]/30 transition shadow-inner"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-64">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Filter by Region</label>
                                <div className="relative">
                                    <select 
                                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-700 focus:outline-none focus:border-[#003399]/30 transition shadow-inner appearance-none cursor-pointer"
                                        value={selectedRegion}
                                        onChange={(e) => setSelectedRegion(e.target.value)}
                                    >
                                        <option value="">All Regions</option>
                                        {regions.map(region => (
                                            <option key={region} value={region}>{region}</option>
                                        ))}
                                    </select>
                                    <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Directory Grid */}
            <section className="pb-20">
                <div className="container mx-auto px-6">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block w-8 h-8 border-2 border-[#003399] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : Object.keys(groupedBranches).length > 0 ? (
                        <div className="space-y-12">
                            {Object.entries(groupedBranches).map(([region, regionBranches]) => (
                                <div key={region} className="region-section">
                                    <h2 className="text-2xl font-bold text-[#001a37] mb-6 flex items-center gap-3 border-b border-gray-200 pb-3">
                                        <i className="fas fa-map-marker-alt text-[#E61111]"></i> 
                                        {region}
                                        <span className="text-sm font-normal text-gray-400 bg-gray-100 px-3 py-1 rounded-full ml-auto">
                                            {regionBranches.length} {regionBranches.length === 1 ? 'Branch' : 'Branches'}
                                        </span>
                                    </h2>
                                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {regionBranches.map((branch, idx) => (
                                            <div key={branch.id || idx} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full overflow-hidden">
                                                <div className={`p-6 border-b border-gray-50 flex justify-between items-start ${branch.is_head_office == 1 ? 'bg-blue-50/30' : ''}`}>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-bold text-[#003399] text-xl group-hover:text-[#E61111] transition uppercase tracking-tight">{branch.name}</h3>
                                                            {branch.is_head_office == 1 && (
                                                                <span className="bg-[#003399] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">H.O</span>
                                                            )}
                                                        </div>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                                                            <i className="fas fa-map-marked-alt text-[#E61111]"></i> {branch.region}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="p-6 flex-grow space-y-5">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#003399] flex-shrink-0 group-hover:bg-[#003399] group-hover:text-white transition-colors">
                                                            <i className="fas fa-location-dot text-sm"></i>
                                                        </div>
                                                        <p className="text-sm text-gray-600 leading-relaxed font-regular">{branch.address}</p>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-4 pt-2">
                                                        <div className="flex items-center gap-3">
                                                            <i className="fas fa-phone-volume text-[#E61111] text-xs"></i>
                                                            <span className="text-sm font-bold text-gray-700">{branch.contact}</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <i className="fas fa-envelope-open-text text-[#E61111] text-xs"></i>
                                                            <a href={`mailto:${branch.email}`} className="text-sm font-medium text-gray-600 hover:text-[#003399] transition truncate">{branch.email}</a>
                                                        </div>
                                                    </div>

                                                    <div className="bg-gray-50/50 rounded-lg p-4 grid grid-cols-2 gap-4 mt-2 border border-gray-100/50">
                                                        <div className="border-r border-gray-200 pr-2">
                                                            <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">IFSC Code</span>
                                                            <span className="block text-sm font-bold text-[#003399] font-mono">{branch.ifsc}</span>
                                                        </div>
                                                        <div className="pl-2">
                                                            <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">MICR Code</span>
                                                            <span className="block text-sm font-bold text-gray-800 font-mono">{branch.micr}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-4 bg-gray-50/30 border-t border-gray-50 mt-auto">
                                                    <a
                                                        href={branch.google_maps_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center w-full py-3 rounded-lg bg-white border border-gray-200 text-[#003399] font-bold text-sm hover:bg-[#003399] hover:text-white hover:border-[#003399] transition shadow-sm"
                                                    >
                                                        <i className="fas fa-directions mr-2"></i> Directions
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="bg-white p-10 rounded-full shadow-sm inline-block mb-6 border border-gray-50">
                                <i className="fas fa-search-location text-5xl text-gray-200"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 tracking-tight">No branches found</h3>
                            <p className="text-gray-500 mt-2 font-light">Try adjusting your search terms or filters.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Professional Footer Strip */}
            <div className="bg-[#001a37] py-16 text-white text-center">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        <div className="space-y-3">
                            <h4 className="font-bold text-lg uppercase tracking-widest text-red-500">Service Area</h4>
                            <p className="text-blue-100 text-sm font-light leading-relaxed">Strategically expanded network across key urban and rural centers.</p>
                        </div>
                        <div className="space-y-3 md:border-x border-white/10 px-8">
                            <h4 className="font-bold text-lg uppercase tracking-widest text-red-500">Accessibility</h4>
                            <p className="text-blue-100 text-sm font-light leading-relaxed">Modern banking facilities designed for the convenience of our members.</p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-bold text-lg uppercase tracking-widest text-red-500">Reliability</h4>
                            <p className="text-blue-100 text-sm font-light leading-relaxed">Consistent support and local presence you can trust since 1947.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BranchLocator;
