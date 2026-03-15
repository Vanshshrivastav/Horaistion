import React from 'react';
import { useNavigate } from 'react-router-dom';

const MediaDetailHero = ({ media, isInWatchlist, onWatchlistToggle }) => {
    const navigate = useNavigate();

    if (!media) return null;

    return (
        <div className="relative w-full">
            {/* Background Banner with Gradient Overlay */}
            <div className="absolute inset-0 h-[600px] overflow-hidden">
                <img 
                    src={media?.image} 
                    className="w-full h-full object-cover blur-md opacity-30 scale-110"
                    alt="Background"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative container mx-auto px-4 pt-32 pb-12 flex flex-col md:flex-row gap-8 items-start">
                {/* Poster */}
                <div className="w-64 md:w-80 shrink-0 shadow-2xl rounded-lg overflow-hidden group">
                    <img src={media?.poster || media?.image} className="w-full h-auto" alt={media?.name} />
                </div>

                {/* Details */}
                <div className="flex-grow pt-4">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-[#F47521] text-black text-[10px] font-black px-2 py-0.5 rounded uppercase uppercase">Premium</span>
                        <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">{media.type || 'Series'}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6 leading-tight">
                        {media.name}
                    </h1>

                    <div className="flex flex-wrap gap-4 mb-8">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white font-bold">
                            <span className="text-[#E3B505]">⭐</span> {media.rating || 'N/A'}
                        </div>
                        <div className="flex gap-2">
                            {media?.genres?.map(genre => (
                                <span key={genre} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>

                    <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mb-10 line-clamp-4">
                        {media?.story || media?.description || media?.synopsis}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="flex items-center gap-3 bg-[#F47521] text-black font-black py-4 px-10 rounded uppercase tracking-tighter hover:bg-white transition-all transform hover:-translate-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="black" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            Start Watching
                        </button>
                        
                        <button 
                            onClick={onWatchlistToggle}
                            className={`flex items-center gap-3 font-black py-4 px-8 rounded border-2 uppercase tracking-tighter transition-all transform hover:-translate-y-1 ${isInWatchlist ? 'bg-transparent border-[#F47521] text-[#F47521]' : 'bg-transparent border-white/20 text-white hover:border-white'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={isInWatchlist ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
                            </svg>
                            {isInWatchlist ? 'Saved' : 'Add to Watchlist'}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12 pt-8 border-t border-white/10">
                        <div>
                            <span className="block text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Status</span>
                            <span className="text-white font-bold">{media.status || 'Ongoing'}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Aired</span>
                            <span className="text-white font-bold">{media.aired || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Studios</span>
                            <span className="text-white font-bold">{media.studios || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Producer</span>
                            <span className="text-white font-bold">{media.producers || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaDetailHero;
