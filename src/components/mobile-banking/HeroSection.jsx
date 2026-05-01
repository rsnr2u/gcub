import { Link } from 'react-router-dom';

const HeroSection = ({ data }) => {
    if (!data || data.enabled === false) return null;

    return (
        <section className="relative bg-[#001a37] py-16">
            <div className="container mx-auto px-4 md:px-6 relative text-center md:text-left">
                {/* Breadcrumbs matching corporate style */}
                <nav className="flex items-center justify-center md:justify-start gap-2 text-white/50 text-[10px] mb-4 font-medium uppercase tracking-widest">
                    <Link to="/" className="hover:text-white transition">Home</Link>
                    <i className="fas fa-chevron-right text-[8px]"></i>
                    <Link to="/mobile-banking" className="hover:text-white transition">Our Services</Link>
                    <i className="fas fa-chevron-right text-[8px]"></i>
                    <span className="text-white">{data.title}</span>
                </nav>

                <div className="max-w-4xl">
                    <span className="text-[#E61111] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
                        {data.breadcrumb || 'Mobile Banking'}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                        {data.title}
                    </h1>
                    <div className="h-1.5 w-16 bg-white mb-6 hidden md:block"></div>
                    <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl leading-relaxed opacity-90">
                        {data.description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
