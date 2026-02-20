import { useEffect, useState } from 'react';
import { authFetch } from '../../utils/api';

const AdminDashboard = () => {
    const adminName = localStorage.getItem('adminName') || 'Admin';
    const [stats, setStats] = useState({
        total_admins: 0,
        news_updates: 0,
        branches: 0,
        submissions: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await authFetch('http://localhost:8080/api/admin/stats');
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="w-full">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-[#003399] to-blue-800 rounded-xl p-8 mb-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 h-full w-1/2 bg-white/5 skew-x-12 transform translate-x-10"></div>
                <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-2">Welcome Back, {adminName}!</h3>
                    <p className="text-blue-100 opacity-90">Here's what's happening in Guntur Urban Bank today.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Stat 1 */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-50 text-[#003399] w-12 h-12 rounded-lg flex items-center justify-center text-xl">
                            <i className="fas fa-users"></i>
                        </div>
                    </div>
                    <h4 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Admins</h4>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{loading ? '...' : stats.total_admins}</p>
                </div>

                {/* Stat 2 */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-red-50 text-[#E61111] w-12 h-12 rounded-lg flex items-center justify-center text-xl">
                            <i className="fas fa-newspaper"></i>
                        </div>
                    </div>
                    <h4 className="text-gray-500 text-sm font-medium uppercase tracking-wider">News Updates</h4>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{loading ? '...' : stats.news_updates}</p>
                </div>

                {/* Stat 3 */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-amber-50 text-amber-600 w-12 h-12 rounded-lg flex items-center justify-center text-xl">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                    </div>
                    <h4 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Branches</h4>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{loading ? '...' : stats.branches}</p>
                </div>

                {/* Stat 4 */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-purple-50 text-purple-600 w-12 h-12 rounded-lg flex items-center justify-center text-xl">
                            <i className="fas fa-envelope-open-text"></i>
                        </div>
                    </div>
                    <h4 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Submissions</h4>
                    <p className="text-2xl font-bold text-purple-600 mt-1">{loading ? '...' : stats.submissions}</p>
                </div>
            </div>

            {/* Bank Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-gray-800">Bank Information</h3>
                    <span className="bg-blue-100 text-[#003399] text-xs font-bold px-3 py-1 rounded-full border border-blue-200">Official Portal</span>
                </div>
                <div className="p-8">
                    <div className="w-full text-center">
                        <img src="/assets/images/gcublogo.png" alt="GCUB Logo" className="h-16 mx-auto mb-6 opacity-80" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">The Guntur Co-operative Urban Bank Ltd.</h2>
                        <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                            This is the official React-based administration portal for GCUB. Manage your website content,
                            monitor bank statistics, and ensure safe banking practices from this central dashboard.
                        </p>
                        <div className="flex justify-center gap-4">
                            <div className="bg-gray-50 px-6 py-3 rounded-lg border border-gray-100">
                                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Domain</p>
                                <p className="text-gray-800 font-medium text-sm">guntururban.bank.in</p>
                            </div>
                            <div className="bg-gray-50 px-6 py-3 rounded-lg border border-gray-100">
                                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Environment</p>
                                <p className="text-green-600 font-bold text-sm">Production Ready</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
