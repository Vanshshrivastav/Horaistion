import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fullname: localStorage.getItem('fullname') || 'User',
        email: localStorage.getItem('userEmail') || '',
        role: localStorage.getItem('role') || 'user'
    });
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (!user.email) {
            navigate('/login');
            return;
        }
        fetchUserReviews();
    }, [user.email]);

    const fetchUserReviews = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:6002/reviews/user/${user.email}`, {
                headers: { 'x-auth-token': token }
            });
            setReviews(res.data);
        } catch (err) {
            console.error("Error fetching reviews:", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            showToast("New passwords do not match", "error");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:6002/change-password', {
                email: user.email,
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            }, {
                headers: { 'x-auth-token': token }
            });
            showToast("Password updated successfully", "success");
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            showToast(err.response?.data?.message || "Password change failed", "error");
        }
    };

    const handleDeleteReview = async (id) => {
        if (!window.confirm("Delete your comment?")) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:6002/reviews/${id}`, {
                headers: { 'x-auth-token': token }
            });
            setReviews(reviews.filter(r => r._id !== id));
            showToast("Comment removed", "success");
        } catch (err) {
            showToast("Failed to delete comment", "error");
        }
    };

    return (
        <div className="bg-[#121212] min-h-screen pb-20 selection:bg-[#F47521]/30">
            <Navbar />

            <div className="container mx-auto px-6 pt-24 max-w-5xl">
                {/* Profile Header - More Compact */}
                <div className="flex flex-col md:flex-row gap-8 mb-12 items-center md:items-start text-center md:text-left">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#F47521] to-orange-700 flex items-center justify-center text-4xl font-black text-black shadow-2xl shadow-[#F47521]/10 shrink-0">
                        {user.fullname.charAt(0)}
                    </div>
                    <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1 justify-center md:justify-start">
                            <h1 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter leading-none">
                                {user.fullname}
                            </h1>
                            <span className="px-2.5 py-0.5 bg-[#F47521]/10 text-[#F47521] rounded-full text-[9px] font-black uppercase tracking-widest border border-[#F47521]/20 w-fit mx-auto md:mx-0">
                                {user.role}
                            </span>
                        </div>
                        <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px] italic opacity-60">
                            {user.email} <span className="mx-2 opacity-20">•</span> Member since 2024
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="glass px-6 py-4 rounded-2xl border-l-2 border-l-[#F47521]">
                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1 leading-none">Activity</p>
                            <p className="text-xl font-black text-white italic tracking-tighter leading-none">{reviews.length} <span className="text-gray-700 text-[10px] not-italic">COMMENTS</span></p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Security Column - Sleek & Compact */}
                    <div className="lg:col-span-4">
                        <div className="glass p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
                            <h2 className="text-lg font-black text-white uppercase italic tracking-tighter mb-8 flex items-center gap-2">
                                <div className="w-1 h-4 bg-[#F47521] rounded-full" />
                                Security
                            </h2>
                            <form onSubmit={handlePasswordChange} className="space-y-5">
                                {[
                                    { label: 'Current Password', key: 'currentPassword' },
                                    { label: 'New Password', key: 'newPassword' },
                                    { label: 'Confirm New', key: 'confirmPassword' }
                                ].map((field) => (
                                    <div key={field.key}>
                                        <label className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-2 block px-1">{field.label}</label>
                                        <input
                                            type="password"
                                            required
                                            className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-white text-xs focus:border-[#F47521]/50 focus:outline-none transition-all placeholder:text-gray-800"
                                            placeholder="••••••••"
                                            value={passwordData[field.key]}
                                            onChange={(e) => setPasswordData({ ...passwordData, [field.key]: e.target.value })}
                                        />
                                    </div>
                                ))}
                                <button className="w-full bg-white text-black font-black py-3.5 rounded-xl uppercase tracking-widest text-[9px] hover:bg-[#F47521] hover:text-white transition-all transform active:scale-95 shadow-lg mt-2">
                                    Update Security
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Activity Feed - Refined Scale */}
                    <div className="lg:col-span-8">
                        <div className="bg-[#1a1a1a]/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 min-h-[500px]">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-[#F47521] rounded-full" />
                                    Activity Feed
                                </h2>
                                <span className="text-[9px] text-gray-700 font-black tracking-[0.2em]">{reviews.length} RECORDS</span>
                            </div>

                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-24 gap-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#F47521]" />
                                    <p className="text-[9px] font-black text-gray-800 uppercase tracking-[0.3em]">Loading Activity</p>
                                </div>
                            ) : reviews.length === 0 ? (
                                <div className="text-center py-32 border border-dashed border-white/5 rounded-3xl">
                                    <p className="text-gray-800 font-black uppercase tracking-[0.3em] text-[10px]">No interactions found</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {reviews.map(review => (
                                        <div key={review._id} className="p-6 bg-white/[0.01] rounded-[1.5rem] border border-white/5 hover:border-[#F47521]/20 transition-all group relative">
                                            <button
                                                onClick={() => handleDeleteReview(review._id)}
                                                className="absolute top-4 right-4 p-2 text-gray-800 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>

                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="px-2 py-0.5 bg-[#F47521]/10 rounded-full border border-[#F47521]/20 flex items-center gap-1.5">
                                                    <span className="text-[8px]">⭐</span>
                                                    <span className="text-[10px] font-black text-[#F47521] tracking-tighter">{review.rating}</span>
                                                </div>
                                                <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest leading-none">
                                                    On <span className="text-white italic">{review.mediaId}</span>
                                                </p>
                                            </div>
                                            <p className="text-gray-400 text-sm italic leading-relaxed font-medium pl-4 border-l border-[#F47521]/20">
                                                "{review.comment}"
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;
