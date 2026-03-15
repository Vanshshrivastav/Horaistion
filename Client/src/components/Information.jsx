import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import MediaDetailHero from "./MediaDetailHero";
import RecommendationSection from "./RecommendationSection";

const Information = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anime, setAnime] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const { showToast } = useToast();
  const { id } = useParams();
  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:6002/media`);
        const foundMedia = response.data.find((item) => item.id === parseInt(id));
        setAnime(foundMedia);
        
        if (foundMedia && userEmail) {
            const watchlistRes = await axios.get(`http://localhost:6002/watchlist/${userEmail}`);
            setIsInWatchlist(watchlistRes.data?.some(w => w.mediaId === foundMedia.id) || false);
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
            showToast(`${anime.name} removed from watchlist`, "info");
        } else {
            await axios.post('http://localhost:6002/watchlist/add', {
                email: userEmail,
                mediaId: anime.id,
                mediaType: anime.type,
                name: anime.name,
                image: anime.image
            });
            setIsInWatchlist(true);
            showToast(`${anime.name} added to watchlist`, "success");
        }
    } catch (err) {
        console.error("Error updating watchlist:", err);
        showToast("Failed to update watchlist", "error");
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
        <div className="text-white p-24 text-center uppercase font-black text-2xl italic bg-[#121212]">
            {error || "Media not found"}
        </div>
    );
  }

  return (
    <div className="bg-[#121212]">
        <MediaDetailHero 
            media={anime} 
            isInWatchlist={isInWatchlist} 
            onWatchlistToggle={handleWatchlistToggle} 
        />
        
        {/* Story Section */}
        <div className="container mx-auto px-4 py-12 border-t border-white/5">
             <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Synopsis</h3>
             <p className="text-gray-300 text-lg leading-relaxed max-w-4xl whitespace-pre-wrap">
                {anime?.story || anime?.synopsis}
             </p>
        </div>

        <RecommendationSection currentMedia={anime} />
    </div>
  );
};

export default Information;
