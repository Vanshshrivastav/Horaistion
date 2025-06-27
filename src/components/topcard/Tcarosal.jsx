import React, { useRef } from 'react';
import animeData from '../topcard/animeData.json';

export default function AnimeCardCarousel() {
  const carouselRef = useRef(null);

  const scroll = (amount) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#1E1E1E] p-1.5">
      {/* Left Scroll Button */}
      <button
        onClick={() => scroll(-200)}
        className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r bg-[#E3B505] text-black rounded-full p-2 shadow-lg hover:scale-110 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className="text-2xl font-bold mb-2 text-white ml-2">Top Watch</h1>

      <div
        ref={carouselRef}
        className="flex overflow-x-scroll space-x-2 lg:space-x-4 p-2 lg:p-4 bg-[#1E1E1E] scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {animeData.map((anime, index) => (
          <div
            key={index}
            className="min-w-[125px] sm:min-w-[50px] ml-2 lg:min-w-[200px] bg-[#121212] shadow-sm lg:shadow-lg overflow-hidden flex flex-col text-white"
          >
            <img src={anime.image} alt={anime.name} className="w-full h-full object-cover" />
            <div className="p-1 sm:p-0.5 lg:p-2">
              <h3 className="text-xs sm:text-[8px] lg:text-sm font-semibold hover:text-[#E3B505] mb-0.5 sm:mb-0.5 lg:mb-1">
                <a href="#">{anime.name}</a>
              </h3>
              <p className="text-[10px] sm:text-[6px] lg:text-xs">Type: {anime.type}</p>
              <p className="text-[10px] sm:text-[6px] lg:text-xs">Rating: {anime.rating}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={() => scroll(200)}
        className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r bg-[#E3B505]  text-black rounded-full p-2 shadow-lg hover:scale-110 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
