import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SchemaOrg, { organizationSchema, createBreadcrumbSchema } from '../components/SchemaOrg';

const SitemapPage = () => {
    const sitemapSections = [
        {
            title: 'About Us',
            icon: 'fas fa-info-circle',
            links: [
                { name: 'About GCUB', path: '/about' },
                { name: 'Management', path: '/management' },
                { name: 'Financial Reports', path: '/financial-reports' }
            ]
        },
        {
            title: 'Deposits',
            icon: 'fas fa-piggy-bank',
            links: [
                { name: 'Savings Account', path: '/savings-account' },
                { name: 'Current Account', path: '/current-account' },
                { name: 'Fixed Deposits', path: '/fixed-deposits' },
                { name: 'Recurring Deposits', path: '/recurring-deposits' }
            ]
        },
        {
            title: 'Loans',
            icon: 'fas fa-hand-holding-usd',
            links: [
                { name: 'Gold Loans', path: '/gold-loans' },
                { name: 'Housing Loans', path: '/housing-loans' },
                { name: 'Education Loans', path: '/education-loans' },
                { name: 'Term Loans', path: '/term-loans' },
                { name: 'Overdraft Facility', path: '/overdraft' },
                { name: 'Project Finance', path: '/project-finance' }
            ]
        },
        {
            title: 'Services',
            icon: 'fas fa-concierge-bell',
            links: [
                { name: 'Net Banking', path: '/net-banking' },
                { name: 'Missed Call Banking', path: '/missed-call-banking' },
                { name: 'IMPS', path: '/imps' },
                { name: 'UPI', path: '/upi' },
                { name: 'RuPay Debit Cards', path: '/rupay' },
                { name: 'NEFT/RTGS', path: '/neft-rtgs' },
                { name: 'Debit Cards', path: '/debit-cards' },
                { name: 'Safe Lockers', path: '/safe-lockers' },
                { name: 'Any Branch Banking', path: '/any-branch-banking' }
            ]
        },
        {
            title: 'Customer Resources',
            icon: 'fas fa-users',
            links: [
                { name: 'Branch Locator', path: '/branch-locator' },
                { name: 'Interest Rates', path: '/interest-rates' },
                { name: 'Downloads', path: '/downloads' },
                { name: 'EMI Calculator', path: '/emi-calculator' },
                { name: 'Holiday List', path: '/holiday-list' },
                { name: 'KYC Norms', path: '/kyc-norms' },
                { name: 'Service Charges', path: '/customer-service-charges' },
                { name: 'Cyber Security', path: '/cyber-security' },
                { name: 'DEAF Accounts', path: '/deaf-accounts' }
            ]
        },
        {
            title: 'Legal & Policies',
            icon: 'fas fa-gavel',
            links: [
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms of Service', path: '/terms-of-service' }
            ]
        },
        {
            title: 'Contact',
            icon: 'fas fa-phone-alt',
            links: [
                { name: 'Contact Us', path: '/contact' }
            ]
        }
    ];

    return (
        <div className="sitemap-page">
            {/* SEO Meta Tags */}
            <SEO
                title="Sitemap - GCUB | Website Navigation"
                description="Browse GCUB's complete sitemap to easily navigate all our banking services, products, resources, and information pages."
                keywords="GCUB Sitemap, Website Map, Site Navigation, Banking Services Directory"
                url="/sitemap"
            />

            {/* Schema.org Structured Data */}
            <SchemaOrg schema={organizationSchema} />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Sitemap', url: '/sitemap' }
            ])} />

            {/* Hero Section */}
            <section className="relative bg-[#002b5c] text-white py-16">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Sitemap</h1>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">
                        Navigate through all our services and resources
                    </p>
                </div>
            </section>

            {/* Sitemap Content */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Quick Links to Home */}
                    <div className="mb-12 text-center">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 bg-[#003399] text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition shadow-lg"
                        >
                            <i className="fas fa-home"></i>
                            Back to Home
                        </Link>
                    </div>

                    {/* Sitemap Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sitemapSections.map((section, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#003399]">
                                        <i className={`${section.icon} text-xl`}></i>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
                                </div>
                                <ul className="space-y-3">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <Link
                                                to={link.path}
                                                className="flex items-center gap-2 text-gray-700 hover:text-[#003399] transition group"
                                            >
                                                <i className="fas fa-chevron-right text-xs text-gray-400 group-hover:text-[#003399] transition"></i>
                                                <span className="font-medium">{link.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-12 bg-blue-50 border-l-4 border-[#003399] p-6 rounded-r-lg">
                        <div className="flex items-start gap-4">
                            <i className="fas fa-info-circle text-[#003399] text-2xl mt-1"></i>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Need Help?</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Can't find what you're looking for? Our customer service team is here to help you navigate our services.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center gap-2 bg-[#003399] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-800 transition"
                                    >
                                        <i className="fas fa-envelope"></i>
                                        Contact Us
                                    </Link>
                                    <a
                                        href="tel:18004258873"
                                        className="inline-flex items-center gap-2 bg-white text-[#003399] border-2 border-[#003399] px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-50 transition"
                                    >
                                        <i className="fas fa-phone-alt"></i>
                                        1800 425 8873
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SitemapPage;
