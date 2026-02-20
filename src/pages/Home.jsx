import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import SEO from '../components/SEO';
import SchemaOrg, { organizationSchema, websiteSchema, createBreadcrumbSchema } from '../components/SchemaOrg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([
        {
            image: '/assets/images/slides/slide_digital_banking_v2.png',
            tag: 'Digital Banking',
            title: 'Banking at your Fingertips.',
            desc: 'Experience seamless transactions with our secure and user-friendly Net Banking platform.',
            link: '/net-banking'
        }
    ]);
    const [loadingSliders, setLoadingSliders] = useState(true);

    const [quickAccess, setQuickAccess] = useState([]);
    const [dynamicProducts, setDynamicProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [stats, setStats] = useState({
        stats_title: 'Trusted by Millions',
        stats_subtitle: 'Processing transactions securely and efficiently.',
        stats_item1_icon: 'fa-mobile-alt',
        stats_item1_value: '80M+',
        stats_item1_label: 'UPI Txns',
        stats_item2_icon: 'fa-credit-card',
        stats_item2_value: '2M+',
        stats_item2_label: 'ATM Txns',
        stats_item3_icon: 'fa-satellite-dish',
        stats_item3_value: '1.3M+',
        stats_item3_label: 'Mobile Banking',
        stats_item4_icon: 'fa-fingerprint',
        stats_item4_value: '500k+',
        stats_item4_label: 'AEPS Txns'
    });

    const [homeContent, setHomeContent] = useState({
        section_title: 'Our Legacy',
        main_heading: 'Welcome to The Guntur Co-operative Urban Bank Ltd.',
        description: 'We are a premier co-operative bank in Andhra Pradesh, synonymous with trust and service excellence since 1947. From humble beginnings as a consumers co-operative society to a modern urban bank, our journey is defined by our commitment to our customers.',
        cta_button_text: 'Read Our Story',
        cta_button_link: '/about'
    });
    const [legacyStats, setLegacyStats] = useState([]);
    const [latestNews, setLatestNews] = useState([]);

    useEffect(() => {
        const fetchSliders = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/sliders');
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    const activeSliders = data
                        .filter(item => item.is_active == 1)
                        .map(item => ({
                            image: `http://localhost:8080/${item.image_path}`,
                            tag: item.category,
                            title: item.title,
                            desc: item.description,
                            link: item.button_link || '/',
                            buttonText: item.button_name || 'Get Started'
                        }));
                    if (activeSliders.length > 0) {
                        setSlides(activeSliders);
                    }
                }
            } catch (error) {
                console.error('Error fetching sliders:', error);
            } finally {
                setLoadingSliders(false);
            }
        };

        const fetchQuickAccess = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/quick-access');
                const data = await response.json();
                const staticRoutes = {
                    'mobile-banking': '/mobile-banking',
                    'atm': '/atm-services',
                    'toll-free-banking': '/toll-free-banking',
                    'e-statements': '/e-statements',
                    'positive-pay-system': '/positive-pay-system',
                    'any-branch-banking': '/any-branch-banking',
                    'apbs-service': '/apbs-service',
                    'nach': '/nach-service',
                    'imps': '/imps',
                    'upi': '/upi',
                    'rupay': '/rupay',
                    'neft-rtgs': '/neft-rtgs',
                    'net-banking': '/net-banking'
                };

                const resolvePath = (link) => {
                    if (!link) return '/';
                    // If link is a slug or starts with /product/ or /banking-service/
                    const slug = link.replace(/^\/(product|banking-service)\//, '').replace(/^\//, '');
                    return staticRoutes[slug] || (link.startsWith('/') ? link : `/${link}`);
                };

                setQuickAccess(Array.isArray(data) ? data.map(item => ({
                    name: item.title,
                    icon: item.icon,
                    path: resolvePath(item.link)
                })) : []);
            } catch (error) {
                console.error('Error fetching quick access items:', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/products');
                const products = await response.json();

                if (Array.isArray(products)) {
                    setDynamicProducts(products.filter(p => p && p.status === 'active'));
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoadingProducts(false);
            }
        };

        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/admin/settings');
                const data = await response.json();
                if (data && data.stats_title) {
                    setStats(prev => ({ ...prev, ...data }));
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        const fetchHomeContent = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/homepage-content');
                const data = await response.json();
                if (data && data.section_title) {
                    setHomeContent(data);
                }
            } catch (error) {
                console.error('Error fetching home content:', error);
            }
        };

        const fetchLegacyStats = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/homepage-stats');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setLegacyStats(data);
                }
            } catch (error) {
                console.error('Error fetching legacy stats:', error);
            }
        };

        const fetchLatestNews = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/news/latest');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setLatestNews(data);
                }
            } catch (error) {
                console.error('Error fetching latest news:', error);
            }
        };

        fetchSliders();
        fetchQuickAccess();
        fetchProducts();
        fetchStats();
        fetchHomeContent();
        fetchLegacyStats();
        fetchLatestNews();
    }, []);

    const getProductImage = (p) => {
        if (p.icon_type === 'img') {
            return `/assets/images/icons/${p.icon_value}`;
        }
        return '/assets/images/gcublogo.png';
    };

    const depositSchemes = dynamicProducts
        .filter(p => p.category === 'Deposits')
        .map(p => ({
            name: p.name,
            image: getProductImage(p),
            desc: p.description,
            path: `/product/${p.slug}`
        }));

    const loanSolutions = dynamicProducts
        .filter(p => p.category === 'Loans')
        .map(p => ({
            name: p.name,
            image: getProductImage(p),
            desc: p.description,
            path: `/product/${p.slug}`
        }));

    const [depSwiper, setDepSwiper] = useState(null);
    const [loanSwiper, setLoanSwiper] = useState(null);
    const heroTimerRef = useRef(null);

    const startHeroTimer = () => {
        if (heroTimerRef.current) clearInterval(heroTimerRef.current);
        heroTimerRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
    };

    useEffect(() => {
        if (slides.length > 0) {
            startHeroTimer();
        }
        return () => {
            if (heroTimerRef.current) clearInterval(heroTimerRef.current);
        };
    }, [slides.length]);


    const navigateHero = (direction) => {
        if (direction === 'next') {
            setCurrentSlide((currentSlide + 1) % slides.length);
        } else {
            setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
        }
        startHeroTimer(); // Reset timer on manual interaction
    };

    return (
        <div className="home-page">
            {/* SEO Meta Tags */}
            <SEO
                title="The Guntur Co-Operative Urban Bank Limited - GCUB | Banking Services Since 1947"
                description="GCUB - A premier co-operative bank in Andhra Pradesh since 1947. Offering savings accounts, fixed deposits, gold loans, housing loans, net banking, and comprehensive banking services with 22 branches across Guntur."
                keywords="GCUB, Guntur Co-operative Bank, Urban Bank, Savings Account, Fixed Deposits, Gold Loans, Housing Loans, Andhra Pradesh Bank, Co-operative Bank, Net Banking, Mobile Banking, UPI, IMPS, NEFT, RTGS"
                url="/"
                type="website"
            />

            {/* Schema.org Structured Data */}
            <SchemaOrg schema={organizationSchema} />
            <SchemaOrg schema={websiteSchema} />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' }
            ])} />

            {/* Hero Section */}
            <section className="relative h-[500px] md:h-[600px] overflow-hidden group">
                <div className="relative w-full h-full">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                            <div className="absolute inset-0 flex items-center">
                                <div className="container mx-auto px-4 md:px-6">
                                    <div className={`max-w-2xl text-white transition-all duration-1000 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                        <span className="inline-block py-1 px-3 rounded-full bg-[#E61111] text-xs font-bold uppercase tracking-wider mb-4">{slide.tag}</span>
                                        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: slide.title }}></h2>
                                        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">{slide.desc}</p>
                                        <Link to={slide.link} className="inline-block bg-white text-[#003399] px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition shadow-lg transform hover:-translate-y-1">{slide.buttonText || 'Get Started'}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <button onClick={() => navigateHero('prev')} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition z-20 cursor-pointer">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button onClick={() => navigateHero('next')} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition z-20 cursor-pointer">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => { setCurrentSlide(index); startHeroTimer(); }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`}
                        ></button>
                    ))}
                </div>
            </section>

            {/* Quick Access Strip */}
            <section className="relative z-30 -mt-10 mb-8">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="bg-white rounded-lg shadow-xl border-t-4 border-[#E61111] p-4 md:p-6">
                        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4 text-center items-start justify-center">
                            {quickAccess.map((item, idx) => (
                                <Link key={idx} to={item.path} className="group flex flex-col items-center gap-2 hover:translate-y-[-2px] transition p-2">
                                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-[#003399] transition duration-300 shadow-sm border border-blue-100">
                                        <i className={`${item.icon.includes(' ') ? item.icon : `fa-solid ${item.icon}`} text-2xl text-[#003399] group-hover:text-white transition duration-300`}></i>
                                    </div>
                                    <span className="text-xs font-bold text-gray-700 group-hover:text-[#003399]">{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest News Bar */}
            <div className="container mx-auto px-4 md:px-6 mb-12">
                <div className="bg-blue-50 rounded-lg px-2 md:px-4 py-2 flex items-center overflow-hidden border border-blue-100">
                    <div className="bg-[#003399] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shrink-0">
                        <span className="animate-pulse w-2 h-2 bg-[#E61111] rounded-full"></span> Latest News
                    </div>
                    <div className="flex-1 py-2 overflow-hidden">
                        <div className="animate-marquee whitespace-nowrap text-sm font-medium tracking-wide">
                            {latestNews.length > 0 ? latestNews.map((item, idx) => (
                                <span key={idx} className="inline-flex items-center">
                                    <Link to={`/news/${item.id}`} className="mx-4 font-bold text-[#003399] hover:text-[#E61111] transition">★ {item.title}</Link>
                                    {idx < latestNews.length - 1 && <span className="text-blue-500">|</span>}
                                </span>
                            )) : (
                                <>
                                    <Link to="/gold-loans" className="mx-4 font-bold text-[#003399] hover:text-[#E61111] transition">★ Gold Loans at attractive interest rates!</Link>
                                    <span className="text-blue-500">|</span>
                                    <Link to="/fixed-deposits" className="mx-4 font-bold text-[#003399] hover:text-[#E61111] transition">★ Senior Citizen FD Interest Rate increased to 7.5%</Link>
                                    <span className="text-blue-500">|</span>
                                    <Link to="/mobile-banking" className="mx-4 font-bold text-[#003399] hover:text-[#E61111] transition">★ Mobile Banking App launched - Download Now!</Link>
                                    <span className="text-blue-500">|</span>
                                    <Link to="/atm-safety" className="mx-4 font-bold text-[#003399] hover:text-[#E61111] transition">★ ATM Safety Guidelines released.</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

            {/* Main Content Area */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Left Column */}
                        <div className="lg:w-[70%] space-y-12">

                            {/* Welcome Section */}
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="flex-1">
                                    <span className="text-[#E61111] font-bold text-xs tracking-[0.2em] uppercase mb-2 block">{homeContent.section_title}</span>
                                    <h2 className="text-3xl font-bold text-[#003399] mb-4 leading-tight">{homeContent.main_heading}</h2>
                                    <div className="w-16 h-1 bg-[#E61111] mb-6"></div>
                                    <p className="text-gray-600 leading-relaxed mb-6 text-justify">
                                        {homeContent.description}
                                    </p>
                                    <Link to={homeContent.cta_button_link || '/about'} className="inline-flex items-center text-[#E61111] font-bold hover:text-[#003399] transition group">
                                        {homeContent.cta_button_text || 'Read Our Story'} <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                                    </Link>
                                </div>
                                <div className="grid grid-cols-2 gap-4 w-full md:w-auto shrink-0">
                                    {legacyStats.length > 0 ? (
                                        legacyStats.slice(0, 4).map((stat, idx) => (
                                            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center w-full md:w-32">
                                                <h4 className="text-xl font-bold text-[#003399] whitespace-nowrap">{stat.value}</h4>
                                                <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-tighter">{stat.label}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center w-full md:w-32">
                                                <h4 className="text-2xl font-bold text-[#003399]">75+</h4>
                                                <p className="text-xs text-gray-500 uppercase font-semibold">Years</p>
                                            </div>
                                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center w-full md:w-32">
                                                <h4 className="text-2xl font-bold text-[#003399]">22</h4>
                                                <p className="text-xs text-gray-500 uppercase font-semibold">Branches</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Premium Deposits */}
                            <div>
                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <span className="text-[#E61111] font-bold text-xs tracking-[0.2em] uppercase mb-1 block">Your Growth</span>
                                        <h2 className="text-2xl font-bold text-[#003399]">Premium Deposit Schemes</h2>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => depSwiper?.slidePrev()} className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#003399] hover:bg-gray-50 transition shadow-sm cursor-pointer">
                                            <i className="fas fa-chevron-left text-xs"></i>
                                        </button>
                                        <button onClick={() => depSwiper?.slideNext()} className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#003399] hover:bg-gray-50 transition shadow-sm cursor-pointer">
                                            <i className="fas fa-chevron-right text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                                <Swiper
                                    onSwiper={setDepSwiper}
                                    modules={[Navigation, Autoplay]}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    autoplay={{ delay: 5000 }}
                                    breakpoints={{
                                        640: { slidesPerView: 2 },
                                        1024: { slidesPerView: 3 },
                                    }}
                                    className="pb-4"
                                >
                                    {depositSchemes.map((item, idx) => (
                                        <SwiperSlide key={idx}>
                                            <Link to={item.path} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 block h-full">
                                                <div className="h-40 overflow-hidden relative">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                        onError={(e) => {
                                                            if (e.target.src.includes('/icons/')) {
                                                                e.target.src = e.target.src.replace('/icons/', '/cards/');
                                                            } else {
                                                                e.target.src = '/assets/images/gcublogo.png';
                                                            }
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition"></div>
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="font-bold text-[#003399] text-base mb-2 group-hover:text-[#E61111] transition-colors">{item.name}</h3>
                                                    <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-2">{item.desc}</p>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            {/* Loan Solutions */}
                            <div>
                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <span className="text-[#E61111] font-bold text-xs tracking-[0.2em] uppercase mb-1 block">Trusted Lending</span>
                                        <h2 className="text-2xl font-bold text-[#003399]">Detailed Lending Solutions</h2>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => loanSwiper?.slidePrev()} className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#003399] hover:bg-gray-50 transition shadow-sm cursor-pointer">
                                            <i className="fas fa-chevron-left text-xs"></i>
                                        </button>
                                        <button onClick={() => loanSwiper?.slideNext()} className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#003399] hover:bg-gray-50 transition shadow-sm cursor-pointer">
                                            <i className="fas fa-chevron-right text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                                <Swiper
                                    onSwiper={setLoanSwiper}
                                    modules={[Navigation, Autoplay]}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    autoplay={{ delay: 6000 }}
                                    breakpoints={{
                                        640: { slidesPerView: 2 },
                                        1024: { slidesPerView: 3 },
                                    }}
                                >
                                    {loanSolutions.map((item, idx) => (
                                        <SwiperSlide key={idx}>
                                            <Link to={item.path} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 block h-full">
                                                <div className="h-40 overflow-hidden relative">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                        onError={(e) => {
                                                            if (e.target.src.includes('/icons/')) {
                                                                e.target.src = e.target.src.replace('/icons/', '/cards/');
                                                            } else {
                                                                e.target.src = '/assets/images/gcublogo.png';
                                                            }
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition"></div>
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="font-bold text-[#003399] text-base mb-2 group-hover:text-[#E61111] transition-colors">{item.name}</h3>
                                                    <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-2">{item.desc}</p>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-[30%] space-y-8">
                            <ProductFinder products={dynamicProducts} />
                            <QuickLinksSidebar />
                            <div className="space-y-4">
                                <Link to="/contact" className="block overflow-hidden rounded-xl shadow-md group">
                                    <img src="/assets/images/lodge-complaint.jpg" alt="Lodge Complaint" className="w-full h-auto transform group-hover:scale-105 transition duration-500" />
                                </Link>
                                <a href="https://www.dicgc.org.in/" target="_blank" className="block overflow-hidden rounded-xl shadow-md group bg-white p-2 text-center">
                                    <img src="/assets/images/dicgc.png" alt="DICGC" className="w-full h-auto object-contain mx-auto" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transaction Stats */}
            <section className="bg-[#002b5c] py-12 text-white border-t border-blue-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-2">{stats.stats_title}</h2>
                        <p className="text-blue-200">{stats.stats_subtitle}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-800">
                        <StatItem icon={stats.stats_item1_icon} value={stats.stats_item1_value} label={stats.stats_item1_label} />
                        <StatItem icon={stats.stats_item2_icon} value={stats.stats_item2_value} label={stats.stats_item2_label} />
                        <StatItem icon={stats.stats_item3_icon} value={stats.stats_item3_value} label={stats.stats_item3_label} />
                        <StatItem icon={stats.stats_item4_icon} value={stats.stats_item4_value} label={stats.stats_item4_label} />
                    </div>
                </div>
            </section>
        </div>
    );
};

const StatItem = ({ icon, value, label }) => (
    <div className="p-2">
        <i className={`fas ${icon} text-3xl text-yellow-400 mb-3 opacity-80`}></i>
        <div className="text-2xl md:text-3xl font-bold mb-1">{value}</div>
        <div className="text-xs text-blue-300 uppercase tracking-widest">{label}</div>
    </div>
);

const ProductFinder = ({ products }) => {
    const [category, setCategory] = useState('');
    const [product, setProduct] = useState('');

    const categoriesMap = (products || []).reduce((acc, p) => {
        const cat = p.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push({
            name: p.name,
            url: `/product/${p.slug}`
        });
        return acc;
    }, {});

    const sortedCategories = Object.keys(categoriesMap).sort();

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#f8fafc] rounded-bl-full -z-0"></div>
            <h3 className="font-bold text-lg text-[#003399] mb-4 relative z-10">Find Products</h3>
            <form className="space-y-4 relative z-10">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">I am looking for</label>
                    <select
                        value={category}
                        onChange={(e) => { setCategory(e.target.value); setProduct(''); }}
                        className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded hover:border-gray-300 focus:border-[#003399] focus:ring-1 focus:ring-[#003399] text-sm text-gray-700 font-medium outline-none transition"
                    >
                        <option value="">Select Category</option>
                        {sortedCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Specific Product</label>
                    <select
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        disabled={!category}
                        className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded hover:border-gray-300 focus:border-[#003399] focus:ring-1 focus:ring-[#003399] text-sm text-gray-700 font-medium outline-none transition disabled:opacity-50"
                    >
                        <option value="">Select Type</option>
                        {category && categoriesMap[category].map(item => <option key={item.name} value={item.url}>{item.name}</option>)}
                    </select>
                </div>
                <button
                    type="button"
                    onClick={() => { if (product) window.location.href = product; }}
                    className="w-full bg-[#E61111] text-white font-bold py-2.5 rounded hover:bg-red-700 transition shadow-md"
                >Go</button>
            </form>
        </div>
    );
};

const QuickLinksSidebar = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg text-[#003399] mb-4 border-b border-gray-100 pb-2">Quick Links</h3>
        <ul className="space-y-2">
            {[
                { name: 'EMI Calculator', icon: 'far fa-calculator', path: '/emi-calculator' },
                { name: 'Interest Rates', icon: 'far fa-percentage', path: '/interest-rates' },
                { name: 'Missed Call Banking', icon: 'far fa-headset', path: '/missed-call-banking' },
                { name: 'Holiday List', icon: 'far fa-calendar-alt', path: '/holiday-list' },
                { name: 'KYC Norms', icon: 'far fa-file-alt', path: '/kyc-norms' },
            ].map((link, idx) => (
                <li key={idx}>
                    <Link to={link.path} className="flex items-center justify-between p-2 rounded hover:bg-gray-50 group transition">
                        <span className="text-sm font-medium text-gray-600 group-hover:text-[#003399]">
                            <i className={`fas ${link.icon} text-gray-400 mr-2 w-5`}></i> {link.name}
                        </span>
                        <i className="fas fa-chevron-right text-xs text-gray-300 group-hover:text-[#E61111]"></i>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

export default Home;
