import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password }),
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                const { data } = result;
                localStorage.setItem('isAdminLoggedIn', 'true');
                localStorage.setItem('adminName', data.name || data.full_name || 'Administrator');
                localStorage.setItem('adminEmail', data.email);
                localStorage.setItem('adminId', data.id);
                localStorage.setItem('authToken', data.auth_token);
                localStorage.setItem('adminLoginTime', Date.now().toString());
                navigate('/admin/dashboard');
            } else {
                setError(result.message || 'Invalid credentials. Please try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Could not connect to the server. Please ensure the backend is running.');
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen font-inter">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Header */}
                <div className="bg-[#003399] py-8 text-center relative overflow-hidden">
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[url('/assets/images/pattern.png')] pointer-events-none"></div>

                    <div className="relative z-10">
                        <img src="/assets/images/gcublogo.png" alt="GCUB Logo"
                            className="h-16 mx-auto mb-4 bg-white rounded-lg p-2 shadow-sm" />
                        <h2 className="text-white text-2xl font-bold tracking-wide">Admin Portal</h2>
                        <p className="text-blue-200 text-sm mt-1">Guntur Co-operative Urban Bank Ltd.</p>
                    </div>
                </div>

                {/* Login Form */}
                <div className="p-8">
                    {error && (
                        <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm">
                            <p><i className="fas fa-exclamation-circle mr-2"></i> {error}</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wider"
                                htmlFor="username">Email Address</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <input
                                    className="w-full pl-10 pr-3 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#003399] focus:ring-1 focus:ring-[#003399] transition bg-gray-50"
                                    id="username"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wider"
                                htmlFor="password">Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <i className="fas fa-lock"></i>
                                </span>
                                <input
                                    className="w-full pl-10 pr-3 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#003399] focus:ring-1 focus:ring-[#003399] transition bg-gray-50"
                                    id="password"
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#E61111] hover:bg-red-700 text-white font-bold py-2 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform active:scale-95 flex items-center justify-center gap-2">
                            <span>LOGIN</span>
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="/" className="text-sm text-gray-500 hover:text-[#003399] transition">
                            <i className="fas fa-home mr-1"></i> Back to Bank Website
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 py-3 text-center border-t border-gray-100">
                    <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} GCUB Ltd. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
