import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useToast } from '../context/ToastContext';

const Dashboard = () => {
  const { showToast } = useToast();
  const [stats, setStats] = useState({
    totalMedia: 0,
    totalUsers: 0,
    totalReviews: 0,
    movies: 0,
    series: 0
  });
  const [media, setMedia] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('media');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, mediaRes, usersRes, reviewsRes] = await Promise.all([
          axios.get('http://localhost:6002/admin/stats'),
          axios.get('http://localhost:6002/media'),
          axios.get('http://localhost:6002/Signup'),
          axios.get('http://localhost:6002/all-reviews')
        ]);
        setStats(statsRes.data);
        setMedia(mediaRes.data);
        setUsers(usersRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getMediaName = (id) => {
    const item = media.find(m => m.id === id);
    return item ? item.name : `Unknown (ID: ${id})`;
  };

  const handleDeleteMedia = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media?")) return;
    try {
      await axios.delete(`http://localhost:6002/media/${id}`);
      setMedia(media.filter(m => m._id !== id));
      showToast("Media deleted successfully", "success");
      // Refresh stats
      const statsRes = await axios.get('http://localhost:6002/admin/stats');
      setStats(statsRes.data);
    } catch (err) {
      showToast("Error deleting media", "error");
    }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await axios.delete(`http://localhost:6002/reviews/${id}`);
      setReviews(reviews.filter(r => r._id !== id));
      setStats(prev => ({ ...prev, totalReviews: prev.totalReviews - 1 }));
      showToast("Review removed", "success");
    } catch (err) {
      showToast("Error deleting review", "error");
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedia = media.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(media.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  if (loading) return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#F47521]" />
    </div>
  );

  return (
    <div className="bg-[#121212] min-h-screen pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="relative">
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-[#F47521] rounded-full opacity-50" />
                <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none mb-3">
                    Command <span className="text-[#F47521]">Center</span>
                </h1>
                <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px] ml-1">Administrative Dashboard System v2.0</p>
            </div>
            <Link to="/AddMedia" className="group">
                <button className="bg-white text-black font-black py-4 px-10 rounded-full uppercase tracking-tighter hover:bg-[#F47521] hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    New Content
                </button>
            </Link>
        </div>

        {/* Stats Glass Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
                { label: 'Library Size', value: stats.totalMedia, icon: '📚', color: 'from-orange-500/20' },
                { label: 'Active Users', value: stats.totalUsers, icon: '👤', color: 'from-blue-500/20' },
                { label: 'User Feedback', value: stats.totalReviews, icon: '💬', color: 'from-purple-500/20' },
                { label: 'Content Ratio', value: `${stats.series} : ${stats.movies}`, icon: '🎬', color: 'from-green-500/20' },
            ].map((stat, i) => (
                <div key={i} className="glass group p-8 rounded-3xl hover:border-[#F47521]/30 transition-all duration-500 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">{stat.label}</span>
                            <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{stat.icon}</span>
                        </div>
                        <div className="text-4xl font-black text-white italic tracking-tighter group-hover:text-[#F47521] transition-colors">
                            {stat.value}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Content Section */}
        <div className="bg-[#1a1a1a]/50 backdrop-blur-3xl rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
            {/* Pill Tabs */}
            <div className="p-4 bg-white/2">
                <div className="flex bg-black/40 p-1.5 rounded-full w-fit mx-auto sm:mx-0">
                    {['media', 'users', 'reviews'].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                setCurrentPage(1);
                            }}
                            className={`py-3 px-10 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-500 ${activeTab === tab ? 'bg-[#F47521] text-black shadow-lg shadow-[#F47521]/25 scale-105' : 'text-gray-500 hover:text-white'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-8">
                {activeTab === 'media' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-y-2">
                                <thead>
                                    <tr className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">
                                        <th className="pb-4 px-6">Media Title</th>
                                        <th className="pb-4 px-6">Category</th>
                                        <th className="pb-4 px-6">Performance</th>
                                        <th className="pb-4 px-6 text-right">Settings</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentMedia?.map(item => (
                                        <tr key={item._id} className="group hover:bg-white/2 transition-all duration-300">
                                            <td className="py-5 px-6 bg-white/[0.02] rounded-l-2xl group-hover:bg-white/[0.04]">
                                                <div className="flex items-center gap-5">
                                                    <div className="relative w-12 h-16 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                                                        <img src={item.image} className="w-full h-full rounded-lg object-cover shadow-2xl" alt="" />
                                                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-black text-sm tracking-tight leading-none mb-2 group-hover:text-[#F47521] transition-colors">{item.name}</p>
                                                        <p className="text-gray-500 text-[9px] uppercase font-black tracking-widest">{item.aired}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6 bg-white/[0.02] group-hover:bg-white/[0.04]">
                                                <span className="px-3 py-1.5 bg-black/40 rounded-md text-[9px] font-black text-gray-400 uppercase tracking-widest border border-white/5">
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td className="py-5 px-6 bg-white/[0.02] group-hover:bg-white/[0.04]">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[#E3B505] font-black text-sm">⭐</span>
                                                    <span className="text-white font-black text-sm tracking-tighter">{item.rating}</span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6 bg-white/[0.02] rounded-r-2xl group-hover:bg-white/[0.04] text-right">
                                                <div className="flex items-center justify-end gap-5">
                                                    <Link 
                                                        to={`/edit-media/${item._id}`}
                                                        className="p-2 hover:bg-[#F47521]/10 rounded-lg transition-colors group/item"
                                                    >
                                                        <span className="text-gray-500 group-hover/item:text-[#F47521] text-[10px] font-black uppercase tracking-widest">Edit</span>
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDeleteMedia(item._id)}
                                                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group/item"
                                                    >
                                                        <span className="text-gray-500 group-hover/item:text-red-500 text-[10px] font-black uppercase tracking-widest">Delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Premium Pagination */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-12 pt-8 border-t border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-[1px] bg-[#F47521]/30" />
                                <p className="text-xs text-gray-500 font-black uppercase tracking-[0.2em]">
                                    Showing <span className="text-white">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, media.length)}</span> of <span className="text-white">{media.length}</span> Objects
                                </p>
                            </div>
                            
                            {totalPages > 1 && (
                                <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-full border border-white/5">
                                    <button 
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-white disabled:opacity-0 transition-all cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    
                                    <div className="flex gap-1">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => paginate(i + 1)}
                                                className={`w-10 h-10 rounded-full text-[10px] font-black transition-all duration-500 ${currentPage === i + 1 ? 'bg-white text-black scale-110' : 'text-gray-500 hover:text-white'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button 
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-white disabled:opacity-0 transition-all cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-y-2">
                                <thead>
                                    <tr className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">
                                        <th className="pb-4 px-6">Member Identity</th>
                                        <th className="pb-4 px-6">Direct Mail</th>
                                        <th className="pb-4 px-6 text-right">Access Level</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.map(user => (
                                        <tr key={user._id} className="group hover:bg-white/2 transition-all duration-300">
                                            <td className="py-6 px-6 bg-white/[0.02] rounded-l-2xl group-hover:bg-white/[0.04]">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F47521] to-orange-700 flex items-center justify-center font-black text-black text-xs">
                                                        {user.fullname?.charAt(0)}
                                                    </div>
                                                    <span className="text-white font-black text-sm tracking-tight group-hover:text-[#F47521] transition-colors">{user.fullname}</span>
                                                </div>
                                            </td>
                                            <td className="py-6 px-6 bg-white/[0.02] group-hover:bg-white/[0.04]">
                                                <span className="text-gray-400 text-sm italic font-medium">{user.email}</span>
                                            </td>
                                            <td className="py-6 px-6 bg-white/[0.02] rounded-r-2xl group-hover:bg-white/[0.04] text-right">
                                                <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                                                    Active Premium
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {reviews?.map(review => (
                            <div key={review._id} className="p-8 bg-white/[0.01] rounded-[2rem] border border-white/5 hover:border-[#F47521]/20 transition-all group relative">
                                {/* Integrated Delete Button */}
                                <button 
                                    onClick={() => handleDeleteReview(review._id)}
                                    className="absolute top-6 right-6 p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-4">
                                        {/* Simplified Rating Badge */}
                                        <div className="px-4 py-2 bg-[#F47521]/10 rounded-full border border-[#F47521]/20 flex items-center gap-2">
                                            <span className="text-xs">⭐</span>
                                            <span className="text-sm font-black text-[#F47521] tracking-tighter">{review.rating}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-black text-xl tracking-tight leading-none">{review.userName}</h4>
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">
                                                On <span className="text-[#F47521] italic">{getMediaName(review.mediaId)}</span>
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="relative pl-6 py-1">
                                        {/* Subtle Accent Bar instead of big Icon */}
                                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F47521] to-transparent opacity-30 rounded-full" />
                                        <p className="text-gray-400 text-sm italic leading-relaxed font-medium">
                                            {review.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
