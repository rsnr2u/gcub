import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SchemaOrg, { organizationSchema, createBreadcrumbSchema } from '../components/SchemaOrg';

const About = () => {
    return (
        <div className="about-page">
            {/* SEO Meta Tags */}
            <SEO
                title="About Us - The Guntur Co-Operative Urban Bank | 75+ Years of Trust"
                description="Learn about GCUB's legacy since 1947. A premier co-operative bank in Andhra Pradesh with 22 branches, serving 50,000+ customers with trust, integrity, and modern banking solutions."
                keywords="GCUB About, Guntur Bank History, Co-operative Bank Andhra Pradesh, Banking Since 1947, Urban Bank Legacy"
                url="/about"
            />

            {/* Schema.org Structured Data */}
            <SchemaOrg schema={organizationSchema} />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'About Us', url: '/about' }
            ])} />

            {/* Hero Section with Corporate Overlay */}
            <section className="relative bg-blue-50 py-16">
                <div className="container mx-auto px-4 relative text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Our Legacy</h1>
                    <p className="text-md md:text-xl text-gray-600 font-light max-w-3xl">Empowering generations with trust, stability, and customer-centric banking since 1947.</p>
                </div>
            </section>

            {/* Stats Bar / Key Highlights */}
            <section className="bg-red-50 text-gray py-8 shadow-lg relative z-20 -mt-8 mx-4 md:mx-auto md:max-w-6xl rounded-lg">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-red-400/50">
                        <div>
                            <span className="block text-3xl md:text-4xl font-bold">75+</span>
                            <span className="text-sm uppercase tracking-wider opacity-90">Years of Service</span>
                        </div>
                        <div>
                            <span className="block text-3xl md:text-4xl font-bold">22</span>
                            <span className="text-sm uppercase tracking-wider opacity-90">Branches</span>
                        </div>
                        <div>
                            <span className="block text-3xl md:text-4xl font-bold">₹1012Cr+</span>
                            <span className="text-sm uppercase tracking-wider opacity-90">Business Volume</span>
                        </div>
                        <div>
                            <span className="block text-3xl md:text-4xl font-bold">50k+</span>
                            <span className="text-sm uppercase tracking-wider opacity-90">Customers</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content: Corporate Layout */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row gap-16">

                        {/* Left Column: Narrative (2/3) */}
                        <div className="lg:w-2/3">
                            <div className="prose prose-lg text-gray-600 max-w-none">
                                <h2 className="text-3xl font-bold text-[#003399] mb-6 border-b-2 border-yellow-400 inline-block pb-2">
                                    Welcome to The Guntur Co-operative Urban Bank Limited</h2>
                                <p className="leading-relaxed mb-6">
                                    The Guntur Co-operative Urban Bank Limited stands as a pillar of financial stability in Andhra
                                    Pradesh. Established in <strong>1947</strong>, amidst the dawn of India's independence, we have
                                    upheld a tradition of trust and integrity for over seven decades.
                                </p>
                                <p className="leading-relaxed mb-8">
                                    Our journey from a "Produce Consumers Co-operative Society" to a premier Urban Co-operative Bank
                                    is a testament to our adaptability. Today, operating under the <em>Andhra Pradesh Mutually Aided
                                        Co-operative Societies Act, 1995</em>, we blend cooperative values with modern banking
                                    efficiency.
                                </p>

                                <h3 className="text-2xl font-bold text-[#003399] mt-10 mb-4">Vision & Mission</h3>
                                <div className="bg-orange-50 p-8 rounded-xl shadow-sm border-l-4 border-[#003399] mb-8">
                                    <h4 className="font-bold text-gray-800 mb-2">Our Vision</h4>
                                    <p className="italic text-gray-600">"To be a trusted and progressive co-operative bank, delivering secure, inclusive, and sustainable banking solutions."</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <ValueCard icon="fas fa-shield-alt" title="Integrity" desc="Safe, reliable, and affordable services with absolute transparency." />
                                    <ValueCard icon="fas fa-users" title="Inclusion" desc="Supporting the banking needs of all sections of society." />
                                    <ValueCard icon="fas fa-laptop-code" title="Innovation" desc="Adopting modern technology while maintaining personalized service." />
                                    <ValueCard icon="fas fa-chart-line" title="Growth" desc="Contributing clearly to regional economic growth and development." />
                                </div>
                            </div>

                            {/* History Timeline */}
                            <div className="mt-20">
                                <h3 className="text-2xl font-bold text-[#003399] mb-8">Our Journey</h3>
                                <div className="border-l-2 border-gray-200 ml-4 space-y-12">
                                    <TimelineItem year="1947" title="Inception" desc="Established as 'Produce Consumers Co-operative Society'." color="bg-[#E61111]" />
                                    <TimelineItem year="1949" title="Urban Bank Conversion" desc="Registered under Madras Co-operative Societies Act, 1932. First branch opened at Brodipet." color="bg-blue-900" />
                                    <TimelineItem year="1998" title="Modern Governance" desc="Adopted the AP Mutually Aided Co-operative Societies Act, 1995." color="bg-blue-900" />
                                    <TimelineItem year="2018-Present" title="Expansion & Growth" desc="Expanded to 13 branches across Guntur, Krishna, and Prakasam districts. Surpassed ₹606 Crores business volume." color="bg-[#E61111]" />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Quick Stats & Contact (1/3) */}
                        <div className="lg:w-1/3 space-y-8">
                            {/* Image Card */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                                <div className="relative">
                                    <img src="/assets/images/gcub-building.png" alt="Head Office" className="w-full h-64 object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h4 className="font-bold text-lg">Head Office</h4>
                                        <p className="text-sm opacity-90">Brodipet, Guntur</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-600 text-sm mb-4 flex items-start gap-3">
                                        <i className="fas fa-map-marker-alt text-[#E61111] mt-1"></i>
                                        <span>Door No. 3/2, Brodipet,<br />Guntur – 522002</span>
                                    </p>
                                    <Link to="/contact" className="block w-full bg-[#003399] text-white text-center py-3 rounded hover:bg-blue-800 transition font-medium shadow-md hover:shadow-lg">Contact Us</Link>
                                </div>
                            </div>

                            {/* Core Values Sidebar */}
                            <div className="bg-[#002b5c] text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <i className="fas fa-hand-holding-heart text-9xl"></i>
                                </div>
                                <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-4">Core Values</h3>
                                <ul className="space-y-4 relative z-10">
                                    {['Trust & Integrity', 'Customer-Centric', 'Co-operative Spirit', 'Financial Responsibility', 'Community Commitment'].map((val) => (
                                        <li key={val} className="flex items-center gap-3">
                                            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                                            <span className="font-medium">{val}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Network Summary */}
                            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#E61111]">
                                <h3 className="text-xl font-bold text-[#003399] mb-4 flex items-center gap-2">
                                    <i className="fas fa-project-diagram"></i> Our Network
                                </h3>
                                <div className="space-y-4 divide-y divide-gray-100">
                                    <div className="pt-2">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Guntur City</span>
                                        <p className="font-bold text-gray-800 text-lg">5 Branches</p>
                                    </div>
                                    <div className="pt-4">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Guntur District</span>
                                        <p className="font-bold text-gray-800 text-lg">6 Branches</p>
                                    </div>
                                    <div className="pt-4">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Key Towns</span>
                                        <p className="font-bold text-gray-800 text-lg">Ongole & Gollapudi</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ValueCard = ({ icon, title, desc }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition hover:shadow-md">
        <h4 className="font-bold text-[#003399] mb-2"><i className={`${icon} mr-2`}></i>{title}</h4>
        <p className="text-sm">{desc}</p>
    </div>
);

const TimelineItem = ({ year, title, desc, color }) => (
    <div className="relative pl-8 group">
        <span className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${color} border-4 border-white shadow group-hover:scale-110 transition`}></span>
        <span className="text-sm text-gray-500 font-bold tracking-wide uppercase">{year}</span>
        <h4 className="text-lg font-bold text-gray-800 mt-1 group-hover:text-[#E61111] transition">{title}</h4>
        <p className="text-gray-600 mt-2">{desc}</p>
    </div>
);

export default About;
