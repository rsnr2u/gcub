import { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = memo(() => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState(null);
    const [settings, setSettings] = useState({
        toll_free: '1800 425 8873'
    });
    const location = useLocation();

    // Close menus on page change
    useEffect(() => {
        setActiveMenu(null);
        setIsMobileMenuOpen(false);
    }, [location]);

    // Close menus on click outside
    useEffect(() => {
        const handleClickOutside = () => {
            setActiveMenu(null);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const toggleMenu = (e, menuName) => {
        e.stopPropagation();
        setActiveMenu(activeMenu === menuName ? null : menuName);
    };

    const [dynamicMenuItems, setDynamicMenuItems] = useState({
        deposits: [],
        loans: [],
        services: []
    });

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const productsRes = await fetch('http://localhost:8080/api/products');
                const products = await productsRes.json();

                let depositsData = [];
                let loansData = [];
                let servicesData = [];

                const staticRoutes = {
                    'mobile-banking': '/mobile-banking',
                    'atm': '/atm-services',
                    'toll-free-banking': '/toll-free-banking',
                    'e-statements': '/e-statements',
                    'positive-pay-system': '/positive-pay-system',
                    'any-branch-banking': '/any-branch-banking',
                    'apbs-service': '/apbs-service',
                    'nach': '/nach-service'
                };

                const getServicePath = (slug) => staticRoutes[slug] || '/';

                const staticServices = [
                    { name: 'Mobile Banking', path: '/mobile-banking', icon: 'fas fa-mobile-alt' },
                    { name: 'ATM Services', path: '/atm-services', icon: 'fas fa-atm' },
                    { name: 'Toll Free Banking', path: '/toll-free-banking', icon: 'fas fa-phone-alt' },
                    { name: 'E-Statements', path: '/e-statements', icon: 'fas fa-file-invoice' },
                    { name: 'Positive Pay System', path: '/positive-pay-system', icon: 'fas fa-check-double' },
                    { name: 'Any Branch Banking', path: '/any-branch-banking', icon: 'fas fa-university' },
                    { name: 'APBS Service', path: '/apbs-service', icon: 'fas fa-exchange-alt' },
                    { name: 'NACH Service', path: '/nach-service', icon: 'fas fa-sync' },
                    { name: 'IMPS', path: '/imps', icon: 'fas fa-bolt' },
                    { name: 'UPI', path: '/upi', icon: 'fas fa-qrcode' },
                    { name: 'RuPay', path: '/rupay', icon: 'fas fa-credit-card' },
                    { name: 'NEFT/RTGS', path: '/neft-rtgs', icon: 'fas fa-paper-plane' },
                    { name: 'Net Banking', path: '/net-banking', icon: 'fas fa-laptop-code' },
                ];

                if (Array.isArray(products)) {
                    depositsData = products.filter(p => p && p.category === 'Deposits' && p.status === 'active').map(p => ({
                        name: p.name,
                        path: `/product/${p.slug}`,
                        image: p.icon_type === 'img' ? `/assets/images/cards/${p.icon_value}` : '/assets/images/gcublogo.png'
                    }));

                    loansData = products.filter(p => p && p.category === 'Loans' && p.status === 'active').map(p => ({
                        name: p.name,
                        path: `/product/${p.slug}`,
                        image: p.icon_type === 'img' ? `/assets/images/cards/${p.icon_value}` : '/assets/images/gcublogo.png'
                    }));

                    // Combine dynamic services from products table with static ones
                    const dynamicServices = products
                        .filter(p => p && p.category === 'Services' && p.status === 'active')
                        .map(p => ({
                            name: p.name,
                            path: getServicePath(p.slug),
                            icon: 'fas fa-concierge-bell'
                        }));

                    servicesData = [...staticServices, ...dynamicServices];
                } else {
                    servicesData = staticServices;
                }

                setDynamicMenuItems({
                    deposits: depositsData,
                    loans: loansData,
                    services: servicesData
                });

            } catch (error) {
                console.error('Error fetching header menu data:', error);
            }
        };
        fetchMenuData();
    }, []);


    // Fetch settings for toll-free number
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/admin/settings');
                const data = await response.json();
                if (data) {
                    setSettings(prevSettings => ({
                        ...prevSettings,
                        toll_free: data.toll_free || '1800 425 8873',
                        site_logo: data.site_logo || ''
                    }));
                }
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };
        fetchSettings();
    }, []);

    const menuItems = {
        about: [
            { name: 'About Us', path: '/about' },
            { name: "Chairman's Desk", path: '/chairman-desk' },
            { name: 'Board of Directors', path: '/board-directors' },
            { name: 'Board of Management', path: '/management' },
            { name: 'Annual Reports', path: '/financial-reports' },
            { name: 'Highlights', path: '/highlights' },
            { name: 'Awards & Recognitions', path: '/awards-recognitions' },
        ],
        deposits: dynamicMenuItems.deposits,
        loans: dynamicMenuItems.loans,
        services: dynamicMenuItems.services
    };

    return (
        <>
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-100 py-2">
                <div className="container mx-auto px-4 md:px-6 flex justify-between items-center text-[11px] md:text-xs font-medium text-gray-600">
                    <div className="flex items-center gap-2">
                        <svg className="w-3 h-3 text-[#E61111]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span>Toll Free: <a href={`tel:${settings.toll_free.replace(/\s/g, '')}`} className="text-black font-bold hover:text-[#E61111] transition">{settings.toll_free}</a></span>
                    </div>
                    <div>
                        <Link to="/iso-certified" className="text-[#003399] hover:text-[#E61111] transition flex items-center gap-1">
                            <i className="fas fa-certificate"></i>
                            <span>ISO Certified</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="bg-white py-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative z-20">
                <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                    <div className="flex items-center gap-3 md:gap-4">
                        <Link to="/">
                            <img
                                src={settings.site_logo ? (settings.site_logo.startsWith('/') ? `http://localhost:8080${settings.site_logo}` : settings.site_logo) : "/assets/images/gcublogo.png"}
                                alt="GCUB Logo"
                                className="h-8 md:h-12 object-contain"
                                loading="lazy"
                            />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-[#003399] focus:outline-none"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>

                    {/* Established Badge */}
                    <div className="hidden md:flex items-center gap-2 bg-[#E61111] text-white px-6 py-2 rounded-full shadow-lg">
                        <i className="fas fa-award text-white text-2xl"></i>
                        <div className="flex flex-col leading-tight">
                            <span className="text-[10px] font-medium opacity-90">Established</span>
                            <span className="text-sm font-bold">Since 1947</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-[#004085] text-white text-[15px] sticky top-0 z-50 shadow-md">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Desktop Nav */}
                    <ul className="hidden md:flex items-center gap-6 py-2.5 font-medium tracking-wide">
                        {/* Home Direct Link */}
                        <li>
                            <Link to="/" className="hover:text-yellow-300 transition-colors duration-200">
                                Home
                            </Link>
                        </li>

                        {/* About Dropdown */}
                        <li className="relative group cursor-pointer">
                            <button
                                onClick={(e) => toggleMenu(e, 'about')}
                                className="hover:text-yellow-300 transition-colors duration-200 flex items-center gap-1 focus:outline-none"
                            >
                                About Us <span className={`text-[10px] mt-0.5 transition-transform duration-300 ${activeMenu === 'about' ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            {activeMenu === 'about' && (
                                <div className="absolute left-0 top-[35px] w-56 bg-white text-gray-800 shadow-xl border-t-[3px] border-[#E61111] transition-all duration-300 z-50 rounded-b-lg">
                                    <ul className="py-2">
                                        {menuItems.about.map((item, idx) => (
                                            <li key={idx}>
                                                <Link to={item.path} className="block px-4 py-2 hover:bg-red-50 hover:text-[#E61111] transition font-medium text-sm border-b border-gray-100 last:border-0">{item.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>

                        {/* Deposits Mega Menu */}
                        <li className="static group cursor-pointer">
                            <button
                                onClick={(e) => toggleMenu(e, 'deposits')}
                                className="hover:text-yellow-300 transition-colors duration-200 flex items-center gap-1 focus:outline-none"
                            >
                                Deposits <span className={`text-[10px] mt-0.5 transition-transform duration-300 ${activeMenu === 'deposits' ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            {activeMenu === 'deposits' && (
                                <div className="absolute left-0 top-full w-full bg-white text-gray-800 shadow-2xl border-t-[3px] border-[#E61111] transition-all duration-300 z-50">
                                    <div className="container mx-auto p-8">
                                        <div className="grid grid-cols-4 gap-6">
                                            {menuItems.deposits.map((item, idx) => (
                                                <Link key={idx} to={item.path} className="block p-3 rounded hover:bg-gray-50 hover:text-[#003399] transition font-bold text-sm border border-transparent hover:border-gray-100">
                                                    <i className="fas fa-piggy-bank mr-2 text-[#E61111]"></i> {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* Loans Mega Menu */}
                        <li className="static group cursor-pointer">
                            <button
                                onClick={(e) => toggleMenu(e, 'loans')}
                                className="hover:text-yellow-300 transition-colors duration-200 flex items-center gap-1 focus:outline-none"
                            >
                                Loans & Advances <span className={`text-[10px] mt-0.5 transition-transform duration-300 ${activeMenu === 'loans' ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            {activeMenu === 'loans' && (
                                <div className="absolute left-0 top-full w-full bg-white text-gray-800 shadow-2xl border-t-[3px] border-[#E61111] transition-all duration-300 z-50">
                                    <div className="container mx-auto p-8">
                                        <div className="grid grid-cols-4 gap-6">
                                            {menuItems.loans.map((item, idx) => (
                                                <Link key={idx} to={item.path} className="block p-3 rounded hover:bg-gray-50 hover:text-[#003399] transition font-bold text-sm border border-transparent hover:border-gray-100">
                                                    <i className="fas fa-hand-holding-usd mr-2 text-[#E61111]"></i> {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* Services Mega Menu */}
                        <li className="static group cursor-pointer">
                            <button
                                onClick={(e) => toggleMenu(e, 'services')}
                                className="hover:text-yellow-300 transition-colors duration-200 flex items-center gap-1 focus:outline-none"
                            >
                                Our Services <span className={`text-[10px] mt-0.5 transition-transform duration-300 ${activeMenu === 'services' ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            {activeMenu === 'services' && (
                                <div className="absolute left-0 top-full w-full bg-white text-gray-800 shadow-2xl border-t-[3px] border-[#E61111] transition-all duration-300 z-50">
                                    <div className="container mx-auto p-8">
                                        <div className="grid grid-cols-4 gap-6">
                                            {menuItems.services.map((item, idx) => (
                                                <Link key={idx} to={item.path} className="block p-3 rounded hover:bg-gray-50 hover:text-[#003399] transition font-bold text-sm border border-transparent hover:border-gray-100">
                                                    <i className={`${item.icon} mr-2 text-[#E61111]`}></i> {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>

                        <li><Link to="/interest-rates" className="hover:text-yellow-300 transition-colors duration-200">Interest Rates</Link></li>
                        <li><Link to="/gallery" className="hover:text-yellow-300 transition-colors duration-200">Gallery</Link></li>
                        <li><Link to="/contact" className="hover:text-yellow-300 transition-colors duration-200">Contact</Link></li>
                        <li><Link to="/downloads" className="hover:text-yellow-300 transition-colors duration-200">Downloads</Link></li>
                        <li><Link to="/branch-locator" className="hover:text-yellow-300 transition-colors duration-200">Branch Locator</Link></li>
                    </ul>

                    {/* Mobile Nav Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden py-6 border-t border-blue-800 bg-[#003366] px-4 animate-fadeIn">
                            <ul className="flex flex-col gap-4 font-medium">
                                <li>
                                    <Link to="/" className="block py-2 text-white hover:text-yellow-300 text-lg border-b border-blue-700/50">Home</Link>
                                </li>

                                {/* About Mobile */}
                                <li className="border-b border-blue-700/50">
                                    <button
                                        onClick={() => setMobileExpanded(mobileExpanded === 'about' ? null : 'about')}
                                        className="w-full flex justify-between items-center py-2 text-white hover:text-yellow-300 text-lg focus:outline-none"
                                    >
                                        About Us <i className={`fas fa-chevron-down text-xs transition-transform ${mobileExpanded === 'about' ? 'rotate-180' : ''}`}></i>
                                    </button>
                                    {mobileExpanded === 'about' && (
                                        <ul className="pl-4 py-2 flex flex-col gap-2">
                                            {menuItems.about.map((item, idx) => (
                                                <li key={idx}><Link to={item.path} className="block py-1 text-blue-100 hover:text-white text-sm">{item.name}</Link></li>
                                            ))}
                                        </ul>
                                    )}
                                </li>

                                {/* Deposits Mobile */}
                                <li className="border-b border-blue-700/50">
                                    <button
                                        onClick={() => setMobileExpanded(mobileExpanded === 'deposits' ? null : 'deposits')}
                                        className="w-full flex justify-between items-center py-2 text-white hover:text-yellow-300 text-lg focus:outline-none"
                                    >
                                        Deposits <i className={`fas fa-chevron-down text-xs transition-transform ${mobileExpanded === 'deposits' ? 'rotate-180' : ''}`}></i>
                                    </button>
                                    {mobileExpanded === 'deposits' && (
                                        <ul className="pl-4 py-2 flex flex-col gap-2">
                                            {menuItems.deposits.map((item, idx) => (
                                                <li key={idx}><Link to={item.path} className="block py-1 text-blue-100 hover:text-white text-sm">{item.name}</Link></li>
                                            ))}
                                        </ul>
                                    )}
                                </li>

                                {/* Loans Mobile */}
                                <li className="border-b border-blue-700/50">
                                    <button
                                        onClick={() => setMobileExpanded(mobileExpanded === 'loans' ? null : 'loans')}
                                        className="w-full flex justify-between items-center py-2 text-white hover:text-yellow-300 text-lg focus:outline-none"
                                    >
                                        Loans & Advances <i className={`fas fa-chevron-down text-xs transition-transform ${mobileExpanded === 'loans' ? 'rotate-180' : ''}`}></i>
                                    </button>
                                    {mobileExpanded === 'loans' && (
                                        <ul className="pl-4 py-2 flex flex-col gap-2">
                                            {menuItems.loans.map((item, idx) => (
                                                <li key={idx}><Link to={item.path} className="block py-1 text-blue-100 hover:text-white text-sm">{item.name}</Link></li>
                                            ))}
                                        </ul>
                                    )}
                                </li>

                                {/* Services Mobile */}
                                <li className="border-b border-blue-700/50">
                                    <button
                                        onClick={() => setMobileExpanded(mobileExpanded === 'services' ? null : 'services')}
                                        className="w-full flex justify-between items-center py-2 text-white hover:text-yellow-300 text-lg focus:outline-none"
                                    >
                                        Our Services <i className={`fas fa-chevron-down text-xs transition-transform ${mobileExpanded === 'services' ? 'rotate-180' : ''}`}></i>
                                    </button>
                                    {mobileExpanded === 'services' && (
                                        <ul className="pl-4 py-2 flex flex-col gap-2">
                                            {menuItems.services.map((item, idx) => (
                                                <li key={idx}><Link to={item.path} className="block py-1 text-blue-100 hover:text-white text-sm">{item.name}</Link></li>
                                            ))}
                                        </ul>
                                    )}
                                </li>

                                <li><Link to="/interest-rates" className="block py-1 text-white hover:text-yellow-300 text-lg border-b border-blue-700/50">Interest Rates</Link></li>
                                <li><Link to="/gallery" className="block py-1 text-white hover:text-yellow-300 text-lg border-b border-blue-700/50">Gallery</Link></li>
                                <li><Link to="/downloads" className="block py-1 text-white hover:text-yellow-300 text-lg border-b border-blue-700/50">Downloads</Link></li>
                                <li><Link to="/contact" className="block py-1 text-white hover:text-yellow-300 text-lg border-b border-blue-700/50">Contact Us</Link></li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
});


export default Header;
