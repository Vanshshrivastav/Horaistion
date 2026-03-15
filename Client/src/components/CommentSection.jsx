import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

const CommentSection = ({ mediaId }) => {
    const { showToast } = useToast();
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(10);
    const [loading, setLoading] = useState(true);
    const userEmail = localStorage.getItem('userEmail');
    const isLoggedIn = !!localStorage.getItem('token');

    useEffect(() => {
        fetchReviews();
    }, [mediaId]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:6002/reviews/${mediaId}`);
            setReviews(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching reviews:", err);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            showToast("Please login to post a review", "info");
            return;
        }
        if (!comment.trim()) return;

        try {
            await axios.post('http://localhost:6002/reviews/add', {
                mediaId,
                userEmail,
                userName: userEmail.split('@')[0], // Fallback name
                comment,
                rating
            });
            setComment("");
            showToast("Review posted successfully", "success");
            fetchReviews();
        } catch (err) {
            console.error("Error posting review:", err);
            showToast("Failed to post review", "error");
        }
    };

    const handleDelete = async (reviewId) => {
        try {
            await axios.delete(`http://localhost:6002/reviews/${reviewId}`);
            showToast("Review deleted", "success");
            fetchReviews();
        } catch (err) {
            console.error("Error deleting review:", err);
            showToast("Failed to delete review", "error");
        }
    };

    if (loading) return <div className="text-gray-500 py-8">Loading reviews...</div>;

    return (
        <div className="container mx-auto px-4 py-12 border-t border-gray-800">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-8 flex items-center gap-4">
                <div className="w-1.5 h-8 bg-[#F47521]" />
                User Reviews ({reviews.length})
            </h2>

            {/* Post Review Form */}
            {isLoggedIn ? (
                <form onSubmit={handleSubmit} className="bg-[#23252B] p-6 rounded-lg mb-12 border border-gray-800">
                    <div className="mb-4">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Your Rating</label>
                        <select 
                            className="bg-[#121212] border border-gray-700 rounded px-4 py-2 text-white outline-none focus:border-[#F47521]"
                            value={rating}
                            onChange={(e) => setRating(parseInt(e.target.value))}
                        >
                            {[10,9,8,7,6,5,4,3,2,1].map(num => (
                                <option key={num} value={num}>{num} Stars</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Comment</label>
                        <textarea 
                            className="w-full bg-[#121212] border border-gray-700 rounded px-4 py-3 text-white outline-none focus:border-[#F47521] min-h-[100px]"
                            placeholder="Share your thoughts about this titles..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <button className="bg-[#F47521] text-black font-black py-2.5 px-8 rounded uppercase tracking-tighter hover:bg-white transition-all">
                        Post Review
                    </button>
                </form>
            ) : (
                <div className="bg-[#23252B] p-8 rounded-lg mb-12 text-center border border-dashed border-gray-700">
                    <p className="text-gray-400 mb-4">You must be logged in to post a review.</p>
                    <a href="/login" className="text-[#F47521] font-bold hover:underline">Sign in here</a>
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className="bg-[#1A1C21] p-6 rounded-lg border border-gray-800 flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#F47521] flex items-center justify-center font-bold text-black uppercase shrink-0">
                                {review.userName.charAt(0)}
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <h4 className="font-bold text-white tracking-tight">{review.userName}</h4>
                                        <span className="bg-black/40 text-[#E3B505] text-[10px] font-black px-2 py-0.5 rounded border border-[#E3B505]/20">
                                            ⭐ {review.rating}/10
                                        </span>
                                    </div>
                                    {userEmail === review.userEmail && (
                                        <button 
                                            onClick={() => handleDelete(review._id)}
                                            className="text-gray-600 hover:text-red-500 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                                    {review.comment}
                                </p>
                                <p className="text-[10px] text-gray-600 mt-4 uppercase tracking-widest font-bold">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 italic">No reviews yet. Be the first to share your opinion!</p>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
