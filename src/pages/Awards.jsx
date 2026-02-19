import SEO from '../components/SEO';

const Awards = () => {
    return (
        <div className="awards-page bg-gray-50 min-h-screen">
            <SEO
                title="Awards & Recognitions - GCUB"
                description="Awards, accolades, and recognitions received by The Guntur Co-operative Urban Bank Ltd."
            />
            <section className="bg-[#002b5c] text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Awards & Recognitions</h1>
                    <div className="h-1.5 w-16 bg-white mx-auto"></div>
                </div>
            </section>

            <main className="container mx-auto px-6 py-20">
                <div className="max-w-6xl mx-auto text-center py-20">
                    <i className="fas fa-award text-6xl text-[#E61111] mb-8 opacity-20"></i>
                    <h2 className="text-2xl font-bold text-gray-400">Section Coming Soon</h2>
                    <p className="text-gray-500 mt-2">Our legacy of excellence and accolades will be displayed here soon.</p>
                </div>
            </main>
        </div>
    );
};

export default Awards;
