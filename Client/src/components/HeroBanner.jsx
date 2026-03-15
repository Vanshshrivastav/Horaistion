import React from 'react';
import { Link } from 'react-router-dom';

const HeroBanner = ({ featuredItem }) => {
    if (!featuredItem) return null;

    return (
        <div key={featuredItem.id} className="relative w-full h-[60vh] lg:h-[80vh] overflow-hidden animate-fade-slow">
            {/* Background Image with Gradient */}
            <div className="absolute inset-0">
                <img
                    src={featuredItem.image}
                    alt={featuredItem.name}
                    className="w-full h-full object-cover object-top opacity-50 blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-transparent to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-12 lg:pb-24">
                <div className="max-w-2xl animate-fade-in-up">
                    <span className="bg-[#F47521] text-black text-xs font-black uppercase px-2 py-1 rounded mb-4 inline-block tracking-tighter">
                        Featured Movie
                    </span>
                    <h1 className="text-4xl lg:text-7xl font-black text-white mb-4 tracking-tighter leading-none italic uppercase">
                        {featuredItem.name}
                    </h1>
                    <div className="flex items-center gap-4 text-sm font-bold text-gray-300 mb-6">
                        <span className="text-[#E3B505]">⭐ {featuredItem.rating || '9.5'}</span>
                        <span>{featuredItem.genres ? featuredItem.genres.join(', ') : 'Action, Adventure'}</span>
                        <span>{featuredItem.aired || '2024'}</span>
                    </div>
                    <p className="text-gray-400 text-sm lg:text-base line-clamp-3 mb-8 max-w-xl">
                        {featuredItem.story || featuredItem.synopsis || "Join the epic journey as our heroes face their greatest challenges yet. A story of courage, friendship, and destiny that will keep you on the edge of your seat."}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="bg-[#F47521] text-black font-black py-3 px-8 rounded flex items-center gap-2 hover:bg-white transition-all uppercase tracking-tighter">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Watch Now
                        </button>
                        <Link
                            to={featuredItem.type === 'Movie' ? `/animovie/${featuredItem.id}` : `/aniproflie/${featuredItem.id}`}
                            className="bg-white/10 backdrop-blur-md text-white font-black py-3 px-8 rounded flex items-center gap-2 hover:bg-white/20 transition-all uppercase tracking-tighter border border-white/20"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            More Info
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
