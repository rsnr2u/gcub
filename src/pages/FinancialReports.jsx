import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SchemaOrg, { createBreadcrumbSchema } from '../components/SchemaOrg';

const FinancialReports = () => {
    const [reports, setReports] = useState([]);
    const [indicators, setIndicators] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [reportsRes, indicatorsRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_BASE_URL}/annual-reports`),
                    fetch(`${import.meta.env.VITE_API_BASE_URL}/financial-indicators`)
                ]);

                const reportsData = await reportsRes.json();
                const indicatorsData = await indicatorsRes.json();

                if (Array.isArray(reportsData)) setReports(reportsData);
                if (Array.isArray(indicatorsData)) setIndicators(indicatorsData);

            } catch (error) {
                console.error('Error fetching financial data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="financial-reports-page bg-[#fcfcfc] min-h-screen">
            <SEO
                title="Financial & Annual Reports - GCUB"
                description="Transparency and accountability: View the annual reports and financial performance of The Guntur Co-operative Urban Bank Ltd."
            />
            <SchemaOrg schema={createBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'About Us', url: '/about' },
                { name: 'Annual Reports', url: '/financial-reports' }
            ])} />

            {/* Hero Section */}
            <section className="relative bg-[#001a37] text-white py-10">
                <div className="container mx-auto px-6 relative text-center md:text-left">
                    <span className="text-[#E61111] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Institutional Transparency</span>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Annual Reports</h1>
                    <div className="h-1.5 w-16 bg-white mb-6"></div>
                    <p className="text-md md:text-lg text-blue-100 font-light max-w-3xl opacity-90">
                        Transparency, Accountability, and Sustainable Growth guiding our institution toward community prosperity.
                    </p>
                </div>
            </section>


            {/* Main Content */}
            <section className="py-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Left Column */}
                        <div className="lg:w-3/4 space-y-12">
                            {/* Annual Reports */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#003399] mb-8 flex items-center gap-3 uppercase tracking-tight">
                                    <span className="w-1.5 h-8 bg-[#E61111]"></span>
                                    Published Reports
                                </h2>

                                {loading ? (
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-20 text-center">
                                        <div className="inline-block w-8 h-8 border-2 border-[#003399] border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                ) : reports.length > 0 ? (
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
                                        {reports.map((report, idx) => (
                                            <ReportItem
                                                key={report.id || idx}
                                                title={report.title}
                                                desc={report.description}
                                                file_path={report.file_path}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-20 text-center">
                                        <div className="mb-4">
                                            <i className="fas fa-file-invoice text-4xl text-gray-200"></i>
                                        </div>
                                        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No reports published yet</p>
                                    </div>
                                )}
                            </div>

                            {/* Financial Indicators Table */}
                            <div className="pt-8">
                                <h2 className="text-2xl font-bold text-[#003399] mb-8 flex items-center gap-3 uppercase tracking-tight">
                                    <span className="w-1.5 h-8 bg-[#E61111]"></span>
                                    Financial Highlights
                                </h2>
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                                    <th className="p-5 font-bold text-gray-400 uppercase text-[10px] tracking-[0.2em]">Parameter</th>
                                                    <th className="p-5 font-bold text-gray-400 uppercase text-[10px] tracking-[0.2em] text-right">
                                                        {indicators.length > 0 ? indicators[0].year_prev : "Previous Year"}
                                                    </th>
                                                    <th className="p-5 font-bold text-gray-400 uppercase text-[10px] tracking-[0.2em] text-right">
                                                        {indicators.length > 0 ? indicators[0].year_curr : "Current Year"}
                                                    </th>
                                                    <th className="p-5 font-bold text-gray-400 uppercase text-[10px] tracking-[0.2em] text-right">Growth %</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50 text-sm">
                                                {loading ? (
                                                    <tr>
                                                        <td colSpan="4" className="p-10 text-center">
                                                            <div className="inline-block w-6 h-6 border-2 border-[#003399] border-t-transparent rounded-full animate-spin"></div>
                                                        </td>
                                                    </tr>
                                                ) : indicators.length > 0 ? (
                                                    indicators.map((ind, idx) => (
                                                        <TableRow
                                                            key={ind.id || idx}
                                                            label={ind.parameter}
                                                            prev={ind.value_prev_year}
                                                            curr={ind.value_curr_year}
                                                            growth={`${ind.growth_percentage}% ${ind.is_positive_growth ? '▲' : '▼'}`}
                                                            isPositive={ind.is_positive_growth}
                                                        />
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="p-10 text-center text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                                                            No financial highlights available
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:w-1/4 space-y-8">
                            {/* Institutional Profile */}
                            <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                                <h3 className="font-bold text-[#003399] mb-6 flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
                                    <i className="fas fa-university text-[#E61111]"></i> Institutional
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        { name: "Chairman's Desk", path: "/chairman-desk" },
                                        { name: "Board of Directors", path: "/board-directors" },
                                        { name: "Management Team", path: "/management" },
                                        { name: "Financial Highlights", path: "/highlights" }
                                    ].map((item) => (
                                        <li key={item.name}>
                                            <Link to={item.path} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg border border-transparent hover:border-[#003399]/10 hover:bg-white hover:text-[#E61111] transition-all text-sm font-bold text-gray-700">
                                                <span>{item.name}</span>
                                                <i className="fas fa-chevron-right text-[10px] opacity-30"></i>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Governance */}
                            <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                                <h3 className="font-bold text-gray-400 mb-6 text-[10px] uppercase tracking-[0.2em]">Governance</h3>
                                <ul className="space-y-2">
                                    {[
                                        { name: 'Dividend History', path: '#' },
                                        { name: 'Unclaimed Deposits', path: '#' },
                                        { name: 'KYC Policies', path: '/kyc-norms' }
                                    ].map((link) => (
                                        <li key={link.name}>
                                            <Link to={link.path} className="text-sm text-gray-600 hover:text-[#003399] font-medium flex items-center gap-2 transition-colors">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Reference Center */}
                            <div className="bg-[#001a37] rounded-xl p-8 text-white shadow-xl relative overflow-hidden group">
                                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                                <h3 className="font-bold text-lg mb-6 tracking-tight relative z-10">Reference Center</h3>
                                <div className="grid grid-cols-1 gap-4 relative z-10">
                                    {[
                                        { name: 'Interest Rates', path: '/interest-rates', icon: 'fa-percent' },
                                        { name: 'EMI Calculator', path: '/emi-calculator', icon: 'fa-calculator' },
                                        { name: 'Branch Locator', path: '/branch-locator', icon: 'fa-map-marker-alt' },
                                        { name: 'Downloads', path: '/downloads', icon: 'fa-download' }
                                    ].map((item) => (
                                        <Link key={item.name} to={item.path} className="flex items-center gap-4 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/5 hover:border-white/20">
                                            <div className="w-8 h-8 rounded-lg bg-[#E61111] flex items-center justify-center text-xs">
                                                <i className={`fas ${item.icon}`}></i>
                                            </div>
                                            <span className="text-sm font-bold">{item.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};


const ReportItem = ({ title, desc, file_path }) => (
    <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-gray-50/50 transition duration-300">
        <div className="flex items-start gap-5 text-center md:text-left">
            <div className="bg-red-50 w-14 h-14 rounded-xl flex items-center justify-center text-[#E61111] flex-shrink-0 shadow-sm border border-red-100">
                <i className="fas fa-file-pdf text-2xl"></i>
            </div>
            <div>
                <h3 className="font-bold text-xl text-gray-800 tracking-tight leading-tight">{title}</h3>
                <p className="text-gray-500 text-sm mt-2 font-light">{desc}</p>
            </div>
        </div>
        <a
            href={file_path ? `${import.meta.env.VITE_BASE_URL}/${file_path}` : "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-white border border-gray-200 text-[#003399] font-bold text-sm rounded-lg hover:bg-[#003399] hover:text-white hover:border-[#003399] transition shadow-sm flex items-center gap-3 group min-w-[200px] justify-center"
        >
            <span>Download Report</span>
            <i className="fas fa-download text-xs group-hover:translate-y-0.5 transition-transform"></i>
        </a>
    </div>
);

const TableRow = ({ label, prev, curr, growth, isPositive }) => (
    <tr className="hover:bg-gray-50 transition-colors">
        <td className="p-5 font-bold text-gray-700 text-sm">{label}</td>
        <td className="p-5 text-right text-gray-500 font-medium">{prev}</td>
        <td className="p-5 text-right font-bold text-[#003399]">{curr}</td>
        <td className={`p-5 text-right font-bold ${isPositive ? 'text-green-600 bg-green-50/30' : 'text-red-600 bg-red-50/30'}`}>
            {growth}
        </td>
    </tr>
);

export default FinancialReports;
