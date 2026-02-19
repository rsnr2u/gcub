import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authFetch } from '../../utils/api';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [adminName, setAdminName] = useState('Admin');
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [newSubmissionsCount, setNewSubmissionsCount] = useState(0);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
        const authToken = localStorage.getItem('authToken');
        const loginTime = localStorage.getItem('adminLoginTime');
        const SESSION_DURATION = 24 * 60 * 60 * 1000;

        if (isLoggedIn === 'true' && authToken && loginTime) {
            const currentTime = Date.now();
            if (currentTime - parseInt(loginTime) > SESSION_DURATION) {
                handleLogout();
            } else {
                setAdminName(localStorage.getItem('adminName') || 'Admin');
            }
        } else {
            navigate('/admin/login');
        }
    }, [navigate]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showUserDropdown && !event.target.closest('.user-dropdown-container')) {
                setShowUserDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showUserDropdown]);

    // Fetch new contact submissions count
    useEffect(() => {
        const fetchNewSubmissionsCount = async () => {
            try {
                const res = await authFetch('contact-submissions?status=new');
                const data = await res.json();
                setNewSubmissionsCount(data.counts?.new || 0);
            } catch (err) {
                console.error('Error fetching new submissions count:', err);
            }
        };

        fetchNewSubmissionsCount();
        const interval = setInterval(fetchNewSubmissionsCount, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = async () => {
        try {
            await authFetch('logout', { method: 'POST' });
        } catch (err) {
            console.error('Logout error:', err);
        }

        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('adminName');
        localStorage.removeItem('adminEmail');
        localStorage.removeItem('authToken');
        localStorage.removeItem('adminLoginTime');
        localStorage.removeItem('adminId');

        navigate('/admin/login');
        setShowUserDropdown(false);
    };

    const [expandedMenu, setExpandedMenu] = useState({});

    const toggleMenu = (name) => {
        setExpandedMenu(prev => (prev[name] ? {} : { [name]: true }));
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: 'fas fa-tachometer-alt' },
        { name: 'Banking Products', path: '/admin/products', icon: 'fas fa-layer-group' },

        {
            name: 'Content Management',
            icon: 'fas fa-edit',
            children: [
                { name: 'Home Page', path: '/admin/content/home-page', icon: 'fas fa-home' },
                { name: 'Sliders', path: '/admin/content/sliders', icon: 'fas fa-images' },
                { name: 'Holidays', path: '/admin/content/holidays', icon: 'fas fa-calendar-alt' },
                { name: 'KYC Norms', path: '/admin/content/kyc-norms', icon: 'fas fa-id-card' },
                { name: 'Missed Call Banking', path: '/admin/content/missed-call-banking', icon: 'fas fa-phone' },
                { name: 'Quick Access', path: '/admin/content/quick-access', icon: 'fas fa-th' },
                { name: 'Home Statistics', path: '/admin/content/statistics', icon: 'fas fa-chart-line' },
            ]
        },
        {
            name: 'Bank Management',
            icon: 'fas fa-university',
            children: [
                { name: 'About Us', path: '/admin/bank-info?tab=about-us', icon: 'fas fa-info-circle' },
                { name: 'Chairman\'s Desk', path: '/admin/chairman', icon: 'fas fa-user-tie' },
                { name: 'Board of Directors', path: '/admin/board-directors', icon: 'fas fa-users' },
                { name: 'Board of Management', path: '/admin/board-management', icon: 'fas fa-users-cog' },
                { name: 'Annual Reports', path: '/admin/annual-reports', icon: 'fas fa-file-alt' },
                { name: 'Highlights', path: '/admin/highlights', icon: 'fas fa-star' },
                { name: 'Awards & Recognitions', path: '/admin/awards', icon: 'fas fa-trophy' },
            ]
        },
        {
            name: 'Disclosures',
            icon: 'fas fa-file-contract',
            children: [
                { name: 'DICGC Certificate', path: '/admin/bank-info?tab=dicgc', icon: 'fas fa-certificate' },
                { name: 'DEAF Accounts', path: '/admin/disclosures/deaf-accounts', icon: 'fas fa-users-slash' },
                { name: 'Ombudsman', path: '/admin/disclosures/ombudsman', icon: 'fas fa-gavel' },
            ]
        },
        { name: 'Contact Submissions', path: '/admin/contact-submissions', icon: 'fas fa-envelope' },
        {
            name: 'Users',
            icon: 'fas fa-users-cog',
            children: [
                { name: 'User List', path: '/admin/users', icon: 'fas fa-users' },
                { name: 'Roles & Permissions', path: '/admin/roles', icon: 'fas fa-user-shield' },
            ]
        },
        { name: 'Branch Network', path: '/admin/branches', icon: 'fas fa-map-marker-alt' },
        { name: 'Interest Rates', path: '/admin/interest-rates', icon: 'fas fa-percentage' },
        { name: 'Downloads', path: '/admin/downloads', icon: 'fas fa-download' },
        {
            name: 'Settings',
            icon: 'fas fa-cogs',
            children: [
                { name: 'Global Settings', path: '/admin/settings/global', icon: 'fas fa-globe' },
                { name: 'SEO Settings', path: '/admin/settings/seo', icon: 'fas fa-search' },
                { name: 'Social Media URLs', path: '/admin/settings/social', icon: 'fas fa-share-alt' },
                { name: 'Branding & Visual Identity', path: '/admin/settings/branding', icon: 'fas fa-fingerprint' },
                { name: 'Popup Announcement', path: '/admin/settings/popup', icon: 'fas fa-bullhorn' },
            ]
        },
    ];

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    return (
        <div className="flex h-screen bg-gray-100 font-inter overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0b1320] text-gray-300 flex flex-col flex-shrink-0 transition-all duration-300">
                <div className="h-16 flex items-center justify-center border-b border-gray-800 bg-[#003399]">
                    <span className="text-white font-bold text-lg tracking-wider">GCUB ADMIN</span>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1">
                        {navItems.map((item, idx) => (
                            <li key={idx}>
                                {item.children ? (
                                    <>
                                        <button
                                            onClick={() => toggleMenu(item.name)}
                                            className={`w-full flex items-center justify-between px-6 py-2 text-sm hover:bg-gray-800 hover:text-white transition group ${expandedMenu[item.name] ? 'bg-gray-800 text-white' : ''}`}
                                        >
                                            <div className="flex items-center">
                                                <span className="w-6"><i className={item.icon}></i></span>
                                                <span className="font-medium">{item.name}</span>
                                            </div>
                                            <i className={`fas fa-chevron-right text-xs transition-transform duration-200 ${expandedMenu[item.name] ? 'rotate-90' : ''}`}></i>
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ${expandedMenu[item.name] ? 'max-h-96' : 'max-h-0'}`}>
                                            <ul className="bg-[#080e18] py-1">
                                                {item.children.map((child, cIdx) => (
                                                    <li key={cIdx}>
                                                        <Link to={child.path}
                                                            className={`flex items-center pl-12 pr-6 py-2 text-xs hover:text-white transition group ${location.pathname === child.path ? 'text-white font-bold' : 'text-gray-400'}`}>
                                                            <span className="w-6"><i className={child.icon}></i></span>
                                                            <span>{child.name}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                ) : item.path === '#' ? (
                                    <div className="flex items-center px-6 py-2 text-sm hover:bg-gray-800 hover:text-white transition group cursor-not-allowed opacity-60">
                                        <span className="w-6"><i className={item.icon}></i></span>
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                ) : (
                                    <Link to={item.path}
                                        className={`flex items-center px-6 py-2 text-sm hover:bg-gray-800 hover:text-white transition group ${location.pathname === item.path ? 'bg-gray-800 text-white border-l-4 border-[#E61111]' : ''}`}>
                                        <span className="w-6"><i className={item.icon}></i></span>
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                        <li>
                            <Link to="/admin/profile"
                                className={`flex items-center px-6 py-2 text-sm hover:bg-gray-800 hover:text-white transition group ${location.pathname === '/admin/profile' ? 'bg-gray-800 text-white border-l-4 border-[#E61111]' : ''}`}>
                                <span className="w-6"><i className="fas fa-user-circle"></i></span>
                                <span className="font-medium">My Profile</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button onClick={handleLogout} className="flex items-center gap-3 text-sm hover:text-white transition text-red-400 w-full text-left">
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-10">
                    <div className="flex items-center gap-6">
                        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/admin/contact-submissions"
                            className="text-gray-500 hover:text-[#003399] transition relative"
                            title="Contact Form Submissions"
                        >
                            <i className="fas fa-bell text-lg"></i>
                            {newSubmissionsCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full min-w-[18px] text-center">
                                    {newSubmissionsCount > 99 ? '99+' : newSubmissionsCount}
                                </span>
                            )}
                        </Link>

                        <div className="relative user-dropdown-container">
                            <button
                                onClick={() => setShowUserDropdown(!showUserDropdown)}
                                className="flex items-center gap-3 border-l pl-4 ml-2 focus:outline-none hover:opacity-80 transition"
                            >
                                <div className="text-right hidden md:block">
                                    <p className="text-sm font-bold text-gray-800">{adminName}</p>
                                    <p className="text-xs text-green-600">Super Administrator</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#003399] text-white flex items-center justify-center font-bold shadow-md ring-2 ring-transparent hover:ring-blue-100 transition">
                                    {getInitials(adminName)}
                                </div>
                            </button>

                            {/* Dropdown Menu - Fixed at top of header */}
                            {showUserDropdown && (
                                <div className="fixed right-6 top-16 w-56 bg-white rounded-lg shadow-2xl border border-gray-100 z-50 overflow-hidden animate-fadeIn">
                                    <div className="py-2">
                                        <Link
                                            to="/admin/profile"
                                            onClick={() => setShowUserDropdown(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003399] transition"
                                        >
                                            <i className="fas fa-user-circle w-5"></i>
                                            <span>My Profile</span>
                                        </Link>
                                        <Link
                                            to="/admin/settings"
                                            onClick={() => setShowUserDropdown(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003399] transition"
                                        >
                                            <i className="fas fa-cogs w-5"></i>
                                            <span>Settings</span>
                                        </Link>
                                        <div className="border-t border-gray-100 my-1"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition font-medium"
                                        >
                                            <i className="fas fa-sign-out-alt w-5"></i>
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
