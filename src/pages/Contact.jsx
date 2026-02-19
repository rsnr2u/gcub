import { useState } from 'react';
import SEO from '../components/SEO';
import SchemaOrg, { localBusinessSchema, createBreadcrumbSchema } from '../components/SchemaOrg';
import { BASE_URL } from '../utils/api';


const Contact = () => {
    const [formData, setFormData] = useState({
        request_type: '',
        full_name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const res = await fetch(`${BASE_URL}/api/contact-submissions/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await res.json();

            if (result.status === 'success') {
                setMessage({ text: result.message, type: 'success' });
                // Reset form
                setFormData({
                    request_type: '',
                    full_name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            } else {
                setMessage({ text: 'Error: ' + JSON.stringify(result.messages || result), type: 'error' });
            }
        } catch (err) {
            setMessage({ text: 'Failed to submit form. Please try again.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">
            {/* SEO Meta Tags */}
            <SEO
                title="Contact Us - GCUB | Get in Touch with Guntur Co-Operative Urban Bank"
                description="Contact The Guntur Co-Operative Urban Bank. Head Office: Brodipet, Guntur. Toll Free: 1800 425 8873. Email: gcubhelpdesk@guntururbanbank.org. Visit our 22 branches across Andhra Pradesh."
                keywords="GCUB Contact, Guntur Bank Contact Number, Bank Address Guntur, Customer Service, Branch Locator"
                url="/contact"
            />

            {/* Schema.org Structured Data */}
            <SchemaOrg schema={localBusinessSchema} />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Contact Us', url: '/contact' }
            ])} />

            {/* Hero Section */}
            <section className="relative bg-[#002b5c] text-white py-20">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Contact Us</h1>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">We are here to help. Reach out to us for any queries or support.</p>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">

                        {/* Left Column: Contact Form */}
                        <div className="lg:w-7/12">
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full">
                                <h2 className="text-2xl font-bold text-[#003399] mb-2">Send us a Message</h2>
                                <p className="text-gray-500 text-sm mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

                                {message.text && (
                                    <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                        <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2`}></i>
                                        {message.text}
                                    </div>
                                )}

                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    {/* Request Type */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Request Type <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded text-gray-700 focus:outline-none focus:border-blue-500 focus:bg-white transition appearance-none cursor-pointer"
                                                value={formData.request_type}
                                                onChange={(e) => setFormData({ ...formData, request_type: e.target.value })}
                                                required
                                            >
                                                <option value="">Select type of request</option>
                                                <option value="General Enquiry">General Enquiry</option>
                                                <option value="Fraud Complaint">Fraud Complaint</option>
                                                <option value="Lodge a Complaint">Lodge a Complaint</option>
                                                <option value="Feed Back">Feed Back</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                                                <i className="fas fa-chevron-down text-xs"></i>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded text-gray-700 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                                            value={formData.full_name}
                                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                            required
                                        />
                                    </div>

                                    {/* Email & Phone */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                                            <input
                                                type="email"
                                                placeholder="your.email@example.com"
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded text-gray-700 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                placeholder="+91 00000 00000"
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded text-gray-700 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                                        <input
                                            type="text"
                                            placeholder="What is this regarding?"
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded text-gray-700 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Message <span className="text-red-500">*</span></label>
                                        <textarea
                                            rows="5"
                                            placeholder="Type your message here..."
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded text-gray-700 focus:outline-none focus:border-blue-500 focus:bg-white transition resize-none"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-[#0088ff] hover:bg-[#0077e6] text-white font-bold py-3.5 rounded transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-paper-plane'} text-sm`}></i>
                                        {loading ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right Column: Sidebar */}
                        <div className="lg:w-5/12 space-y-6">
                            {/* Head Office Card */}
                            <div className="bg-[#0088ff] text-white rounded-xl p-8 shadow-lg relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                        <span className="bg-white/20 p-2 rounded-lg"><i className="far fa-building"></i></span>
                                        Head Office
                                    </h3>
                                    <div className="space-y-6">
                                        <ContactInfoItem icon="fas fa-map-marker-alt" label="" text={<>D.No: 3/2, Brodipet,<br />GUNTUR-522002, Andhra Pradesh</>} />
                                        <ContactInfoItem icon="fas fa-phone-alt" label="Toll Free" text="1800 425 8873" isBold />
                                        <ContactInfoItem icon="far fa-envelope" label="Email" text="gcubhelpdesk@guntururbanbank.org" />
                                        <ContactInfoItem icon="far fa-clock" label="Working Hours" text="10:00 AM to 6:00 PM" />
                                    </div>
                                </div>
                            </div>

                            {/* Branch Timings */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <TimingCard title="Local Branches" icon="far fa-building" bgColor="bg-blue-50" iconColor="text-blue-500" timings={[
                                    { label: 'Mon - Sat', text: '10:00 AM to 6:00 PM', labelColor: 'text-purple-600' },
                                    { label: 'Lunch Break', text: '2:00 PM to 3:00 PM', labelColor: 'text-orange-500', icon: 'fas fa-mug-hot' },
                                    { label: 'Closed', text: '2nd & 4th Saturday / Sundays', labelColor: 'text-red-500', subText: true }
                                ]} />
                                <TimingCard title="Out Station" icon="far fa-building" bgColor="bg-purple-50" iconColor="text-purple-500" timings={[
                                    { label: 'Mon - Sat', text: '10:00 AM to 5:00 PM', labelColor: 'text-purple-600' },
                                    { label: 'Lunch Break', text: '2:00 PM to 2:30 PM', labelColor: 'text-orange-500', icon: 'fas fa-mug-hot' },
                                    { label: 'Closed', text: '2nd & 4th Saturday / Sundays', labelColor: 'text-red-500', subText: true }
                                ]} />
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-3 gap-4">
                                <QuickAction icon="fas fa-phone-alt" label="Call Us" sub="24/7" color="blue" href="tel:18004258873" />
                                <QuickAction icon="far fa-envelope" label="Email" sub="Quick Reply" color="green" href="mailto:help@gcub.com" />
                                <QuickAction icon="fas fa-map-marker-alt" label="Visit" sub="13 Branches" color="purple" href="/branch-locator" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ContactInfoItem = ({ icon, label, text, isBold }) => (
    <div className="flex items-start gap-4">
        <i className={`${icon} mt-1 opacity-80`}></i>
        <div>
            {label && <span className="block text-xs uppercase opacity-70 mb-1">{label}</span>}
            <p className={`${isBold ? 'font-bold text-lg' : 'font-medium'} break-all opacity-90 leading-relaxed`}>{text}</p>
        </div>
    </div>
);

const TimingCard = ({ title, icon, bgColor, iconColor, timings }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className={`${bgColor} ${iconColor} p-1.5 rounded text-xs`}><i className={icon}></i></span>
            {title}
        </h4>
        <div className="space-y-3 text-sm">
            {timings.map((t, i) => (
                <div key={i}>
                    <p className={`${t.labelColor} text-xs font-bold mb-1`}>
                        <i className={`${t.icon || 'far fa-clock'} mr-1`}></i> {t.label}
                    </p>
                    <p className={`${t.subText ? 'text-gray-500 text-xs' : 'text-gray-700 font-medium'}`}>{t.text}</p>
                </div>
            ))}
        </div>
    </div>
);

const QuickAction = ({ icon, label, sub, color, href }) => {
    const colors = {
        blue: 'bg-blue-50 hover:bg-blue-100 border-blue-100 text-blue-500',
        green: 'bg-green-50 hover:bg-green-100 border-green-100 text-green-500',
        purple: 'bg-purple-50 hover:bg-purple-100 border-purple-100 text-purple-500'
    };
    return (
        <a href={href} className={`${colors[color]} transition p-4 rounded-xl text-center border block group`}>
            <div className="mb-2 group-hover:scale-110 transition transform"><i className={icon}></i></div>
            <p className="text-xs font-bold text-gray-600">{label}</p>
            <p className="text-[10px] text-gray-400">{sub}</p>
        </a>
    );
};

export default Contact;
