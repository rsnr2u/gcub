import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authFetch } from '../../utils/api';

const Profile = () => {
    const [profile, setProfile] = useState({
        full_name: '',
        email: '',
        phone: '',
        username: ''
    });
    const [passwords, setPasswords] = useState({
        new_password: '',
        confirm_password: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const adminId = localStorage.getItem('adminId') || 1;

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await authFetch(`admin/profile/${adminId}`);
            const data = await response.json();
            setProfile(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setLoading(false);
        }
    };

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        const formData = new FormData();
        formData.append('full_name', profile.full_name);
        formData.append('email', profile.email);
        formData.append('phone', profile.phone);

        try {
            const response = await authFetch(`/admin/profile/update/${adminId}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.status === 'success') {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                localStorage.setItem('adminName', profile.full_name);
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to update profile.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        if (passwords.new_password !== passwords.confirm_password) {
            setMessage({ type: 'error', text: 'Passwords do not match!' });
            setSaving(false);
            return;
        }

        const formData = new FormData();
        formData.append('new_password', passwords.new_password);

        try {
            const response = await authFetch(`/admin/profile/update/${adminId}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.status === 'success') {
                setMessage({ type: 'success', text: 'Password changed successfully!' });
                setPasswords({ new_password: '', confirm_password: '' });
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to change password.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Synchronizing Identity Data...</div>;

    const initials = profile.full_name ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'AD';

    return (
        <div className="bg-gray-100 font-inter -m-2">
            <header className="w-full bg-transparent flex px-8 justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/admin/dashboard" className="text-gray-500 hover:text-[#003399] transition">
                        <i className="fas fa-arrow-left text-xl"></i>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Administrative Profile</h2>
                        <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mt-1">Identity & Security Credentials</p>
                    </div>
                </div>
            </header>

            <div className="p-8">
                <div className="w-full space-y-8">
                    {message.text && (
                        <div className={`p-5 rounded-2xl text-sm font-medium shadow-sm transition-all animate-in fade-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-green-50 text-green-800 border-2 border-green-200' : 'bg-red-50 text-red-800 border-2 border-red-200'}`}>
                            <div className="flex items-center gap-3">
                                <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-lg`}></i>
                                {message.text}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Avatar Card */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 text-center space-y-6">
                            <div className="relative inline-block group">
                                <div className="w-32 h-32 rounded-full bg-[#003399] text-white flex items-center justify-center text-4xl font-black mx-auto border-4 border-blue-50 shadow-inner group-hover:scale-105 transition-transform duration-500">
                                    {initials}
                                </div>
                                <button className="absolute bottom-1 right-1 bg-white text-[#003399] w-10 h-10 rounded-full shadow-lg border border-gray-100 flex items-center justify-center hover:bg-[#003399] hover:text-white transition-all transform hover:rotate-12">
                                    <i className="fas fa-camera"></i>
                                </button>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg tracking-tight">{profile.full_name}</h3>
                                <p className="text-[10px] font-bold text-[#003399] uppercase tracking-widest mt-1">Super Administrator</p>
                            </div>
                            <div className="pt-6 border-t border-gray-50 flex flex-col gap-2">
                                <p className="text-xs font-bold text-gray-400">Username: <span className="text-gray-900">{profile.username}</span></p>
                                <p className="text-xs font-bold text-gray-400">Portal ID: <span className="text-gray-900">#ADM00{adminId}</span></p>
                            </div>
                        </div>

                        {/* Forms Container */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-10 space-y-12">
                                {/* Personal Details */}
                                <div className="space-y-8">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl tracking-tight">
                                        <span className="w-1.5 h-8 bg-[#003399] rounded-full"></span>
                                        Personal Protocol
                                    </h3>
                                    <form onSubmit={handleProfileSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Full Name</label>
                                                <input type="text" name="full_name" value={profile.full_name} onChange={handleProfileChange} className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#003399] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium" required />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Email Address</label>
                                                <input type="email" name="email" value={profile.email} onChange={handleProfileChange} className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#003399] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium" required />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Phone Number</label>
                                                <input type="text" name="phone" value={profile.phone} onChange={handleProfileChange} className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#003399] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium" />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-black text-gray-400 uppercase mb-2 tracking-widest px-1">System Username</label>
                                                <input type="text" value={profile.username} className="w-full px-5 py-2.5 bg-gray-50 border-1 border-gray-200 rounded-2xl font-mono text-sm text-gray-400 cursor-not-allowed outline-none" disabled />
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="submit" disabled={saving} className="bg-[#003399] hover:bg-black text-white px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-blue-100 disabled:opacity-50 transform active:scale-95">
                                                {saving ? 'Syncing...' : 'Save Profile Changes'}
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Password Section */}
                                <div className="space-y-8 pt-12 border-t border-gray-100">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl tracking-tight">
                                        <span className="w-1.5 h-8 bg-[#E61111] rounded-full"></span>
                                        Security Credentials
                                    </h3>
                                    <form onSubmit={handlePasswordSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">New Password</label>
                                                <input type="password" name="new_password" value={passwords.new_password} onChange={handlePasswordChange} className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#E61111] focus:ring-4 focus:ring-red-50 outline-none transition-all font-medium" required />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-black text-gray-500 uppercase mb-2 tracking-widest px-1">Confirm New Password</label>
                                                <input type="password" name="confirm_password" value={passwords.confirm_password} onChange={handlePasswordChange} className="w-full px-5 py-2.5 bg-white border-1 border-gray-400 rounded-2xl focus:border-[#E61111] focus:ring-4 focus:ring-red-50 outline-none transition-all font-medium" required />
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="submit" disabled={saving} className="bg-[#E61111] hover:bg-black text-white px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-red-100 disabled:opacity-50 transform active:scale-95">
                                                {saving ? 'Processing...' : 'Sync Security Keys'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
