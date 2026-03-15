import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommentSection from '../components/CommentSection';
import MediaDetailHero from '../components/MediaDetailHero';
import RecommendationSection from '../components/RecommendationSection';

const Animeinfo = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [anime, setAnime] = useState(null);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const { id } = useParams();
    const userEmail = localStorage.getItem('userEmail');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:6002/movie`);
                const foundMedia = response.data.find((item) => item.id === parseInt(id));
                setAnime(foundMedia);
                
                if (foundMedia && userEmail) {
                    const watchlistRes = await axios.get(`http://localhost:6002/watchlist/${userEmail}`);
                    setIsInWatchlist(watchlistRes.data.some(w => w.mediaId === foundMedia.id));
                }
                setError(null);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch media data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, userEmail]);

    const handleWatchlistToggle = async () => {
        if (!userEmail) {
            navigate('/login');
            return;
        }

        try {
            if (isInWatchlist) {
                await axios.post('http://localhost:6002/watchlist/remove', {
                    email: userEmail,
                    mediaId: anime.id
                });
                setIsInWatchlist(false);
            } else {
                await axios.post('http://localhost:6002/watchlist/add', {
                    email: userEmail,
                    mediaId: anime.id,
                    mediaType: anime.type,
                    name: anime.name,
                    image: anime.image
                });
                setIsInWatchlist(true);
            }
        } catch (err) {
            console.error("Error updating watchlist:", err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#F47521]" />
            </div>
        );
    }

    if (error || !anime) {
        return (
            <div className="min-h-screen bg-[#121212]">
                <Navbar />
                <div className="text-white p-24 text-center uppercase font-black text-2xl italic">
                    {error || "Media not found"}
                </div>
                <Footer />
            </div>
        );
    }

    const getEmbedUrl = (url) => {
        if (!url) return "";
        let videoId = "";
        
        // Handle youtu.be/ID
        if (url.includes("youtu.be/")) {
            videoId = url.split("youtu.be/")[1].split(/[?#]/)[0];
        } 
        // Handle youtube.com/watch?v=ID
        else if (url.includes("watch?v=")) {
            videoId = url.split("watch?v=")[1].split(/[&?#]/)[0];
        }
        // Handle youtube.com/embed/ID
        else if (url.includes("embed/")) {
            videoId = url.split("embed/")[1].split(/[?#]/)[0];
        }
        
        return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : url;
    };

    const trailers = (anime.animeTrailer || []).map((trailer, index) => ({
        id: index + 1,
        title: trailer.title,
        url: getEmbedUrl(trailer.url),
    }));

    return (
        <div className="bg-[#121212] min-h-screen">
            <Navbar />
            
            <MediaDetailHero 
                media={anime} 
                isInWatchlist={isInWatchlist} 
                onWatchlistToggle={handleWatchlistToggle} 
            />

            {/* Trailers Section */}
            {trailers.length > 0 && (
                <div className="container mx-auto px-4 py-12 border-t border-white/5">
                    <h2 className="text-xl font-black text-white uppercase italic tracking-tighter mb-8 flex items-center gap-4">
                        <div className="w-1 h-6 bg-[#F47521]" />
                        Official Trailers
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trailers.map((trailer) => (
                            <div key={trailer.id} className="group relative aspect-video bg-[#23252B] rounded-lg overflow-hidden border border-white/5 shadow-xl transition-all">
                                <iframe
                                    className="w-full h-full"
                                    src={trailer.url}
                                    title={trailer.title}
                                    frameBorder="0"
                                    allowFullScreen
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                    <p className="text-white text-xs font-bold uppercase tracking-wider">{trailer.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Characters Section */}
            {anime.characters && anime.characters.length > 0 && (
                <div className="container mx-auto px-4 py-12 border-t border-white/5">
                    <h2 className="text-xl font-black text-white uppercase italic tracking-tighter mb-8 flex items-center gap-4">
                        <div className="w-1 h-6 bg-[#F47521]" />
                        Characters & Cast
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {anime.characters.map((char, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-[#23252B] rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <img src={char.character_image} alt={char.name} className="w-16 h-16 rounded-lg object-cover" />
                                    <div>
                                        <p className="text-white font-bold text-sm">{char.name}</p>
                                        <p className="text-gray-500 text-[10px] uppercase font-black">Main Character</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[#F47521] font-bold text-xs">{char.japanese_voice_actor}</p>
                                    <p className="text-gray-500 text-[10px] uppercase font-black">Japanese VA</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <RecommendationSection currentMedia={anime} />
            
            <CommentSection mediaId={id} />

            <Footer />
        </div>
    )
}

export default Animeinfo