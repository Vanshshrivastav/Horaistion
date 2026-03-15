import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import MediaCard from '../components/MediaCard';
import Footer from '../components/Footer';

const WatchlistPage = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        const fetchWatchlist = async () => {
            if (!userEmail) {
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`http://localhost:6002/watchlist/${userEmail}`);
                // The backend stores partially hydrated objects, but MediaCard expects the full media item structure.
                // For the watchlist view, we can map the stored item back to a compatible format or fetch full details.
                // Assuming stored items have: { mediaId, name, image, mediaType }
                const formattedItems = response.data?.map(item => ({
                    id: item.mediaId,
                    name: item.name,
                    image: item.image,
                    type: item.mediaType
                    // Add other defaults if needed for MediaCard
                }));
                setWatchlist(formattedItems);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching watchlist:", err);
                setLoading(false);
            }
        };
        fetchWatchlist();
    }, [userEmail]);

    if (loading) return (
        <div className="min-h-screen bg-[#121212] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#F47521]" />
        </div>
    );

    return (
        <div className="bg-[#121212] min-h-screen">
            <Navbar />
            
            <main className="container mx-auto px-4 pt-32 pb-12">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-2 h-10 bg-[#F47521]" />
                    <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                        My Watchlist
                    </h1>
                </div>

                {watchlist.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                        {watchlist?.map((item) => (
                            <MediaCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-[#212121] rounded-lg border border-dashed border-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-600 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight italic uppercase">Your list is empty</h3>
                        <p className="text-gray-500 text-sm max-w-xs mx-auto mb-8">
                            Start adding your favorite anime and movies to keep track of what you want to watch.
                        </p>
                        <a href="/" className="inline-block bg-[#F47521] text-black font-black py-3 px-8 rounded uppercase tracking-tighter hover:bg-white transition-all transform hover:-translate-y-1">
                            Browse Content
                        </a>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default WatchlistPage;
