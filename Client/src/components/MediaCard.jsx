import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

const MediaCard = ({ item, variant = 'standard' }) => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const userEmail = localStorage.getItem('userEmail'); // Assuming userEmail is stored on login

    useEffect(() => {
        const checkWatchlist = async () => {
            if (!userEmail) return;
            try {
                const res = await axios.get(`http://localhost:6002/watchlist/${userEmail}`);
                const exists = res.data.some(w => w.mediaId === item.id);
                setIsInWatchlist(exists);
            } catch (err) {
                console.error("Error checking watchlist:", err);
            }
        };
        checkWatchlist();
    }, [item.id, userEmail]);

    const handleWatchlist = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!userEmail) {
            navigate('/login');
            return;
        }

        try {
            if (isInWatchlist) {
                await axios.post('http://localhost:6002/watchlist/remove', {
                    email: userEmail,
                    mediaId: item.id
                });
                setIsInWatchlist(false);
                showToast(`${item.name} removed from watchlist`, "info");
            } else {
                await axios.post('http://localhost:6002/watchlist/add', {
                    email: userEmail,
                    mediaId: item.id,
                    mediaType: item.type,
                    name: item.name,
                    image: item.image
                });
                setIsInWatchlist(true);
                showToast(`${item.name} added to watchlist`, "success");
            }
        } catch (err) {
            console.error("Error updating watchlist:", err);
            showToast("Watchlist update failed", "error");
        }
    };

    if (variant === 'horizontal') {
        const routePath = item.type === 'Movie' ? `/animovie/${item.id}` : `/aniproflie/${item.id}`;
        return (
            <Link to={routePath} className="group block">
                <div className="flex items-center bg-[#1a1a1a] p-2 rounded-lg border border-white/5 hover:border-[#F47521]/30 transition-all hover:bg-[#23252B]">
                    <div className="relative w-16 h-24 sm:w-20 sm:h-28 flex-shrink-0 overflow-hidden rounded-md">
                        <img 
                            src={item?.image || '/placeholder.jpg'} 
                            alt={item?.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => { e.target.src = 'https://placehold.co/600x900/121212/F47521?text=No+Image'; }}
                        />
                    </div>
                    <div className="ml-4 flex-grow min-w-0">
                        <h3 className="text-sm sm:text-base font-black text-white truncate group-hover:text-[#F47521] transition-colors leading-tight mb-2">
                            {item?.name}
                        </h3>
                        <div className="flex items-center gap-1">
                             <div className="bg-[#2E2E2E] text-[#E3B505] text-[10px] font-black px-2 py-0.5 rounded">
                                {item?.aired_episodes || item?.episodes || '?'}
                            </div>
                            <div className="bg-[#E3B505] text-black text-[10px] font-black px-2 py-0.5 rounded">
                                {item?.total_episodes || item?.episodes || '?'}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    const mainRoutePath = item.type === 'Movie' ? `/animovie/${item.id}` : `/aniproflie/${item.id}`;

    return (
        <div className="group relative bg-[#23252B] rounded-lg overflow-hidden shadow-lg hover-scale border border-white/5">
            {/* Poster Image */}
            <Link to={mainRoutePath} className="aspect-[2/3] relative block overflow-hidden">
                <img 
                    src={item?.image || '/placeholder.jpg'} 
                    alt={item?.name || 'Media Poster'} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    loading="lazy"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/600x900/121212/F47521?text=No+Image';
                    }}
                />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-3 z-20">
                    <div className="flex flex-col gap-2">
                        <button className="w-full bg-[#F47521] text-black font-black py-2.5 rounded text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors">
                             Watch Now
                        </button>
                        <button 
                            onClick={handleWatchlist}
                            className={`w-full border-2 font-black py-2 rounded text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${isInWatchlist ? 'bg-[#F47521] border-[#F47521] text-black' : 'border-white/20 text-white hover:border-white'}`}
                        >
                            {isInWatchlist ? 'Saved' : 'Watchlist'}
                        </button>
                    </div>
                </div>

                {/* Bottom Labels (EP Counter) */}
                <div className="absolute bottom-2 left-2 flex gap-0.5 z-10 transition-opacity group-hover:opacity-0">
                    {item?.aired_episodes && item?.total_episodes && item.aired_episodes !== item.total_episodes ? (
                        <>
                            <span className="text-[10px] font-black text-[#E3B505] bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-l border-l border-t border-b border-white/10">
                                {item.aired_episodes}
                            </span>
                            <span className="text-[10px] font-black text-black bg-[#E3B505] px-2 py-0.5 rounded-r">
                                {item.total_episodes}
                            </span>
                        </>
                    ) : (
                        <span className="text-[10px] font-black text-black bg-[#E3B505] px-2 py-0.5 rounded border border-white/10">
                            {item?.aired_episodes || item?.total_episodes || item?.episodes || '?'}
                        </span>
                    )}
                </div>
            </Link>

            {/* Bottom Content */}
            <div className="p-3">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-xs font-black text-white truncate group-hover:text-[#F47521] transition-colors flex-grow uppercase tracking-tight">
                        {item?.name}
                    </h3>
                    <span className="bg-[#2E2E2E] text-[#E3B505] text-[10px] font-black px-1.5 py-0.5 rounded flex-shrink-0">
                        {item?.rating || 'NR'}
                    </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                        {item?.type || 'Series'}
                    </p>
                    <div className="w-1 h-1 bg-gray-700 rounded-full" />
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                        {item?.duration || '24 min'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MediaCard;
