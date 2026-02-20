import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminAnnualReports = () => {
    const [reports, setReports] = useState([]);
    const [indicators, setIndicators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [reportsRes, indicatorsRes] = await Promise.all([
                fetch('http://localhost:8080/api/annual-reports'),
                fetch('http://localhost:8080/api/financial-indicators')
            ]);
            const reportsData = await reportsRes.json();
            const indicatorsData = await indicatorsRes.json();

            setReports(Array.isArray(reportsData) ? reportsData : []);
            setIndicators(Array.isArray(indicatorsData) ? indicatorsData : []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleDeleteReport = async (id) => {
        if (!window.confirm('Delete this report?')) return;
        try {
            const response = await fetch(`http://localhost:8080/api/annual-reports/delete/${id}`, { method: 'POST' });
            if ((await response.json()).status === 'success') {
                setMessage({ type: 'success', text: 'Report deleted.' });
                fetchData();
            }
        } catch (error) { console.error(error); }
    };

    const handleDeleteIndicator = async (id) => {
        if (!window.confirm('Delete this indicator?')) return;
        try {
            const response = await fetch(`http://localhost:8080/api/financial-indicators/delete/${id}`, { method: 'POST' });
            if ((await response.json()).status === 'success') {
                setMessage({ type: 'success', text: 'Indicator deleted.' });
                fetchData();
            }
        } catch (error) { console.error(error); }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading Data...</div>;

    return (
        <div className="font-inter">
            {/* Header */}
            <header className="flex px-8 justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Annual Reports & Financials</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Manage Reports & Indicators</p>
                </div>
            </header>

            <div className="px-8 py-8 space-y-12">
                {message.text && (
                    <div className={`p-4 rounded-xl text-xs font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <i className="fas fa-info-circle mr-2"></i> {message.text}
                    </div>
                )}

                {/* Section 1: Annual Reports */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="h-6 w-1 bg-[#003399] rounded-full"></div>
                            <h3 className="text-lg font-bold text-[#003399]">Annual Reports</h3>
                        </div>
                        <Link to="/admin/annual-reports/new" className="bg-[#003399] hover:bg-black text-white px-6 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all shadow-sm">
                            <i className="fas fa-plus-circle mr-2"></i> Add Report
                        </Link>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                        {reports.length === 0 ? (
                            <div className="p-8 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">No reports found</div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {reports.map(report => (
                                    <div key={report.id} className="p-6 flex items-start justify-between hover:bg-gray-50 transition">
                                        <div className="flex gap-4">
                                            <div className="bg-red-50 text-red-500 w-12 h-12 rounded-lg flex items-center justify-center text-xl">
                                                <i className="fas fa-file-pdf"></i>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-800">{report.title}</h4>
                                                <p className="text-xs text-gray-500 mt-1">{report.description}</p>
                                                {report.year && <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded">Year {report.year}</span>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <a href={`http://localhost:8080/${report.file_path}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#003399] text-xs font-bold border border-gray-200 px-3 py-1.5 rounded-lg transition hover:bg-blue-50 hover:border-blue-100">
                                                Download PDF <i className="fas fa-download ml-1"></i>
                                            </a>
                                            <Link to={`/admin/annual-reports/edit/${report.id}`} className="text-gray-300 hover:text-[#003399] p-2 transition">
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button onClick={() => handleDeleteReport(report.id)} className="text-gray-300 hover:text-red-500 p-2 transition">
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Section 2: Financial Indicators */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="h-6 w-1 bg-[#003399] rounded-full"></div>
                            <h3 className="text-lg font-bold text-[#003399]">Key Financial Indicators</h3>
                        </div>
                        <Link to="/admin/financial-indicators/new" className="bg-[#003399] hover:bg-black text-white px-6 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all shadow-sm">
                            <i className="fas fa-plus-circle mr-2"></i> Add Indicator
                        </Link>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Parameter</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">
                                        {indicators.length > 0 ? indicators[0].year_prev : 'Previous Year'}
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">
                                        {indicators.length > 0 ? indicators[0].year_curr : 'Current Year'}
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Growth %</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {indicators.length === 0 ? (
                                    <tr><td colSpan="5" className="p-8 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">No indicators found</td></tr>
                                ) : (
                                    indicators.map(ind => (
                                        <tr key={ind.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 text-xs font-bold text-gray-700">{ind.parameter}</td>
                                            <td className="px-6 py-4 text-xs font-medium text-gray-500 text-right">{ind.value_prev_year}</td>
                                            <td className="px-6 py-4 text-xs font-bold text-[#003399] text-right">{ind.value_curr_year}</td>
                                            <td className={`px-6 py-4 text-xs font-bold text-right ${ind.is_positive_growth ? 'text-green-600' : 'text-red-600'}`}>
                                                {ind.growth_percentage} {ind.is_positive_growth ? <i className="fas fa-caret-up ml-1"></i> : <i className="fas fa-caret-down ml-1"></i>}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link to={`/admin/financial-indicators/edit/${ind.id}`} className="text-gray-400 hover:text-[#003399] transition"><i className="fas fa-edit"></i></Link>
                                                    <button onClick={() => handleDeleteIndicator(ind.id)} className="text-gray-400 hover:text-red-500 transition"><i className="fas fa-trash-alt"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminAnnualReports;
