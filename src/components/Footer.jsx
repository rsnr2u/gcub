import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch, BASE_URL } from '../utils/api';


const Footer = () => {
    const [settings, setSettings] = useState({
        address: 'Head Office, Brodipet, Guntur - 522002.',
        contact_phone: '1900-425-3873',
        contact_email: 'info@guntururban.bank.in',
        seo_facebook_url: '',
        seo_twitter_url: '',
        seo_linkedin_url: ''
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await apiFetch('/admin/settings');
            const data = await response.json();
            if (data) {
                setSettings(prevSettings => ({
                    ...prevSettings,
                    ...data
                }));
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    const socialMedia = [
        { name: 'facebook', url: settings.seo_facebook_url, icon: 'fab fa-facebook' },
        { name: 'twitter', url: settings.seo_twitter_url, icon: 'fab fa-twitter' },
        { name: 'linkedin', url: settings.seo_linkedin_url, icon: 'fab fa-linkedin' }
    ].filter(social => social.url && social.url.trim() !== '');

    return (
        <footer className="bg-[#0b1320] text-gray-400 text-sm pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
                    {/* Column 1: Info */}
                    <div className="space-y-4">
                        <div className='bg-white p-2 rounded-md'>
                            <img
                                src={settings.site_dark_logo ? (settings.site_dark_logo.startsWith('/') ? `${BASE_URL}${ settings.site_dark_logo }` : settings.site_dark_logo) : (settings.site_logo ? (settings.site_logo.startsWith('/') ? `${BASE_URL}${ settings.site_logo }` : settings.site_logo) : "assets/images/gcublogo.png")}
                                alt="GCUB Logo"
                                className="h-10 object-contain"
                            />
                        </div>
                        <p className="leading-relaxed text-justify pr-4">
                            The Guntur Co-operative Urban Bank Ltd. is committed to providing secure and customer-centric
                            banking services since 1999.
                        </p>
                    </div>

                    {/* Column 2: Explore */}
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Explore</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                            <li><Link to="/branch-locator" className="hover:text-white transition">Branch Locator</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Products */}
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Our Products</h4>
                        <ul className="space-y-2">
                            <li><Link to="/savings-account" className="hover:text-white transition">Savings Account</Link></li>
                            <li><Link to="/current-account" className="hover:text-white transition">Current Account</Link></li>
                            <li><Link to="/fixed-deposits" className="hover:text-white transition">Fixed Deposits</Link></li>
                            <li><Link to="/gold-loans" className="hover:text-white transition">Gold Loans</Link></li>
                            <li><Link to="/housing-loans" className="hover:text-white transition">Housing Loans</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Disclosures */}
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Disclosures</h4>
                        <ul className="space-y-2">
                            <li><Link to="/dicgc-certificate" className="hover:text-white transition"><i className="fas fa-shield-alt mr-2 text-[#E61111]"></i> DICGC Certificate</Link></li>
                            <li><Link to="/ombudsman" className="hover:text-white transition"><i className="fas fa-gavel mr-2 text-[#E61111]"></i> Ombudsman</Link></li>
                            <li><Link to="/iso-certified" className="hover:text-white transition"><i className="fas fa-certificate mr-2 text-[#E61111]"></i> ISO Certified</Link></li>
                            <li><Link to="/deaf-accounts" className="hover:text-white transition"><i className="fas fa-file-alt mr-2 text-[#E61111]"></i> DEAF Accounts</Link></li>
                        </ul>
                    </div>

                    {/* Column 5: Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/emi-calculator" className="hover:text-white transition"><i className="fas fa-calculator mr-2 text-[#E61111]"></i> EMI Calculator</Link></li>
                            <li><Link to="/interest-rates" className="hover:text-white transition"><i className="fas fa-percent mr-2 text-[#E61111]"></i> Interest Rates</Link></li>
                            <li><Link to="/missed-call-banking" className="hover:text-white transition"><i className="fas fa-headset mr-2 text-[#E61111]"></i> Missed Call Banking</Link></li>
                            <li><Link to="/holiday-list" className="hover:text-white transition"><i className="fas fa-calendar-alt mr-2 text-[#E61111]"></i> Holiday List</Link></li>
                            <li><Link to="/kyc-norms" className="hover:text-white transition"><i className="fas fa-file-contract mr-2 text-[#E61111]"></i> KYC Norms</Link></li>
                            <li><Link to="/customer-service-charges" className="hover:text-white transition"><i className="fas fa-rupee-sign mr-2 text-[#E61111]"></i> Service Charges</Link></li>
                            <li><Link to="/downloads" className="hover:text-white transition">Downloads</Link></li>
                        </ul>
                    </div>

                    {/* Column 6: Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Contact Us</h4>
                        <ul className="space-y-3">
                            {settings.address && (
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-[#E61111] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <span>{settings.address}</span>
                                </li>
                            )}
                            {settings.contact_phone && (
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-[#E61111] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                    <a href={`tel:${settings.contact_phone}`} className="hover:text-white transition">
                                        {settings.contact_phone}
                                    </a>
                                </li>
                            )}
                            {settings.contact_email && (
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-[#E61111] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                    <a href={`mailto:${settings.contact_email}`} className="hover:text-white transition">
                                        {settings.contact_email}
                                    </a>
                                </li>
                            )}
                        </ul>

                        {/* Social Icons */}
                        {socialMedia.length > 0 && (
                            <div className="flex gap-4 mt-6">
                                {socialMedia.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-[#E61111] transition duration-300 text-white"
                                        aria-label={social.name}
                                    >
                                        <i className={`${social.icon} text-sm`}></i>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                        <p>© 2026 The Guntur Co-Operative Urban Bank Limited. All rights reserved.</p>
                        <span className="hidden md:inline text-gray-600">|</span>
                        <p className="flex items-center gap-1">
                            Design and Developed by
                            <a
                                href="https://digitalks.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-[#E61111] transition font-bold"
                            >
                                Digi Talks India
                            </a>
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="hover:text-white transition">Terms of Service</Link>
                        <Link to="/sitemap" className="hover:text-white transition">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
